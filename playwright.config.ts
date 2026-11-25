import { defineConfig } from '@playwright/test'

const baseURL = process.env.EH_TEST_URL || 'http://127.0.0.1:4173'
export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.e2e.ts',
  workers: 2,
  use: { baseURL, browserName: 'chromium', trace: 'retain-on-failure',
    launchOptions: { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH } },
  webServer: process.env.EH_TEST_URL ? undefined : { command: 'node scripts/serve.mjs', url: baseURL, reuseExistingServer: true },
})
