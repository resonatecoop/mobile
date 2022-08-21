import * as React from "react";
import { StyleSheet, View } from "react-native";
import {
  Provider as PaperProvider,
  BottomNavigation,
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import CustomStatusBar from "./client/components/CustomStatusBar";
import Home from "./client/components/Home";
import Player from "./client/components/Player";
import Search from "./client/components/Search";

export default function App() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "home",
      title: "Home",
      icon: "home",
    },
    {
      key: "search",
      title: "Search",
      icon: "magnify",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    search: Search,
  });

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <CustomStatusBar />
        <Player />
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
        />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
