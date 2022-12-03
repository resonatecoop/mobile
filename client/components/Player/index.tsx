import Slider from "@react-native-community/slider";
import {
  Audio,
  AVPlaybackStatus,
  InterruptionModeAndroid,
  InterruptionModeIOS,
} from "expo-av";
import isNil from "lodash/isNil";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { useTheme, Text, Appbar, Surface } from "react-native-paper";

import {
  BOTTOM_NAVIGATION_HEIGHT,
  FONT_SIZE,
  PLAYER_HEIGHT,
} from "../../constants";
import useKeyboardVisible from "../../hooks/useKeyboardVisible";
import { PLAYLIST } from "../../test";
import { getMMSSFromMillis } from "../../utils";
import { LoopingType } from "./types";

const DISABLED_OPACITY = 0.5;
const LOADING_STRING = "... loading ...";
const BUFFERING_STRING = "...buffering...";

export default function Player() {
  const [index, setIndex] = useState<number>(0);
  const [isBuffering, setIsBuffering] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isSeeking, setIsSeeking] = useState<boolean>(false);
  const [loopingType, setLoopingType] = useState<LoopingType>(LoopingType.ALL);
  const [muted, setMuted] = useState<boolean>(false);
  const [playbackInstance, setPlaybackInstance] = useState<Audio.Sound | null>(
    null
  );
  const [playbackInstanceDuration, setPlaybackInstanceDuration] = useState<
    number | null
  >(null);
  const [playbackInstanceName, setPlaybackInstanceName] =
    useState<string>(LOADING_STRING);
  const [playbackInstancePosition, setPlaybackInstancePosition] = useState<
    number | null
  >(null);
  const [rate, setRate] = useState<number>(1.0);
  const [shouldCorrectPitch, setShouldCorrectPitch] = useState<boolean>(false);
  const [shouldPlay, setShouldPlay] = useState<boolean>(false);
  const [shouldPlayAtEndOfSeek, setShouldPlayAtEndOfSeek] =
    useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1.0);
  const theme = useTheme();
  const keyboardVisible = useKeyboardVisible();
  const shiftAnim = useRef(new Animated.Value(1)).current;

  useLayoutEffect(() => {
    Animated.spring(shiftAnim, {
      toValue: keyboardVisible ? 0 : 1,
      useNativeDriver: true,
    }).start();
  }, [keyboardVisible]);

  useEffect(() => {
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
    <Animated.View
      style={{
        transform: [
          {
            translateY: shiftAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [PLAYER_HEIGHT, -BOTTOM_NAVIGATION_HEIGHT],
            }),
          },
        ],
      }}
    >
      <Surface
        style={[
          styles.contentContainer,
          {
            backgroundColor: theme.colors.surface,
            bottom: 0,
          },
        ]}
      >
        <View
          style={[
            styles.playbackContainer,
            {
              opacity: isLoading ? DISABLED_OPACITY : 1.0,
            },
          ]}
        >
          <View style={styles.trackInfoRow}>
            {isBuffering || isLoading ? (
              <Text style={[styles.text]}>
                {isBuffering ? BUFFERING_STRING : LOADING_STRING}
              </Text>
            ) : (
              <Text style={[styles.text]}>{playbackInstanceName}</Text>
            )}
          </View>
          <Slider
            value={_getSeekSliderPosition()}
            onValueChange={_onSeekSliderValueChange}
            onSlidingComplete={_onSeekSliderSlidingComplete}
            disabled={isLoading}
            minimumTrackTintColor="#404040"
            maximumTrackTintColor="#505050"
            tapToSeek // Permits tapping on the slider track to set the thumb position (iOS only)
          />
        </View>
        <Appbar style={{ backgroundColor: theme.colors.surface }}>
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
          <Appbar.Content
            title={_getTimestamp()}
            titleStyle={[styles.text, styles.timestamp]}
          />
        </Appbar>
      </Surface>
    </Animated.View>
  );
}

export const styles = StyleSheet.create({
  contentContainer: {
    position: "absolute",
    width: "100%",
    height: PLAYER_HEIGHT,
  },
  playbackContainer: {
    width: "100%",
    flex: 1,
  },
  trackInfoRow: {
    flex: 1,
    alignItems: "center",
    marginTop: 22,
  },
  text: {
    fontSize: FONT_SIZE,
  },
  timestamp: {
    textAlign: "right",
    marginRight: 16,
  },
});
