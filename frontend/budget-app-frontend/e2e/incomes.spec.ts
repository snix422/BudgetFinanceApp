import test, { expect } from '@playwright/test';

test.describe('Incomes', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');

    // Logowanie
    await page.getByRole('button', { name: 'Zaloguj się' }).click();
    await page.getByLabel('E-mail').fill('user5@gmail.com');
    await page.getByLabel('Hasło').fill('Test123!');
    await page.locator('button[type="submit"]:has-text("Zaloguj się")').click();

    // Czekamy na Dashboard w menu (potwierdzenie zalogowania)
    const dashboardLink = page.getByRole('link', { name: 'Dashboard' });
    await expect(dashboardLink).toBeVisible({ timeout: 10000 });
    await dashboardLink.click();

    // 🔴 OBSŁUGA ŁADOWANIA BUDŻETÓW
    // Czekamy, aż zniknie loader LUB pojawi się pierwsza karta
    const firstBudgetCard = page.locator('.budget-card, div:has(h3)').first();
    await expect(firstBudgetCard).toBeVisible({ timeout: 15000 });

    // Wejście w szczegóły
    await firstBudgetCard
      .getByRole('link', { name: /szczegóły/i })
      .first()
      .click();

    // Upewniamy się, że strona szczegółów się załadowała
    await expect(page.getByRole('heading', { name: /Budżet/i }).first()).toBeVisible();
  });
  test('should add a new income', async ({ page }) => {
    await page.getByRole('button', { name: 'Dodaj wpływ' }).click();
    await page.getByLabel('Tytuł').fill('Przychód testowy');
    await page.getByLabel('Kwota').fill('1500');
    await page.getByLabel('Data').fill('2025-03-15');
    // await page.getByRole('button', { name: 'Dodaj wpływ' }).click();
    //await expect(page.getByText('Przychód testowy')).toBeVisible();
    //await expect(page.getByText('1500')).toBeVisible();
  });

  test('should show validation errors when adding income with empty fields', async ({ page }) => {
    await page.getByRole('button', { name: 'Dodaj wpływ' }).click();
    await page.getByRole('button', { name: 'Dodaj wpływ' }).click();
    await expect(page.getByText('Nazwa przychodu jest wymagana')).toBeVisible();
    await expect(page.getByText('Kwota jest wymagana')).toBeVisible();
    await expect(page.getByText('Wybierz datę')).toBeVisible();
  });
});
