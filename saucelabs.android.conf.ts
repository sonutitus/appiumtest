import * as path from "path";
import { config } from  "./wdio.conf.js";

// Specify Test Files
config.specs = ["./features/login.feature"];
// Capabilities
config.user ='sonutester_hgHmrT';
config.key = 'ZGEfpEocdXyZPce8Y8GS';
config.region = "eu-central-1";
config.maxInstances = 1;
config.capabilities = [
  {
    platformName: "Android",
    "appium:deviceName": "Samsung.",
    "appium:orientation": "PORTRAIT",
    "appium:automationName": "UiAutomator2",
    "appium:app": "storage:filename=Android-MyDemoAppRN.1.2.0.build-231.apk",
    "appium:noReset": true,
    "appium:autoAcceptAlerts": true,
    "appium:autoGrantPermissions": true,
    "appium:newCommandTimeout": 7200,
    "appium:appPackage": "com.saucelabs.mydemoapp.rn",
    "appium:appActivity": "com.saucelabs.mydemoapp.rn.MainActivity",
    "sauce:options": {
      build: "test build",
      appiumVersion: "latest",
      name: `${config.capabilities?.[0]?.platformName ?? "Android"}_${new Date()
        .toLocaleString()
        .replace(/[\s:,/]/g, "_")}_${path.basename(
        config.capabilities?.[0]?.["appium:app"] ?? ""
      )}${path.extname(config.capabilities?.[0]?.["appium:app"] ?? "")}`,
    },
  },
];

// Cucumber Options
config.cucumberOpts = {
  require: ['./features/step-definitions/steps.ts'],
  backtrace: false,
  requireModule: [],
  dryRun: false,
  failFast: false,
  snippets: true,
  source: true,
  strict: false,
  timeout: 120000,
  ignoreUndefinedDefinitions: false,
};

config.maxInstances = 10;
config.waitforTimeout = 5000;

export { config };
