import * as path from "path";
import { CheckGroup, BrowserCheck } from "@checkly/cli/constructs";
import { smsChannel, emailChannel } from "../alert-channels";
const alertChannels = [smsChannel, emailChannel];

/*
 * In this example, we bundle all basic checks needed to check the Checkly homepage. We explicitly define the Browser
 * check here, instead of using generating a default based on a .spec.js file. This allows us to override the check configuration.
 * We can also add more checks into one file, in this case to cover a specific API call needed to hydrate the homepage.
 */

// We can define multiple checks in a single *.check.js file.
const group = new CheckGroup("critical-flow-check-group", {
  name: "Critical User Flow checks",
  activated: true,
  muted: false,
  runtimeId: "2022.10",
  locations: ["us-east-1", "eu-west-1"],
  tags: ["critical", "userflows"],
  environmentVariables: [],
  apiCheckDefaults: {},
  concurrency: 100,
  alertChannels,
  browserChecks: {
    frequency: 10,
    testMatch: "some-dir/*.spec.ts",
  },
});

new BrowserCheck("account-settings-browser-check", {
  name: "Account Settings",
  group,
  alertChannels,
  code: {
    entrypoint: path.join(__dirname, "accountSettings.spec.ts"),
  },
});
