const { test, expect } = require("@playwright/test");

async function waitForPageLoad(page, url) {
  let retries = 5; // Number of retries
  let delay = 10000; // Delay between retries in milliseconds (10000 because of the limited docker resources)

  while (retries > 0) {
    try {
      await page.goto(url, { waitUntil: "domcontentloaded" }); // Wait for the page to load
      await page.waitForSelector("main", { state: "visible" }); // Wait for a specific element
      return; // Break out of the function if successful
    } catch (error) {
      console.log(`Retrying... (${retries} left)`);
      await page.waitForTimeout(delay); // Wait before retrying
      retries--;
    }
  }

  throw new Error(`Failed to load the page: ${url}`);
}

const listName = "Playwright sample shopping list";
const itemName = "Playwright sample shopping item";

test.describe("Shopping Lists Tests", () => {
  // This will run before each test
  test.beforeEach(async ({ page }) => {
    await page.goto("/lists");
    await waitForPageLoad(page, "/lists");
  });

  test("Lists can be added and displayed.", async ({ page }) => {
    await page.locator("input[type=text]").type(listName);
    await page.locator('input[type=submit][value="Create"]').click({
      timeout: 1000,
    });
    await expect(page.getByRole("link", { name: `${listName}` }).first())
      .toBeVisible();
  });

  test("Lists can be clicked and accessed.", async ({ page }) => {
    await page.getByRole("link", { name: `${listName}` }).first().click({
      timeout: 1000,
    });
    await expect(page.locator("h1")).toHaveText(listName);
  });
});

test.describe("Shopping List Items Tests", () => {
  // This will run before each test
  test.beforeEach(async ({ page }) => {
    await waitForPageLoad(page, "/lists/1");
  });

  test("Items can be added to a list and displayed", async ({ page }) => {
    await waitForPageLoad(page, "/lists/1");
    await page.goto("/lists/1");
    await page.locator("input[type=text]").type(itemName);
    await page.locator('input[type=submit][value="Add item!"]').click({
      timeout: 1000,
    });
    const innerText = await page.locator(".list-items > ul > li").first()
      .innerText();
    await expect(innerText).toBe(itemName);
  });

  test("Items in an active list can be marked as collected", async ({ page }) => {
    await waitForPageLoad(page, "/lists/1");
    await page.goto("/lists/1");
    // Locate the first item element
    const firstItem = await page.locator(".list-items > ul > li").first();
    // Locate the form element in the first item element
    const firstItemForm = await firstItem.locator("form");
    // Saving the action value of the form to track it as it moves after the input click
    const actionValue = await firstItemForm.getAttribute("action");

    // Checking the input value to see if it matches the state we want
    let inputValue = await firstItemForm.locator('input[type="submit"]')
      .inputValue(); // Check the input value directly
    await expect(inputValue).toBe("Mark collected!");

    await firstItemForm.locator('input[type="submit"]').click({
      timeout: 1000,
    });

    // Locating the same listitem and form we were just using since it has moved in the page
    const formLocator = page.locator(`form[action="${actionValue}"]`);

    // Checking that the states have changed successfully
    inputValue = await formLocator.locator('input[type="submit"]').inputValue();
    await expect(inputValue).toBe("Restore!");
  });
});

test("Shopping lists can be deactivated and are not displayed", async ({ page }) => {
  await page.goto("/lists");
  await waitForPageLoad(page, "/lists");

  // Locating the first list and its respective form
  const firstList = await page.locator(".active-lists > ul > li").first();
  const firstListForm = await firstList.locator("form");

  // Storing the action value of the form we are about to click to track its whereabouts
  const actionValue = await firstListForm.getAttribute("action");

  // Finding the Deactivate list! button and clicking it
  const formLocator = page.locator(`form[action="${actionValue}"]`);
  await firstListForm.locator('input[type="submit"]').click({
    timeout: 1000,
  });

  // We check if the button has disappeared meaning the list has disappeared from the unordered list
  await expect(formLocator.locator('input[type="submit"]')).not.toBeVisible();
});
