import { Transition, TransitionStatus } from "react-transition-group";
import { FadeAnimateProps, FC, CSSProperties, FadeTransition } from "./types";

const DEFUALT_DURATION = 300;
const DEFUALT_STYLE: CSSProperties = {
  transition: `opacity ${DEFUALT_DURATION}ms ease-in-out`,
  opacity: 0,
};

const DEFUALT_TRANSITION: FadeTransition  = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

export const FadeAnimate: FC<FadeAnimateProps> = ({ in: inProp, customizedTransition, duration, children }) => (
  <Transition in={inProp} timeout={duration || DEFUALT_DURATION} unmountOnExit>
    {(state: TransitionStatus) => (
      <div style={{
          ...DEFUALT_STYLE,
          ...DEFUALT_TRANSITION[state],
          ...(customizedTransition?.[state] || {})
        }}>
        {children}
      </div>
    )}
  </Transition>
);
