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

const lightTheme = merge({}, LightTheme, MD3LightTheme, {
  colors: {
    primary: "rgb(0, 101, 140)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(197, 231, 255)",
    onPrimaryContainer: "rgb(0, 30, 45)",
    secondary: "rgb(78, 97, 109)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(210, 229, 244)",
    onSecondaryContainer: "rgb(10, 30, 40)",
    tertiary: "rgb(97, 89, 124)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(231, 222, 255)",
    onTertiaryContainer: "rgb(29, 23, 53)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(251, 252, 255)",
    onBackground: "rgb(25, 28, 30)",
    surface: "rgb(251, 252, 255)",
    onSurface: "rgb(25, 28, 30)",
    surfaceVariant: "rgb(221, 227, 234)",
    onSurfaceVariant: "rgb(65, 72, 77)",
    outline: "rgb(113, 120, 126)",
    outlineVariant: "rgb(193, 199, 206)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(46, 49, 51)",
    inverseOnSurface: "rgb(240, 241, 243)",
    inversePrimary: "rgb(127, 208, 255)",
    elevation: {
      level0: "transparent",
      level1: "rgb(238, 244, 249)",
      level2: "rgb(231, 240, 246)",
      level3: "rgb(223, 235, 242)",
      level4: "rgb(221, 234, 241)",
      level5: "rgb(216, 231, 239)",
    },
    surfaceDisabled: "rgba(25, 28, 30, 0.12)",
    onSurfaceDisabled: "rgba(25, 28, 30, 0.38)",
    backdrop: "rgba(42, 49, 54, 0.4)",
  },
});
const darkTheme = merge({}, DarkTheme, MD3DarkTheme, {
  colors: {
    colors: {
      primary: "rgb(127, 208, 255)",
      onPrimary: "rgb(0, 52, 74)",
      primaryContainer: "rgb(0, 76, 106)",
      onPrimaryContainer: "rgb(197, 231, 255)",
      secondary: "rgb(182, 201, 216)",
      onSecondary: "rgb(32, 51, 62)",
      secondaryContainer: "rgb(55, 73, 85)",
      onSecondaryContainer: "rgb(210, 229, 244)",
      tertiary: "rgb(203, 193, 233)",
      onTertiary: "rgb(51, 44, 76)",
      tertiaryContainer: "rgb(73, 66, 99)",
      onTertiaryContainer: "rgb(231, 222, 255)",
      error: "rgb(255, 180, 171)",
      onError: "rgb(105, 0, 5)",
      errorContainer: "rgb(147, 0, 10)",
      onErrorContainer: "rgb(255, 180, 171)",
      background: "rgb(25, 28, 30)",
      onBackground: "rgb(225, 226, 229)",
      surface: "rgb(25, 28, 30)",
      onSurface: "rgb(225, 226, 229)",
      surfaceVariant: "rgb(65, 72, 77)",
      onSurfaceVariant: "rgb(193, 199, 206)",
      outline: "rgb(139, 146, 151)",
      outlineVariant: "rgb(65, 72, 77)",
      shadow: "rgb(0, 0, 0)",
      scrim: "rgb(0, 0, 0)",
      inverseSurface: "rgb(225, 226, 229)",
      inverseOnSurface: "rgb(46, 49, 51)",
      inversePrimary: "rgb(0, 101, 140)",
      elevation: {
        level0: "transparent",
        level1: "rgb(30, 37, 41)",
        level2: "rgb(33, 42, 48)",
        level3: "rgb(36, 48, 55)",
        level4: "rgb(37, 50, 57)",
        level5: "rgb(39, 53, 62)",
      },
      surfaceDisabled: "rgba(225, 226, 229, 0.12)",
      onSurfaceDisabled: "rgba(225, 226, 229, 0.38)",
      backdrop: "rgba(42, 49, 54, 0.4)",
    },
  },
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
