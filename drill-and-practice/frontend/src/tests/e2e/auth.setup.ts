import { chromium, type FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    baseURL: 'http://localhost:5174'
  });
  
  await page.goto('/auth/login');
  await page.waitForLoadState('networkidle');
  await page.fill('input[name="email"]', 'admin@admin.com');
  await page.fill('input[name="password"]', '123456');
  await page.click('button[type="submit"]');
  await page.waitForURL('/**');

  // Store signed-in state
  await page.context().storageState({ path: 'playwright/.auth/admin.json' });
  await browser.close();
}

export { globalSetup as default }; 