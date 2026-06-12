import { z } from "zod";
import { router, protectedProcedure } from "@/lib/trpc/init";
import { db } from "@/lib/db";
import { logActivity } from "@/lib/rally/services";
import { VolunteerLeadStatus } from "@prisma/client";

export const rallyLeadsRouter = router({
  list: protectedProcedure.query(async () => {
    return db.volunteerLead.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),

  updateStatus: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        status: z.nativeEnum(VolunteerLeadStatus),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return db.volunteerLead.update({
        where: { id: input.id },
        data: {
          status: input.status,
          ...(input.notes !== undefined && { notes: input.notes }),
        },
      });
    }),

  inviteToTraining: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        trainingDate: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const lead = await db.volunteerLead.update({
        where: { id: input.id },
        data: { status: "training_invited" },
      });
      // TODO: send Twilio SMS invite here with trainingDate
      console.log(
        `[leads] Invited lead ${input.id} (${lead.firstName} ${lead.lastName}) to training${input.trainingDate ? ` on ${input.trainingDate}` : ""}`
      );
      return lead;
    }),

  markTrainingComplete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return db.volunteerLead.update({
        where: { id: input.id },
        data: { status: "training_complete" },
      });
    }),

  activate: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        trainingWaived: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const lead = await db.volunteerLead.findUnique({ where: { id: input.id } });
      if (!lead) throw new Error("Lead not found");

      // Check for duplicate phone in RallyVolunteer
      const existing = await db.rallyVolunteer.findUnique({
        where: { phone: lead.phone },
      });
      if (existing) {
        throw new Error(
          `Phone ${lead.phone} already exists as volunteer #${existing.id} (${existing.firstName} ${existing.lastName})`
        );
      }

      // Create the new RallyVolunteer
      const volunteer = await db.rallyVolunteer.create({
        data: {
          firstName: lead.firstName,
          lastName: lead.lastName,
          phone: lead.phone,
          email: lead.email,
          status: "active",
          preferredCampuses: [lead.campusName],
          preferredShiftTypes: [],
          availability: lead.availability ?? {},
          notes: lead.notes,
        },
      });

      // Update the lead
      await db.volunteerLead.update({
        where: { id: input.id },
        data: {
          status: "activated",
          volunteerId: volunteer.id,
          activatedAt: new Date(),
          ...(input.trainingWaived !== undefined && {
            trainingWaived: input.trainingWaived,
          }),
        },
      });

      // Log activity
      await logActivity(
        "activate",
        `Lead activated: ${lead.firstName} ${lead.lastName} → volunteer #${volunteer.id}`,
        volunteer.id
      );

      // Send Twilio SMS welcome message
      const { firstName, phone } = volunteer;
      if (process.env.TWILIO_ACCOUNT_SID) {
        const twilio = (await import("twilio")).default;
        const client = twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!);
        await client.messages.create({
          body: `Hi ${firstName}! 🌟 Welcome to the WFM volunteer team. You're all set — sign in at wfmca.org/v to view upcoming shifts and get started.`,
          from: process.env.TWILIO_FROM_NUMBER!,
          to: `+${phone}`,
        });
      } else {
        console.log(
          `[leads/activate] DEV SMS → +${phone}: Hi ${firstName}! 🌟 Welcome to the WFM volunteer team. You're all set — sign in at wfmca.org/v to view upcoming shifts and get started.`
        );
      }

      return volunteer;
    }),

  reject: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return db.volunteerLead.update({
        where: { id: input.id },
        data: {
          status: "rejected",
          ...(input.notes !== undefined && { notes: input.notes }),
        },
      });
    }),

  addVolunteer: protectedProcedure
    .input(
      z.object({
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        phone: z.string().min(7),
        email: z.string().email().optional(),
        campusName: z.string().min(1),
        trainingWaived: z.literal(true),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      // Check for duplicate phone
      const existing = await db.rallyVolunteer.findUnique({
        where: { phone: input.phone },
      });
      if (existing) {
        throw new Error(
          `Phone ${input.phone} already exists as volunteer #${existing.id}`
        );
      }

      // Create active RallyVolunteer
      const volunteer = await db.rallyVolunteer.create({
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          phone: input.phone,
          email: input.email,
          status: "active",
          preferredCampuses: [input.campusName],
          preferredShiftTypes: [],
          availability: {},
          notes: input.notes,
        },
      });

      // Create VolunteerLead with activated status and trainingWaived=true
      await db.volunteerLead.create({
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          phone: input.phone,
          email: input.email,
          campusName: input.campusName,
          status: "activated",
          trainingWaived: true,
          notes: input.notes,
          volunteerId: volunteer.id,
          activatedAt: new Date(),
        },
      });

      await logActivity(
        "lead_create",
        `VIP/donor fast-path: ${input.firstName} ${input.lastName} added directly as volunteer #${volunteer.id}`,
        volunteer.id
      );

      // Send Twilio SMS welcome message
      const { firstName, phone } = volunteer;
      if (process.env.TWILIO_ACCOUNT_SID) {
        const twilio = (await import("twilio")).default;
        const client = twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!);
        await client.messages.create({
          body: `Hi ${firstName}! 🌟 Welcome to the WFM volunteer team. You're all set — sign in at wfmca.org/v to view upcoming shifts and get started.`,
          from: process.env.TWILIO_FROM_NUMBER!,
          to: `+${phone}`,
        });
      } else {
        console.log(
          `[leads/addVolunteer] DEV SMS → +${phone}: Hi ${firstName}! 🌟 Welcome to the WFM volunteer team. You're all set — sign in at wfmca.org/v to view upcoming shifts and get started.`
        );
      }

      return volunteer;
    }),
});
