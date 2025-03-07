import type { Background, Pickle, Scenario, Step } from "@cucumber/messages";
import type { Frameworks } from "@wdio/types";
import * as dotenv from "dotenv";

dotenv.config();
const allure_report_dir = "reports/allure-results";

export const config: WebdriverIO.Config = {
  //dataTableHeaderMax: 50,
  //
  // ====================
  // Runner Configuration
  // ====================
  runner: "local",
  autoCompileOpts: {
    tsNodeOpts: {
      project: "./tsconfig.json",
    },
  },
  // ==================
  // Specify Test Files
  // ==================
  // Define which test specs should run. The pattern is relative to the directory
  // from which `wdio` was called.
  //
  // The specs are defined as an array of spec files (optionally using wildcards
  // that will be expanded). The test for each spec file will be run in a separate
  // worker process. In order to have a group of spec files run in the same worker
  // process simply enclose them in an array within the specs array.
  //
  // If you are calling `wdio` from an NPM script (see https://docs.npmjs.com/cli/run-script),
  // then the current working directory is where your `package.json` resides, so `wdio`
  // will be called from there.
  //
  //specs: ["./features/**/*.feature"],
  // Patterns to exclude.
  exclude: [
    // 'path/to/excluded/files'
  ],
  //
  // ============
  // Capabilities
  // ============
  // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
  // time. Depending on the number of capabilities, WebdriverIO launches several test
  // sessions. Within your capabilities you can overwrite the spec and exclude options in
  // order to group specific specs to a specific capability.
  //
  // First, you can define how many instances should be started at the same time. Let's
  // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
  // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
  // files and you set maxInstances to 10, all spec files will get tested at the same time
  // and 30 processes will get spawned. The property handles how many capabilities
  // from the same test should run tests.
  //
  //maxInstances: 10,
  //
  // If you have trouble getting all important capabilities together, check out the
  // Sauce Labs platform configurator - a great tool to configure your capabilities:
  // https://saucelabs.com/platform/platform-configurator
  //
  capabilities: null, //[
  //   {
  //     // maxInstances can get overwritten per capability. So if you have an in-house Selenium
  //     // grid with only 5 firefox instances available you can make sure that not more than
  //     // 5 instances get started at a time.
  //     maxInstances: 5,
  //     browserName: "chrome",
  //     acceptInsecureCerts: true,
  //     // If outputDir is provided WebdriverIO can capture driver session logs
  //     // it is possible to configure which logTypes to include/exclude.
  //     // excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
  //     // excludeDriverLogs: ['bugreport', 'server'],
  //   },
  //   {
  //     maxInstances: 5,
  //     browserName: "firefox",
  //     acceptInsecureCerts: true,
  //   },
  // ],
  //
  // ===================
  // Test Configurations
  // ===================
  // Define all options that are relevant for the WebdriverIO instance here
  //
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  logLevel: "warn",
  //
  // Set specific log levels per console
  // consoles:
  // - webdriver, webdriverio
  // - @wdio/browserstack-service, @wdio/devtools-service, @wdio/sauce-service
  // - @wdio/mocha-framework, @wdio/jasmine-framework
  // - @wdio/local-runner
  // - @wdio/sumologic-reporter
  // - @wdio/cli, @wdio/config, @wdio/utils
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  // logLevels: {
  //     webdriver: 'info',
  //     '@wdio/appium-service': 'info'
  // },
  //
  // If you only want to run your tests until a specific amount of tests have failed use
  // bail (default is 0 - don't bail, run all tests).
  bail: 0,
  //
  // Set a base URL in order to shorten url command calls. If your `url` parameter starts
  // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
  // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
  // gets prepended directly.
  //baseUrl: "https://account-2-d.ninjatrader.com/", //d devel, beta-account.
  //
  // Default timeout for all waitFor* commands.
  waitforTimeout: 10000,
  //
  // Default timeout in milliseconds for request
  // if browser driver or grid doesn't send response
  connectionRetryTimeout: 120000,
  //
  // Default request retries count
  connectionRetryCount: 1,
  //
  // Test runner services
  // Services take over a specific job you don't want to take care of. They enhance
  // your test setup with almost no effort. Unlike plugins, they don't add new
  // commands. Instead, they hook themselves up into the test process.
  //services: ["selenium-standalone"],
  //services: ["wdio-chromedriver-service"],

  // Framework you want to run your specs with.
  // The following are supported: Mocha, Jasmine, and Cucumber
  // see also: https://webdriver.io/docs/frameworks
  //
  // Make sure you have the wdio adapter package for the specific framework installed
  // before running any tests.
  framework: "cucumber",
  //
  // The number of times to retry the entire specfile when it fails as a whole
  // specFileRetries: 1,
  //
  // Delay in seconds between the spec file retry attempts
  // specFileRetriesDelay: 0,
  //
  // Whether or not retried specfiles should be retried immediately or deferred to the end of the queue
  // specFileRetriesDeferred: false,
  //
  // Test reporter for stdout.
  // The only one supported by default is 'dot'
  // see also: https://webdriver.io/docs/dot-reporter
  //allure reporter config: node_modules\@wdio\allure-reporter\build\types.d.ts
  reporters: [
    "spec",
    [
      "allure",
      {
        outputDir: "reports/allure-results",
        disableWebdriverStepsReporting: true,
        useCucumberStepReporter: true,
        addConsoleLogs: true,
        // reportedEnvironmentVars: {
        //   Environment: globalConfig.environment,
        //   Component: globalConfig.testMode,
        // },
      },
    ],
  ],

  //
  // If you are using Cucumber you need to specify the location of your step definitions.
  // cucumberOpts: {
  //   // <string[]> (file/dir) require files before executing features
  //   require: ["./features/step-definitions/steps.js"],
  //   // <boolean> show full backtrace for errors
  //   backtrace: false,
  //   // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
  //   requireModule: [],
  //   // <boolean> invoke formatters without executing steps
  //   dryRun: false,
  //   // <boolean> abort the run on first failure
  //   failFast: false,
  //   // <boolean> hide step definition snippets for pending steps
  //   snippets: true,
  //   // <boolean> hide source uris
  //   source: true,
  //   // <boolean> fail if there are any undefined or pending steps
  //   strict: false,
  //   // <string> (expression) only execute the features or scenarios with tags matching the expression
  //   tagExpression: "@run",
  //   // <number> timeout for step definitions
  //   timeout: 60000,
  //   // <boolean> Enable this config to treat undefined definitions as warnings.
  //   ignoreUndefinedDefinitions: false,
  // },

  //
  // =====
  // Hooks
  // =====
  // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
  // it and to build services around it. You can either apply a single function or an array of
  // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
  // resolved to continue.
  /**
   * Gets executed once before all workers get launched.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   */
  onPrepare: async function (config, capabilities) {
  },
  before: function (capabilities, specs, browser: WebdriverIO.Browser) {
  },
  beforeFeature: function (uri, feature) {
  },
  beforeScenario: async function (world, context) {
  },
  beforeStep: async function (step: Frameworks.PickleStep, scenario: Pickle, context: Object) {
  },
  afterStep: async function (step, scenario, result, context) {
    }
};
