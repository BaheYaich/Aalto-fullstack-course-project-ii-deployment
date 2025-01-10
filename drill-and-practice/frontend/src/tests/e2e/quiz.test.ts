import { test, expect } from '@playwright/test';

test.describe('Quiz Page', () => {
  test('displays available quiz topics', async ({ page }) => {
    await page.goto('/quiz');
    await page.waitForLoadState('networkidle');
    
    await expect(page.getByRole('heading', { name: 'Quiz Topics' })).toBeVisible();
    const topicCount = await page.locator('.topic-card').count();
    expect(topicCount).toBeGreaterThan(0);
  });

  test('shows empty topic message', async ({ page }) => {
    // First create a new topic
    await page.goto('/topics');
    await page.waitForLoadState('networkidle');
    
    const newTopic = 'Empty Quiz Topic ' + Date.now();
    await page.locator('input[name="name"]').fill(newTopic);
    await page.getByRole('button', { name: /add topic/i }).click();
    await page.waitForLoadState('networkidle');

    // Find and click the newly created topic card in quiz page
    await page.goto('/quiz');
    await page.waitForLoadState('networkidle');
    await page.locator('.topic-card', { hasText: newTopic }).click();
    
    // Check for empty topic message
    await expect(page.getByText('No Questions Available')).toBeVisible();
    await expect(page.getByText("This topic doesn't have any questions yet")).toBeVisible();
  });

  test('can start a quiz', async ({ page }) => {
    await page.goto('/quiz/1');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('.modal')).toBeVisible();
  });
}); 