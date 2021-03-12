import React from 'react'
import styled from 'styled-components'
import { Text, Button } from 'design'
import { QUESTIONS } from 'questions'
import { PROGRESS } from 'consts'

export const DownloadQuestionsView = () => {
  const text = buildText()
  return (
    <Container>
      <Text.Header>Intake form questions</Text.Header>
      <Text.Body>
        This page shows all of the intake form questions that we ask.
      </Text.Body>
      <a
        href={'data:text/plain;charset=utf-8,' + encodeURIComponent(text)}
        download="intake.txt"
      >
        <Button>Download as text</Button>
      </a>
      <Divider />
      <Text.Header>Available field types</Text.Header>
      <Text.Body>These are the types of questions we can ask</Text.Body>
      <List>
        <li>
          <strong>TEXT</strong>: A line of text
        </li>
        <li>
          <strong>NUMBER</strong>: A line of text, numbers only
        </li>
        <li>
          <strong>EMAIL</strong>: An email address
        </li>
        <li>
          <strong>DATE</strong>: A date
        </li>
        <li>
          <strong>CHOICE_SINGLE</strong>: A single choice from many options
        </li>
        <li>
          <strong>CHOICE_MULTI</strong>: Many choices from many options
        </li>
        <li>
          <strong>UPLOAD</strong>: Upload one or more files
        </li>
        <li>
          <strong>DISPLAY</strong>: Display some text (no user input)
        </li>
      </List>
      <Divider />
      {QUESTIONS.map((q) => (
        <>
          <Text.Header>{q.Prompt}</Text.Header>
          {q.Help && <Text.Body>{q.Help}</Text.Body>}
          {q.choices && (
            <List>
              {q.choices.map((c) => (
                <li>{c.label}</li>
              ))}
            </List>
          )}

          <List>
            <li>
              <strong>Field name:</strong> {q.name}
            </li>
            <li>
              <strong>Field type:</strong> {q.type}
            </li>
            <li>
              <strong>Required:</strong> {Boolean(q.required).toString()}
            </li>
            <li>
              <strong>Stage:</strong> {PROGRESS.INTAKE[q.stage]} ({q.stage})
            </li>
            {q.askCondition && (
              <li>
                <strong>Ask when:</strong> {parseFunctionString(q.askCondition)}
              </li>
            )}
          </List>

          <Divider />
        </>
      ))}
    </Container>
  )
}

const parseFunctionString = (f) => {
  let fs = f.toString()
  if (fs.startsWith('function isEvictionIssue')) return 'is an evictions case'
  if (fs.startsWith('function isRentReductionIssue'))
    return 'is a rent reduction case'
  if (fs.startsWith('function isRepairIssue')) return 'is a repairs case'

  if (fs.startsWith('function isRepairIssue')) return 'is a repairs case'
  if (fs.startsWith('function isManagerAgent'))
    return 'property is managed by an agent'
  if (fs.startsWith('function isManagerLandlord'))
    return 'property is managed by a landlord'

  if (fs.startsWith('function askCondition(data)')) {
    if (fs.includes('EVICTIONS_DOCUMENTS_PROVIDED')) {
      console.log(fs)
    }
    fs = fs
      .replace(/\s\s+/g, ' ')
      .replace('function askCondition(data) { return ', '')
      .replace('; }', '')
      .replace('&&', 'and')
      .replace('==', 'is')
      .replace('isEvictionIssue(data)', 'is an evictions case')
      .replace('isRepairIssue(data)', 'is a repairs case')
      .replace('isRentReductionIssue(data)', 'is a rent reduction case')
      .replace('data.', '')
      .replace('.includes(', ' includes ')
      .replace('d.name', 'this document')
      .replace(')', '')

    return fs
  }
  return fs
}

const renderToString = (Element): string => {
  if (typeof Element == 'string') return Element
  const children = Element?.props?.children
  if (typeof children == 'string') return children
  if (typeof children == 'object') {
    let s = ''
    for (let child of children) {
      s += renderToString(child)
    }
    return s
  }
  return ''
}

const buildText = () => {
  const text = []
  text.push('# Intake form questions')
  text.push('This file shows all of the intake form questions that we ask.')
  text.push('\n=============================\n')
  text.push('# Available field types\n')
  text.push('These are the types of questions we can ask:\n')
  text.push('- TEXT: A line of text')
  text.push('- NUMBER: A line of text, numbers only')
  text.push('- EMAIL: An email address')
  text.push('- DATE: A date')
  text.push('- CHOICE_SINGLE: A single choice from many options')
  text.push('- CHOICE_MULTI: Many choices from many options')
  text.push('- UPLOAD: Upload one or more files')
  text.push('- DISPLAY: Display some text (no user input)')
  text.push('\n=============================\n')
  for (let q of QUESTIONS) {
    text.push('# ' + renderToString(q.Prompt))
    if (q.Help) text.push('## ' + renderToString(q.Help))
    if (q.choices) {
      text.push('\nChoices:')
      for (let choice of q.choices) {
        text.push('- ' + choice.label)
      }
    }
    text.push('\nField name: ' + q.name)
    text.push('Field type: ' + q.type)
    text.push('Required: ' + Boolean(q.required).toString())
    text.push('Stage: ' + PROGRESS.INTAKE[q.stage] + ' (' + q.stage + ')')
    if (q.askCondition)
      text.push('Ask when:' + parseFunctionString(q.askCondition))
    text.push('\n=============================\n')
  }

  return text.join('\n')
}

const List = styled.ul`
  font-size: 14px;
  color: #444;
`

const Divider = styled.div`
  height: 0;
  border-top: 1px solid #ccc;
  margin: 2rem 0;
`

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 1rem;
`
