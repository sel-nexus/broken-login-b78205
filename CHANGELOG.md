# Changelog

## Changed
- Repaired the client-side login flow so only the supported credential pair unlocks the gallery.
- Removed the legacy bypass hint from the login error state and replaced it with a generic failure message.
- Refactored the authentication logic into testable functions to support automated regression coverage.
- Added `tests/app.test.js` with repeatable checks for valid login, invalid login, and the rejected legacy bypass path.
- Refreshed the static page copy and styling to present clearer authenticated and unauthenticated states.

## Modified files
- `app.js`
- `index.html`
- `style.css`
- `tests/app.test.js`
- `README.md`

## Breaking changes
- None.

## Migration notes
- Use `node tests/app.test.js` to verify the repaired behavior before future edits.
