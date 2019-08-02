// https://github.com/storybooks/storybook/tree/master/addons/knobs
import React, { useState } from 'react'
import styled from 'styled-components'

import { storiesOf } from '@storybook/react'

import { TestBox } from './utils'
import { Page, Layout } from 'components'

export const stories = storiesOf('Loading', module)

stories.add('Loading Spinner', () => <div />)
