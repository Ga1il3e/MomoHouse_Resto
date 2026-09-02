import type { Metadata } from "next";
import { MenuPage } from "@/components/MenuPage";
import { menus } from "@/lib/content";

export const metadata: Metadata = {
  title: "La Carte — Montmartre | Momo House",
  description:
    "La carte de Momo House Montmartre : jhol momo, kothe momo et momos vapeur préparés à la main.",
};

export default function MontmartreMenuPage() {
  return <MenuPage menu={menus.montmartre} />;
}
