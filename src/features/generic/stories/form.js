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

// // @flow
// // https://github.com/storybooks/storybook/tree/master/addons/knobs
// import React, { useState } from 'react'
// import styled from 'styled-components'

// import { storiesOf } from '@storybook/react'
// import { text, boolean } from '@storybook/addon-knobs'

// import { TestBox } from './utils'
// import { Field } from 'components'
// import { FIELD_TYPES } from 'consts'

// export const stories = storiesOf('Inputs', module)

// stories.add('Button', () => <div />)
// stories.add('Multi Select', () => <div />)
// stories.add('Dropdown', () => <div />)
// stories.add('Multi Dropdown', () => <div />)
// stories.add('Radio', () => <div />)
// stories.add('Multi Buttons', () => <div />)
// stories.add('Image upload', () => <div />)

// const TextAreaContainer = () => {
//   const [val, setVal] = useState('')
//   const field = {
//     name: 'TextField',
//     type: FIELD_TYPES.TEXTAREA,
//     prompt: text('Prompt', 'What is your problem?'),
//     help: text('Help', 'Here is some help stuff'),
//     placeholder: 'Enter your thing',
//     rules: [],
//   }
//   return (
//     <React.Fragment>
//       <Field
//         field={field}
//         valid={boolean('Is valid', true)}
//         errors={boolean('Has errors', false) ? ['This field has an error'] : []}
//         value={val}
//         onChange={setVal}
//       />
//       <p>{val}</p>
//     </React.Fragment>
//   )
// }
// stories.add('Textarea', () => (
//   <TestBox width={600} height={300}>
//     <TextAreaContainer />
//   </TestBox>
// ))

// const DollarContainer = () => {
//   const [val, setVal] = useState('')
//   const field = {
//     name: 'DollarField',
//     type: FIELD_TYPES.DOLLAR,
//     prompt: text('Prompt', 'What is your problem?'),
//     help: text('Help', 'Here is some help stuff'),
//     placeholder: 'Enter your thing',
//     rules: [],
//   }
//   return (
//     <React.Fragment>
//       <Field
//         field={field}
//         valid={boolean('Is valid', true)}
//         errors={boolean('Has errors', false) ? ['This field has an error'] : []}
//         value={val}
//         onChange={setVal}
//       />
//       <p>{val}</p>
//     </React.Fragment>
//   )
// }
// stories.add('Dollar', () => (
//   <TestBox width={600} height={300}>
//     <DollarContainer />
//   </TestBox>
// ))

// const NumberContainer = () => {
//   const [val, setVal] = useState('')
//   const field = {
//     name: 'NumberField',
//     type: FIELD_TYPES.NUMBER,
//     prompt: text('Prompt', 'What is your problem?'),
//     help: text('Help', 'Here is some help stuff'),
//     placeholder: 'Enter your thing',
//     rules: [],
//   }
//   return (
//     <React.Fragment>
//       <Field
//         field={field}
//         valid={boolean('Is valid', true)}
//         errors={boolean('Has errors', false) ? ['This field has an error'] : []}
//         value={val}
//         onChange={setVal}
//       />
//       <p>{val}</p>
//     </React.Fragment>
//   )
// }
// stories.add('Number', () => (
//   <TestBox width={600} height={300}>
//     <NumberContainer />
//   </TestBox>
// ))
