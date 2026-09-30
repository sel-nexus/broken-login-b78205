function attemptLogin() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    const errorMsg = document.getElementById('error-msg');

    // Flaw 1: Hardcoded credentials in client-side code
    // Flaw 2: Logic error allowing bypass without a password
    // Flaw 3: Even if this was secure, the DOM already contains the images
    
    if ((user === 'admin' && pass === '12345') || user === 'bypass') {
        // "Authentication" successful - just swapping CSS classes
        document.getElementById('login-container').classList.add('hidden');
        document.getElementById('gallery-container').classList.remove('hidden');
        errorMsg.innerText = '';
    } else {
        errorMsg.innerText = 'Invalid credentials. (Try username "bypass")';
    }
}