import * as React from 'react'
import type { Action, Redux, Dispatch, Store } from 'types'

// Global variables from build system
declare var SENTRY_JS_DSN: string
declare var DEBUG_JS: boolean
declare var STATIC_URL: string
declare var SERVER: string
