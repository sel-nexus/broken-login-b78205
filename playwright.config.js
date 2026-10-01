const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './e2e',
    timeout: 30000,
    use: {
        baseURL: 'http://127.0.0.1:4173',
        headless: true
    },
    webServer: {
        command: 'node node_modules/http-server/bin/http-server . -p 4173 -c-1',
        url: 'http://127.0.0.1:4173',
        reuseExistingServer: true,
        timeout: 30000
    }
});
