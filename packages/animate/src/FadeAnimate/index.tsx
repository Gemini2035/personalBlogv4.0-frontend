import { Transition, TransitionStatus } from "react-transition-group";
import { FadeAnimateProps, FC, CSSProperties, FadeTransition } from "./types";
import { memo, useEffect, useRef, useState } from "react";

const DEFUALT_DURATION = 600;
const DEFUALT_STYLE: CSSProperties = {
  transition: `opacity ${DEFUALT_DURATION}ms ease-in-out`,
  opacity: 0,
};

const DEFUALT_TRANSITION: FadeTransition = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

// TODO: optimized animate

export const FadeAnimate: FC<FadeAnimateProps> = memo(({ innerClassName, in: defalultIn, customizedTransition, duration, children }) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  const [inProp, setInProp] = useState<FadeAnimateProps['in']>(defalultIn)

  useEffect(() => {
    if (inProp === undefined) setInProp(true)
  }, [])

  return (
    <Transition nodeRef={nodeRef} in={inProp} timeout={duration || DEFUALT_DURATION}>
      {(state: TransitionStatus) => (
        <div
          className={innerClassName}
          style={{
            ...DEFUALT_STYLE,
            ...DEFUALT_TRANSITION[state],
            ...(customizedTransition?.[state] || {})
          }}>
          {children}
        </div>
      )}
    </Transition>
  )
});
