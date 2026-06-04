"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Plug, Unplug, Wallet } from "lucide-react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { base } from "wagmi/chains";

function shortAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function isBaseAppBrowser() {
  if (typeof window === "undefined") {
    return false;
  }

  const userAgent = window.navigator.userAgent.toLowerCase();
  const ethereum = window.ethereum as
    | {
        isCoinbaseWallet?: boolean;
        isBaseWallet?: boolean;
      }
    | undefined;

  return Boolean(
    ethereum?.isCoinbaseWallet ||
      ethereum?.isBaseWallet ||
      userAgent.includes("base") ||
      userAgent.includes("coinbasewallet")
  );
}

export function WalletButton() {
  const { address, connector: activeConnector, isConnected } = useAccount();
  const { connectors, connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const [isOpen, setIsOpen] = useState(false);
  const autoConnectAttempted = useRef(false);

  const walletOptions = useMemo(
    () =>
      connectors
        .filter((connector, index, allConnectors) => allConnectors.findIndex((item) => item.uid === connector.uid) === index)
        .map((connector) => ({
          connector,
          label:
            connector.id === "metaMask"
              ? "MetaMask"
              : connector.id === "okxWallet"
                ? "OKX Wallet"
                : connector.name
        })),
    [connectors]
  );

  useEffect(() => {
    if (autoConnectAttempted.current || isConnected || !isBaseAppBrowser()) {
      return;
    }

    autoConnectAttempted.current = true;

    if (window.localStorage.getItem("fragment-wallet-manual-disconnect") === "true") {
      return;
    }

    const injectedConnector = connectors.find((connector) => connector.id === "coinbaseWalletSDK");

    if (injectedConnector) {
      connect({ connector: injectedConnector, chainId: base.id });
    }
  }, [connect, connectors, isConnected]);

  if (isConnected && address) {
    return (
      <div className="wallet-menu">
        <button
          className="wallet-button connected"
          type="button"
          onClick={() => {
            window.localStorage.setItem("fragment-wallet-manual-disconnect", "true");
            disconnect();
          }}
        >
          <Unplug size={16} aria-hidden />
          <span>{shortAddress(address)}</span>
          <span className="wallet-name">{activeConnector?.name ?? "Connected"}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="wallet-menu">
      <button className="wallet-button" type="button" onClick={() => setIsOpen((current) => !current)}>
        <Plug size={16} aria-hidden />
        {isPending ? "Connecting" : "Connect Wallet"}
        <ChevronDown size={15} aria-hidden />
      </button>
      {isOpen ? (
        <div className="wallet-options" role="menu" aria-label="Wallet options">
          {walletOptions.map(({ connector, label }) => (
            <button
              key={connector.uid}
              type="button"
              role="menuitem"
              onClick={() => {
                window.localStorage.removeItem("fragment-wallet-manual-disconnect");
                connect({ connector, chainId: base.id });
                setIsOpen(false);
              }}
              disabled={isPending}
            >
              <Wallet size={16} aria-hidden />
              <span>{label}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
