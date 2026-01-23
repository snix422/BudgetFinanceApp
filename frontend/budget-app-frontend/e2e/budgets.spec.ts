import test, { expect } from '@playwright/test';

test.describe('Budgets Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Zaloguj się' }).click();
    await page.getByLabel('Adres e-mail').fill('user5@gmail.com');
    await page.getByLabel('Hasło').fill('Test123!');
    await page.getByRole('button', { name: 'Zaloguj się' }).click();
    expect(page).toHaveURL('http://localhost:3000/dashboard');
    await page.getByRole('link', { name: 'Budżety' }).click();
    expect(page).toHaveURL('http://localhost:3000/budgets');
  });

  test('should create a new budget', async ({ page }) => {
    const budgetName = `Budżet ${Math.floor(Math.random() * 1000)}`;
    await page.getByRole('button', { name: budgetName }).click();
    await page.getByLabel('Title').fill('Mój nowy budżet');
    await page.getByLabel('Start date').fill('2025-03-01');
    await page.getByLabel('End Date').fill('2025-03-31');
    await page.getByRole('button', { name: 'Utwórz budżet' }).click();
    await expect(page.getByText(budgetName)).toBeVisible();
  });

  test('should show validation errors when creating a budget with empty fields', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Utwórz nowy budżet' }).click();
    await page.getByRole('button', { name: 'Utwórz budżet' }).click();
    await expect(page.getByText('Title jest wymagany')).toBeVisible();
    await expect(page.getByText('Start date jest wymagany')).toBeVisible();
    await expect(page.getByText('End date jest wymagany')).toBeVisible();
  });

  test('should properly render budgets page', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Twoje Budżety' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Utwórz nowy budżet' })).toBeVisible();
  });
});
