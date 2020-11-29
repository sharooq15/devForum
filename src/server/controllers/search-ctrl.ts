import { ItemList } from 'aws-sdk/clients/personalizeruntime'
import { docClient } from '../../api-utils'
import { tableNames } from '../../common'
import type { Question } from './question-ctrl'

type SearchInputRequest = {
  body: {
    input: string
  }
}

type SearchDocument = {
  obj: Question
  searchElement: string[]
}

const constructSearchDocuments = (input?: ItemList): SearchDocument[] => {
  if (input) {
    const searchDocuments = input.map((i) => {
      const searchDocument: SearchDocument = {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        obj: {
          id: i.id,
          stem: i.t,
          description: i.d,
          votes: i.vt,
          comments: i.c,
          tags: i.tgs,
        },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        searchElement: [i.t, i.d],
      }
      return searchDocument
    })
    return searchDocuments
  } else {
    return []
  }
}

const search = async (req: SearchInputRequest, res: any): Promise<boolean> => {
  const {
    body: { input },
  } = req
  const questions: Question[] = []
  try {
    const params = {
      TableName: tableNames.QUESTION,
    }
    const responseItems = await docClient.scan(params).promise()
    const searchDocuments = constructSearchDocuments(responseItems.Items)
    console.log('Sd', searchDocuments)
    if (searchDocuments && searchDocuments.length) {
      searchDocuments.forEach((doc) => {
        if (doc.searchElement.includes(input)) {
          questions.push(doc.obj)
        }
      })
    }
    console.log('qusetions', questions)
    if (res && questions && questions.length) {
      res.send(questions)
    } else if (res) {
      res.send('Please Pass an appropriate key word')
    }
  } catch (e) {
    res.send('Error Searching the record')
    console.log('Error Searching the record', e)
    return false
  }

  return true
}

export { search }
