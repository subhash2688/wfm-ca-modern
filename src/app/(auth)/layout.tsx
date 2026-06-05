import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAF8]">
      <header className="border-b border-[#E5E2DD] bg-white px-6 py-4">
        <div className="mx-auto max-w-7xl">
          <Link href="/">
            <Image
              src="/images/logos/wfm-logo.webp"
              alt="World Food Movement"
              width={160}
              height={54}
              className="h-10 w-auto"
              priority
            />
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-6 py-12">
        {children}
      </main>

      <footer className="px-6 py-5 text-center text-sm text-[#9CA3AF]">
        <Link href="/privacy-policy" className="transition-colors hover:text-[#1A3D5C]">
          Privacy Policy
        </Link>
        <span className="mx-2">·</span>
        <Link href="/terms" className="transition-colors hover:text-[#1A3D5C]">
          Terms of Service
        </Link>
      </footer>
    </div>
  );
}
