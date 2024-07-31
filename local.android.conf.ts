// import * as path from "path";
import { config as masterConfig } from "./wdio.conf.js";

const appType = process.env.APP_TYPE || "Demo";

const capabilities = {
  Demo: {
    appPath: process.env.Demo_APPPATH || `/Users/sonutitus/Downloads/Android-MyDemoAppRN.1.2.0.build-231.apk`,
    appPackage: process.env.Demo_APPPACKAGE || "com.saucelabs.mydemoapp.rn",
    appActivity: process.env.Demo_APPPACTIVITY || "com.saucelabs.mydemoapp.rn.MainActivity",
  },
}[appType];

// Appium capabilities
export const config = Object.assign(masterConfig, {
  logLevel: process.env.LOG_LEVEL || "warn",
  specs: ["./features/**/*.feature"],
  capabilities: [
    {
      platformName: "Android",
      maxInstances: 1,
      // autoAcceptAlerts: true,
      // autoGrantPermissions: true,
      "appium:options": {
        noReset: true,
        fullReset: false,
        automationName: "UiAutomator2",
        deviceName: "emulator-5554",
        commandTimeout: "7200",
        app: `/Users/sonutitus/Downloads/Android-MyDemoAppRN.1.2.0.build-231.apk`,
        appPackage: capabilities.appPackage,
        appActivity: capabilities.appActivity,
        chromeOptions: {
          args: [
            "--no-managed-user-acknowledgment-check",
            "--no-user-gesture-required",
            "--oobe-force-show-screen ⊗",
          ],
        },
      },
    },
  ],
  hostname: "localhost",
  port: 4723,
  path: "/",
  services: [
    [
      "appium",
      {
        // For options see
        // https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-appium-service
        command: "appium",
        args: {
          // For arguments see
          // https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-appium-service
          debugLogSpacing: true,
          sessionOverride: true,
          allowInsecure: "chromedriver_autodownload",
        },
        logPath: "./logs/mobile/",
      },
    ],
  ],
  cucumberOpts: {
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
  },
  sync: false,
  maxInstances: 10,
  waitforTimeout: 5000,

  // afterScenario: async function (world, result, context) {
  //   let isCancelAfterTag = false;
  //   let isLogoutAfterTag = false;
  //   let isCancelLogoutAfterTag = false;

  //   // If we need to control cleanup based off of a failed status, this is what we would check.
  //   //logger.info(world.result.status);

  //   for (let tag of world.pickle.tags) {
  //     if (tag.name === "@CancelAfter") isCancelAfterTag = true;
  //     if (tag.name === "@LogoutAfter") isLogoutAfterTag = true;
  //     if (tag.name === "@CancelAndLogoutAfter") isCancelLogoutAfterTag = true;
  //   }

  //   // old
  //   if (isCancelLogoutAfterTag) {
  //     isCancelAfterTag = true;
  //     isLogoutAfterTag = true;
  //   }

  //   if (isCancelAfterTag) {
  //     logger.info("After scenario, clicking Cancel!");
  //     await screens["Default"].cancelElement.waitForExist();
  //     await screens["Default"].cancelElement.click();
  //   }

  //   if (isLogoutAfterTag) {
  //     logger.info("After scenario, logging out!");
  //     await screens["Default"].logout(screens);
  //   }

  //   // Reset States (Needed for controlling delays without universal pauses)
  //   utilGlobals.justLoggedIn = null;

  //   // Reload browser after Scenario.
  //   await browser.reloadSession();

  //   // Wait for reload to complete
  //   await screens["Welcome"].screenLocatorElement.waitForExist();
  // },
});
