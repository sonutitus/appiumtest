
// Environment variables
const BROWSERSTACK_USER = 'sonutester_hgHmrT';
const BROWSERSTACK_KEY = 'ZGEfpEocdXyZPce8Y8GS';
const BUILD_NUMBER = process.env.BUILD_NUMBER || 'default-build';
const APP_PATH = `/Users/sonutitus/Downloads/Android-MyDemoAppRN.1.2.0.build-231.apk`;

// WebDriverIO Configuration
export const config = {
  user: BROWSERSTACK_USER,
  key: BROWSERSTACK_KEY,

  hostname: 'hub.browserstack.com',

  services: [
    [
      'browserstack',
      {
        buildIdentifier: BUILD_NUMBER,
        browserstackLocal: true,
        opts: {
          forcelocal: false,
          localIdentifier: 'webdriverio-appium-app-browserstack-repo',
        },
        app: APP_PATH,
      },
    ],
  ],

  capabilities: [
    {
      'bstack:options': {
        deviceName: 'Samsung Galaxy S22 Ultra',
        platformVersion: '12.0',
        platformName: 'android',
      },
    }
  ],

  commonCapabilities: {
    'bstack:options': {
      projectName: 'BrowserStack Samples',
      buildName: 'browserstack build',
      sessionName: 'BStack parallel webdriverio-appium',
      debug: true,
      networkLogs: true,
      source: 'webdriverio:appium-sample-sdk:v1.0',
    },
  },

  maxInstances: 10,

  updateJob: false,
  specs: ['./features/login.feature'], // Ensure this path is correct
  exclude: [],

  logLevel: 'info',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  baseUrl: '',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,

  framework: 'cucumber',
  cucumberOpts: {
    require: ['./step-definitions/steps.ts'], // Adjust if needed
    backtrace: false,
    requireModule: [],
    dryRun: false,
    failFast: false,
    snippets: true,
    source: true,
    strict: false,
    timeout: 120000,
    ignoreUndefinedDefinitions: false,
  },

  // Apply common capabilities
  onPrepare: () => {
    config.capabilities.forEach(caps => {
      for (const key in config.commonCapabilities) {
        caps[key] = { ...caps[key], ...config.commonCapabilities[key] };
      }
    });
  },
};
