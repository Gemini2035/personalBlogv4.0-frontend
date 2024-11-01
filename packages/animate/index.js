// src/FadeAnimate/index.tsx
import { Transition } from "react-transition-group";
import { jsx } from "react/jsx-runtime";
var DEFUALT_DURATION = 300;
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
var FadeAnimate = ({ in: inProp, customizedTransition, duration, children }) => /* @__PURE__ */ jsx(Transition, { in: inProp, timeout: duration || DEFUALT_DURATION, unmountOnExit: true, children: (state) => /* @__PURE__ */ jsx("div", { style: {
  ...DEFUALT_STYLE,
  ...DEFUALT_TRANSITION[state],
  ...customizedTransition?.[state] || {}
}, children }) });
export {
  FadeAnimate
};
