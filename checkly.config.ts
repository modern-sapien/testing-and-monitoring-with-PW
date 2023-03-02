import { defineConfig } from '@checkly/cli'
require('dotenv').config()

const config = defineConfig({
  projectName: 'Advanced Example Project',
  logicalId: 'advanced-example-project-1',
  repoUrl: 'https://github.com/checkly/checkly-cli',
  checks: {
    activated: true,
    muted: false,
    runtimeId: "2022.10",
    frequency: 5,
    locations: ["us-east-1", "eu-west-1"],
    tags: ["website", "critical-user-flows"],
    alertChannels: [],
    checkMatch: "**/**/*.check.ts",
    ignoreDirectoriesMatch: [],
    browserChecks: {
      frequency: 10,
      testMatch: "**/e2e-guide-tests/*.spec.ts",
    },
  },
  cli: {
    runLocation: 'eu-west-1',
  },
})

export default config