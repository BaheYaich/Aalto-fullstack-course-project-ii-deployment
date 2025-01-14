import { test, expect } from '@playwright/test';

test.describe('Questions Page', () => {
  test('should display questions for a topic', async ({ page }) => {
    await page.goto('/topics/1/questions');
    await page.waitForLoadState('networkidle');
    
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Questions');
    await expect(page.locator('form[action="?/addQuestion"]')).toBeVisible();
  });

  test('has working question form', async ({ page }) => {
    await page.goto('/topics/1/questions');
    await page.waitForLoadState('networkidle');
    
    await expect(page.locator('input[name="question_text"]')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add Question' })).toBeEnabled();
  });
}); 