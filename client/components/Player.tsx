import * as React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import {
  Audio,
  AVPlaybackStatus,
  InterruptionModeAndroid,
  InterruptionModeIOS,
  ResizeMode,
  Video,
} from "expo-av";
import Slider from "@react-native-community/slider";
import { Appbar, useTheme, Text, IconButton, Button } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import isNil from "lodash/isNil";

import { getMMSSFromMillis } from "../utils";
import { PLAYLIST } from "../test";

enum LoopingType {
  ALL = 0,
  ONE = 1,
}

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");
const BACKGROUND_COLOR = "#FFF8ED";
const DISABLED_OPACITY = 0.5;
const FONT_SIZE = 14;
const LOADING_STRING = "... loading ...";
const BUFFERING_STRING = "...buffering...";
const RATE_SCALE = 3.0;
const VIDEO_CONTAINER_HEIGHT = (DEVICE_HEIGHT * 2.0) / 5.0 - FONT_SIZE * 2;

export default function Player(): JSX.Element {
  const [index, setIndex] = React.useState<number>(0);
  const [isSeeking, setIsSeeking] = React.useState<boolean>(false);
  const [shouldPlayAtEndOfSeek, setShouldPlayAtEndOfSeek] =
    React.useState<boolean>(false);
  const [playbackInstance, setPlaybackInstance] =
    React.useState<Audio.Sound | null>(null);
  let video: React.LegacyRef<HTMLVideoElement | null> = null;
  const [showVideo, setShowVideo] = React.useState<boolean>(false);
  const [playbackInstanceName, setPlaybackInstanceName] =
    React.useState<string>(LOADING_STRING);
  const [loopingType, setLoopingType] = React.useState<LoopingType>(
    LoopingType.ALL
  );
  const [muted, setMuted] = React.useState<boolean>(false);
  const [playbackInstancePosition, setPlaybackInstancePosition] =
    React.useState<number | null>(null);
  const [playbackInstanceDuration, setPlaybackInstanceDuration] =
    React.useState<number | null>(null);
  const [shouldPlay, setShouldPlay] = React.useState<boolean>(false);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [isBuffering, setIsBuffering] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [shouldCorrectPitch, setShouldCorrectPitch] =
    React.useState<boolean>(false);
  const [volume, setVolume] = React.useState<number>(1.0);
  const [rate, setRate] = React.useState<number>(1.0);
  const [videoWidth, setVideoWidth] = React.useState<number>(DEVICE_WIDTH);
  const [videoHeight, setVideoHeight] = React.useState<number>(
    VIDEO_CONTAINER_HEIGHT
  );
  const [poster, setPoster] = React.useState<boolean>(false);
  const [useNativeControls, setUseNativeControls] =
    React.useState<boolean>(false);
  const [fullscreen, setFullscreen] = React.useState<boolean>(false);
  const [throughEarpiece, setThroughEarpiece] = React.useState<boolean>(false);

  const { bottom } = useSafeAreaInsets();
  const theme = useTheme();

  React.useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: false,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
      playThroughEarpieceAndroid: false,
    });
    if (playbackInstance == null) {
      _loadNewPlaybackInstance(false);
    }
  }, []);

  async function _loadNewPlaybackInstance(playing: boolean) {
    if (playbackInstance != null) {
      await playbackInstance.unloadAsync();
      setPlaybackInstance(null);
    }

    const source = { uri: PLAYLIST[index].uri };
    const initialStatus = {
      shouldPlay: playing,
      rate,
      shouldCorrectPitch,
      volume,
      isMuted: muted,
      isLooping: loopingType === LoopingType.ONE,
      // // UNCOMMENT THIS TO TEST THE OLD androidImplementation:
      // androidImplementation: 'MediaPlayer',
    };

    // if (PLAYLIST[index].isVideo) {
    //   await video.loadAsync(source, initialStatus);
    //   playbackInstance(video);
    //   const status = await video.getStatusAsync();
    // } else {
    const { sound, status } = await Audio.Sound.createAsync(
      source,
      initialStatus,
      _onPlaybackStatusUpdate
    );
    setPlaybackInstance(sound);
    // }

    _updateScreenForLoading(false);
  }

  function _mountVideo(component: HTMLVideoElement) {
    // TODO: implement video
    // video = component;
    // _loadNewPlaybackInstance(false);
  }

  function _updateScreenForLoading(isLoading: boolean) {
    if (isLoading) {
      setShowVideo(false);
      setIsPlaying(false);
      setPlaybackInstanceName(LOADING_STRING);
      setPlaybackInstanceDuration(null);
      setPlaybackInstancePosition(null);
      setIsLoading(true);
    } else {
      setPlaybackInstanceName(PLAYLIST[index].name);
      setShowVideo(PLAYLIST[index].isVideo);
      setIsLoading(false);
    }
  }

  function _onPlaybackStatusUpdate(status: AVPlaybackStatus): void {
    if (status.isLoaded) {
      setPlaybackInstancePosition(status.positionMillis);
      setPlaybackInstanceDuration(status.durationMillis ?? null);
      setShouldPlay(status.shouldPlay);
      setIsPlaying(status.isPlaying);
      setIsBuffering(status.isBuffering);
      setRate(status.rate);
      setMuted(status.isMuted);
      setVolume(status.volume);
      setLoopingType(status.isLooping ? LoopingType.ONE : LoopingType.ALL);
      setShouldCorrectPitch(status.shouldCorrectPitch);

      if (status.didJustFinish && !status.isLooping) {
        _advanceIndex(true);
        _updatePlaybackInstanceForIndex(true);
      }
    } else {
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  }

  function _onLoadStart() {
    console.log(`ON LOAD START`);
  }

  function _onLoad(status: any) {
    console.log(`ON LOAD : ${JSON.stringify(status)}`);
  }

  function _onError(error: any) {
    console.log(`ON ERROR : ${error}`);
  }

  function _onReadyForDisplay(event: {
    naturalSize: { height: number; width: number };
  }) {
    const widestHeight =
      (DEVICE_WIDTH * event.naturalSize.height) / event.naturalSize.width;
    if (widestHeight > VIDEO_CONTAINER_HEIGHT) {
      setVideoWidth(
        (VIDEO_CONTAINER_HEIGHT * event.naturalSize.width) /
          event.naturalSize.height
      );
      setVideoHeight(VIDEO_CONTAINER_HEIGHT);
    } else {
      setVideoWidth(DEVICE_WIDTH);
      setVideoHeight(
        (DEVICE_WIDTH * event.naturalSize.height) / event.naturalSize.width
      );
    }
  }

  function _onFullscreenUpdate(event: { fullscreenUpdate: any }) {
    console.log(
      `FULLSCREEN UPDATE : ${JSON.stringify(event.fullscreenUpdate)}`
    );
  }

  function _advanceIndex(forward: boolean) {
    setIndex((index + (forward ? 1 : PLAYLIST.length - 1)) % PLAYLIST.length);
  }

  async function _updatePlaybackInstanceForIndex(playing: boolean) {
    _updateScreenForLoading(true);

    setVideoWidth(DEVICE_WIDTH);
    setVideoHeight(VIDEO_CONTAINER_HEIGHT);

    _loadNewPlaybackInstance(playing);
  }

  function _onPlayPausePressed() {
    if (playbackInstance != null) {
      if (isPlaying) {
        playbackInstance.pauseAsync();
      } else {
        playbackInstance.playAsync();
      }
    }
  }

  function _onStopPressed() {
    if (playbackInstance != null) {
      playbackInstance.stopAsync();
    }
  }

  function _onForwardPressed() {
    if (playbackInstance != null) {
      _advanceIndex(true);
      _updatePlaybackInstanceForIndex(shouldPlay);
    }
  }

  function _onBackPressed() {
    if (playbackInstance != null) {
      _advanceIndex(false);
      _updatePlaybackInstanceForIndex(shouldPlay);
    }
  }

  function _onMutePressed() {
    if (playbackInstance != null) {
      playbackInstance.setIsMutedAsync(!muted);
    }
  }

  function _onLoopPressed() {
    if (playbackInstance != null) {
      playbackInstance.setIsLoopingAsync(loopingType !== LoopingType.ONE);
    }
  }

  function _onVolumeSliderValueChange(value: number) {
    if (playbackInstance != null) {
      playbackInstance.setVolumeAsync(value);
    }
  }

  async function _trySetRate(rate: number, shouldCorrectPitch: boolean) {
    if (playbackInstance != null) {
      try {
        await playbackInstance.setRateAsync(rate, shouldCorrectPitch);
      } catch (error) {
        console.log(
          "Rate changing could not be performed, possibly because the client's Android API is too old.",
          error
        );
      }
    }
  }

  async function _onRateSliderSlidingComplete(value: number) {
    _trySetRate(value * RATE_SCALE, shouldCorrectPitch);
  }

  async function _onPitchCorrectionPressed() {
    _trySetRate(rate, !shouldCorrectPitch);
  }

  function _onSeekSliderValueChange() {
    if (playbackInstance != null && !isSeeking) {
      setIsSeeking(true);
      setShouldPlayAtEndOfSeek(shouldPlay);
      playbackInstance.pauseAsync();
    }
  }

  async function _onSeekSliderSlidingComplete(value: number) {
    if (!isNil(playbackInstance) && !isNil(playbackInstanceDuration)) {
      setIsSeeking(false);
      const seekPosition = value * playbackInstanceDuration;
      if (shouldPlayAtEndOfSeek) {
        playbackInstance.playFromPositionAsync(seekPosition);
      } else {
        playbackInstance.setPositionAsync(seekPosition);
      }
    }
  }

  function _getSeekSliderPosition() {
    if (
      playbackInstance != null &&
      playbackInstancePosition != null &&
      playbackInstanceDuration != null
    ) {
      return playbackInstancePosition / playbackInstanceDuration;
    }
    return 0;
  }

  function _getTimestamp() {
    if (
      playbackInstance != null &&
      playbackInstancePosition != null &&
      playbackInstanceDuration != null
    ) {
      return `${getMMSSFromMillis(
        playbackInstancePosition
      )} / ${getMMSSFromMillis(playbackInstanceDuration)}`;
    }
    return "";
  }

  function _onPosterPressed() {
    setPoster(!poster);
  }

  function _onUseNativeControlsPressed() {
    setUseNativeControls(!useNativeControls);
  }

  function _onFullscreenPressed() {
    // TODO: implement fullscreen video
    // try {
    //   video.presentFullscreenPlayer();
    // } catch (error: any) {
    //   console.log(error.toString());
    // }
  }

  function _onSpeakerPressed() {
    setThroughEarpiece(!throughEarpiece);

    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
      playThroughEarpieceAndroid: throughEarpiece,
    });
  }

  return (
    <View style={styles.container}>
      <View />
      <View style={styles.space} />
      {/* <View style={styles.videoContainer}>
        <Video
          ref={_mountVideo}
          style={[
            styles.video,
            {
              opacity: showVideo ? 1.0 : 0.0,
              width: videoWidth,
              height: videoHeight,
            },
          ]}
          resizeMode={ResizeMode.CONTAIN}
          onPlaybackStatusUpdate={_onPlaybackStatusUpdate}
          onLoadStart={_onLoadStart}
          onLoad={_onLoad}
          onError={_onError}
          onFullscreenUpdate={_onFullscreenUpdate}
          onReadyForDisplay={_onReadyForDisplay}
          useNativeControls={useNativeControls}
        />
      </View> */}
      <View
        style={[
          styles.playbackContainer,
          {
            opacity: isLoading ? DISABLED_OPACITY : 1.0,
          },
        ]}
      >
        <Slider
          style={styles.playbackSlider}
          value={_getSeekSliderPosition()}
          onValueChange={_onSeekSliderValueChange}
          onSlidingComplete={_onSeekSliderSlidingComplete}
          disabled={isLoading}
        />
        <View style={styles.timestampRow}>
          <Text style={[styles.text, styles.buffering]}>
            {isBuffering ? BUFFERING_STRING : ""}
          </Text>
          <Text style={[styles.text, styles.timestamp]}>{_getTimestamp()}</Text>
        </View>
      </View>
      <Appbar
        style={[
          styles.appBar,
          {
            height: bottom,
            backgroundColor: theme.colors.surface,
          },
        ]}
      >
        <Appbar.Action
          accessibilityLabel="rewind"
          icon="rewind"
          onPress={_onBackPressed}
        />
        <Appbar.Action
          accessibilityLabel={isPlaying ? "pause" : "play"}
          icon={isPlaying ? "pause" : "play"}
          onPress={_onPlayPausePressed}
        />
        <Appbar.Action
          accessibilityLabel="stop"
          icon="stop"
          onPress={_onStopPressed}
        />
        <Appbar.Action
          accessibilityLabel="fast forward"
          icon="fast-forward"
          onPress={_onForwardPressed}
        />
        <Text style={styles.text}>{playbackInstanceName}</Text>
      </Appbar>
      <View
        style={[styles.buttonsContainerBase, styles.buttonsContainerMiddleRow]}
      >
        <View style={styles.volumeContainer}>
          <IconButton
            icon={
              muted
                ? "volume-mute"
                : volume > 0.5
                ? "volume-high"
                : volume > 0
                ? "volume-medium"
                : "volume-low"
            }
            style={styles.wrapper}
            onPress={_onMutePressed}
          />
          <Slider
            style={styles.volumeSlider}
            value={1}
            onValueChange={_onVolumeSliderValueChange}
          />
        </View>
        <IconButton
          icon={loopingType === LoopingType.ALL ? "repeat" : "replay"}
          style={styles.wrapper}
          onPress={_onLoopPressed}
        />
        <IconButton
          icon={throughEarpiece ? "headphones" : "speaker"}
          onPress={_onSpeakerPressed}
          underlayColor={BACKGROUND_COLOR}
        />
      </View>
      <View />
      {showVideo ? (
        <View>
          <View
            style={[
              styles.buttonsContainerBase,
              styles.buttonsContainerTextRow,
            ]}
          >
            <View />
            <Button style={styles.wrapper} onPress={_onPosterPressed}>
              <View style={styles.button}>
                <Text style={[styles.text]}>
                  Poster: {poster ? "yes" : "no"}
                </Text>
              </View>
            </Button>
            <View />
            <Button style={styles.wrapper} onPress={_onFullscreenPressed}>
              <View style={styles.button}>
                <Text style={styles.text}>Fullscreen</Text>
              </View>
            </Button>
            <View />
          </View>
          <View style={styles.space} />
          <View
            style={[
              styles.buttonsContainerBase,
              styles.buttonsContainerTextRow,
            ]}
          >
            <View />
            <Button
              style={styles.wrapper}
              onPress={_onUseNativeControlsPressed}
            >
              <View style={styles.button}>
                <Text style={styles.text}>
                  Native Controls: {useNativeControls ? "yes" : "no"}
                </Text>
              </View>
            </Button>
            <View />
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  appBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 89, // must match height of the BottomNavigation component
  },
  emptyContainer: {
    position: "absolute",
    alignSelf: "stretch",
    backgroundColor: BACKGROUND_COLOR,
  },
  container: {
    position: "absolute",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    backgroundColor: BACKGROUND_COLOR,
    left: 0,
    right: 0,
    bottom: 89,
  },
  wrapper: {},
  nameContainer: {
    height: FONT_SIZE,
  },
  space: {
    height: FONT_SIZE,
  },
  videoContainer: {
    height: VIDEO_CONTAINER_HEIGHT,
  },
  video: {
    maxWidth: DEVICE_WIDTH,
  },
  playbackContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    minHeight: 40, // ICON_THUMB_1.height * 2.0,
    maxHeight: 80, //ICON_THUMB_1.height * 2.0,
  },
  playbackSlider: {
    alignSelf: "stretch",
  },
  timestampRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "stretch",
    minHeight: FONT_SIZE,
  },
  text: {
    fontSize: FONT_SIZE,
    minHeight: FONT_SIZE,
  },
  buffering: {
    textAlign: "left",
    paddingLeft: 20,
  },
  timestamp: {
    textAlign: "right",
    paddingRight: 20,
  },
  button: {
    backgroundColor: BACKGROUND_COLOR,
  },
  buttonsContainerBase: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonsContainerTopRow: {
    maxHeight: 40,
    minWidth: DEVICE_WIDTH / 2.0,
    maxWidth: DEVICE_WIDTH / 2.0,
  },
  buttonsContainerMiddleRow: {
    maxHeight: 40,
    alignSelf: "stretch",
    paddingRight: 20,
  },
  volumeContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minWidth: DEVICE_WIDTH / 2.0,
    maxWidth: DEVICE_WIDTH / 2.0,
  },
  volumeSlider: {
    width: DEVICE_WIDTH / 2.0 - 40,
  },
  buttonsContainerBottomRow: {
    maxHeight: 40,
    alignSelf: "stretch",
    paddingRight: 20,
    paddingLeft: 20,
  },
  rateSlider: {
    width: DEVICE_WIDTH / 2.0,
  },
  buttonsContainerTextRow: {
    maxHeight: FONT_SIZE,
    alignItems: "center",
    paddingRight: 20,
    paddingLeft: 20,
    minWidth: DEVICE_WIDTH,
    maxWidth: DEVICE_WIDTH,
  },
});
