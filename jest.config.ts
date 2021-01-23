import type { Config } from "@jest/types"

const config: Config.InitialOptions = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  /* It is the default option, but we have to declare it because we use "babel/next"
   pre-processor */
  transform: { "\\.[jt]sx?$": "babel-jest" },
  // We use identity-obj-proxy to mock css modules
  moduleNameMapper: { "\\.(css|less)$": "identity-obj-proxy" },
  clearMocks: true,
  coverageDirectory: "__coverage__",
  moduleDirectories: ["<rootDir>/node_modules", "<rootDir>/."],
  roots: ["<rootDir>/."],
}

export default config
