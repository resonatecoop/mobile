import { useQuery } from "@tanstack/react-query";

const trackgroupKeys = {
  all: ["trackgroups"] as const,
  featuredPlaylists: ({ limit, page, order }: GetFeaturedPlaylistsParams) => [
    ...trackgroupKeys.all,
    "list",
    { featured: true, type: "playlist", limit, order, page },
  ],
};

export function useFeaturedPlaylists(params: GetFeaturedPlaylistsParams = {}) {
  return useQuery(trackgroupKeys.featuredPlaylists(params), () =>
    getFeaturedPlaylists(params)
  );
}

function getFeaturedPlaylists({
  limit,
  page,
}: GetFeaturedPlaylistsParams = {}): Promise<GetTrackgroupsResponse> {
  return Promise.resolve({
    data: [
      {
        about: "",
        cover:
          "https://static.resonate.is/track-artwork/600x600/a596a32d-aa0a-4d7d-baf0-02a18f92c114",
        creator_id: 12788,
        display_artist: null,
        id: "4d646ccd-7e07-411b-b6f5-25640db46c7c",
        slug: "staff-picks-nov20",
        tags: [],
        title: "Staff Picks #Nov20",
        type: "playlist",
        cover_metadata: null,
        user: {
          id: 12788,
          nicename: "upload",
        },
        uri: "https://stream.resonate.coop/v3/trackgroups/4d646ccd-7e07-411b-b6f5-25640db46c7c",
        images: {
          small: {
            width: 120,
            height: 120,
            url: "https://static.resonate.is/track-artwork/120x120/a596a32d-aa0a-4d7d-baf0-02a18f92c114",
          },
          medium: {
            width: 600,
            height: 600,
            url: "https://static.resonate.is/track-artwork/600x600/a596a32d-aa0a-4d7d-baf0-02a18f92c114",
          },
          large: {
            width: 1500,
            height: 1500,
            url: "https://static.resonate.is/track-artwork/1500x1500/a596a32d-aa0a-4d7d-baf0-02a18f92c114",
          },
        },
      },
      {
        about: null,
        cover:
          "https://dash.resonate.coop/images/9fdcace0-8646-44bb-b06c-89be6dfe62b8-x600.jpg",
        creator_id: 17929,
        display_artist: null,
        id: "154f1656-681e-4d88-aeb5-c9be126d9e03",
        slug: "birdsite",
        tags: [],
        title: "birdsite",
        type: "playlist",
        cover_metadata: {
          id: "9fdcace0-8646-44bb-b06c-89be6dfe62b8",
          owner_id: 12335,
        },
        user: {
          id: 17929,
          nicename: "boopboop",
        },
        uri: "https://stream.resonate.coop/v3/trackgroups/154f1656-681e-4d88-aeb5-c9be126d9e03",
        images: {
          small: {
            width: 120,
            height: 120,
            url: "https://dash.resonate.coop/images/9fdcace0-8646-44bb-b06c-89be6dfe62b8-x120.jpg",
          },
          medium: {
            width: 600,
            height: 600,
            url: "https://dash.resonate.coop/images/9fdcace0-8646-44bb-b06c-89be6dfe62b8-x600.jpg",
          },
          large: {
            width: 1500,
            height: 1500,
            url: "https://dash.resonate.coop/images/9fdcace0-8646-44bb-b06c-89be6dfe62b8-x1500.jpg",
          },
        },
      },
      {
        about: null,
        cover:
          "https://dash.resonate.coop/images/949244ea-9e47-4d04-a8eb-9b4ca74906ec-x600.jpg",
        creator_id: 17778,
        display_artist: null,
        id: "e3b78e08-18a4-4213-af58-7ae1769c4c40",
        slug: "feral-five",
        tags: [],
        title: "Feral Five",
        type: "playlist",
        cover_metadata: {
          id: "949244ea-9e47-4d04-a8eb-9b4ca74906ec",
          owner_id: 12778,
        },
        user: {
          id: 17778,
          nicename: "rajames512",
        },
        uri: "https://stream.resonate.coop/v3/trackgroups/e3b78e08-18a4-4213-af58-7ae1769c4c40",
        images: {
          small: {
            width: 120,
            height: 120,
            url: "https://dash.resonate.coop/images/949244ea-9e47-4d04-a8eb-9b4ca74906ec-x120.jpg",
          },
          medium: {
            width: 600,
            height: 600,
            url: "https://dash.resonate.coop/images/949244ea-9e47-4d04-a8eb-9b4ca74906ec-x600.jpg",
          },
          large: {
            width: 1500,
            height: 1500,
            url: "https://dash.resonate.coop/images/949244ea-9e47-4d04-a8eb-9b4ca74906ec-x1500.jpg",
          },
        },
      },
      {
        about: null,
        cover:
          "https://dash.resonate.coop/images/e751d673-67a9-44fc-a6c6-c124bc76ab85-x600.jpg",
        creator_id: 11719,
        display_artist: null,
        id: "771b8b37-788e-4917-821c-8e428919a4dd",
        slug: "wow-fuschia",
        tags: [],
        title: "Wow Fuschia",
        type: "playlist",
        cover_metadata: {
          id: "e751d673-67a9-44fc-a6c6-c124bc76ab85",
          owner_id: 12778,
        },
        user: {
          id: 11719,
          nicename: "kat-five",
        },
        uri: "https://stream.resonate.coop/v3/trackgroups/771b8b37-788e-4917-821c-8e428919a4dd",
        images: {
          small: {
            width: 120,
            height: 120,
            url: "https://dash.resonate.coop/images/e751d673-67a9-44fc-a6c6-c124bc76ab85-x120.jpg",
          },
          medium: {
            width: 600,
            height: 600,
            url: "https://dash.resonate.coop/images/e751d673-67a9-44fc-a6c6-c124bc76ab85-x600.jpg",
          },
          large: {
            width: 1500,
            height: 1500,
            url: "https://dash.resonate.coop/images/e751d673-67a9-44fc-a6c6-c124bc76ab85-x1500.jpg",
          },
        },
      },
      {
        about: null,
        cover:
          "https://dash.resonate.coop/images/09f0c2df-cbe9-49e7-8df5-089659293208-x600.jpg",
        creator_id: 20911,
        display_artist: null,
        id: "7495dacc-8208-4c19-bdbb-12f207076bfd",
        slug: "how-do-you-delete-a-playlist",
        tags: [],
        title: "HOW DO YOU DELETE A PLAYLIST",
        type: "playlist",
        cover_metadata: {
          id: "09f0c2df-cbe9-49e7-8df5-089659293208",
          owner_id: 19764,
        },
        user: {
          id: 20911,
          nicename: "mobsil",
        },
        uri: "https://stream.resonate.coop/v3/trackgroups/7495dacc-8208-4c19-bdbb-12f207076bfd",
        images: {
          small: {
            width: 120,
            height: 120,
            url: "https://dash.resonate.coop/images/09f0c2df-cbe9-49e7-8df5-089659293208-x120.jpg",
          },
          medium: {
            width: 600,
            height: 600,
            url: "https://dash.resonate.coop/images/09f0c2df-cbe9-49e7-8df5-089659293208-x600.jpg",
          },
          large: {
            width: 1500,
            height: 1500,
            url: "https://dash.resonate.coop/images/09f0c2df-cbe9-49e7-8df5-089659293208-x1500.jpg",
          },
        },
      },
      {
        about: null,
        cover:
          "https://dash.resonate.coop/images/3fc5dadb-4c87-47ed-be17-53d8974b36f9-x600.jpg",
        creator_id: 18562,
        display_artist: null,
        id: "912f8d9d-7012-48e9-8769-7f69d1fe70f4",
        slug: "2022-06-19-resonate-on-camp-radio",
        tags: [],
        title: "2022-06-19 Resonate on CAMP Radio",
        type: "playlist",
        cover_metadata: {
          id: "3fc5dadb-4c87-47ed-be17-53d8974b36f9",
          owner_id: 19724,
        },
        user: {
          id: 18562,
          nicename: "caprenter",
        },
        uri: "https://stream.resonate.coop/v3/trackgroups/912f8d9d-7012-48e9-8769-7f69d1fe70f4",
        images: {
          small: {
            width: 120,
            height: 120,
            url: "https://dash.resonate.coop/images/3fc5dadb-4c87-47ed-be17-53d8974b36f9-x120.jpg",
          },
          medium: {
            width: 600,
            height: 600,
            url: "https://dash.resonate.coop/images/3fc5dadb-4c87-47ed-be17-53d8974b36f9-x600.jpg",
          },
          large: {
            width: 1500,
            height: 1500,
            url: "https://dash.resonate.coop/images/3fc5dadb-4c87-47ed-be17-53d8974b36f9-x1500.jpg",
          },
        },
      },
    ],
    count: 66,
    numberOfPages: 11,
    status: "ok",
  });
}

interface GetTrackgroupsResponse {
  data: {
    about: string | null;
    cover: string;
    creator_id: number;
    display_artist: any;
    id: string;
    slug: string;
    tags: string[];
    title: string;
    type: string;
    cover_metadata: any;
    user: {
      id: number;
      nicename: string;
    };
    uri: string;
    images: {
      small: Image;
      medium: Image;
      large: Image;
    };
  }[];
  count: number;
  numberOfPages: number;
}

interface Image {
  width: number;
  height: number;
  url: string;
}

interface GetFeaturedPlaylistsParams {
  limit?: number;
  page?: number;
  order?: "random" | "oldest" | "newest";
}
