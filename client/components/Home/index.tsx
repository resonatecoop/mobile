import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Title } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useLastUpdatedArtists } from "../../api/artists";
import FeaturedPlaylistCard from "./FeaturedPlaylistCard";

const Home = () => {
  const { data: lastUpdatedArtists } = useLastUpdatedArtists();

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Title style={[styles.horizontalSpacing, styles.title]}>
          Featured Playlists
        </Title>
        <FlatList
          contentContainerStyle={styles.horizontalSpacing}
          showsHorizontalScrollIndicator={false}
          data={lastUpdatedArtists?.data}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item, index, separators }) => (
            <FeaturedPlaylistCard
              image={item.images.sm}
              title={item.displayName}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
  },
  title: {
    marginBottom: 12,
  },
  horizontalSpacing: {
    paddingHorizontal: 12,
  },
  separator: {
    marginLeft: 12,
  },
});

export default Home;
