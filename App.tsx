import * as React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import RootTabNavigator from "./client/navigation/RootTabNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <PaperProvider>
          <RootTabNavigator />
        </PaperProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
