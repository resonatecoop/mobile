class PlaylistItem {
    name: string;
    uri: string;
    isVideo: boolean;
    constructor(name: string, uri: string, isVideo: boolean) {
      this.name = name;
      this.uri = uri;
      this.isVideo = isVideo;
    }
  }

export const PLAYLIST = [
    new PlaylistItem(
      "Comfort Fit - “Sorry”",
      "https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Comfort_Fit_-_03_-_Sorry.mp3",
      false
    ),
    new PlaylistItem(
      "Big Buck Bunny",
      "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
      true
    ),
    new PlaylistItem(
      "Mildred Bailey – “All Of Me”",
      "https://ia800304.us.archive.org/34/items/PaulWhitemanwithMildredBailey/PaulWhitemanwithMildredBailey-AllofMe.mp3",
      false
    ),
    new PlaylistItem(
      "Popeye - I don't scare",
      "https://ia800501.us.archive.org/11/items/popeye_i_dont_scare/popeye_i_dont_scare_512kb.mp4",
      true
    ),
    new PlaylistItem(
      "Podington Bear - “Rubber Robot”",
      "https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Podington_Bear_-_Rubber_Robot.mp3",
      false
    )
  ];