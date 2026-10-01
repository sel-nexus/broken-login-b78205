# Broken Auth Gallery

This repository contains a small static HTML/CSS/JavaScript login demo that was repaired to remove a trivial authentication bypass and now includes both a repeatable Node regression suite and a real browser E2E check.

## Files
- `index.html` — page markup for the login form and protected gallery.
- `app.js` — authentication logic, DOM state updates, and button event binding.
- `style.css` — minimalist styling for the login and gallery panels.
- `tests/app.test.js` — Node-based regression tests for the repaired login flow.
- `e2e/login.spec.js` — Playwright browser tests for valid and invalid login journeys.
- `playwright.config.js` — Playwright config with a static web server.
- `package.json` — declared test tooling and scripts.

## Supported credentials
- Username: `admin`
- Password: `12345`

## Install dependencies
```bash
npm install --no-bin-links
```

## Verify
Run the regression suite:

```bash
node tests/app.test.js
```

Run the browser E2E suite:

```bash
node node_modules/@playwright/test/cli.js test
```

Optional syntax check:

```bash
node --check app.js
```
