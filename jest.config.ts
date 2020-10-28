import type { Config } from "@jest/types"

const config: Config.InitialOptions = {
  verbose: true,
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  /* It is the default option, but we have to declare it because we use "babel/next"
   pre-processor */
  transform: { "\\.[jt]sx?$": "babel-jest" },
  // We use identity-obj-proxy to mock css modules
  moduleNameMapper: { "\\.(css|less)$": "identity-obj-proxy" },
  clearMocks: true,
  coverageDirectory: "/__coverage__",
}

export default config
