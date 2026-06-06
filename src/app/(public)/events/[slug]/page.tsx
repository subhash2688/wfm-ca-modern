import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { serverTRPC } from "@/lib/trpc/server";
import { FadeIn } from "@/components/ui/motion";

interface EventDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: EventDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const trpc = await serverTRPC();
  const event = await trpc.event.getBySlug({ slug });

  if (!event) {
    return { title: "Event Not Found" };
  }

  return {
    title: event.metaTitle || event.title,
    description: event.metaDescription || event.shortDesc || undefined,
  };
}

export default async function EventDetailPage({ params }: EventDetailProps) {
  const { slug } = await params;
  const trpc = await serverTRPC();
  const event = await trpc.event.getBySlug({ slug });

  if (!event) {
    notFound();
  }

  const eventDate = new Date(event.eventDate);
  const isPast = eventDate < new Date();

  return (
    <main>
      {/* Hero image */}
      {event.imagePath && (
        <div className="relative h-[40vh] min-h-[320px] md:h-[50vh]">
          <Image
            src={event.imagePath}
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A3D5C]/80 via-[#1A3D5C]/30 to-transparent" />
        </div>
      )}

      <section className="bg-[#FAFAF8] py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <FadeIn>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#6B7280] transition-colors hover:text-[#1A3D5C]"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              Back to Events
            </Link>

            {isPast && (
              <div className="mt-6 inline-block rounded-full bg-[#4B5563]/10 px-4 py-1.5 text-sm font-semibold text-[#4B5563]">
                This event has passed
              </div>
            )}

            <h1 className="font-heading mt-6 text-3xl font-bold text-[#1A1A1A] md:text-5xl">
              {event.title}
            </h1>

            {/* Event info bar */}
            <div className="mt-8 flex flex-wrap gap-6 rounded-2xl border border-[#E5E2DD] bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1A3D5C]/10">
                  <svg
                    className="h-5 w-5 text-[#1A3D5C]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium text-[#6B7280]">
                    Date
                  </p>
                  <p className="font-semibold text-[#1A1A1A]">
                    {eventDate.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {event.endDate && (
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1A3D5C]/10">
                    <svg
                      className="h-5 w-5 text-[#1A3D5C]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#6B7280]">
                      Ends
                    </p>
                    <p className="font-semibold text-[#1A1A1A]">
                      {new Date(event.endDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              )}

              {event.venue && (
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1A3D5C]/10">
                    <svg
                      className="h-5 w-5 text-[#1A3D5C]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#6B7280]">
                      Venue
                    </p>
                    <p className="font-semibold text-[#1A1A1A]">
                      {event.venue}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {event.shortDesc && (
              <p className="mt-8 text-lg leading-relaxed text-[#4B5563]">
                {event.shortDesc}
              </p>
            )}

            {event.content && (
              <div
                dangerouslySetInnerHTML={{ __html: event.content }}
                className="prose prose-lg mt-10 max-w-none prose-headings:font-heading prose-headings:text-[#1A1A1A] prose-p:text-[#4B5563] prose-a:text-[#D4A853] prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl"
              />
            )}

            {/* Registration CTA for upcoming events */}
            {!isPast && (
              <div className="mt-12 rounded-2xl bg-[#1A3D5C] p-8 text-center">
                <h3 className="font-heading text-2xl font-bold text-white">
                  Interested in attending?
                </h3>
                <p className="mt-2 text-white/60">
                  Get in touch with us to learn more about this event and how to
                  participate.
                </p>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#D4A853] px-8 py-3 text-sm font-bold text-[#1A3D5C] transition-all hover:bg-[#C49A48] hover:shadow-lg"
                >
                  Contact us to register
                </Link>
              </div>
            )}
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
