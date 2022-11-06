import { useQuery } from "@tanstack/react-query";
import api from "./ky";

const artistKeys = {
  all: ["artists"] as const,
  lastUpdated: ({ limit, page }: GetLastUpdatedArtistsParams = {}) => [
    ...artistKeys.all,
    "lastUpdated",
    { limit, page },
  ],
};

export function useLastUpdatedArtists(
  params: GetLastUpdatedArtistsParams = {}
) {
  return useQuery(artistKeys.lastUpdated(params), () =>
    getLastUpdatedArtists(params)
  );
}

function getLastUpdatedArtists({
  limit,
  page,
}: GetLastUpdatedArtistsParams = {}) {
  return api
    .get("artists/updated", {
      searchParams: {
        limit: limit ?? "",
        page: page ?? "",
      },
    })
    .json<GetLastUpdatedArtistsResponse>();
}

interface GetLastUpdatedArtistsResponse {
  data: {
    displayName: string;
    id: string;
    images: {
      sm: string;
      md: string;
      lg: string;
    };
  }[];
  count: number;
  numberOfPages: number;
}

interface GetLastUpdatedArtistsParams {
  limit?: number;
  page?: number;
}
