import React from "react";
import { Searchbar, useTheme } from "react-native-paper";

import ScreenView from "../common/ScreenView";

const Search = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const theme = useTheme();
  return (
    <ScreenView>
      <Searchbar
        placeholder="Search"
        value={searchQuery}
        onChangeText={setSearchQuery}
        elevation={1}
        style={{
          backgroundColor: theme.colors.surface,
        }}
      />
    </ScreenView>
  );
};

export default Search;
