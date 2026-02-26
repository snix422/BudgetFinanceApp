import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    /* Tutaj wpisz port, na którym działa Twój React (np. 5173 dla Vite) */
    baseURL: 'http://localhost:5173',

    /* Nagrywaj ślad przy każdym błędzie (bardzo pomaga na początku) */
    trace: 'retain-on-failure',
    video: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    /*{
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },*/
  ],

  /* Automatyczne odpalanie serwera przed testami */
  webServer: {
    command: 'npm run dev', // Komenda, której używasz do startu projektu
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000, // Daj mu 2 minuty na wstanie (przydatne na wolniejszych maszynach)
  },
});
