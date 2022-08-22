import * as React from "react";
import { StyleSheet } from "react-native";
import { Audio } from "expo-av";
import { Appbar, useTheme, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { PLAYLIST } from "../test";
const playlistLength = PLAYLIST.length;

export default function Player() {
  const [sound, setSound] = React.useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [index, setIndex] = React.useState<number>(0);

  const { bottom } = useSafeAreaInsets();
  const theme = useTheme();
  const playPauseLabel = isPlaying ? "pause" : "play";

  async function togglePlay() {
    if (isPlaying && sound) {
      await sound.pauseAsync();
    } else {
      if (sound) {
        await sound.playAsync();
      } else {
        await playSound();
      }
    }
    setIsPlaying(!isPlaying);
  }

  async function playSound(playlistIndex = index) {
    console.log("playing...", PLAYLIST[playlistIndex]);
    const { sound, status } = await Audio.Sound.createAsync(
      PLAYLIST[playlistIndex]
    );
    setSound(sound);
    await sound.playAsync();
    if (playlistIndex !== index) {
      setIndex(playlistIndex);
    }
  }

  async function stopSound() {
    if (!sound) {
      return;
    }

    await sound.stopAsync();
    setIsPlaying(false);
  }

  async function previousMedia() {
    if (index > 0) {
      playSound(index - 1);
    } else {
      stopSound();
    }
  }

  async function nextMedia() {
    if (index < playlistLength - 1) {
      playSound(index + 1);
    } else {
      stopSound();
    }
  }

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
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
        onPress={previousMedia}
      />
      <Appbar.Action
        accessibilityLabel={playPauseLabel}
        icon={playPauseLabel}
        onPress={togglePlay}
      />
      <Appbar.Action
        accessibilityLabel="stop"
        icon="stop"
        onPress={stopSound}
      />
      <Appbar.Action
        accessibilityLabel="fast forward"
        icon="fast-forward"
        onPress={nextMedia}
      />
      <Text>{PLAYLIST[index].name}</Text>
    </Appbar>
  );
}

const styles = StyleSheet.create({
  appBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 89,
  },
});
