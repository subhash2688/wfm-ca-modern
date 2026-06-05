"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface PageHeroProps {
  label: string;
  title: string;
  subtitle?: string;
  imageSrc?: string;
}

export function PageHero({ label, title, subtitle, imageSrc }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#1A3D5C] pt-32 pb-20 md:pt-40 md:pb-28">
      {imageSrc && (
        <>
          <Image
            src={imageSrc}
            alt=""
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A3D5C] via-[#1A3D5C]/80 to-[#1A3D5C]/60" />
        </>
      )}
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-sm font-semibold tracking-[0.2em] text-[#D4A853] uppercase"
        >
          {label}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-heading mt-4 text-4xl font-bold text-white md:text-6xl lg:text-7xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60 md:text-xl"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
