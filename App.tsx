import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import CustomStatusBar from "./client/components/CustomStatusBar";

export default function App() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const themeTextStyle = isDark ? styles.darkThemeText : styles.lightThemeText;
  const themeContainerStyle = isDark
    ? styles.darkContainer
    : styles.lightContainer;

  return (
    <SafeAreaProvider>
      <View style={[styles.container, themeContainerStyle]}>
        <CustomStatusBar />
        <Text style={themeTextStyle}>Resonate</Text>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  lightContainer: {
    backgroundColor: "#fff",
  },
  darkContainer: {
    backgroundColor: "#181A1B",
  },
  lightThemeText: {
    color: "#181A1B",
  },
  darkThemeText: {
    color: "#fff",
  },
});
