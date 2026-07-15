import SectionTitle from "./SectionTitle";

export default function LegalShell({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white">
      <section
        className="relative overflow-hidden px-4 pb-12 pt-28 text-center sm:px-6 sm:pb-14 sm:pt-36"
        style={{ backgroundImage: "linear-gradient(135deg,#3d1622,#611f2e)" }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_0%,rgba(160,26,38,0.35),transparent_60%)]" />
        <div className="relative">
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-white/50">
            Legal
          </p>
          <SectionTitle
            as="h1"
            className="mt-4 text-[2rem] leading-[1.08] text-white sm:text-[2.8rem]"
          >
            {title}
          </SectionTitle>
          <p className="mt-4 text-[13.5px] text-white/55">
            Last updated: {updated}
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="article-body mx-auto max-w-[780px]">{children}</div>
      </section>
    </div>
  );
}
