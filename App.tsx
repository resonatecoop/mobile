import * as React from "react";
import RootTabNavigator from "./client/navigation/RootTabNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Player from "./client/components/Player";
import { PaperNavigationProvider, ThemeModeProvider } from "./client/theme";

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeModeProvider>
        <PaperNavigationProvider>
          <RootTabNavigator />
          <Player />
        </PaperNavigationProvider>
      </ThemeModeProvider>
    </SafeAreaProvider>
  );
}
