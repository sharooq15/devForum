/*
All the test that are related to search will be done here. 
*/

import {
  search,
} from '../../src/server/controllers'

describe('Testing Search Related Operations', () => {
  it('Search for a particular question', async () => {
    const req = {
      body: {
        input: "sharooq"
      }
    }
    const result = await search(req, null);
    console.log('result', result);
    expect(result).toBe(true);
  });
});