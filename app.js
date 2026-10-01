const VALID_CREDENTIALS = Object.freeze({
    username: 'admin',
    password: '12345'
});

/**
 * Return whether the submitted credentials match the supported login pair.
 *
 * Args:
 *   username: Submitted username value.
 *   password: Submitted password value.
 *
 * Returns:
 *   True when the provided credentials exactly match the supported pair.
 */
function authenticate(username, password) {
    return username === VALID_CREDENTIALS.username && password === VALID_CREDENTIALS.password;
}

/**
 * Apply the authenticated or rejected UI state to the page.
 *
 * Args:
 *   isAuthenticated: Whether the current login attempt succeeded.
 *   elements: DOM element collection used by the login flow.
 *
 * Returns:
 *   The updated authentication state.
 */
function setAuthState(isAuthenticated, elements) {
    const { loginContainer, galleryContainer, errorMsg, passwordInput } = elements;

    if (isAuthenticated) {
        loginContainer.classList.add('hidden');
        galleryContainer.classList.remove('hidden');
        errorMsg.innerText = '';
        errorMsg.setAttribute('aria-hidden', 'true');
        passwordInput.value = '';
        return true;
    }

    galleryContainer.classList.add('hidden');
    loginContainer.classList.remove('hidden');
    errorMsg.innerText = 'Invalid credentials.';
    errorMsg.setAttribute('aria-hidden', 'false');
    return false;
}

/**
 * Collect the DOM elements required by the login flow.
 *
 * Returns:
 *   A map of DOM elements used during authentication.
 */
function getLoginElements() {
    return {
        usernameInput: document.getElementById('username'),
        passwordInput: document.getElementById('password'),
        loginContainer: document.getElementById('login-container'),
        galleryContainer: document.getElementById('gallery-container'),
        errorMsg: document.getElementById('error-msg')
    };
}

/**
 * Attempt to authenticate the current user and update the UI.
 *
 * Returns:
 *   True when the login succeeds, otherwise false.
 */
function attemptLogin() {
    const elements = getLoginElements();
    const username = elements.usernameInput.value.trim();
    const password = elements.passwordInput.value;
    const isAuthenticated = authenticate(username, password);

    return setAuthState(isAuthenticated, elements);
}

if (typeof module !== 'undefined') {
    module.exports = {
        VALID_CREDENTIALS,
        authenticate,
        setAuthState,
        attemptLogin
    };
}
