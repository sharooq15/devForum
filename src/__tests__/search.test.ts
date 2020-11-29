/*
All the test that are related to search will be done here. 
*/

import { search } from '../../src/server/controllers';

describe('Testing Search Related Operations', () => {
  it('Search for a particular question', async () => {
    const req = {
      body: {
        input: 'description',
      },
    };
    const result = await search(req, null);
    expect(result).toBe(true);
  });
});
