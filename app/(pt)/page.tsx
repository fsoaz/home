import type { Metadata } from "next";
import Profile from "@/components/Profile";
import { homeCopy } from "@/content/home";

const copy = homeCopy["pt-BR"];
export const metadata: Metadata = {
  metadataBase: new URL("https://fsoaz.github.io/home/"),
  alternates: { canonical: "https://fsoaz.github.io/home/", languages: { "pt-BR": "https://fsoaz.github.io/home/", "en-US": "https://fsoaz.github.io/home/en/" } },
  icons: { icon: "/home/favicon.svg" },
  title: copy.title, description: copy.description,
  authors: [{ name: "Francisco Micael" }],
  openGraph: { title: copy.title, description: copy.description, type: "profile", url: "https://fsoaz.github.io/home/", locale: "pt_BR" },
};

export default function Page() { return <Profile locale="pt-BR" />; }
