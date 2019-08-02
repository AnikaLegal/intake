// @flow
import React from 'react'
import styled from 'styled-components'
// import { Steps } from 'antd'

import type { Section } from 'types'

type Props = {
  sections: Array<Section>,
  className?: string,
  current?: number,
}

const _Sidebar = ({ className, current, sections }: Props) => {
  let sectionIdx = sections.length
  if (current || current === 0) {
    let answerIdx = 0
    sectionIdx = 0
    for (let section of sections) {
      answerIdx += section.forms.length
      if (answerIdx > current) {
        break
      }
      sectionIdx++
    }
  }
  return null
  // FIXME: antd
  // return (
  //   <div className={className}>
  //     <Steps direction="vertical" current={sectionIdx}>
  //       {sections.map(s => (
  //         <Steps.Step title={s.name} key={s.name} />
  //       ))}
  //     </Steps>
  //   </div>
  // )
}

const style = c => styled(c)`
  background-color: #fff;
  padding: 1.5rem;
  min-height: calc(100vh - 84px);
  width: 300px;
  border-right: 2px solid rgba(21, 27, 38, 0.15);
  @media (max-width: 1000px) {
    display: none;
  }
`
export const Sidebar = style(_Sidebar)
