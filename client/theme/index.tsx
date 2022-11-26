import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationLightTheme,
  NavigationContainer,
} from "@react-navigation/native";
import merge from "lodash/merge";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Appearance } from "react-native";
import {
  Provider as PaperProvider,
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
} from "react-native-paper";

export type ThemeMode = "light" | "dark";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  light: NavigationLightTheme,
  dark: NavigationDarkTheme,
});

const lightTheme = merge({}, LightTheme, MD3LightTheme);
const darkTheme = merge({}, DarkTheme, MD3DarkTheme, {
  colors: { background: "#18191a" },
});

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

export function ThemeModeProvider({ children }: PropsWithChildren<object>) {
  const [mode, setMode] = useState<ThemeMode>(
    () => Appearance.getColorScheme() ?? "dark"
  );
  const settings = useMemo(() => ({ mode, setMode }), [mode]);

  useEffect(() => {
    const sub = Appearance.addChangeListener((appearance) => {
      if (appearance.colorScheme) {
        setMode(appearance.colorScheme);
      }
    });

    return () => {
      sub.remove();
    };
  }, []);

  return (
    <ThemeModeContext.Provider value={settings}>
      {children}
    </ThemeModeContext.Provider>
  );
}

export function useThemeMode() {
  return useContext(ThemeModeContext);
}

export function PaperNavigationProvider({
  children,
}: PropsWithChildren<object>) {
  const { mode } = useThemeMode();
  const theme = themes[mode];

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>{children}</NavigationContainer>
    </PaperProvider>
  );
}
