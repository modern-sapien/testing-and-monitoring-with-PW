import { defineConfig } from '@checkly/cli'

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
    tags: ["website", "api"],
    alertChannels: [],
    checkMatch: "**/__checks__/*.check.ts",
    ignoreDirectoriesMatch: [],
    browserChecks: {
      frequency: 10,
      testMatch: "**/__checks__/*.spec.ts",
    },
  },
  cli: {
    runLocation: 'eu-west-1',
  },
})

export default config

// ORIGINAL

// import { defineConfig } from '@checkly/cli'

// const config = defineConfig({
//   projectName: "Website Monitoring",
//   logicalId: "website-monitoring-1",
//   repoUrl: "https://github.com/acme/website",
//   checks: {
//     activated: true,
//     muted: false,
//     runtimeId: "2022.10",
//     frequency: 5,
//     locations: ["us-east-1", "eu-west-1"],
//     tags: ["website", "api"],
//     alertChannels: [],
//     checkMatch: "**/__checks__/*.check.ts",
//     ignoreDirectoriesMatch: [],
//     browserChecks: {
//       frequency: 10,
//       testMatch: "**/__checks__/*.spec.ts",
//     },
//   },
//   cli: {
//     runLocation: "eu-west-1",
//   },
// });

// export default config
