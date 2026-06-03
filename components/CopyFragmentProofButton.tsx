"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyFragmentProofButton({ proofHash }: { proofHash: string }) {
  const [copied, setCopied] = useState(false);

  async function copyProof() {
    await navigator.clipboard.writeText(proofHash);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <button className="copy-button" type="button" onClick={copyProof}>
      {copied ? <Check size={15} aria-hidden /> : <Copy size={15} aria-hidden />}
      {copied ? "Copied" : "Copy Proof"}
    </button>
  );
}
