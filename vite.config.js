import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "https://api.coingecko.com",
    },
  },
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "Bit-Map",
        short_name: "Bit-Map",
        theme_color: "#000000",
        background_color: "#000000",
        display: "standalone",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "/maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /favicon-32x32\.png$/, // Regular expression for the URL pattern
            handler: "CacheFirst",
            options: {
              cacheName: "favicon",
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /bg-6846ebaa\.jpg$/, // Regular expression for the URL pattern
            handler: "CacheFirst",
            options: {
              cacheName: "bg",
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /.*\.(?:js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2)$/, // Match other common assets
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "assets",
            },
          },
          {
            urlPattern:
              /https:\/\/api\.coingecko\.com\/api\/v3\/coins\/markets\?vs_currency=INR&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "coinData1",
            },
          },
          {
            urlPattern:
              /https:\/\/api\.coingecko\.com\/api\/v3\/coins\/markets\?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "coinData2",
            },
          },
        ],
      },
    }),
  ],
});
