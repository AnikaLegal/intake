import { configure, addDecorator } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'

addDecorator(withKnobs)

function loadStories() {
  require('../src/styles/index.scss')
  require('../src/features/generic/stories/index.js')
}

configure(loadStories, module)
