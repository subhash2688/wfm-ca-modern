import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  source: z.string().max(64).optional(),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const { email, source } = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  // Dev / unconfigured: log and pretend success so UI flow can be tested.
  if (!apiKey || apiKey.includes("placeholder") || !audienceId) {
    console.log("[subscribe] (dev, no Resend configured)", { email, source });
    return NextResponse.json({ ok: true });
  }

  try {
    const resend = new Resend(apiKey);
    const result = await resend.contacts.create({
      email,
      audienceId,
      unsubscribed: false,
    });

    // Resend returns an error on duplicate — treat as success for UX.
    if (result.error) {
      const msg = result.error.message?.toLowerCase() ?? "";
      const isDuplicate = msg.includes("already exists") || msg.includes("duplicate");
      if (!isDuplicate) {
        console.error("[subscribe] Resend error", result.error);
        return NextResponse.json(
          { ok: false, error: "Something went wrong. Please try again." },
          { status: 500 },
        );
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[subscribe] unexpected error", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
