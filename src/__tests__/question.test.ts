/*
All the test that are related to questions will be done here. 
*/

import {
  createQuestion,
} from '../../src/server/controllers'

describe('Testing User Related Operations', () => {
  it('Create Question with tag', async () => {
    const req = {
      body: {
        stem: "this is a question without tag",
        description: "this is the description",
        ownerId: "5345e9d6-8825-4cdb-a99c-8571435f0daf",
      }
    }
    const result = await createQuestion(req, null);
    console.log('result', result);
    expect(result).toBe(true);
  });
  it('Create Question without tag', async () => {
    const req = {
      body: {
        stem: "this is a question with tags",
        description: "this is the description",
        ownerId: "5345e9d6-8825-4cdb-a99c-8571435f0daf",
        tags: ["tag1", "tag2"],
      }
    }
    const result = await createQuestion(req, null);
    console.log('result', result);
    expect(result).toBe(true);
  });
});