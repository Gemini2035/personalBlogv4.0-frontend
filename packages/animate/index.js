// src/FadeAnimate/index.tsx
import { Transition } from "react-transition-group";
import { memo, useEffect, useRef, useState } from "react";
import { jsx } from "react/jsx-runtime";
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
var FadeAnimate = memo(({ innerClassName, in: defalultIn, customizedTransition, duration, children }) => {
  const nodeRef = useRef(null);
  const [inProp, setInProp] = useState(defalultIn);
  useEffect(() => {
    if (inProp === void 0) setInProp(true);
  }, []);
  return /* @__PURE__ */ jsx(Transition, { nodeRef, in: inProp, timeout: duration || DEFUALT_DURATION, children: (state) => /* @__PURE__ */ jsx(
    "div",
    {
      className: innerClassName,
      style: {
        ...DEFUALT_STYLE,
        ...DEFUALT_TRANSITION[state],
        ...customizedTransition?.[state] || {}
      },
      children
    }
  ) });
});
export {
  FadeAnimate
};
