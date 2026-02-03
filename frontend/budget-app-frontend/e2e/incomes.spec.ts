import test, { expect } from '@playwright/test';

test.describe('Incomes', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Zaloguj się' }).click();
    await page.getByLabel('Adres e-mail').fill('user5@gmail.com');
    await page.getByLabel('Hasło').fill('Test123!');
    await page.getByRole('button', { name: 'Zaloguj się' }).click();
    expect(page).toHaveURL('http://localhost:5173/dashboard');
    await page.getByRole('link', { name: 'Budżety' }).click();
    expect(page).toHaveURL('http://localhost:5173/budgets');
    const firstBudgetCard = page.locator('.budget-card').first();
    await firstBudgetCard.getByRole('button', { name: /szczegóły/i }).click();
    await expect(page.getByRole('heading', { name: 'Szczegóły budżetu' })).toBeVisible();
  });
  test('should add a new income', async ({ page }) => {
    await page.getByRole('button', { name: 'Dodaj wpływ' }).click();
    await page.getByLabel('Nazwa przychodu').fill('Przychód testowy');
    await page.getByLabel('Kwota').fill('1500');
    await page.getByLabel('Data').fill('2025-03-15');
    await page.getByRole('button', { name: 'Dodaj wpływ' }).click();
    await expect(page.getByText('Przychód testowy')).toBeVisible();
    await expect(page.getByText('1500')).toBeVisible();
  });

  test('should show validation errors when adding income with empty fields', async ({ page }) => {
    await page.getByRole('button', { name: 'Dodaj wpływ' }).click();
    await page.getByRole('button', { name: 'Dodaj wpływ' }).click();
    await page.getByLabel('Data').fill('2025-03-15');
    await expect(page.getByText('Nazwa przychodu jest wymagana')).toBeVisible();
    await expect(page.getByText('Kwota jest wymagana')).toBeVisible();
    await expect(page.getByText('Data jest wymagana')).toBeVisible();
  });
});
