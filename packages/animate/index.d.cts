import { ReactNode, CSSProperties, FC } from 'react';
import { TransitionStatus } from 'react-transition-group';
import { TransitionProps } from 'react-transition-group/Transition';

type FadeTransition = Partial<Record<TransitionStatus, CSSProperties>>;
type FadeAnimateProps = {
    in?: TransitionProps['in'];
    duration?: number;
    children: ReactNode;
    customizedTransition?: FadeTransition;
    innerClassName?: string;
};

declare const FadeAnimate: FC<FadeAnimateProps>;

export { FadeAnimate };
