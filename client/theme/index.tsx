import merge from "lodash/merge";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationLightTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { Provider as PaperProvider, Theme } from "react-native-paper";
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperLightTheme,
} from "react-native-paper";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import { Appearance } from "react-native";

Appearance.getColorScheme();

export type ThemeMode = "light" | "dark";

const lightTheme = merge({}, NavigationLightTheme, PaperLightTheme);
const darkTheme = merge(NavigationDarkTheme, PaperDarkTheme, {
  colors: { background: "#18191a" },
} as Theme);

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};

const ThemeModeContext = createContext<{
  setMode: (mode: ThemeMode) => void;
  mode: ThemeMode;
}>({
  setMode: (mode: ThemeMode) => {},
  mode: "dark",
});

export function ThemeModeProvider({ children }: PropsWithChildren<{}>) {
  const [mode, setMode] = useState<ThemeMode>("light");
  const settings = useMemo(() => ({ mode, setMode }), [mode]);

  return (
    <ThemeModeContext.Provider value={settings}>
      {children}
    </ThemeModeContext.Provider>
  );
}

export function useThemeMode() {
  return useContext(ThemeModeContext);
}

export function PaperNavigationProvider({ children }: PropsWithChildren<{}>) {
  const { mode } = useThemeMode();
  const theme = themes[mode];

  return (
    <NavigationContainer theme={theme}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </NavigationContainer>
  );
}
