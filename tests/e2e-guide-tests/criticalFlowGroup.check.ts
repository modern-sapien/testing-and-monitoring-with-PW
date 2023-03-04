import * as path from "path";
import { CheckGroup } from "@checkly/cli/constructs";
import { smsChannel, emailChannel } from "../alert-channels";
const alertChannels = [smsChannel, emailChannel];import { checklyGroupMethods } from "../checkGroupCreation";


/*
 * In this example, we bundle all basic checks needed to check the Checkly homepage. We explicitly define the Browser
 * check here, instead of using generating a default based on a .spec.js file. This allows us to override the check configuration.
 * We can also add more checks into one file, in this case to cover a specific API call needed to hydrate the homepage.
 */

// We can define multiple checks in a single *.check.js file.
const group = new CheckGroup("critical-flow-check-group", {
  name: "Critical User Flows",
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

// obtain directory name & directoryPath
const directoryPath = path.join(__dirname);
const directoryFolderArray = directoryPath.split("/")
const directoryFolderName = directoryFolderArray[directoryFolderArray.length -1]
// obtain file name
const filePath = path.basename(__filename).split(".");
const checkGroupFileName = filePath[0]
let arrayOfFileNames: Array<string> = [];

checklyGroupMethods.createBrowserCheckFromList(group, checkGroupFileName, directoryPath, arrayOfFileNames, directoryFolderName);