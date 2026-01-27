import test, { expect } from '@playwright/test';

test.describe('Expenses E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Zaloguj się' }).click();
    await page.getByLabel('Adres e-mail').fill('user5@gmail.com');
    await page.getByLabel('Hasło').fill('Test123!');
    await page.getByRole('button', { name: 'Zaloguj się' }).click();
    expect(page).toHaveURL('http://localhost:3000/dashboard');
    await page.getByRole('link', { name: 'Budżety' }).click();
    expect(page).toHaveURL('http://localhost:3000/budgets');
    const firstBudgetCard = page.locator('.budget-card').first();
    await firstBudgetCard.getByRole('button', { name: /szczegóły/i }).click();
    await expect(page.getByRole('heading', { name: 'Szczegóły budżetu' })).toBeVisible();
  });
  test('should add a new expense', async ({ page }) => {
    await page.getByRole('button', { name: 'Dodaj wydatek' }).click();
    await page.getByLabel('Nazwa wydatku').fill('Wydatek testowy');
    await page.getByLabel('Kwota').fill('500');
    await page.getByLabel('Data').fill('2025-03-20');
    await page.getByLabel('Kategoria').selectOption('Jedzenie');
    await page.getByRole('button', { name: 'Dodaj wydatek' }).click();
    await expect(page.getByText('Wydatek testowy')).toBeVisible();
    await expect(page.getByText('500')).toBeVisible();
  });

  test('should show validation errors when adding expense with empty fields', async ({ page }) => {
    await page.getByRole('button', { name: 'Dodaj wydatek' }).click();
    await page.getByRole('button', { name: 'Dodaj wydatek' }).click();
    await expect(page.getByText('Nazwa wydatku jest wymagana')).toBeVisible();
    await expect(page.getByText('Kwota jest wymagana')).toBeVisible();
    await expect(page.getByText('Data jest wymagana')).toBeVisible();
    await expect(page.getByText('Kategoria jest wymagana')).toBeVisible();
  });
});
