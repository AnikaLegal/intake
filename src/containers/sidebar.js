// @flow
import React from 'react'
import styled from 'styled-components'

import { StepProgress } from 'features/generic'
import type { Section } from 'types'

type Props = {
  sections: Array<Section>,
  current?: number,
}

export const Sidebar = ({ current, sections }: Props) => {
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
  return (
    <SidebarEl>
      <StepProgress current={sectionIdx} steps={sections.map(s => s.name)} />
    </SidebarEl>
  )
}

const SidebarEl = styled.div`
  background-color: #fff;
  padding: 1.5rem;
  min-height: calc(100vh - 84px);
  width: 200px;
  border-right: 2px solid rgba(21, 27, 38, 0.15);
  @media (max-width: 1000px) {
    display: none;
  }
`
