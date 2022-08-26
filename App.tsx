import * as React from "react";
import {
  Provider as PaperProvider,
  BottomNavigation,
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import CustomStatusBar from "./client/components/CustomStatusBar";
import Home from "./client/components/Home";
import Player from "./client/components/Player";
import Search from "./client/components/Search";
import Browse from "./client/components/Browse";
import Library from "./client/components/Library";

import { BOTTOM_NAVIGATION_HEIGHT } from "./client/constants";

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
    {
      key: "browse",
      title: "Browse",
      icon: "telescope",
    },
    {
      key: "library",
      title: "Library",
      icon: "library",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    search: Search,
    browse: Browse,
    library: Library,
  });

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <CustomStatusBar />
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
          barStyle={{ height: BOTTOM_NAVIGATION_HEIGHT }}
        />
        <Player />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
