import { defineConfig } from "@playwright/test";

const frontendUrl = process.env.E2E_FRONTEND_URL ?? "http://localhost:3000";
const backendUrl = process.env.E2E_BACKEND_URL ?? "http://localhost:4000";

export default defineConfig({
  testDir: "./src/tests/e2e",
  use: {
    baseURL: frontendUrl,
  },
  webServer: [
    {
      command: "npm run dev -- --host --port 3000",
      url: frontendUrl,
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
    {
      command: "npm run dev",
      url: backendUrl,
      reuseExistingServer: !process.env.CI,
      cwd: "../backend",
      env: {
        PORT: "4000",
      },
      timeout: 120_000,
    },
  ],
});
