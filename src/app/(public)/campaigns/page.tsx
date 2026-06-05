import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { serverTRPC } from "@/lib/trpc/server";
import { PageHero } from "@/components/layout/PageHero";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "Campaigns",
  description:
    "Support our active fundraising campaigns to feed students across America.",
};

export default async function CampaignsPage() {
  const trpc = await serverTRPC();
  const campaigns = await trpc.campaign.list();

  return (
    <main>
      <PageHero label="Campaigns" title="Fund a cause." />

      <section className="bg-[#FAFAF8] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          {campaigns.length === 0 ? (
            <FadeIn>
              <div className="py-20 text-center">
                <p className="text-lg text-[#6B7280]">
                  No active campaigns at the moment. Check back soon or{" "}
                  <Link
                    href="/donate"
                    className="font-semibold text-[#D4A853] hover:underline"
                  >
                    make a general donation
                  </Link>
                  .
                </p>
              </div>
            </FadeIn>
          ) : (
            <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {campaigns.map((campaign) => {
                const goal = Number(campaign.goalAmount);
                const raised = Number(campaign.raisedAmount);
                const percentage =
                  goal > 0 ? Math.min(Math.round((raised / goal) * 100), 100) : 0;

                return (
                  <StaggerItem key={campaign.id}>
                    <Link
                      href={`/campaigns/${campaign.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E5E2DD] bg-white transition-all hover:border-[#D4A853]/40 hover:shadow-lg"
                    >
                      {campaign.imagePath ? (
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <Image
                            src={campaign.imagePath}
                            alt={campaign.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      ) : (
                        <div className="flex aspect-[16/10] items-center justify-center bg-[#1A3D5C]/5">
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
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                        </div>
                      )}
                      <div className="flex flex-1 flex-col p-6">
                        <h2 className="font-heading text-xl font-bold text-[#1A1A1A] group-hover:text-[#1A3D5C]">
                          {campaign.name}
                        </h2>

                        {campaign.description && (
                          <p className="mt-3 flex-1 text-sm leading-relaxed text-[#4B5563] line-clamp-3">
                            {campaign.description}
                          </p>
                        )}

                        {/* Progress bar */}
                        <div className="mt-6">
                          <div className="flex items-baseline justify-between text-sm">
                            <span className="font-bold text-[#1A3D5C]">
                              ${raised.toLocaleString()}
                            </span>
                            <span className="text-[#6B7280]">
                              of ${goal.toLocaleString()} goal
                            </span>
                          </div>
                          <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#E5E2DD]">
                            <div
                              className="h-full rounded-full bg-[#D4A853] transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <p className="mt-1.5 text-right text-xs font-medium text-[#6B7280]">
                            {percentage}% funded
                          </p>
                        </div>

                        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#D4A853] transition-colors group-hover:text-[#C49A48]">
                          Support this cause
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
