import React from "react";
import { KeyboardAvoidingView, Keyboard } from "react-native";
import { Text, Searchbar } from "react-native-paper";

import { PLAYER_HEIGHT } from "../../constants";
import { useKeyboardVisibility } from "../../context/keyboard";
import ScreenView from "../common/ScreenView";

const Search = () => {
  const keyboardVisible = useKeyboardVisibility();
  return (
    <ScreenView
      style={{
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <Text>SafeAreaView Search</Text>
      <Searchbar
        placeholder="Search"
        defaultValue="ello"
        value="hello"
        style={{
          marginBottom: keyboardVisible ? 0 : PLAYER_HEIGHT,
        }}
      />
    </ScreenView>
  );
};

export default Search;
