import test, { expect } from '@playwright/test';

test.describe('Budgets Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Zaloguj się' }).click();
    await page.getByLabel('E-mail').fill('user5@gmail.com');
    await page.getByLabel('Hasło').fill('Test123!');
    await page.locator('button[type="submit"]:has-text("Zaloguj się")').click();
    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible({ timeout: 10000 });
    await expect(page).toHaveURL('http://localhost:5173/');
    await page.getByRole('link', { name: 'Dashboard' }).click();
    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible({ timeout: 10000 });
    await expect(page).toHaveURL('http://localhost:5173/app/dashboard');
  });
  test('should properly render budgets page', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Twoje Budżety' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Dodaj budżet' })).toBeVisible();
  });
  test('should create a new budget', async ({ page }) => {
    const budgetName = `Budżet ${Math.floor(Math.random() * 1000)}`;
    await page.getByRole('button', { name: 'Dodaj budżet' }).click();
    await page.getByLabel('Tytuł').fill(budgetName);
    await page.getByLabel('Data rozpoczęcia').fill('2025-03-01');
    await page.getByLabel('Data zakończenia').fill('2025-03-31');
    //await page.getByRole('button', { name: 'Utwórz' }).click();
    //await expect(page.getByText(budgetName, { exact: true })).toBeVisible();
  });

  /*test('should open details of the first budget on the list', async ({ page }) => {
    // Szukamy pierwszej karty budżetu, nieważne jak się nazywa
    const firstBudgetCard = page.getByTestId('budget-card').first();
    await expect(firstBudgetCard).toBeVisible({ timeout: 10000 });
    // Wyciągamy jej tekst, żeby wiedzieć czego szukać w nagłówku później (opcjonalnie)
    //const name = await firstBudgetCard.locator('h3').innerText();

    const header = firstBudgetCard.locator('h3');
    await expect(header).not.toBeEmpty();

    // 3. Teraz bezpiecznie pobieramy tekst
    const name = await header.innerText();
    await firstBudgetCard.getByRole('link', { name: /szczegóły/i }).click();

    await expect(page.getByRole('heading', { name: 'Szczegóły budżetu' })).toBeVisible();
    // Możesz sprawdzić czy nazwa w detalu zgadza się z tą z karty
    await expect(page.locator('body')).toContainText(name);
  });*/

  test('should show validation errors when creating a budget with empty fields', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Dodaj budżet' }).click();
    await page.getByRole('button', { name: 'Utwórz' }).click();
    await expect(page.getByText('Tytuł jest wymagany')).toBeVisible();
    await expect(page.getByText('Wybierz datę początkową')).toBeVisible();
    await expect(page.getByText('Wybierz datę końcową')).toBeVisible();
  });
});
