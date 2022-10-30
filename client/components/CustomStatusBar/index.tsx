import { StatusBar, StatusBarStyle, useColorScheme, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeMode } from "../../theme";

export default function CustomStatusBar() {
  const insets = useSafeAreaInsets();
  const { mode } = useThemeMode();
  const isDark: boolean = mode === "dark";
  const backgroundColor: string = isDark ? "#000" : "#fff";
  const barStyle: StatusBarStyle = isDark ? "light-content" : "dark-content";

  return (
    <View
      style={{
        height: insets.top,
        backgroundColor,
      }}
    >
      <StatusBar
        animated
        backgroundColor={backgroundColor}
        barStyle={barStyle}
      />
    </View>
  );
}
