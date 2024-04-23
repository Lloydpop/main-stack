// export default {
//     preset: 'ts-jest',
//     testEnvironment: 'jest-environment-jsdom',
//     transform: {
//         "^.+\\.tsx?$": "ts-jest" 
//     // process `*.tsx` files with `ts-jest`
//     },
//     moduleNameMapper: {
//         '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
//     },
// }
export default {
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.tsx?$": "ts-jest",
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    moduleNameMapper: {
        "\\.(css|less|sass|scss|png|jpg|svg)$": "identity-obj-proxy",
        "^.+\\.svg$": "jest-transformer-svg",
        "^@/(.*)$": "<rootDir>/src/$1",
      },
      "transformIgnorePatterns": [
        "/node_modules/",
        "\\.png$"
      ]
  };
  