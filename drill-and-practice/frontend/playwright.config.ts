/// <reference types="vitest" />
import type { PlaywrightTestConfig } from '@playwright/test';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: PlaywrightTestConfig = {
  testDir: 'src/tests/e2e',
  testMatch: /(.+\.)?(test|spec)\.[jt]s/,
  timeout: 120000,
  expect: {
    timeout: 20000
  },
  use: {
    baseURL: 'http://localhost:5174',
    actionTimeout: 20000,
    navigationTimeout: 30000,
    storageState: 'playwright/.auth/admin.json'
  },
  webServer: {
    command: 'npm run build && npm run preview',
    port: 5174,
    reuseExistingServer: !process.env.CI,
    timeout: 120000
  },
  globalSetup: './src/tests/e2e/auth.setup.ts'
};

export default config; 