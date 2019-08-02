// @flow
// https://github.com/storybooks/storybook/tree/master/addons/knobs
import React, { useState } from 'react'
import styled from 'styled-components'

import { storiesOf } from '@storybook/react'
import { text, boolean } from '@storybook/addon-knobs'

import { TestBox } from './utils'
import { Field } from 'components'
import { FIELD_TYPES } from 'consts'

export const stories = storiesOf('Forms', module)

stories.add('Question', () => <div />)
stories.add('Multi field Question', () => <div />)
stories.add('Form', () => <div />)
