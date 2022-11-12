import React from "react";
import { View, FlatList, StyleSheet, ListRenderItem } from "react-native";
import { Title } from "react-native-paper";

interface CarouselListProps<TItem> {
  title: string;
  itemGap?: number;
  keyExtractor: (item: TItem, index: number) => string;
  data: TItem[] | null | undefined;
  renderItem: ListRenderItem<TItem>;
}
function CarouselList<TItem extends unknown>({
  title,
  data,
  itemGap = 12,
  keyExtractor,
  renderItem,
}: CarouselListProps<TItem>) {
  return (
    <View style={styles.container}>
      <Title style={[styles.horizontalSpacing, styles.title]}>{title}</Title>
      <FlatList
        contentContainerStyle={styles.horizontalSpacing}
        showsHorizontalScrollIndicator={false}
        data={data}
        horizontal
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={() => (
          <View style={[{ marginLeft: itemGap }]} />
        )}
      />
    </View>
  );
}

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
});

export default CarouselList;
