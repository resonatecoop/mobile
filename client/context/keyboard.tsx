import { createContext, PropsWithChildren, useContext } from "react";

import useKeyboardVisible from "../hooks/useKeyboardVisible";

const KeyboardVisibilityContext = createContext(false);

export function KeyboardVisibilityProvider({
  children,
}: PropsWithChildren<object>) {
  const visible = useKeyboardVisible();
  return (
    <KeyboardVisibilityContext.Provider value={visible}>
      {children}
    </KeyboardVisibilityContext.Provider>
  );
}

export function useKeyboardVisibility() {
  return useContext(KeyboardVisibilityContext);
}
