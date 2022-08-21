import * as React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { Audio } from "expo-av";

import { PLAYLIST } from "../test";
const playlistLength = PLAYLIST.length;

export default function App() {
  const [sound, setSound] = React.useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [index, setIndex] = React.useState<number>(0);

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
    console.log('playing...', PLAYLIST[playlistIndex]);
    const { sound } = await Audio.Sound.createAsync(PLAYLIST[playlistIndex]);
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
          setIsPlaying(false);
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View>
      <Button icon="rewind" mode="contained" onPress={previousMedia}>
        Back
      </Button>
      <Button icon={playPauseLabel} mode="contained" onPress={togglePlay}>
        {playPauseLabel}
      </Button>
      <Button icon="stop" mode="contained" onPress={stopSound}>
        Stop
      </Button>
      <Button icon="fast-forward" mode="contained" onPress={nextMedia}>
        Forward
      </Button>
    </View>
  );
}
