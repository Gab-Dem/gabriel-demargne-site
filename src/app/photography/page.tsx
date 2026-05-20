import type { Metadata } from "next";
import { SplitShell } from "@/components/split-shell";

export const metadata: Metadata = {
  title: "Photography",
  description: "Photography by Gabriel Demargne.",
};

export default function PhotographyPage() {
  return (
    <SplitShell rightTitle="Photography" mobileMode="detail">
      <div className="right-content">
        <div className="placeholder-copy">
          <p>Photography content to be developed.</p>
        </div>
      </div>
    </SplitShell>
  );
}
