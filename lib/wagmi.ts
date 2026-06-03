import { createClient, http } from "viem";
import { createConfig } from "wagmi";
import { base } from "wagmi/chains";
import { coinbaseWallet, injected } from "wagmi/connectors";

// TODO: Replace this value after Base.dev verification.
export const BUILDER_CODE_SUFFIX = "0x" as `0x${string}`;
export const HAS_BUILDER_CODE_SUFFIX = BUILDER_CODE_SUFFIX !== "0x";

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    injected({
      shimDisconnect: true,
      unstable_shimAsyncInject: 700
    }),
    coinbaseWallet({
      appName: "Base Split Vault Fragment Collection",
      preference: "all",
      version: "4"
    })
  ],
  multiInjectedProviderDiscovery: true,
  client({ chain }) {
    return createClient({
      chain,
      dataSuffix: HAS_BUILDER_CODE_SUFFIX ? BUILDER_CODE_SUFFIX : undefined,
      transport: http()
    });
  },
  ssr: true
});
