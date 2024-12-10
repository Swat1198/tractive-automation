const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  reporter: [
    ['html', { open: 'on-failure' }], // Generates an HTML report
  ],
  use: {
    baseURL: 'https://my-stage.tractive.com',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  testDir: './tests',
});
