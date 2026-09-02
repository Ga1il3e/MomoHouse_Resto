import type { Metadata } from "next";
import { BranchPage } from "@/components/BranchPage";

export const metadata: Metadata = {
  title: "Poissonnière | Momo House",
  description:
    "Momo House Poissonnière, 46 Rue Poissonnière, 75010 Paris. Horaires, avis Google, métro Poissonnière et réservation.",
};

export default function PoissonnierePage() {
  return <BranchPage branchId="poissonniere" />;
}
