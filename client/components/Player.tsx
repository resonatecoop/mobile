import * as React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { Audio } from "expo-av";

export default function App() {
  const [sound, setSound] = React.useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);

  const playPauseLabel = isPlaying ? "pause" : "play";

  async function togglePlay() {
    if (isPlaying && sound) {
      await sound.pauseAsync();
    } else {
      await playSound();
    }
    setIsPlaying(!isPlaying);
  }

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync({
      uri: "https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Comfort_Fit_-_03_-_Sorry.mp3",
    });
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          setIsPlaying(false);
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View>
      <Button icon={playPauseLabel} mode="contained" onPress={togglePlay}>
        {playPauseLabel}
      </Button>
    </View>
  );
}
