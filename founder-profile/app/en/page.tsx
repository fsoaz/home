import type { Metadata } from "next";
import Profile from "@/components/Profile";
import { homeCopy } from "@/content/home";

const copy = homeCopy["en-US"];
export const metadata: Metadata = {
  title: copy.title, description: copy.description,
  authors: [{ name: "Francisco Micael" }],
  openGraph: { title: copy.title, description: copy.description, type: "profile", locale: "en_US" },
};

export default function Page() { return <Profile locale="en-US" />; }
