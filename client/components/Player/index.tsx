import Slider from "@react-native-community/slider";
import {
  Audio,
  AVPlaybackStatus,
  InterruptionModeAndroid,
  InterruptionModeIOS,
} from "expo-av";
import isNil from "lodash/isNil";
import * as React from "react";
import { View } from "react-native";
import { Appbar, useTheme, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BOTTOM_NAVIGATION_HEIGHT } from "../../constants";
import { PLAYLIST } from "../../test";
import { getMMSSFromMillis } from "../../utils";
import { styles } from "./styles";
import { LoopingType } from "./types";

const DISABLED_OPACITY = 0.5;
const LOADING_STRING = "... loading ...";
const BUFFERING_STRING = "...buffering...";

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
  const [rate, setRate] = React.useState<number>(1.0);
  const [shouldCorrectPitch, setShouldCorrectPitch] =
    React.useState<boolean>(false);
  const [shouldPlay, setShouldPlay] = React.useState<boolean>(false);
  const [shouldPlayAtEndOfSeek, setShouldPlayAtEndOfSeek] =
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
    _advanceIndex(true);
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
      setIsPlaying(false);
      setPlaybackInstanceName(LOADING_STRING);
      setPlaybackInstanceDuration(null);
      setPlaybackInstancePosition(null);
      setIsLoading(true);
    } else {
      setPlaybackInstanceName(PLAYLIST[index].name);
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
      _updatePlaybackInstanceForIndex(shouldPlay || isPlaying);
    }
  }

  function _onBackPressed() {
    if (playbackInstance != null) {
      _advanceIndex(false);
      _updatePlaybackInstanceForIndex(shouldPlay || isPlaying);
    }
  }

  function _onLoopPressed() {
    if (playbackInstance != null) {
      playbackInstance.setIsLoopingAsync(loopingType !== LoopingType.ONE);
    }
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
        <View
          style={[
            styles.trackInfoRow,
            {
              bottom: BOTTOM_NAVIGATION_HEIGHT - 50,
            },
          ]}
        >
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
          tapToSeek // Permits tapping on the slider track to set the thumb position (iOS only)
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
