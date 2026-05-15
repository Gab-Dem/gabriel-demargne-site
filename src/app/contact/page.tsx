import type { Metadata } from "next";
import { SplitShell } from "@/components/split-shell";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Gabriel Demargne.",
};

export default function ContactPage() {
  return (
    <SplitShell activePath="/contact" rightTitle="Contact">
      <div className="right-content">
        <div className="placeholder-copy">
          <p>Contact content to be developed.</p>
        </div>
      </div>
    </SplitShell>
  );
}
