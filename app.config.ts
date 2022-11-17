import { ExpoConfig, ConfigContext } from "@expo/config";
import * as dotenv from "dotenv";

dotenv.config();

export default function config({ config }: ConfigContext): ExpoConfig {
  return {
    ...config,
    name: "mobile",
    slug: "mobile",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      infoPlist: {
        UIBackgroundModes: ["audio"],
      },
      bundleIdentifier: "com.resonatecoop.mobile",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF",
      },
      package: "com.resonatecoop.mobile",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    plugins: ["expo-community-flipper"],
    extra: {
      eas: {
        projectId: "0d5b1fc5-4d05-4f8d-bfa7-9e0eddc180db",
      },
      apiUrl: process.env.API_URL,
    },
    owner: "resonatecoop",
  };
}
