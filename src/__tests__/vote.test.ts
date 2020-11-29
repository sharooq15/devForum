/*
All the test that are related to votes will be done here. 
*/

import {
  castVote,
} from '../../src/server/controllers'

describe('Testing Vote Related Operations', () => {
  it('Cast Vote for question', async () => {
    const req = {
      body: {
        contentId: "363c6260-5393-4933-835b-af5aa10a4d0b",
        voteFor: 'Question',
      }
    }
    const result = await castVote(req, null);
    console.log('result', result);
    expect(result).toBe(true);
  });
  it('Cast Vote for answer', async () => {
    const req = {
      body: {
        contentId: "363c6260-5393-4933-835b-af5aa10a4d0b",
        voteFor: 'Question',
      }
    }
    const result = await castVote(req, null);
    console.log('result', result);
    expect(result).toBe(true);
  });
});