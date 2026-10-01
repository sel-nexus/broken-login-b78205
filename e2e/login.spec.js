const { test, expect } = require('@playwright/test');

test('valid login reveals the gallery without console errors', async ({ page }) => {
    const consoleErrors = [];

    page.on('console', (message) => {
        if (message.type() === 'error') {
            consoleErrors.push(message.text());
        }
    });

    page.on('pageerror', (error) => {
        consoleErrors.push(error.message);
    });

    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Login to view the gallery' })).toBeVisible();
    await page.getByLabel('Username').fill('admin');
    await page.getByLabel('Password').fill('12345');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByRole('heading', { name: 'Secret Gallery' })).toBeVisible();
    await expect(page.getByText('Access granted. The protected images are now revealed.')).toBeVisible();
    await expect(page.locator('#login-container')).toHaveClass(/hidden/);
    await expect(page.locator('#gallery-container')).not.toHaveClass(/hidden/);

    await page.screenshot({ path: 'graphify-out/login-success.png', fullPage: true });
    expect(consoleErrors).toEqual([]);
});

test('invalid login keeps the gallery hidden and shows the generic error', async ({ page }) => {
    const consoleErrors = [];

    page.on('console', (message) => {
        if (message.type() === 'error') {
            consoleErrors.push(message.text());
        }
    });

    page.on('pageerror', (error) => {
        consoleErrors.push(error.message);
    });

    await page.goto('/');

    await page.getByLabel('Username').fill('bypass');
    await page.getByLabel('Password').fill('');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('#error-msg')).toHaveText('Invalid credentials.');
    await expect(page.locator('#gallery-container')).toHaveClass(/hidden/);
    await expect(page.getByRole('heading', { name: 'Login to view the gallery' })).toBeVisible();

    await page.screenshot({ path: 'graphify-out/login-failure.png', fullPage: true });
    expect(consoleErrors).toEqual([]);
});
