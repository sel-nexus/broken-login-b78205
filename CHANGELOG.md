# Changelog

## Changed
- Repaired the client-side login flow so only the supported credential pair unlocks the gallery.
- Removed the legacy bypass hint from the login error state and replaced it with a generic failure message.
- Replaced the inline login button handler with JavaScript event binding for cleaner behavior wiring and better browser-test support.
- Split the Node regression coverage into dedicated auth and login UI test files.
- Expanded the Node regression suites to cover trimmed usernames, empty/whitespace credentials, password clearing on success, and event binding.
- Added declared test infrastructure with `package.json`, Playwright configuration, and a real browser E2E spec for valid and invalid login journeys.
- Refreshed the repository documentation to include dependency installation and both unit/E2E verification commands.

## Modified files
- `app.js`
- `index.html`
- `tests/auth.test.js`
- `tests/login-ui.test.js`
- `package.json`
- `playwright.config.js`
- `e2e/login.spec.js`
- `README.md`

## Breaking changes
- None.

## Migration notes
- Run `npm install --no-bin-links` before executing the Playwright E2E suite.
- Use `node tests/auth.test.js` and `node tests/login-ui.test.js` for fast regression coverage, and `node node_modules/@playwright/test/cli.js test` for browser verification.
