# Broken Auth Gallery

This repository contains a small static HTML/CSS/JavaScript login demo that was repaired to remove a trivial authentication bypass and now includes both repeatable Node regression suites and a real browser E2E check.

## Files
- `index.html` — page markup for the login form and protected gallery.
- `app.js` — authentication logic, DOM state updates, and button event binding.
- `style.css` — minimalist styling for the login and gallery panels.
- `tests/auth.test.js` — Node-based tests for credential validation behavior.
- `tests/login-ui.test.js` — Node-based tests for login DOM state changes and event binding.
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
Run the auth unit suite:

```bash
node tests/auth.test.js
```

Run the login UI unit suite:

```bash
node tests/login-ui.test.js
```

Run the browser E2E suite:

```bash
node node_modules/@playwright/test/cli.js test
```

Optional syntax check:

```bash
node --check app.js
```
