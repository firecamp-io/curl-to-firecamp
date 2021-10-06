import type { Config } from '@jest/types'

// Sync object
const config: Config.InitialOptions = {
    roots: [
        "<rootDir>/src"
    ],
    testMatch: [
        "**/__tests__/**/*.+(ts|tsx|js)",
        "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    modulePathIgnorePatterns: [
        './src/lib/__tests__/auth/__mocks__/',
        './src/lib/__tests__/body/__mocks__/'
    ],
    collectCoverageFrom: [
        "**/*.{js,jsx,ts,tsx}",
        "!**/*.d.ts",
        "!**/node_modules/**",
    ],
    globals: {
        "ts-jest": {
            tsconfig: "tsconfig.json",
        },
    },
    verbose: true,
}
export default config