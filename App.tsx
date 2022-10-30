import * as React from "react";
import RootTabNavigator from "./client/navigation/RootTabNavigator";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import Player from "./client/components/Player";
import { PaperNavigationProvider, ThemeModeProvider } from "./client/theme";
import CustomStatusBar from "./client/components/CustomStatusBar";

export default function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ThemeModeProvider>
        <PaperNavigationProvider>
          <CustomStatusBar />
          <RootTabNavigator />
          <Player />
        </PaperNavigationProvider>
      </ThemeModeProvider>
    </SafeAreaProvider>
  );
}
