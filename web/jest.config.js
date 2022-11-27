// jest.config.js
const nextJest = require("next/jest");
const { pathsToModuleNameMapper } = require(`ts-jest`);
// const { configureNextJestPreview } = require("jest-preview");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

const { compilerOptions } = require(`./tsconfig`);

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  // // Add more setup options before each test is run
  // setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  // // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  // moduleDirectories: ["node_modules", "<rootDir>/"],
  // testEnvironment: "jest-environment-jsdom",
  // moduleNameMapper: {
  //   "^@/global-components/(.*)$": "<rootDir>/components/$1",
  //   "^@/pages/(.*)$": "<rootDir>/pages/$1",
  //   "^@/hooks/(.*)$": "<rootDir>/hooks/$1",
  // },
  collectCoverage: true,
  // on node 14.x coverage provider v8 offers good speed and more or less good report
  coverageProvider: "v8",
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!<rootDir>/out/**",
    "!<rootDir>/.next/**",
    "!<rootDir>/*.config.js",
    "!<rootDir>/coverage/**",
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: `<rootDir>`,
  }),
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
  testEnvironment: "jsdom",
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
  transformIgnorePatterns: [
    "/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
// module.exports = configureNextJestPreview(createJestConfig(customJestConfig));
