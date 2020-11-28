/*
All the test that are related to questions will be done here. 
*/

import {
  createComment,
} from '../../src/server/controllers'
import {
  Content,
} from '../../src/common'

describe('Testing Comment Related Operations', () => {
  it('Create Comment for question', async () => {
    const req = {
      body: {
        contentId: "363c6260-5393-4933-835b-af5aa10a4d0b",
        comment: "this is a comment for question",
        commentFor: Content.Question,
      }
    }
    const result = await createComment(req, null);
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