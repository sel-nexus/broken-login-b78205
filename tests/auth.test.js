const assert = require('assert');
const { authenticate, VALID_CREDENTIALS } = require('../app.js');

function runTest(name, fn) {
    try {
        fn();
        console.log(`PASS ${name}`);
    } catch (error) {
        console.error(`FAIL ${name}`);
        throw error;
    }
}

runTest('authenticate accepts the supported credential pair', () => {
    assert.strictEqual(authenticate(VALID_CREDENTIALS.username, VALID_CREDENTIALS.password), true);
});

runTest('authenticate rejects the legacy bypass username without a password', () => {
    assert.strictEqual(authenticate('bypass', ''), false);
});
