/*
All the test that are related to user will be done here. 
*/

import { signup } from '../../src/server/controllers';

describe('Testing User Related Operations', () => {
  it('Signup', async () => {
    const req = {
      body: {
        username: 'sharooq',
        password: 'dummypassword',
      },
    };
    const result = await signup(req, null);
    console.log('result', result);
    expect(result).toBe(true);
  });
});
