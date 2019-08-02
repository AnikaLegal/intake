// @flow
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { Header, Page, Layout, Message } from 'components'
import { actions } from 'state'
import { validate, flattenArray } from 'utils'
import { NamedRedirect, VIEWS } from 'routes'
import { SECTIONS } from 'questions'

const VALID_STATE = 'Victoria'
const STATES = [
  'Victoria',
  'New South Wales',
  'Tasmania',
  'Australian Capital Territory',
  'South Australia',
  'Queensland',
  'Western Australia',
  'Northern Territory',
  'Other territory in Australia',
  'Outside Australia',
]

// FIXME: antd
export const HelpContainer = () => {
  return null
  // const dispatch = useDispatch()
  // const [submissionId, setSubmissionId] = useState<string | null>(null)
  // const [isLoading, setLoading] = useState(false)
  // const [state, setState] = useState<string>('')
  // const [isRenter, setIsRenter] = useState<boolean | null>(null)
  // const [needsRepairs, setNeedsRepairs] = useState<boolean | null>(null)
  // // Create a new form submission.
  // const onCreate = () => {
  //   setLoading(true)
  //   dispatch(actions.form.create(SECTIONS)).then(sub => setSubmissionId(sub.id))
  // }
  // if (submissionId) {
  //   return (
  //     <NamedRedirect
  //       to={VIEWS.FormView}
  //       params={{
  //         submissionId,
  //         pageNumber: 0,
  //       }}
  //     />
  //   )
  // }
  // const isValid =
  //   state === VALID_STATE && isRenter === true && needsRepairs === true
  // const isInvalid =
  //   !isValid && state && isRenter !== null && needsRepairs !== null
  // return (
  //   <Layout vertical>
  //     <Header />
  //     <Layout>
  //       <Page>
  //         <Message>
  //           <h1>Can we help you?</h1>
  //           <p>
  //             We would ideally like to help everyone, but at this stage we only
  //             have the resources to provide legal advice to Victorian tenants.
  //             Answer the three questions below to find out if we can help you.
  //           </p>

  //           <h3>Where do you live?</h3>
  //           <Form.Item>
  //             <Select
  //               size="large"
  //               onChange={value => setState(value)}
  //               defaultValue={undefined}
  //               placeholder="Select a state"
  //               style={{ width: 260 }}
  //             >
  //               {STATES.map(state => (
  //                 <Select.Option key={state} value={state}>
  //                   {state}
  //                 </Select.Option>
  //               ))}
  //             </Select>
  //           </Form.Item>

  //           <h3>Do rent your home or do you own your home?</h3>
  //           <Form.Item>
  //             <Radio.Group
  //               buttonStyle="solid"
  //               onChange={e => setIsRenter(e.target.value === 'rent')}
  //             >
  //               <Radio.Button value="rent">Rent</Radio.Button>
  //               <Radio.Button value="own">Own</Radio.Button>
  //             </Radio.Group>
  //           </Form.Item>

  //           <h3>Do you need your landlord to fix something in your home?</h3>
  //           <Form.Item>
  //             <Radio.Group
  //               buttonStyle="solid"
  //               onChange={e => setNeedsRepairs(e.target.value === 'yes')}
  //             >
  //               <Radio.Button value="yes">Yes</Radio.Button>
  //               <Radio.Button value="no">No</Radio.Button>
  //             </Radio.Group>
  //           </Form.Item>

  //           {isValid && (
  //             <React.Fragment>
  //               <p>
  //                 Great. We are able to help you. In order for us to provide you
  //                 with the best advice, we need you to first complete our
  //                 questionnaire
  //               </p>
  //               <Button disabled={isLoading} onClick={onCreate} type="primary">
  //                 Get started
  //               </Button>
  //             </React.Fragment>
  //           )}

  //           {isInvalid && (
  //             <React.Fragment>
  //               <p>Thank you for taking the time to answer those questions.</p>
  //               <p>
  //                 Unfortunately, we do not currently have the resources to
  //                 provide the legal advice that you need. We wish you all the
  //                 best in resolving your problem.{' '}
  //               </p>
  //             </React.Fragment>
  //           )}
  //         </Message>
  //       </Page>
  //     </Layout>
  //   </Layout>
  // )
}
