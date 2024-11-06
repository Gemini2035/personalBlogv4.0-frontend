// src/FadeAnimate/index.tsx
import { Transition } from "react-transition-group";
import { useEffect, useRef, useState } from "react";
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
var FadeAnimate = ({ in: defalultIn, customizedTransition, duration, children }) => {
  const nodeRef = useRef(null);
  const [inProp, setInProp] = useState(defalultIn);
  useEffect(() => {
    console.log(nodeRef);
    if (inProp === void 0 && nodeRef.current) setInProp(true);
  }, [nodeRef]);
  return /* @__PURE__ */ jsx(Transition, { nodeRef, in: inProp, timeout: duration || DEFUALT_DURATION, children: (state) => /* @__PURE__ */ jsx(
    "div",
    {
      ref: nodeRef,
      style: {
        ...DEFUALT_STYLE,
        ...DEFUALT_TRANSITION[state],
        ...customizedTransition?.[state] || {}
      },
      children
    }
  ) });
};
export {
  FadeAnimate
};
