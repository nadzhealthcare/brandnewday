import type { Metadata } from "next";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import CartClient from "@/components/CartClient";

export const metadata: Metadata = {
  title: "Your Cart, NADZ Healthcare",
  alternates: { canonical: "/cart" },
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <>
      <TopBar />
      <div className="relative">
        <Navbar />
        <main className="flex-1 bg-[#faf8f5] pt-24 sm:pt-28">
          <CartClient />
        </main>
      </div>
    </>
  );
}
