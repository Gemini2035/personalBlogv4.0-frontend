// src/index.ts
import styled3 from "styled-components";

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

// src/Text/styles/index.ts
import styled from "styled-components";
var StyledText = styled("p")`
    color: ${({ type = "default", theme }) => theme?.colors?.[type] || "#000"};
    margin: 0
`;

// src/Text/index.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var Text = ({
  nodeType = "p",
  children,
  ...styledTextProps
}) => {
  return /* @__PURE__ */ jsx2(StyledText, { as: nodeType, ...styledTextProps, children });
};

// src/Flex/styles/index.ts
import styled2 from "styled-components";
var DEFAULT_GAP = "5px";
var generateGap = (gap) => {
  if (typeof gap === "string") {
    switch (gap) {
      case "small":
        return "1px";
      case "middle":
        return DEFAULT_GAP;
      case "large":
        return "10px";
      default:
        return DEFAULT_GAP;
    }
  } else return gap ? gap + "px" : DEFAULT_GAP;
};
var StyledFlex = styled2.div`
    display: flex;
    flex-direction: ${({ verticle }) => verticle ? "column" : "row"};
    align-items: ${({ align }) => align};
    justify-content: ${({ justify }) => justify};
    gap: ${({ gap }) => generateGap(gap)}
`;

// src/Flex/index.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
var Flex = ({ children, className, ...styledFlexProps }) => /* @__PURE__ */ jsx3(StyledFlex, { className, ...styledFlexProps, children });
export {
  Flex,
  Text,
  ThemeProvider,
  styled3 as styled,
  useTheme
};
