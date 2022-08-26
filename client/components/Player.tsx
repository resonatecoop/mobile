import * as React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import {
  Audio,
  AVPlaybackStatus,
  InterruptionModeAndroid,
  InterruptionModeIOS,
} from "expo-av";
import Slider from "@react-native-community/slider";
import { Appbar, useTheme, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import isNil from "lodash/isNil";

import { BOTTOM_NAVIGATION_HEIGHT } from "../constants";
import { getMMSSFromMillis } from "../utils";
import { PLAYLIST } from "../test";

enum LoopingType {
  ALL = 0,
  ONE = 1,
}

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");
const DISABLED_OPACITY = 0.5;
const FONT_SIZE = 14;
const LOADING_STRING = "... loading ...";
const BUFFERING_STRING = "...buffering...";
const RATE_SCALE = 3.0;

export default function Player(): JSX.Element {
  const [index, setIndex] = React.useState<number>(0);
  const [isBuffering, setIsBuffering] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [isSeeking, setIsSeeking] = React.useState<boolean>(false);
  const [loopingType, setLoopingType] = React.useState<LoopingType>(
    LoopingType.ALL
  );
  const [muted, setMuted] = React.useState<boolean>(false);
  const [playbackInstance, setPlaybackInstance] =
    React.useState<Audio.Sound | null>(null);
  const [playbackInstanceDuration, setPlaybackInstanceDuration] =
    React.useState<number | null>(null);
  const [playbackInstanceName, setPlaybackInstanceName] =
    React.useState<string>(LOADING_STRING);
  const [playbackInstancePosition, setPlaybackInstancePosition] =
    React.useState<number | null>(null);
  const [poster, setPoster] = React.useState<boolean>(false);
  const [rate, setRate] = React.useState<number>(1.0);
  const [shouldCorrectPitch, setShouldCorrectPitch] =
    React.useState<boolean>(false);
  const [shouldPlay, setShouldPlay] = React.useState<boolean>(false);
  const [shouldPlayAtEndOfSeek, setShouldPlayAtEndOfSeek] =
    React.useState<boolean>(false);
  const [showVideo, setShowVideo] = React.useState<boolean>(false);
  const [throughEarpiece, setThroughEarpiece] = React.useState<boolean>(false);
  const [useNativeControls, setUseNativeControls] =
    React.useState<boolean>(false);
  const [volume, setVolume] = React.useState<number>(1.0);

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
    };

    const { sound } = await Audio.Sound.createAsync(
      source,
      initialStatus,
      _onPlaybackStatusUpdate
    );
    setPlaybackInstance(sound);

    _updateScreenForLoading(false);
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

  function _advanceIndex(forward: boolean) {
    setIndex((index + (forward ? 1 : PLAYLIST.length - 1)) % PLAYLIST.length);
  }

  async function _updatePlaybackInstanceForIndex(playing: boolean) {
    _updateScreenForLoading(true);
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
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
          bottom: BOTTOM_NAVIGATION_HEIGHT,
        },
      ]}
    >
      <View />
      <View style={styles.space} />
      <View
        style={[
          styles.playbackContainer,
          {
            opacity: isLoading ? DISABLED_OPACITY : 1.0,
          },
        ]}
      >
        <View style={styles.trackInfoRow}>
          <Text style={[styles.text, styles.buffering]}>
            {isBuffering ? BUFFERING_STRING : ""}
          </Text>
          <Text style={styles.text}>{playbackInstanceName}</Text>
        </View>
        <Slider
          style={styles.playbackSlider}
          value={_getSeekSliderPosition()}
          onValueChange={_onSeekSliderValueChange}
          onSlidingComplete={_onSeekSliderSlidingComplete}
          disabled={isLoading}
          minimumTrackTintColor="#404040"
          maximumTrackTintColor="#505050"
          tapToSeek={true} // Permits tapping on the slider track to set the thumb position (iOS only)
        />
      </View>
      <Appbar
        style={[
          styles.appBar,
          {
            backgroundColor: theme.colors.background,
            height: bottom,
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
        <Appbar.Action
          accessibilityLabel={
            loopingType === LoopingType.ALL ? "repeat" : "repeat-once"
          }
          icon={loopingType === LoopingType.ALL ? "repeat" : "repeat-once"}
          onPress={_onLoopPressed}
        />
        <Text style={[styles.text, styles.timestamp]}>{_getTimestamp()}</Text>
      </Appbar>
    </View>
  );
}

const styles = StyleSheet.create({
  appBar: {
    left: 0,
    right: 0,
  },
  emptyContainer: {
    position: "absolute",
    alignSelf: "stretch",
  },
  container: {
    position: "absolute",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    left: 0,
    right: 0,
  },
  wrapper: {},
  nameContainer: {
    height: FONT_SIZE,
  },
  space: {
    height: FONT_SIZE,
  },
  playbackContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    minHeight: 40,
    maxHeight: 80,
  },
  playbackSlider: {
    alignSelf: "stretch",
    marginBottom: 8,
  },
  trackInfoRow: {
    flex: 1,
    textAlign: "center",
    flexDirection: "row",
    alignItems: "center",
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
    paddingLeft: 20,
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
