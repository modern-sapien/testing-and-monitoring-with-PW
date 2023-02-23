import * as path from "path";
import { CheckGroup, BrowserCheck } from "@checkly/cli/constructs";
import { smsChannel, emailChannel } from "../alert-channels";
const alertChannels = [smsChannel, emailChannel];
/*
 * In this example, we bundle all basic checks needed to check the Checkly homepage. We explicitly define the Browser
 * check here, instead of using generating a default based on a .spec.js file. This allows us to override the check configuration.
 * We can also add more checks into one file, in this case to cover a specific API call needed to hydrate the homepage.
 */
const group = new CheckGroup('check-group-2', {
  name: 'Browser group',
  activated: true,
  muted: false,
  runtimeId: '2022.10',
  locations: ['us-east-1', 'eu-west-1'],
  tags: ['mac', 'group'],
  environmentVariables: [],
  apiCheckDefaults: {},
  browserCheckDefaults: {},
  concurrency: 100,
  alertChannels,
  browserChecks: {
    testMatch: 'some-dir/*.spec.ts'
  }
})


// We can define multiple checks in a single *.check.js file.
new BrowserCheck("homepage-browser-check-1", {
  name: "Homepage",
  groupId: group.ref(),
  code: {
    entrypoint: path.join(__dirname, "homepage.spec.ts"),
  },
});

new BrowserCheck("404-browser-check-1", {
  name: "404 page",
  groupId: group.ref(),
  code: {
    entrypoint: path.join(__dirname, "404.spec.ts"),
  },
});

new BrowserCheck("example-check-1", {
  name: "Playwright homepage",
  groupId: group.ref(),
  code: {
    entrypoint: path."/Users/jonathancheckly/Desktop/CODE/learning/playwright-monitoring-cli/tests/example.spec.ts",
    // this needs to be replaced with something scalable
  },
});
