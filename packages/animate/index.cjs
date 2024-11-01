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
  FadeAnimate: () => FadeAnimate
});
module.exports = __toCommonJS(src_exports);

// src/FadeAnimate/index.tsx
var import_react_transition_group = require("react-transition-group");
var import_react = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
var DEFUALT_DURATION = 600;
var DEFUALT_STYLE = {
  transition: `opacity ${DEFUALT_DURATION}ms ease-in-out`,
  opacity: 0
};
var DEFUALT_TRANSITION = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 }
};
var FadeAnimate = ({ in: defalultIn, customizedTransition, duration, children }) => {
  const nodeRef = (0, import_react.useRef)(null);
  const [inProp, setInProp] = (0, import_react.useState)(defalultIn);
  (0, import_react.useEffect)(() => {
    if (inProp === void 0) setInProp(true);
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_transition_group.Transition, { nodeRef, in: inProp, timeout: duration || DEFUALT_DURATION, unmountOnExit: true, children: (state) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
    ...DEFUALT_STYLE,
    ...DEFUALT_TRANSITION[state],
    ...customizedTransition?.[state] || {}
  }, children }) });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FadeAnimate
});
