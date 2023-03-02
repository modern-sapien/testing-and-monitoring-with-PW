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
const group = new CheckGroup("basic-browser-check-group", {
  name: "Browser checks",
  activated: true,
  muted: false,
  runtimeId: "2022.10",
  locations: ["us-east-1", "eu-west-1"],
  tags: ["mac", "group"],
  environmentVariables: [],
  apiCheckDefaults: {},
  concurrency: 100,
  alertChannels,
  browserChecks: {
    frequency: 10,
    testMatch: "some-dir/*.spec.ts",
  },
});

new BrowserCheck("homepage-browser-check-1", {
  name: "Homepage",
  group,
  alertChannels,
  code: {
    entrypoint: path.join(__dirname, "homepage.spec.ts"),
  },
});

new BrowserCheck("404-browser-check-1", {
  name: "404 page",
  group,
  alertChannels,
  code: {
    entrypoint: path.join(__dirname, "404.spec.ts"),
  },
});
