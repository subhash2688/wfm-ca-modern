import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { serverTRPC } from "@/lib/trpc/server";
import { FadeIn } from "@/components/ui/motion";

interface CampaignDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: CampaignDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const trpc = await serverTRPC();
  const campaign = await trpc.campaign.getBySlug({ slug });

  if (!campaign) {
    return { title: "Campaign Not Found" };
  }

  return {
    title: campaign.name,
    description: campaign.description || undefined,
  };
}

export default async function CampaignDetailPage({
  params,
}: CampaignDetailProps) {
  const { slug } = await params;
  const trpc = await serverTRPC();
  const campaign = await trpc.campaign.getBySlug({ slug });

  if (!campaign) {
    notFound();
  }

  const goal = Number(campaign.goalAmount);
  const raised = Number(campaign.raisedAmount);
  const percentage =
    goal > 0 ? Math.min(Math.round((raised / goal) * 100), 100) : 0;

  return (
    <main>
      {/* Hero image */}
      {campaign.imagePath && (
        <div className="relative h-[40vh] min-h-[320px] md:h-[50vh]">
          <Image
            src={campaign.imagePath}
            alt={campaign.name}
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
              href="/campaigns"
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
              Back to Campaigns
            </Link>

            <h1 className="font-heading mt-8 text-3xl font-bold text-[#1A1A1A] md:text-5xl">
              {campaign.name}
            </h1>

            {/* Date range */}
            {(campaign.startDate || campaign.endDate) && (
              <div className="mt-4 flex items-center gap-2 text-sm text-[#6B7280]">
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {campaign.startDate && (
                  <span>
                    {new Date(campaign.startDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                )}
                {campaign.startDate && campaign.endDate && (
                  <span>&mdash;</span>
                )}
                {campaign.endDate && (
                  <span>
                    {new Date(campaign.endDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                )}
              </div>
            )}

            {/* Progress card */}
            <div className="mt-10 rounded-2xl border border-[#E5E2DD] bg-white p-8">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm font-medium text-[#6B7280] uppercase">
                    Raised
                  </p>
                  <p className="font-heading text-4xl font-bold text-[#1A3D5C]">
                    ${raised.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-[#6B7280] uppercase">
                    Goal
                  </p>
                  <p className="font-heading text-2xl font-bold text-[#1A1A1A]">
                    ${goal.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="mt-6 h-4 overflow-hidden rounded-full bg-[#E5E2DD]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#D4A853] to-[#E4B863] transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <p className="mt-2 text-center text-sm font-semibold text-[#4B5563]">
                {percentage}% of goal reached
              </p>

              <div className="mt-6 text-center">
                <Link
                  href="/donate"
                  className="inline-flex items-center gap-2 rounded-full bg-[#D4A853] px-10 py-4 text-base font-bold text-[#1A3D5C] transition-all hover:bg-[#C49A48] hover:shadow-xl hover:shadow-[#D4A853]/20"
                >
                  Donate to this campaign
                </Link>
              </div>
            </div>

            {campaign.description && (
              <div
                dangerouslySetInnerHTML={{ __html: campaign.description }}
                className="prose prose-lg mt-10 max-w-none prose-headings:font-heading prose-headings:text-[#1A1A1A] prose-p:text-[#4B5563] prose-a:text-[#D4A853] prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl"
              />
            )}
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
