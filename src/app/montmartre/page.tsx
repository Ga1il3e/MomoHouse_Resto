import type { Metadata } from "next";
import { BranchPage } from "@/components/BranchPage";

export const metadata: Metadata = {
  title: "Montmartre | Momo House",
  description:
    "Momo House Montmartre, 85 Rue Montmartre, 75002 Paris. Horaires, avis Google, métro Sentier et réservation.",
};

export default function MontmartrePage() {
  return <BranchPage branchId="montmartre" />;
}
