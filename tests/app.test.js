const assert = require('assert');
const { authenticate, attemptLogin, VALID_CREDENTIALS } = require('../app.js');

function createElement(initialValue = '') {
    return {
        value: initialValue,
        innerText: '',
        attributes: {},
        classList: {
            values: new Set(),
            add(name) {
                this.values.add(name);
            },
            remove(name) {
                this.values.delete(name);
            },
            contains(name) {
                return this.values.has(name);
            }
        },
        setAttribute(name, value) {
            this.attributes[name] = value;
        }
    };
}

function buildDom({ username = '', password = '' } = {}) {
    const loginContainer = createElement();
    const galleryContainer = createElement();
    galleryContainer.classList.add('hidden');

    const elements = {
        username: createElement(username),
        password: createElement(password),
        'login-container': loginContainer,
        'gallery-container': galleryContainer,
        'error-msg': createElement()
    };

    global.document = {
        getElementById(id) {
            return elements[id];
        }
    };

    return elements;
}

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

runTest('attemptLogin reveals the gallery for valid credentials', () => {
    const elements = buildDom({
        username: VALID_CREDENTIALS.username,
        password: VALID_CREDENTIALS.password
    });

    const result = attemptLogin();

    assert.strictEqual(result, true);
    assert.strictEqual(elements['login-container'].classList.contains('hidden'), true);
    assert.strictEqual(elements['gallery-container'].classList.contains('hidden'), false);
    assert.strictEqual(elements['error-msg'].innerText, '');
    assert.strictEqual(elements['error-msg'].attributes['aria-hidden'], 'true');
});

runTest('attemptLogin keeps the gallery hidden and shows a generic error for invalid credentials', () => {
    const elements = buildDom({ username: 'wrong', password: 'guess' });

    const result = attemptLogin();

    assert.strictEqual(result, false);
    assert.strictEqual(elements['login-container'].classList.contains('hidden'), false);
    assert.strictEqual(elements['gallery-container'].classList.contains('hidden'), true);
    assert.strictEqual(elements['error-msg'].innerText, 'Invalid credentials.');
    assert.strictEqual(elements['error-msg'].attributes['aria-hidden'], 'false');
});
