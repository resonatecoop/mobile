import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";

import CustomStatusBar from "./client/components/CustomStatusBar";
import Player from "./client/components/Player";
import RootTabNavigator from "./client/navigation/RootTabNavigator";
import { PaperNavigationProvider, ThemeModeProvider } from "./client/theme";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <ThemeModeProvider>
          <PaperNavigationProvider>
            <CustomStatusBar />
            <RootTabNavigator />
            <Player />
          </PaperNavigationProvider>
        </ThemeModeProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
