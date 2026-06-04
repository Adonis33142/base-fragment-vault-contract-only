import { createClient, http, type EIP1193Provider } from "viem";
import { createConfig } from "wagmi";
import { base } from "wagmi/chains";
import { coinbaseWallet, injected } from "wagmi/connectors";

type InjectedWalletProvider = EIP1193Provider & {
  isOKExWallet?: true;
  isOkxWallet?: true;
  providers?: InjectedWalletProvider[];
};

export const BUILDER_CODE = "bc_a2a4ojtz";
export const BUILDER_CODE_SUFFIX =
  "0x62635f613261346f6a747a0b0080218021802180218021802180218021" as `0x${string}`;
export const HAS_BUILDER_CODE_SUFFIX = BUILDER_CODE_SUFFIX !== "0x";

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    injected({
      target: "metaMask",
      shimDisconnect: true,
      unstable_shimAsyncInject: 700
    }),
    injected({
      target: {
        id: "okxWallet",
        name: "OKX Wallet",
        provider(window) {
          const okxWindow = window as
            | ({
                ethereum?: InjectedWalletProvider;
                okxwallet?: InjectedWalletProvider;
                okxWallet?: InjectedWalletProvider;
              } & Window)
            | undefined;
          if (!okxWindow) {
            return undefined;
          }

          const directProvider = okxWindow.okxwallet ?? okxWindow.okxWallet;

          if (directProvider) {
            return directProvider;
          }

          const ethereum = okxWindow.ethereum;
          const providers: InjectedWalletProvider[] = ethereum?.providers ?? (ethereum ? [ethereum] : []);

          return providers.find((provider) => provider.isOkxWallet || provider.isOKExWallet);
        }
      },
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
