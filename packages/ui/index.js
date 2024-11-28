// src/index.ts
import styled4 from "styled-components";

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
    font-weight: ${({ bold }) => bold === true ? "bold" : bold || "inherit"};
    margin: 0
`;

// src/Text/index.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var Text = ({
  nodeType = "p",
  children,
  className,
  ...styledTextProps
}) => {
  return /* @__PURE__ */ jsx2(StyledText, { className, as: nodeType, ...styledTextProps, children });
};

// src/Flex/styles/index.ts
import styled2 from "styled-components";
import isPropValid from "@emotion/is-prop-valid";
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
  } else {
    try {
      return Number(gap) + "px";
    } catch {
      return DEFAULT_GAP;
    }
  }
};
var StyledFlex = styled2.div.withConfig({
  shouldForwardProp: (prop) => isPropValid(prop)
})`
    display: flex;
    flex-direction: ${({ verticle }) => verticle ? "column" : "row"};
    align-items: ${({ align }) => align ?? "stretch"};
    justify-content: ${({ justify }) => justify ?? "stretch"};
    gap: ${({ gap }) => generateGap(gap)}
`;

// src/Flex/index.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
var Flex = ({ children, className, ...styledFlexProps }) => /* @__PURE__ */ jsx3(StyledFlex, { className, ...styledFlexProps, children });

// src/Img/styles/index.ts
import styled3 from "styled-components";
var StyledImg = styled3.img`
    width: ${({ width }) => width ? width : "auto"};
    height: ${({ height }) => height ? height : "auto"};
    display: ${({ block }) => block ? "block" : "inline-block"}
`;

// src/Img/index.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
var Img = (props) => {
  return /* @__PURE__ */ jsx4(StyledImg, { ...props });
};

// src/Card/index.tsx
import "@blueprintjs/core/lib/css/blueprint.css";
import { Elevation, Card } from "@blueprintjs/core";
export {
  Card,
  Elevation as CardElevation,
  Flex,
  Img,
  Text,
  ThemeProvider,
  styled4 as styled,
  useTheme
};
