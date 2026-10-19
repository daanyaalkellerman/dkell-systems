import { defineConfig, devices } from '@playwright/test'
const channel = process.env.CI ? undefined : 'msedge'
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  workers: 1,
  timeout: 45000,
  use: { baseURL: 'http://127.0.0.1:3100', channel, trace: 'retain-on-failure' },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 1000 }, channel },
    },
    { name: 'tablet', use: { viewport: { width: 768, height: 1180 }, channel } },
    { name: 'mobile', use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium', channel } },
  ],
  webServer: {
    command: 'node scripts/preview.mjs --port 3100',
    url: 'http://127.0.0.1:3100',
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
})
