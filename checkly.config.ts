import { defineConfig } from "@checkly/cli";
require('dotenv').config()

export default defineConfig({
  projectName: "Website Monitoring",
  logicalId: "website-monitoring-1",
  repoUrl: "https://github.com/acme/website",
  checks: {
    activated: true,
    muted: false,
    runtimeId: "2022.10",
    frequency: 5,
    locations: ["us-east-1", "eu-west-1"],
    tags: ["website", "api"],
    alertChannels: [],
    checkMatch: "**/__checks__/*.check.ts",
    ignoreDirectoriesMatch: [],
    browserChecks: {
      frequency: 10,
      testMatch: "**/tests/*.spec.ts",
    },
  },
  cli: {
    runLocation: "eu-west-1",
  },
});
