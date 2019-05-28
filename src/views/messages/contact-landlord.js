// @flow
import React from 'react'
import styled from 'styled-components'
import { Button } from 'antd'

import { Header, Page, Layout, Message, Letter } from 'components'

export const ContactLandlordView = () => (
  <Layout vertical>
    <Header />
    <Layout>
      <Page>
        <Message>
          <h1>Contact your landlord</h1>
          <p>
            The very first step you should take to get the defect fixed is to
            contact your landlord (or your landlord’s agent) and ask them to fix
            the defect. You can do this by calling your landlord (or your
            landlord’s agent) or sending them an email, text message, or a
            letter.
          </p>
          <p>
            To help make this easier for you, you can copy the below template
            into an email or text message, complete the fields and send this to
            your landlord (or your landlord’s agent) today.
          </p>
          <Letter>
            <p>
              Dear <strong>Landlord's Name</strong>,
            </p>
            <p>
              I am currently renting your property at{' '}
              <strong>your rental address</strong>. I wish to inform you that
              the <strong>defective item</strong> is faulty because{' '}
              <strong>defect description</strong>. This issue is affecting my
              ability to use the property and is causing me inconvenience I
              would appreciate it if you could please fix this as soon as
              possible.
            </p>
            <p>
              Regards,
              <br />
              <strong>Your Name</strong>
            </p>
          </Letter>
        </Message>
      </Page>
    </Layout>
  </Layout>
)
