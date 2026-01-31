import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./src/tests/e2e",
  use: {
    baseURL: "http://localhost:3000",
  },
  webServer: [
    {
      command: "npm run dev -- --host --port 3000",
      url: "http://localhost:3000",
      reuseExistingServer: !process.env.CI,
    },
    {
      command: "npm run dev -- --host --port 4000",
      url: "http://localhost:4000",
      reuseExistingServer: !process.env.CI,
      cwd: "../backend",
    },
  ],
});
