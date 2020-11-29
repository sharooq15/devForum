/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ItemList } from 'aws-sdk/clients/personalizeruntime';
import { getItemsFromQuestionTable } from '../../api-utils';
import type { Question } from './question-ctrl';

type SearchInputRequest = {
  body: {
    input: string;
  };
};

type SearchDocument = {
  obj: Question;
  searchElement: string[];
};

const constructSearchDocuments = (input?: ItemList): SearchDocument[] => {
  if (input) {
    const searchDocuments = input.map((i) => {
      const searchDocument: SearchDocument = {
        // @ts-ignore
        obj: {
          // @ts-ignore
          id: i.id,
          // @ts-ignore
          stem: i.t,
          // @ts-ignore
          description: i.d,
          // @ts-ignore
          votes: i.vt,
          // @ts-ignore
          comments: i.c,
          // @ts-ignore
          tags: i.tgs,
        },
        // @ts-ignore
        searchElement: [i.t, i.d],
      };
      return searchDocument;
    });
    return searchDocuments;
  } else {
    return [];
  }
};

// Note: This is not a optimal solutio for search, we can achieve this using cloud search or elastic search
// The search will return answered questions as well as we can search for any questions.
const search = async (req: SearchInputRequest, res: any): Promise<boolean> => {
  const {
    body: { input },
  } = req;
  const questions: Question[] = [];
  try {
    const responseItems = await getItemsFromQuestionTable();
    const searchDocuments = constructSearchDocuments(responseItems.Items);
    if (searchDocuments && searchDocuments.length) {
      searchDocuments.forEach((doc) => {
        if (
          doc.searchElement[0].includes(input) ||
          doc.searchElement[1].includes(input)
        ) {
          questions.push(doc.obj);
        }
      });
    }
    if (res && questions && questions.length) {
      res.send(questions);
    } else if (res) {
      res.send('Please Pass an appropriate key word');
    }
  } catch (e) {
    res.send('Error Searching the record');
    console.log('Error Searching the record', e);
    return false;
  }

  return true;
};

export { search };
