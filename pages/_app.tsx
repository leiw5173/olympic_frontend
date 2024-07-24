import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultConfig,
  RainbowKitProvider,
  Chain,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const neox = {
  id: 12227332,
  name: "NeoX",

  iconUrl: "/neox.png",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "GAS",
    symbol: "GAS",
  },
  rpcUrls: {
    default: { http: ["https://neoxt4seed1.ngd.network"] },
  },
  blockExplorers: {
    default: { name: "NeoXScan", url: "https://xt4scan.ngd.network/" },
  },
} as const satisfies Chain;

const config = getDefaultConfig({
  appName: "Olympic Guess-a-thon",
  projectId: process.env.PUBLIC_NEXT_PROJECT_ID || "PROJECT_ID",
  chains: [neox],
  ssr: true,
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider locale="en-US">
          <Component {...pageProps} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
