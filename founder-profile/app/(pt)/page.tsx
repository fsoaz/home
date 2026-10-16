import type { Metadata } from "next";
import Profile from "@/components/Profile";
import { homeCopy } from "@/content/home";

const copy = homeCopy["pt-BR"];
export const metadata: Metadata = {
  title: copy.title, description: copy.description,
  authors: [{ name: "Francisco Micael" }],
  openGraph: { title: copy.title, description: copy.description, type: "profile", locale: "pt_BR" },
};

export default function Page() { return <Profile locale="pt-BR" />; }
