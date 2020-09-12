// @flow
import { http } from './http'

import type { Data, Submission, Client, Upload, Topic } from 'types'
import { timeout } from 'utils'

type ClientCreate = {
  firstName: string,
  lastName: string,
  email: string,
}

export const submission = {
  // Create a new submission.
  create: async (client: Client, topic: Topic): Promise<Submission> => {
    const url = '/api/submission/'
    // const result = await http.post(url, client).then((r) => r.json())
    console.warn(`Sending... ${JSON.stringify({ client, topic })}`)
    await timeout(500)
    console.warn(`Submitted.`)
    return {
      id: '123456789',
      answers: null,
      topic: topic,
      complete: false,
      uploads: [],
    }
  },
  setAnswers: async (sub: Submission, answers: Data): Promise<Submission> => {
    const url = `/api/submission/${sub.id}/`
    // const result = await http.post(url, client).then((r) => r.json())
    console.warn(`Sending... ${JSON.stringify({ sub, answers })}`)
    await timeout(500)
    console.warn(`Submitted.`)
    return {
      ...sub,
      answers: answers,
    }
  },
  uploadFile: async (sub: Submission, file: File): Promise<Submission> => {
    const url = '/api/files/'
    const form = new FormData()
    form.append('file', file)
    // const r = await fetch(`${SERVER}${url}`, {
    //   method: 'POST',
    //   body: form,
    // })
    // // Handle case where user tries to upload corrupt image,
    // // or renames their PDF to mydoc.png and tries to upload that.
    // if (r.status == 400) throw 400
    // return r.json()
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.addEventListener(
        'load',
        () => {
          const newUpload = {
            id: file.name,
            file: String(reader.result),
            description: 'Blah blah blah',
          }
          resolve({ ...sub, uploads: [...sub.uploads, newUpload] })
        },
        false
      )
      reader.readAsDataURL(file)
    })
  },
}
