const { defineConfig } = require('cypress');

module.exports = defineConfig({
  viewportWidth: 1440,
  viewportHeight: 1000,
  defaultCommandTimeout: 15000,
  pageLoadTimeout: 90000,
  requestTimeout: 30000,
  responseTimeout: 45000,
  retries: { runMode: 1, openMode: 0 },
  video: true,
  screenshotOnRunFailure: true,
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
  trashAssetsBeforeRuns: true,
  blockHosts: [
    '*.doubleclick.net',
    '*.googlesyndication.com',
    '*.googletagservices.com',
    '*.adservice.google.com',
    'fundingchoicesmessages.google.com',
  ],
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    reportFilename: 'relatorio',
    reportPageTitle: 'Automation Exercise - Trabalho de Conclusao',
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveJson: true,
    saveAllAttempts: true,
    videoOnFailOnly: true,
  },
  e2e: {
    baseUrl: process.env.BASE_URL || 'https://automationexercise.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    testIsolation: true,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
  },
});

