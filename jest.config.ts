import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "jest-expo",
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)",
  ],
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
};

export default config;
