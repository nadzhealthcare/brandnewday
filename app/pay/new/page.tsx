import type { Metadata } from "next";
import NewLinkClient from "./NewLinkClient";

export const metadata: Metadata = {
  title: "Create Payment Link — NADZ",
  robots: { index: false },
};

export default function NewPayLinkPage() {
  return <NewLinkClient />;
}
