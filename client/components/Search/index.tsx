import React from "react";
import { View } from "react-native";
import { Text, Searchbar, useTheme } from "react-native-paper";

import { PLAYER_HEIGHT } from "../../constants";
import { useKeyboardVisibility } from "../../context/keyboard";
import ScreenView from "../common/ScreenView";

const Search = () => {
  const keyboardVisible = useKeyboardVisibility();
  const [searchQuery, setSearchQuery] = React.useState("");
  const theme = useTheme();
  return (
    <ScreenView
      style={{
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <View>
        <Text>SafeAreaView Search</Text>
      </View>
      <Searchbar
        blurOnSubmit
        placeholder="Search"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={{
          marginBottom: 4,
          transform: [{ translateY: keyboardVisible ? 0 : -PLAYER_HEIGHT }],
          backgroundColor: theme.colors.surface,
        }}
      />
    </ScreenView>
  );
};

export default Search;
