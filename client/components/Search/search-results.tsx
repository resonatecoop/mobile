import { View, StyleSheet, Dimensions } from "react-native";
import { Text, List } from "react-native-paper";

import { PLAYER_HEIGHT } from "../../constants";

interface SearchResultItemProps {
  id: string;
  artist: string;
  title: string;
  kind: string;
  imageUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
}
export function SearchResultTrackItem({
  title,
  artist,
  imageUrl,
  imageWidth,
  imageHeight,
}: SearchResultItemProps) {
  return (
    <List.Item
      title={title}
      description={artist}
      left={(props) => (
        <List.Image
          {...props}
          variant="image"
          source={{ uri: imageUrl, height: imageHeight, width: imageWidth }}
        />
      )}
    />
  );
}

interface SearchResultsEmptyProps {
  searchQuery: string;
}

export function SearchResultsEmpty({ searchQuery }: SearchResultsEmptyProps) {
  return (
    <View style={styles.container}>
      <Text variant="titleMedium">{`Couldn't find "${searchQuery}"`}</Text>
      <Text variant="bodySmall">
        Try searching again using different keywords
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height - PLAYER_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
});
