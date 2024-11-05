// src/ThemeProvider/index.tsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ThemeProvider as __ThemeProvider, useTheme as __useTheme } from "styled-components";
import { jsx } from "react/jsx-runtime";
var ThemeContext = createContext({
  themeMode: "",
  setThemeMode: () => {
  },
  useCurrentTheme: () => ({})
});
var ThemeProvider = ({ themes, children, initThemeMode, listenerDisabled }) => {
  const [themeMode, setThemeMode] = useState(initThemeMode || "light");
  useEffect(() => {
    if (!listenerDisabled) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      setThemeMode(mediaQuery.matches ? "dark" : "light");
      const handleThemeChange = (e) => setThemeMode(e.matches ? "dark" : "light");
      mediaQuery.addEventListener("change", handleThemeChange);
      return () => mediaQuery.removeEventListener("change", handleThemeChange);
    }
  }, []);
  const theme = useMemo(() => themes[themeMode], [themeMode]);
  return /* @__PURE__ */ jsx(__ThemeProvider, { theme, children: /* @__PURE__ */ jsx(ThemeContext.Provider, { value: {
    themeMode,
    setThemeMode,
    useCurrentTheme: __useTheme
  }, children }) });
};
var useTheme = () => useContext(ThemeContext);
export {
  ThemeProvider,
  useTheme
};
