import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'

import 'styles/index.scss'
import { App } from './app'

const rootEl = document.getElementById('app')
if (rootEl.hasChildNodes()) {
  const root = hydrateRoot(rootEl, <App />)
} else {
  const root = createRoot(rootEl)
  root.render(<App />)
}
