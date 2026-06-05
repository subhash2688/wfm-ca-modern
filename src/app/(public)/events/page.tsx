import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { serverTRPC } from "@/lib/trpc/server";
import { PageHero } from "@/components/layout/PageHero";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Join our upcoming events, fundraisers, and community gatherings.",
};

export default async function EventsPage() {
  const trpc = await serverTRPC();
  const events = await trpc.event.list();

  return (
    <main>
      <PageHero label="Events" title="Join us." />

      <section className="bg-[#FAFAF8] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          {events.length === 0 ? (
            <FadeIn>
              <div className="py-20 text-center">
                <p className="text-lg text-[#6B7280]">
                  No events scheduled at the moment. Check back soon for
                  upcoming gatherings.
                </p>
              </div>
            </FadeIn>
          ) : (
            <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => {
                const eventDate = new Date(event.eventDate);
                const isPast = eventDate < new Date();

                return (
                  <StaggerItem key={event.id}>
                    <Link
                      href={`/events/${event.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E5E2DD] bg-white transition-all hover:border-[#D4A853]/40 hover:shadow-lg"
                    >
                      {event.imagePath ? (
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <Image
                            src={event.imagePath}
                            alt={event.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          {isPast && (
                            <div className="absolute top-3 right-3 rounded-full bg-[#4B5563]/90 px-3 py-1 text-xs font-semibold text-white">
                              Past event
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="relative flex aspect-[16/10] items-center justify-center bg-[#1A3D5C]/5">
                          <svg
                            className="h-12 w-12 text-[#1A3D5C]/20"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          {isPast && (
                            <div className="absolute top-3 right-3 rounded-full bg-[#4B5563]/90 px-3 py-1 text-xs font-semibold text-white">
                              Past event
                            </div>
                          )}
                        </div>
                      )}
                      <div className="flex flex-1 flex-col p-6">
                        <div className="flex items-center gap-2 text-sm">
                          <svg
                            className="h-4 w-4 text-[#D4A853]"
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
                          <time className="font-medium text-[#D4A853]">
                            {eventDate.toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </time>
                        </div>

                        <h2 className="font-heading mt-3 text-xl font-bold text-[#1A1A1A] group-hover:text-[#1A3D5C]">
                          {event.title}
                        </h2>

                        {event.venue && (
                          <div className="mt-2 flex items-center gap-2 text-sm text-[#6B7280]">
                            <svg
                              className="h-4 w-4 shrink-0"
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
                            {event.venue}
                          </div>
                        )}

                        {event.shortDesc && (
                          <p className="mt-3 flex-1 text-sm leading-relaxed text-[#4B5563]">
                            {event.shortDesc}
                          </p>
                        )}

                        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#D4A853] transition-colors group-hover:text-[#C49A48]">
                          View details
                          <svg
                            className="h-4 w-4 transition-transform group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </span>
                      </div>
                    </Link>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          )}
        </div>
      </section>
    </main>
  );
}
