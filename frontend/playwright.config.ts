import { defineConfig } from "@playwright/test";

const frontendUrl = process.env.E2E_FRONTEND_URL ?? "http://localhost:3000";
const backendUrl = process.env.E2E_BACKEND_URL ?? "http://localhost:4000";

const normalizeBaseUrl = (url: string) =>
  url.endsWith("/") ? url.slice(0, -1) : url;
const backendHealthUrl = `${normalizeBaseUrl(backendUrl)}/health`;

const shouldSkipWebServer = process.env.E2E_SKIP_WEB_SERVER === "true";

const webServerConfig = [
  {
    command: "npm run dev -- --host --port 3000",
    url: frontendUrl,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  {
    command: "npm run dev",
    url: backendHealthUrl,
    reuseExistingServer: !process.env.CI,
    cwd: "../backend",
    env: {
      PORT: "4000",
    },
    timeout: 120_000,
  },
];

export default defineConfig({
  testDir: "./src/tests/e2e",
  use: {
    baseURL: frontendUrl,
  },
  webServer: shouldSkipWebServer ? [] : webServerConfig,
});
