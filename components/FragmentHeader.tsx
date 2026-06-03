import { Boxes } from "lucide-react";
import { TopTabs } from "@/components/TopTabs";
import { WalletButton } from "@/components/WalletButton";

export function FragmentHeader() {
  return (
    <header className="app-header">
      <div className="header-inner">
        <div className="brand-row">
          <div className="brand-mark">
            <div className="mark-box" aria-hidden>
              <Boxes size={19} />
            </div>
            <div>
              <h1 className="brand-title">base-split-vault-fragment-collection</h1>
              <p className="brand-subtitle">Fragment Collection Vault</p>
            </div>
          </div>
          <WalletButton />
        </div>
        <TopTabs />
      </div>
    </header>
  );
}
