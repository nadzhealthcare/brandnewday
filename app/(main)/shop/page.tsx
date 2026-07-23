import type { Metadata } from "next";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import ShopClient from "@/components/ShopClient";

export const metadata: Metadata = {
  title: "Book Services & Packages, NADZ Healthcare",
  description:
    "Browse NADZ Healthcare home services and annual packages, add them to your cart and check out securely.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return (
    <>
      <TopBar />
      <div className="relative">
        <Navbar />
        <main className="flex-1">
          <section className="bg-[#faf8f5] px-4 pb-2 pt-28 sm:px-6 sm:pt-32">
            <div className="mx-auto max-w-[1180px]">
              <h1 className="font-title text-[2rem] uppercase leading-[1.05] text-[color:var(--maroon)] sm:text-[2.8rem]">
                Services &amp; Packages
              </h1>
              <p className="mt-3 max-w-xl text-[15.5px] text-black/55">
                Add what you need to your cart and check out securely. Care is
                delivered at your home, hotel or office across Dubai.
              </p>
            </div>
          </section>
          <ShopClient />
        </main>
      </div>
    </>
  );
}
