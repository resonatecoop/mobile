import { useMemo } from "react";
import { View, FlatList } from "react-native";
import { ProgressBar, Searchbar } from "react-native-paper";

import { Image, useSearch } from "../../api/search";
import { useDebouncedState } from "../../hooks/useDebouncedState";
import ScreenView from "../common/ScreenView";
import { SearchResultTrackItem, SearchResultsEmpty } from "./search-results";

const Search = () => {
  const {
    value,
    setValue,
    debouncedValue: searchQuery,
  } = useDebouncedState("");
  const {
    data: searchResult,
    isFetching,
    error,
  } = useSearch({ q: searchQuery });

  const tracks = useMemo(() => {
    return searchResult?.data.filter((item) => item.kind === "track") ?? [];
  }, [searchResult]);

  const hasNoResults = error != null && tracks.length === 0;

  return (
    <ScreenView>
      <Searchbar placeholder="Search" value={value} onChangeText={setValue} />
      <ProgressBar indeterminate visible={isFetching} />
      <View>
        <FlatList
          data={tracks}
          ListEmptyComponent={
            hasNoResults ? (
              <SearchResultsEmpty searchQuery={searchQuery} />
            ) : null
          }
          renderItem={({ item }) => {
            return (
              <SearchResultTrackItem
                id={item._id}
                artist={item.display_artist}
                title={item.title}
                kind={item.kind}
                imageUrl={item.images.small.url}
                imageWidth={item.images.small.width}
                imageHeight={item.images.small.height}
              />
            );
          }}
        />
      </View>
    </ScreenView>
  );
};

export default Search;
