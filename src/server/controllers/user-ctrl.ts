// NOTE: User related operation will be listed here.
import { 
  generateUUID,
  docClient
} from '../../api-utils';

import {
  tableNames
} from '../../common';

type UserDetails = {
  id: string;
  username: string;
  password: string;
}

type UserCreationRequest = {
  body: {
    username: string;
    password: string;
  }
}

const signup = async (
  req: UserCreationRequest, 
  res: any
): Promise<boolean> => {
  const {
    body: {
      username,
      password
    }
  } = req;
  const response: UserDetails = {
    id: generateUUID(),
    username,
    password
  }
  try{
    const input = {
      "id": response.id,
      "un": username,
      "pw": password,
    };
    const params = {
      TableName: tableNames.USER,
      Item: input
    };
    await docClient.put(params).promise();
  }catch(e){
    console.log('Error Creating User Record', e);
  }

  if(res){
    res.send(response);
  }
  return true;
}

export type {
  UserCreationRequest,
  UserDetails
}
export { 
  signup
}