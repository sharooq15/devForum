/*
All the test that are related to questions will be done here. 
*/

import { addQuestionTags, createQuestion } from '../../src/server/controllers';

describe('Testing Question Related Operations', () => {
  it('Create Question without tag', async () => {
    const req = {
      body: {
        stem: 'this is a question without tag',
        description: 'this is the description',
        ownerId: '5345e9d6-8825-4cdb-a99c-8571435f0daf',
      },
    };
    const result = await createQuestion(req, null);
    expect(result).toBe(true);
  });

  it('Create Question with tags', async () => {
    const req = {
      body: {
        stem: 'this is a question with tags',
        description: 'this is the description',
        ownerId: '5345e9d6-8825-4cdb-a99c-8571435f0daf',
        tags: ['tag1', 'tag2'],
      },
    };
    const result = await createQuestion(req, null);
    expect(result).toBe(true);
  });

  it('Add tags to question', async () => {
    const req = {
      body: {
        questionId: '363c6260-5393-4933-835b-af5aa10a4d0b',
        tags: ['tag1', 'tag2'],
      },
    };
    const result = await addQuestionTags(req, null);
    expect(result).toBe(true);
  });
});
