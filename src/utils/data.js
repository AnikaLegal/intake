import { FIELD_TYPES } from 'consts'
import { QUESTIONS } from 'questions'
import type { Data } from 'types'

export const tidyData = (input: Data) => {
    const output: Data = {}
    for (const q of QUESTIONS) {
        // Filter out display "questions"
        if (q.type === FIELD_TYPES.DISPLAY) {
            continue
        }
        output[q.name] = input[q.name]
    }
    // Check for id field, which is not a question but we want to keep it.
    if (input.id) {
        output.id = input.id
    }
    return output

}