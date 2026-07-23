import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopBar />
      <div className="relative">
        <Navbar />
        <main className="flex-1 -mt-20 sm:-mt-[84px] lg:-mt-[88px]">
          {children}
        </main>
      </div>
    </>
  );
}
