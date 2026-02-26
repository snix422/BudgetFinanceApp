import test, { expect } from '@playwright/test';

test.describe('Moduł Logowania', () => {
  // To wykona się automatycznie przed testem 1, przed testem 2 i przed testem 3
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Zaloguj się' }).click();
  });

  test('should login with valid credentials', async ({ page }) => {
    // Nie musisz już wchodzić na stronę i klikać "Zaloguj się" - to już się stało!
    await page.getByLabel('E-mail').fill('user5@gmail.com');
    await page.getByLabel('Hasło').fill('Test123!');
    await page.locator('button[type="submit"]:has-text("Zaloguj się")').click();
    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible({ timeout: 10000 });
    await expect(page).toHaveURL('http://localhost:5173/');
  });

  test('should show validation errors', async ({ page }) => {
    // Tutaj też zaczynasz już od razu od formularza
    await page.locator('button[type="submit"]:has-text("Zaloguj się")').click();
    await expect(page.getByText('Email jest wymagany')).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.getByLabel('E-mail').fill('wrongemail@gmail.com');
    await page.getByLabel('Hasło').fill('wrongpassword');
    await page.locator('button[type="submit"]:has-text("Zaloguj się")').click();
    const error = page.getByText(/invalid credentials/i).first();
    await expect(error).toBeVisible({ timeout: 5000 });
  });
});
