import { useQuery } from "@tanstack/react-query";

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
}: GetLastUpdatedArtistsParams = {}): Promise<GetLastUpdatedArtistsResponse> {
  return Promise.resolve({
    data: [
      {
        displayName: "Groovy",
        id: "abc123",
        images: {
          sm: "https://images.unsplash.com/photo-1524650359799-842906ca1c06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
          md: "",
          lg: "",
        },
      },
      {
        displayName: "Grim",
        id: "bbc123",
        images: {
          sm: "https://images.unsplash.com/photo-1524650359799-842906ca1c06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
          md: "",
          lg: "",
        },
      },
      {
        displayName: "Cool longer name",
        id: "cbc123",
        images: {
          sm: "https://images.unsplash.com/photo-1524650359799-842906ca1c06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
          md: "",
          lg: "",
        },
      },
    ],
    count: 1,
    numberOfPages: 1,
  });
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
