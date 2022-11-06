import React from "react";
import * as dotenv from "dotenv";
import { View, FlatList } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLastUpdatedArtists } from "../../api";

const Home = () => {
  const { data: lastUpdatedArtists, error } = useLastUpdatedArtists();

  console.log(error, "DATA");

  return (
    <SafeAreaView>
      <View>
        <Text>Featured Playlists</Text>
        <FlatList
          data={lastUpdatedArtists?.data}
          horizontal
          renderItem={({ item }) => <Text>{item.displayName}</Text>}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
