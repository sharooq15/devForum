/*
All the test that are related to comments will be done here. 
*/

import {
  writeAnswer,
  markAnswerAsCorrect,
  viewExistingAnswers,
} from '../../src/server/controllers';

describe('Testing Answer Related Operations', () => {
  it('Write Answer for question', async () => {
    const req = {
      body: {
        text: 'this is the answer',
        questionId: '363c6260-5393-4933-835b-af5aa10a4d0b',
        questionOwnerId: '5345e9d6-8825-4cdb-a99c-8571435f0daf',
      },
    };
    const result = await writeAnswer(req, null);
    expect(result).toBe(true);
  });

  it('Mark Answer as Correct using owner', async () => {
    const req = {
      body: {
        currentUserId: 'd5204b21-221d-44a6-bd28-bc5633bc7b16',
        answerId: '1bb59abc-2447-4ccb-9eb9-02d82247aa9f',
      },
    };
    const result = await markAnswerAsCorrect(req, null);
    expect(result).toBe(true);
  });

  it('Mark Answer as Correct using Wrong User', async () => {
    const req = {
      body: {
        currentUserId: '5345e9d6-8825-4cdb-a99c-8571435f0dag',
        answerId: '1bb59abc-2447-4ccb-9eb9-02d82247aa9f',
      },
    };
    const result = await markAnswerAsCorrect(req, null);
    expect(result).toBe(true);
  });

  it('List Answers for a question', async () => {
    const req = {
      body: {
        questionId: '00c09363-3d1e-481b-9528-7592e41e32dd',
      },
    };
    const result = await viewExistingAnswers(req, null);
    expect(result).toBe(true);
  });
});
