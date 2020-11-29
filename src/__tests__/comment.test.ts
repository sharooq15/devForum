/*
All the test that are related to comments will be done here. 
*/

import { createComment } from '../../src/server/controllers';

describe('Testing Comment Related Operations', () => {
  it('Create Comment for question', async () => {
    const req = {
      body: {
        contentId: '363c6260-5393-4933-835b-af5aa10a4d0b',
        comment: 'this is a comment for question',
        commentFor: 'Question',
      },
    };
    const result = await createComment(req, null);
    console.log('result', result);
    expect(result).toBe(true);
  });
  it('Create Comment for answer', async () => {
    const req = {
      body: {
        contentId: '363c6260-5393-4933-835b-af5aa10a4d0b',
        comment: 'this is a comment for answer',
        commentFor: 'Answer',
      },
    };
    const result = await createComment(req, null);
    console.log('result', result);
    expect(result).toBe(true);
  });
});
