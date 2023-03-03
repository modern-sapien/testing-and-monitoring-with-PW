import * as path from "path";
import * as fs from "fs";
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

const directoryPath = path.join(__dirname, "");
let arrayOfFileNames: Array<string> = [];

//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
  //handling error
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }
  // get file names within directory and split off endings
  files.forEach(function (file) {
    // Do whatever you want to do with the file
    const fileWithoutEnding = file.split(".")[0];
    fileWithoutEnding === "criticalFlowGroup"?console.log('gotcha'):
    arrayOfFileNames.push(fileWithoutEnding);
  });

  console.log(arrayOfFileNames);

  arrayOfFileNames.forEach(function (checkFileName) {
    new BrowserCheck(`${checkFileName}-critical-check-1`, {
      name: checkFileName,
      group,
      alertChannels,
      code: {
        entrypoint: path.join(__dirname, `${checkFileName}.spec.ts`),
      },
    });
  });
});