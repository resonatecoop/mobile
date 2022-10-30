import merge from "lodash/merge";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationLightTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
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

export enum ThemeMode {
  Light = "light",
  Dark = "dark",
}

const lightTheme = merge({}, PaperLightTheme, NavigationLightTheme);
const darkTheme = merge({}, PaperDarkTheme, NavigationDarkTheme);

export const themes = {
  [ThemeMode.Light]: lightTheme,
  [ThemeMode.Dark]: darkTheme,
};

const ThemeModeContext = createContext({
  setMode: (mode: ThemeMode) => {},
  mode: ThemeMode.Dark,
});

export function ThemeModeProvider({ children }: PropsWithChildren<{}>) {
  const [mode, setMode] = useState(ThemeMode.Light);
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
