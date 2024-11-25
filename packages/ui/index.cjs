"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Flex: () => Flex,
  Img: () => Img,
  Text: () => Text,
  ThemeProvider: () => ThemeProvider,
  styled: () => import_styled_components5.default,
  useTheme: () => useTheme
});
module.exports = __toCommonJS(src_exports);
var import_styled_components5 = __toESM(require("styled-components"), 1);

// src/ThemeProvider/index.tsx
var import_react = require("react");
var import_styled_components = require("styled-components");
var import_jsx_runtime = require("react/jsx-runtime");
var ThemeContext = (0, import_react.createContext)({
  themeMode: "",
  setThemeMode: () => {
  },
  useCurrentTheme: () => ({})
});
var ThemeProvider = ({ themes, children, initThemeMode, listenerDisabled }) => {
  const [themeMode, setThemeMode] = (0, import_react.useState)(initThemeMode || "light");
  (0, import_react.useEffect)(() => {
    if (!listenerDisabled) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      setThemeMode(mediaQuery.matches ? "dark" : "light");
      const handleThemeChange = (e) => setThemeMode(e.matches ? "dark" : "light");
      mediaQuery.addEventListener("change", handleThemeChange);
      return () => mediaQuery.removeEventListener("change", handleThemeChange);
    }
  }, []);
  const theme = (0, import_react.useMemo)(() => themes[themeMode], [themeMode]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_styled_components.ThemeProvider, { theme, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeContext.Provider, { value: {
    themeMode,
    setThemeMode,
    useCurrentTheme: import_styled_components.useTheme
  }, children }) });
};
var useTheme = () => (0, import_react.useContext)(ThemeContext);

// src/Text/styles/index.ts
var import_styled_components2 = __toESM(require("styled-components"), 1);
var StyledText = (0, import_styled_components2.default)("p")`
    color: ${({ type = "default", theme }) => theme?.colors?.[type] || "#000"};
    font-weight: ${({ bold }) => bold === true ? "bold" : bold || "inherit"};
    margin: 0
`;

// src/Text/index.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var Text = ({
  nodeType = "p",
  children,
  className,
  ...styledTextProps
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(StyledText, { className, as: nodeType, ...styledTextProps, children });
};

// src/Flex/styles/index.ts
var import_styled_components3 = __toESM(require("styled-components"), 1);
var import_is_prop_valid = __toESM(require("@emotion/is-prop-valid"), 1);
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
var StyledFlex = import_styled_components3.default.div.withConfig({
  shouldForwardProp: (prop) => (0, import_is_prop_valid.default)(prop)
})`
    display: flex;
    flex-direction: ${({ verticle }) => verticle ? "column" : "row"};
    align-items: ${({ align }) => align};
    justify-content: ${({ justify }) => justify};
    gap: ${({ gap }) => generateGap(gap)}
`;

// src/Flex/index.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var Flex = ({ children, className, ...styledFlexProps }) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(StyledFlex, { className, ...styledFlexProps, children });

// src/Img/styles/index.ts
var import_styled_components4 = __toESM(require("styled-components"), 1);
var StyledImg = import_styled_components4.default.img`
    width: ${({ width }) => width ? width : "auto"};
    height: ${({ height }) => height ? height : "auto"};
    display: ${({ block }) => block ? "block" : "inline-block"}
`;

// src/Img/index.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
var Img = (props) => {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(StyledImg, { ...props });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Flex,
  Img,
  Text,
  ThemeProvider,
  styled,
  useTheme
});
