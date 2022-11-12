import React from "react";
import { StyleSheet } from "react-native";
import { Card, Title } from "react-native-paper";

export interface CarouselListCardProps {
  image: string;
  title: string;
}

export default function CarouselListCard({
  image,
  title,
}: CarouselListCardProps) {
  return (
    <Card style={[styles.container]}>
      <Card.Cover
        source={{
          uri: image,
        }}
        style={styles.image}
      />
      <Card.Content style={styles.content}>
        <Title numberOfLines={1} style={styles.title}>
          {title}
        </Title>
      </Card.Content>
    </Card>
  );
}

const CARD_WIDTH = 150;

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
  },
  image: {
    height: CARD_WIDTH,
    width: CARD_WIDTH,
  },
  content: {
    paddingHorizontal: 4,
    width: "100%",
    paddingBottom: 0,
  },
  title: {
    marginTop: 0,
    fontSize: 12,
    fontWeight: "700",
    marginVertical: 0,
  },
});
