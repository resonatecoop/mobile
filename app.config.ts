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
        projectId: "3ee2f1b4-9835-433f-a1af-6e4532022f84",
      },
    },
    owner: "resonatecoop",
  };
}
