import { test, expect } from '@playwright/test';

test.describe('Topics Page', () => {
  test('should display topics list', async ({ page }) => {
    await page.goto('/topics');
    await page.waitForLoadState('networkidle');

    // Check for topic grid using more specific selector
    await expect(page.locator('.grid.grid-cols-1.sm\\:grid-cols-2')).toBeVisible();
    
    const expectedTopics = ['Science', 'Video Games', 'Music', 'Geography', 'Comedy', 'Philosophy'];
    for (const topic of expectedTopics) {
      await expect(page.getByText(topic)).toBeVisible();
    }
  });

  test('admin can add new topic', async ({ page }) => {
    await page.goto('/topics');
    await page.waitForLoadState('networkidle');
    
    const newTopic = 'Test Topic ' + Date.now();
    await page.locator('input[name="name"]').fill(newTopic);
    await page.getByRole('button', { name: /add topic/i }).click();
    await expect(page.getByText(newTopic)).toBeVisible();
  });

  test('admin can delete topic', async ({ page }) => {
    await page.goto('/topics');
    await page.waitForLoadState('networkidle');
    
    const topicToDelete = 'Delete Me ' + Date.now();
    await page.locator('input[name="name"]').fill(topicToDelete);
    await page.getByRole('button', { name: /add topic/i }).click();
    await page.waitForLoadState('networkidle');
    
    const deleteButton = page.locator(`.topic-card:has-text("${topicToDelete}") button[type="submit"]`);
    await deleteButton.click();
    await page.waitForLoadState('networkidle');
    
    await expect(page.locator('.topic-card', { hasText: topicToDelete })).not.toBeVisible();
  });
}); 