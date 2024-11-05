"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  ThemeProvider: () => ThemeProvider,
  useTheme: () => useTheme
});
module.exports = __toCommonJS(src_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ThemeProvider,
  useTheme
});
