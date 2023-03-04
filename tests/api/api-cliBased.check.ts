import { CheckGroup, BrowserCheck } from "@checkly/cli/constructs";
import { smsChannel, emailChannel } from "../alert-channels";
const alertChannels = [smsChannel, emailChannel];
import * as path from "path";
import { checklyGroupMethods } from "../checkGroupCreation";


// We can define multiple checks in a single *.check.js file.
const group = new CheckGroup("critical-API-check-group", {
  name: "Critical API Flows",
  activated: true,
  muted: false,
  runtimeId: "2022.10",
  locations: ["us-east-1", "eu-west-1"],
  tags: ["critical", "CLI", "userflows"],
  environmentVariables: [],
  apiCheckDefaults: {},
  concurrency: 100,
  alertChannels,
  browserChecks: {
    frequency: 10,
    testMatch: "e2e-guide-tests/*.spec.ts",
  },
});

// Declaring variables for use with checklyGroupMethods
const directoryPath = path.join(__dirname);
const directoryFolderName = "api"
const filePath = path.basename(__filename).split(".");
const checkGroupFileName = filePath[0]
let arrayOfFileNames: Array<string> = [];

checklyGroupMethods.createBrowserCheckFromList(group, checkGroupFileName, directoryPath, arrayOfFileNames, directoryFolderName);
