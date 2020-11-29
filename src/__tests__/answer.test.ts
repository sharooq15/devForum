/*
All the test that are related to comments will be done here. 
*/

import {
  writeAnswer,
  markAnswerAsCorrect,
  viewExistingAnswers,
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
    expect(result).toBe(true);
  });
  
  it('Mark Answer as Correct using owner', async () => {
    const req = {
      body: {
        currentUserId:"5345e9d6-8825-4cdb-a99c-8571435f0daf",
        answerId: "a0328b55-748a-4150-abd8-f82f94788e0e"
      }
    }
    const result = await markAnswerAsCorrect(req, null);
    console.log('result', result);
    expect(result).toBe(true);
  });

  it('Mark Answer as Correct using Wrong User', async () => {
    const req = {
      body: {
        currentUserId:"5345e9d6-8825-4cdb-a99c-8571435f0dag",
        answerId: "a0328b55-748a-4150-abd8-f82f94788e0e"
      }
    }
    const result = await markAnswerAsCorrect(req, null);
    console.log('result', result);
    expect(result).toBe(true);
  });

  it('List Answers for a question', async () => {
    const req = {
      body: {
        questionId:"363c6260-5393-4933-835b-af5aa10a4d0b",
      }
    }
    const result = await viewExistingAnswers(req, null);
    console.log('result', result);
    expect(result).toBe(true);
  });
});