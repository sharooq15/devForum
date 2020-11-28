/*
All the test that are related to comments will be done here. 
*/

import {
  writeAnswer,
} from '../../src/server/controllers'

describe('Testing Answer Related Operations', () => {
  it('Write Answer for question', async () => {
    const req = {
      body: {
        text: "this is the answer",
        questionId: "363c6260-5393-4933-835b-af5aa10a4d0b",
        questionOwnerId: "5345e9d6-8825-4cdb-a99c-8571435f0daf",
      }
    }
    const result = await writeAnswer(req, null);
    console.log('result', result);
    expect(result).toBe(true);
  });
  // it('Create Comment for answer', async () => {
  //   const req = {
  //     body: {
  //       stem: "this is a question with tags",
  //       description: "this is the description",
  //       ownerId: "5345e9d6-8825-4cdb-a99c-8571435f0daf",
  //       tags: ["tag1", "tag2"],
  //     }
  //   }
  //   const result = await createQuestion(req, null);
  //   console.log('result', result);
  //   expect(result).toBe(true);
  // });
});