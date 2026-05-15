import type { Metadata } from "next";
import { SplitShell } from "@/components/split-shell";

export const metadata: Metadata = {
  title: "Selected Work",
  description: "Selected work by Gabriel Demargne.",
};

export default function SelectedWorkPage() {
  return (
    <SplitShell activePath="/selected-work" rightTitle="Selected Work">
      <div className="right-content">
        <div className="placeholder-copy">
          <p>Selected work content to be developed.</p>
        </div>
      </div>
    </SplitShell>
  );
}
