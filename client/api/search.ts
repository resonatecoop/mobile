import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { FetchError } from "./error";
import { FetchClient } from "./fetch-client";

const searchAPI = new FetchClient({
  baseURL: "https://stream.resonate.coop/api/v3/search",
});

const searchKeys = {
  all: ["search"] as const,
  list: (filters: SearchParams) =>
    [...searchKeys.all, "list", { filters }] as const,
};

export function useSearch(params: SearchParams, options?: UseQueryOptions) {
  return useQuery({
    queryKey: searchKeys.list(params),
    queryFn: ({ queryKey: [_, __, { filters }] }) => search(filters),
    enabled: params.q !== "",
    retry: (errorCount, error) => {
      if (errorCount > 3) {
        return false;
      }
      if (error instanceof FetchError) {
        switch (error.status) {
          case 429:
            return true;
          default:
            return false;
        }
      }
      return false;
    },
  });
}

function search({ limit, page, q }: SearchParams): Promise<SearchResponse> {
  const filters: Record<string, string> = {
    q: q.trim(),
  };
  if (limit != null) {
    filters.limit = limit.toString();
  }
  if (page != null) {
    filters.page = page.toString();
  }
  return searchAPI.get("", filters);
}

interface SearchResponse {
  data: {
    tags: string[];
    _id: string;
    track_id: number;
    display_artist: string;
    title: string;
    kind: string;
    score: number;
    cover: string;
    images: {
      small: Image;
      medium: Image;
    };
  }[];
}

export interface Image {
  width: number;
  height: number;
  url: string;
}

interface SearchParams {
  limit?: number;
  page?: number;
  q: string;
}
