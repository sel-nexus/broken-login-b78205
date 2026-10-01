# Broken Auth Gallery

This repository contains a small static HTML/CSS/JavaScript login demo that was repaired to remove a trivial authentication bypass and now includes a repeatable regression test script.

## Files
- `index.html` — page markup for the login form and protected gallery.
- `app.js` — authentication logic and DOM state updates.
- `style.css` — minimalist styling for the login and gallery panels.
- `tests/app.test.js` — Node-based regression tests for the repaired login flow.

## Supported credentials
- Username: `admin`
- Password: `12345`

## Run locally
Open `index.html` in a browser, enter the supported credentials, and confirm the gallery is revealed.

## Verify
Run the regression suite:

```bash
node tests/app.test.js
```

Optional syntax check:

```bash
node --check app.js
```
