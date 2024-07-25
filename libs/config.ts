import { http, createConfig } from "@wagmi/core";
import { type Chain } from "viem";

const neox = {
  id: 12227332,
  name: "NeoX",

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

export const config = createConfig({
  chains: [neox],
  transports: {
    [neox.id]: http(),
  },
});
