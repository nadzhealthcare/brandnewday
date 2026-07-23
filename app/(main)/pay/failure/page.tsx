import type { Metadata } from "next";
import Link from "next/link";
import { XCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Payment Failed, NADZ Healthcare",
  robots: { index: false },
};

export default async function PayFailurePage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref } = await searchParams;
  const retry = ref ? `/pay?ref=${encodeURIComponent(ref)}` : "/";

  return (
    <main className="grid min-h-[100svh] place-items-center bg-[color:var(--cream)] px-4 py-10">
      <div className="w-full max-w-[440px] overflow-hidden rounded-[26px] bg-white p-8 text-center shadow-[0_30px_70px_-30px_rgba(43,26,23,0.4)] ring-1 ring-black/5">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-red-500/10 text-red-500">
          <XCircle className="h-9 w-9" />
        </div>
        <h1 className="mt-6 text-[22px] font-semibold text-[#241417]">
          Payment didn&apos;t go through
        </h1>
        <p className="mx-auto mt-4 max-w-xs text-[14.5px] leading-relaxed text-black/55">
          No charge was made. You can try again or choose a different payment
          method.
        </p>
        <Link
          href={retry}
          className="mt-7 inline-flex items-center justify-center rounded-full bg-[color:var(--maroon)] px-7 py-3.5 text-[15px] font-semibold text-white transition-transform hover:-translate-y-0.5"
        >
          Try again
        </Link>
      </div>
    </main>
  );
}
