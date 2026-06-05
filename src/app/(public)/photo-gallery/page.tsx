import type { Metadata } from "next";
import Image from "next/image";
import { serverTRPC } from "@/lib/trpc/server";
import { PageHero } from "@/components/layout/PageHero";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description:
    "See the impact of the World Food Movement through our photo galleries.",
};

export default async function PhotoGalleryPage() {
  const trpc = await serverTRPC();
  const galleries = await trpc.gallery.list();

  return (
    <main>
      <PageHero label="Gallery" title="See the impact." />

      <section className="bg-[#FAFAF8] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          {galleries.length === 0 ? (
            <FadeIn>
              <div className="py-20 text-center">
                <p className="text-lg text-[#6B7280]">
                  No photo galleries yet. Check back soon to see the impact.
                </p>
              </div>
            </FadeIn>
          ) : (
            <div className="space-y-20">
              {galleries.map((gallery) => (
                <FadeIn key={gallery.id}>
                  <div>
                    {/* Gallery header */}
                    <div className="mb-8">
                      <h2 className="font-heading text-3xl font-bold text-[#1A1A1A] md:text-4xl">
                        {gallery.title}
                      </h2>
                      {gallery.description && (
                        <p className="mt-3 max-w-2xl text-lg text-[#4B5563]">
                          {gallery.description}
                        </p>
                      )}
                    </div>

                    {/* Gallery images grid */}
                    {gallery.images.length === 0 ? (
                      <div className="rounded-2xl border border-[#E5E2DD] bg-white py-12 text-center">
                        <p className="text-[#6B7280]">
                          No images in this gallery yet.
                        </p>
                      </div>
                    ) : (
                      <StaggerContainer className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {gallery.images.map((image) => (
                          <StaggerItem key={image.id}>
                            <div className="group relative aspect-square overflow-hidden rounded-xl border border-[#E5E2DD]">
                              <Image
                                src={image.imagePath}
                                alt={image.altText || gallery.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              {image.caption && (
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                  <p className="text-sm text-white">
                                    {image.caption}
                                  </p>
                                </div>
                              )}
                            </div>
                          </StaggerItem>
                        ))}
                      </StaggerContainer>
                    )}
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
