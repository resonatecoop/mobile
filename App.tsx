import * as React from "react";
import RootTabNavigator from "./client/navigation/RootTabNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Player from "./client/components/Player";
import { PaperNavigationProvider } from "./client/theme";

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperNavigationProvider>
        <RootTabNavigator />
        <Player />
      </PaperNavigationProvider>
    </SafeAreaProvider>
  );
}
