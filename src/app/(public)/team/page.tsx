import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { serverTRPC } from "@/lib/trpc/server";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the people behind the World Food Movement.",
};

const TEAM_TYPE_LABELS: Record<string, { title: string; description: string }> = {
  leadership: {
    title: "Leadership",
    description: "The visionaries guiding the mission to end student hunger in America.",
  },
  advisory: {
    title: "Advisory Board",
    description: "Industry leaders and experts lending their experience and networks.",
  },
  staff: {
    title: "Staff",
    description: "The dedicated team making it all happen, day in and day out.",
  },
};

const TEAM_TYPE_ORDER = ["leadership", "advisory", "staff"];

interface TeamMember {
  id: number;
  name: string;
  title: string | null;
  bio: string | null;
  imagePath: string | null;
  teamType: string;
  sortOrder: number;
}

const PLACEHOLDER_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: "Dr. Anand Sharma",
    title: "Founder & President",
    bio: "A visionary leader with over two decades of experience in nonprofit management and food security. Dr. Sharma founded the World Food Movement to address the growing crisis of student hunger on American college campuses.",
    imagePath: null,
    teamType: "leadership",
    sortOrder: 1,
  },
  {
    id: 2,
    name: "Priya Venkatesh",
    title: "Executive Director",
    bio: "Former university administrator who witnessed student food insecurity firsthand. Priya oversees day-to-day operations and helped launch the program across Bay Area community colleges starting in January 2025.",
    imagePath: null,
    teamType: "leadership",
    sortOrder: 2,
  },
  {
    id: 3,
    name: "Marcus Chen",
    title: "Director of Operations",
    bio: "Supply chain expert who previously managed logistics for major food distribution networks. Marcus ensures every meal is prepared, packaged, and delivered with care and efficiency.",
    imagePath: null,
    teamType: "leadership",
    sortOrder: 3,
  },
  {
    id: 4,
    name: "Sarah Williams",
    title: "Director of Development",
    bio: "Seasoned fundraiser who has raised over $50 million for nonprofits. Sarah leads donor relations, corporate partnerships, and ensures every dollar is maximized for impact.",
    imagePath: null,
    teamType: "leadership",
    sortOrder: 4,
  },
];

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="group rounded-3xl border border-[#E5E2DD] bg-white transition-all hover:border-[#D4A853]/40 hover:shadow-lg">
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-t-3xl bg-gradient-to-br from-[#1A3D5C]/10 to-[#D4A853]/10">
        {member.imagePath ? (
          <Image
            src={member.imagePath}
            alt={member.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#1A3D5C]/10">
              <span className="font-heading text-3xl font-bold text-[#1A3D5C]/40">
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-6">
        <h3 className="font-heading text-xl font-bold text-[#1A1A1A]">
          {member.name}
        </h3>
        {member.title && (
          <p className="mt-1 text-sm font-semibold text-[#D4A853]">
            {member.title}
          </p>
        )}
        {member.bio && (
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#4B5563]">
            {member.bio}
          </p>
        )}
      </div>
    </div>
  );
}

export default async function TeamPage() {
  let members: TeamMember[] = [];

  try {
    const trpc = await serverTRPC();
    members = await trpc.team.list();
  } catch {
    // DB not available — use placeholders
  }

  const useMembers = members.length > 0 ? members : PLACEHOLDER_MEMBERS;

  // Group members by teamType
  const grouped = useMembers.reduce<Record<string, TeamMember[]>>(
    (acc, member) => {
      const type = member.teamType || "staff";
      if (!acc[type]) acc[type] = [];
      acc[type].push(member);
      return acc;
    },
    {},
  );

  // Sort groups by predefined order
  const sortedTypes = TEAM_TYPE_ORDER.filter((type) => grouped[type]);
  // Add any types not in the predefined order
  Object.keys(grouped).forEach((type) => {
    if (!sortedTypes.includes(type)) sortedTypes.push(type);
  });

  return (
    <main className="overflow-x-hidden">
      <PageHero
        label="Our Team"
        title="The people behind the mission."
        subtitle="Every meal served is the work of passionate individuals who believe no student should go hungry."
      />

      {/* ── Team Sections ── */}
      {sortedTypes.map((type) => {
        const typeInfo = TEAM_TYPE_LABELS[type] || {
          title: type.charAt(0).toUpperCase() + type.slice(1),
          description: "",
        };
        const typeMembers = grouped[type];

        return (
          <section
            key={type}
            className="border-b border-[#E5E2DD] bg-[#FAFAF8] py-24 last:border-b-0 md:py-32"
          >
            <div className="mx-auto max-w-7xl px-6">
              <FadeIn>
                <div className="mb-16 max-w-2xl">
                  <p className="text-sm font-semibold text-[#D4A853]">
                    {typeInfo.title}
                  </p>
                  <h2 className="font-heading mt-4 text-3xl font-bold text-[#1A1A1A] md:text-4xl">
                    {typeInfo.title === "Leadership"
                      ? "Guiding the mission"
                      : typeInfo.title === "Advisory Board"
                        ? "Lending their expertise"
                        : "Making it happen"}
                  </h2>
                  {typeInfo.description && (
                    <p className="mt-4 text-lg text-[#4B5563]">
                      {typeInfo.description}
                    </p>
                  )}
                </div>
              </FadeIn>

              <StaggerContainer className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {typeMembers.map((member) => (
                  <StaggerItem key={member.id}>
                    <MemberCard member={member} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>
        );
      })}

      {/* ── Join Us CTA ── */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="overflow-hidden rounded-[2rem] bg-[#1A3D5C]">
              <div className="px-10 py-16 text-center md:px-20 md:py-20">
                <p className="text-sm font-semibold text-[#D4A853]">
                  Join us
                </p>
                <h2 className="font-heading mx-auto mt-4 max-w-2xl text-3xl font-bold text-white md:text-5xl">
                  Want to be part of the team?
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/60">
                  We&apos;re always looking for passionate people to join our
                  mission. Whether as a volunteer, campus lead, or staff member,
                  there&apos;s a place for you.
                </p>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="/get-involved"
                    className="inline-flex items-center gap-3 rounded-full bg-[#D4A853] px-10 py-4 text-base font-bold text-[#1A3D5C] transition-all hover:bg-[#C49A48] hover:shadow-xl hover:shadow-[#D4A853]/20"
                  >
                    Get involved
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-10 py-4 text-base font-medium text-white transition-all hover:border-white/40 hover:bg-white/5"
                  >
                    Contact us
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
