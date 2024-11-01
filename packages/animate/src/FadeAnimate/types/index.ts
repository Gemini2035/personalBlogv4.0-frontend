import { CSSProperties, ReactNode } from "react"
import { TransitionStatus } from "react-transition-group"
import { TransitionProps } from "react-transition-group/Transition"
export type { FC, CSSProperties } from "react"

export type FadeTransition = Partial<Record<TransitionStatus, CSSProperties>>

export type FadeAnimateProps = {
  in: TransitionProps['in']
  duration?: number
  children: ReactNode 
  customizedTransition?: FadeTransition
}