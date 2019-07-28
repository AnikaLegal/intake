import * as React from 'react'
import type { Action, Redux, Dispatch, Store } from 'types'

// Global variables from build system
declare var SENTRY_JS_DSN: string
declare var SENTRY_ENV: string
declare var DEBUG_JS: boolean
declare var STATIC_URL: string
declare var SERVER: string

declare module 'react-redux' {
  declare type MapStateToProps<State, StateProps> = (State) => StateProps
  declare type MapDispatchToProps<DispatchProps> = (Dispatch) => DispatchProps
  declare export function Provider(props: {
    store: Store,
    children: React.Node,
  }): React$Element<any>
  declare export function connect<State, StateProps, DispatchProps>(
    mapStateToProps: MapStateToProps<State, StateProps>,
    mapDispatchToProps: MapDispatchToProps<DispatchProps>
  ): React.AbstractComponent => React.AbstractComponent
  declare export var shallowEqual: Function
  declare export function useDispatch(): Dispatch
  declare export function useSelector<T>((Redux) => T, Function): T
}
