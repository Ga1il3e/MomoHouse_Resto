import type { Metadata } from "next";
import { MenuPage } from "@/components/MenuPage";
import { menus } from "@/lib/content";

export const metadata: Metadata = {
  title: "Commandes — Poissonnière | Momo House",
  description:
    "La carte de Momo House Poissonnière : jhol momo, chilli momo et golden fried, à déguster sur place.",
};

export default function PoissonniereMenuPage() {
  return <MenuPage menu={menus.poissonniere} />;
}
