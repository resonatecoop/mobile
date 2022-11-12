import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useLastUpdatedArtists } from "../../api/artists";
import { useFeaturedPlaylists } from "../../api/trackgroups";
import CarouselList from "./CarouselList";
import CarouselListCard from "./CarouselListCard";

const Home = () => {
  const { data: lastUpdatedArtists } = useLastUpdatedArtists();
  const { data: featuredPlaylists } = useFeaturedPlaylists();

  return (
    <SafeAreaView>
      <ScrollView>
        <CarouselList
          title="Featured Playlists"
          keyExtractor={(item) => item.id}
          data={featuredPlaylists?.data}
          renderItem={({ item }) => (
            <CarouselListCard
              image={item.images.small.url}
              title={item.title}
            />
          )}
        />
        <CarouselList
          title="Latest Artists"
          keyExtractor={(item) => item.id.toString()}
          data={lastUpdatedArtists?.data}
          renderItem={({ item }) => (
            <CarouselListCard
              image={item.images["profile_photo-m"] ?? ""}
              title={item.name}
            />
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
