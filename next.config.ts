import type { NextConfig } from "next";
import { LEGACY_REDIRECTS } from "./src/lib/redirects";

const nextConfig: NextConfig = {
  // Allow dev-server HMR from LAN IP + Tailscale (Next 16 blocks cross-origin
  // by default; without this, client components can fail to hydrate when the
  // page is accessed via a host other than localhost).
  allowedDevOrigins: [
    "192.168.12.70",
    "100.94.134.53",
    "truenas",
    "truenas.local",
  ],
  async redirects() {
    return LEGACY_REDIRECTS.map(({ source, destination, permanent }) => ({
      source,
      destination,
      permanent,
    }));
  },
};

export default nextConfig;
