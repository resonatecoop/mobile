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
        name: "Jaded Forum",
        id: 21687,
        images: {
          "cover_photo-l":
            "https://resonate.is/wp-content/uploads/ultimatemember/21687/cover_photo-1500.jpeg",
          "cover_photo-s":
            "https://resonate.is/wp-content/uploads/ultimatemember/21687/cover_photo-500.jpeg",
          "cover_photo-m":
            "https://resonate.is/wp-content/uploads/ultimatemember/21687/cover_photo-600.jpeg",
          cover_photo:
            "https://resonate.is/wp-content/uploads/ultimatemember/21687/cover_photo.jpeg",

          "profile_photo-xxl":
            "https://resonate.is/wp-content/uploads/ultimatemember/21687/profile_photo-1200x1200.png",
          "profile_photo-m":
            "https://resonate.is/wp-content/uploads/ultimatemember/21687/profile_photo-300x300.png",
          "profile_photo-l":
            "https://resonate.is/wp-content/uploads/ultimatemember/21687/profile_photo-400x400.png",
          "profile_photo-xs":
            "https://resonate.is/wp-content/uploads/ultimatemember/21687/profile_photo-40x40.png",
          "profile_photo-xl":
            "https://resonate.is/wp-content/uploads/ultimatemember/21687/profile_photo-800x800.png",
          "profile_photo-sm":
            "https://resonate.is/wp-content/uploads/ultimatemember/21687/profile_photo-80x80.png",
        },
      },
      {
        name: "BREADMACHINE",
        id: 21108,
        images: {
          "profile_photo-m":
            "https://resonate.is/wp-content/uploads/ultimatemember/21108/profile_photo-300x300.jpg",
          "profile_photo-xs":
            "https://resonate.is/wp-content/uploads/ultimatemember/21108/profile_photo-40x40.jpg",
          "profile_photo-sm":
            "https://resonate.is/wp-content/uploads/ultimatemember/21108/profile_photo-80x80.jpg",
          profile_photo:
            "https://resonate.is/wp-content/uploads/ultimatemember/21108/profile_photo.jpg",
        },
      },
      {
        name: "Alex Griffiths",
        id: 18010,
        images: {
          "profile_photo-m":
            "https://resonate.is/wp-content/uploads/ultimatemember/18010/profile_photo-300x300.jpg",
          "profile_photo-l":
            "https://resonate.is/wp-content/uploads/ultimatemember/18010/profile_photo-400x400.jpg",
          "profile_photo-xs":
            "https://resonate.is/wp-content/uploads/ultimatemember/18010/profile_photo-40x40.jpg",
          "profile_photo-sm":
            "https://resonate.is/wp-content/uploads/ultimatemember/18010/profile_photo-80x80.jpg",
          profile_photo:
            "https://resonate.is/wp-content/uploads/ultimatemember/18010/profile_photo.jpg",
        },
      },
      {
        name: "w_lf",
        id: 22154,
        images: {
          "cover_photo-l":
            "https://resonate.is/wp-content/uploads/ultimatemember/22154/cover_photo-1500.jpg",
          "cover_photo-s":
            "https://resonate.is/wp-content/uploads/ultimatemember/22154/cover_photo-500.jpg",
          "cover_photo-m":
            "https://resonate.is/wp-content/uploads/ultimatemember/22154/cover_photo-600.jpg",
          cover_photo:
            "https://resonate.is/wp-content/uploads/ultimatemember/22154/cover_photo.jpg",
          "profile_photo-m":
            "https://resonate.is/wp-content/uploads/ultimatemember/22154/profile_photo-300x300.jpg",
          "profile_photo-l":
            "https://resonate.is/wp-content/uploads/ultimatemember/22154/profile_photo-400x400.jpg",
          "profile_photo-xs":
            "https://resonate.is/wp-content/uploads/ultimatemember/22154/profile_photo-40x40.jpg",
          "profile_photo-xl":
            "https://resonate.is/wp-content/uploads/ultimatemember/22154/profile_photo-800x800.jpg",
          "profile_photo-sm":
            "https://resonate.is/wp-content/uploads/ultimatemember/22154/profile_photo-80x80.jpg",
          profile_photo:
            "https://resonate.is/wp-content/uploads/ultimatemember/22154/profile_photo.jpg",
        },
      },
      {
        name: "Bios Contrast",
        id: 19763,
        images: {
          "cover_photo-l":
            "https://resonate.is/wp-content/uploads/ultimatemember/19763/cover_photo-1500.jpg",
          "cover_photo-s":
            "https://resonate.is/wp-content/uploads/ultimatemember/19763/cover_photo-500.jpg",
          "cover_photo-m":
            "https://resonate.is/wp-content/uploads/ultimatemember/19763/cover_photo-600.jpg",
          cover_photo:
            "https://resonate.is/wp-content/uploads/ultimatemember/19763/cover_photo.jpg",
          "profile_photo-xxl":
            "https://resonate.is/wp-content/uploads/ultimatemember/19763/profile_photo-1200x1200.jpg",
          "profile_photo-m":
            "https://resonate.is/wp-content/uploads/ultimatemember/19763/profile_photo-300x300.jpg",
          "profile_photo-l":
            "https://resonate.is/wp-content/uploads/ultimatemember/19763/profile_photo-400x400.jpg",
          "profile_photo-xs":
            "https://resonate.is/wp-content/uploads/ultimatemember/19763/profile_photo-40x40.jpg",
          "profile_photo-xl":
            "https://resonate.is/wp-content/uploads/ultimatemember/19763/profile_photo-800x800.jpg",
          "profile_photo-sm":
            "https://resonate.is/wp-content/uploads/ultimatemember/19763/profile_photo-80x80.jpg",
          profile_photo:
            "https://resonate.is/wp-content/uploads/ultimatemember/19763/profile_photo.jpg",
        },
      },
      {
        name: "‡Starving Poet§",
        id: 8091,
        images: {
          "cover_photo-l":
            "https://resonate.is/wp-content/uploads/ultimatemember/8091/cover_photo-1500.jpg",
          "cover_photo-s":
            "https://resonate.is/wp-content/uploads/ultimatemember/8091/cover_photo-500.jpg",
          "cover_photo-m":
            "https://resonate.is/wp-content/uploads/ultimatemember/8091/cover_photo-600.jpg",
          cover_photo:
            "https://resonate.is/wp-content/uploads/ultimatemember/8091/cover_photo.jpg",
          "profile_photo-xxl":
            "https://resonate.is/wp-content/uploads/ultimatemember/8091/profile_photo-1200x1200.jpg",
          "profile_photo-m":
            "https://resonate.is/wp-content/uploads/ultimatemember/8091/profile_photo-300x300.jpg",
          "profile_photo-l":
            "https://resonate.is/wp-content/uploads/ultimatemember/8091/profile_photo-400x400.jpg",
          "profile_photo-xs":
            "https://resonate.is/wp-content/uploads/ultimatemember/8091/profile_photo-40x40.jpg",
          "profile_photo-xl":
            "https://resonate.is/wp-content/uploads/ultimatemember/8091/profile_photo-800x800.jpg",
          "profile_photo-sm":
            "https://resonate.is/wp-content/uploads/ultimatemember/8091/profile_photo-80x80.jpg",
          profile_photo:
            "https://resonate.is/wp-content/uploads/ultimatemember/8091/profile_photo.jpg",
        },
      },
      {
        name: "Jason Murray",
        id: 12122,
        images: {
          "cover_photo-l":
            "https://resonate.is/wp-content/uploads/ultimatemember/12122/cover_photo-1500x469.jpg",
          "cover_photo-s":
            "https://resonate.is/wp-content/uploads/ultimatemember/12122/cover_photo-500x156.jpg",
          cover_photo:
            "https://resonate.is/wp-content/uploads/ultimatemember/12122/cover_photo.jpg",
          "profile_photo-m":
            "https://resonate.is/wp-content/uploads/ultimatemember/12122/profile_photo-300x300.jpg",
          "profile_photo-l":
            "https://resonate.is/wp-content/uploads/ultimatemember/12122/profile_photo-400x400.jpg",
          "profile_photo-xs":
            "https://resonate.is/wp-content/uploads/ultimatemember/12122/profile_photo-40x40.jpg",
          "profile_photo-sm":
            "https://resonate.is/wp-content/uploads/ultimatemember/12122/profile_photo-80x80.jpg",
          profile_photo:
            "https://resonate.is/wp-content/uploads/ultimatemember/12122/profile_photo.jpg",
        },
      },
      {
        name: "paun",
        id: 21630,
        images: {
          "cover_photo-s":
            "https://resonate.is/wp-content/uploads/ultimatemember/21630/cover_photo-500.jpeg",
          "cover_photo-m":
            "https://resonate.is/wp-content/uploads/ultimatemember/21630/cover_photo-600.jpeg",
          cover_photo:
            "https://resonate.is/wp-content/uploads/ultimatemember/21630/cover_photo.jpeg",
          "profile_photo-m":
            "https://resonate.is/wp-content/uploads/ultimatemember/21630/profile_photo-300x300.jpeg",
          "profile_photo-l":
            "https://resonate.is/wp-content/uploads/ultimatemember/21630/profile_photo-400x400.jpeg",
          "profile_photo-xs":
            "https://resonate.is/wp-content/uploads/ultimatemember/21630/profile_photo-40x40.jpeg",
          "profile_photo-xl":
            "https://resonate.is/wp-content/uploads/ultimatemember/21630/profile_photo-800x800.jpeg",
          "profile_photo-sm":
            "https://resonate.is/wp-content/uploads/ultimatemember/21630/profile_photo-80x80.jpeg",
          profile_photo:
            "https://resonate.is/wp-content/uploads/ultimatemember/21630/profile_photo.jpeg",
        },
      },
      {
        name: "Jooiing",
        id: 11905,
        images: {
          "cover_photo-l":
            "https://resonate.is/wp-content/uploads/ultimatemember/11905/cover_photo-1500x469.jpg",
          "cover_photo-s":
            "https://resonate.is/wp-content/uploads/ultimatemember/11905/cover_photo-500x156.jpg",
          cover_photo:
            "https://resonate.is/wp-content/uploads/ultimatemember/11905/cover_photo.jpg",
          "profile_photo-m":
            "https://resonate.is/wp-content/uploads/ultimatemember/11905/profile_photo-300x300.jpg",
          "profile_photo-l":
            "https://resonate.is/wp-content/uploads/ultimatemember/11905/profile_photo-400x400.jpg",
          "profile_photo-xs":
            "https://resonate.is/wp-content/uploads/ultimatemember/11905/profile_photo-40x40.jpg",
          "profile_photo-sm":
            "https://resonate.is/wp-content/uploads/ultimatemember/11905/profile_photo-80x80.jpg",
          profile_photo:
            "https://resonate.is/wp-content/uploads/ultimatemember/11905/profile_photo.jpg",
        },
      },
    ],
    numberOfPages: null,
  });
}

interface GetLastUpdatedArtistsResponse {
  data: {
    name: string;
    id: number;
    images: Image;
  }[];
  count?: number;
  numberOfPages: number | null;
}

interface Image {
  [imageKey: string]: string | undefined;
}

interface GetLastUpdatedArtistsParams {
  limit?: number;
  page?: number;
}
