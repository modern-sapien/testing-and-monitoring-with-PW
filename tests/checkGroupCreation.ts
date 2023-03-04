import * as path from "path";
import * as fs from "fs";
import { CheckGroup, BrowserCheck } from "@checkly/cli/constructs";
import { smsChannel, emailChannel } from "./alert-channels";
const alertChannels = [smsChannel, emailChannel];

export const checklyGroupMethods = {
  checklyConsole() {
    console.log("hello");
  },
  // @ts-ignore
  createBrowserCheckFromList(group, checkGroupFileName, directoryPath, arrayOfFileNames, directoryFolderName) {
    //passsing directoryPath and callback function
    fs.readdir(directoryPath, function (err, files) {
      console.log(directoryPath, "before for each")
      
      //handling error
      if (err) {
        return console.log("Unable to scan directory: " + err);
      }
      // get file names within directory and split off endings
      files.forEach(function (file) {
        // Do whatever you want to do with the file
        const fileWithoutEnding = file.split(".")[0];
        
        fileWithoutEnding === checkGroupFileName
          ? console.log("gotcha")
          : arrayOfFileNames.push(fileWithoutEnding);
      });

      // @ts-ignore
      arrayOfFileNames.forEach(function (checkFileName) {
        new BrowserCheck(`${checkFileName}-critical-check-1`, {
          name: checkFileName,
          group,
          alertChannels,
          code: {
            entrypoint: path.join(__dirname, directoryFolderName,`${checkFileName}.spec.ts`),
          },
        });
      });
    });
  },
};
