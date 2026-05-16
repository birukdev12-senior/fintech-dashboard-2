import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
      optimizeCss: true,
          optimizePackageImports: ["lucide-react", "chart.js", "react-chartjs-2"],
            },
              async headers() {
                  // በልማት ጊዜ CSP አትጨምር፤ ምርት ላይ ብቻ ተግብር
                      if (process.env.NODE_ENV === "production") {
                            return [
                                    {
                                              source: "/(.*)",
                                                        headers: [
                                                                    {
                                                                                  key: "Content-Security-Policy",
                                                                                                value:
                                                                                                                "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self';",
                                                                                                                            },
                                                                                                                                        {
                                                                                                                                                      key: "Cross-Origin-Opener-Policy",
                                                                                                                                                                    value: "same-origin",
                                                                                                                                                                                },
                                                                                                                                                                                          ],
                                                                                                                                                                                                  },
                                                                                                                                                                                                        ];
                                                                                                                                                                                                            }
                                                                                                                                                                                                                // በልማት ላይ ምንም ራስጌ አትጨምር
                                                                                                                                                                                                                    return [];
                                                                                                                                                                                                                      },
                                                                                                                                                                                                                      };

                                                                                                                                                                                                                      export default nextConfig;