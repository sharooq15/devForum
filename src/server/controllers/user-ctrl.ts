// NOTE: User related operation will be listed here.
import { 
  generateUUID 
} from '../../api-utils';

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

const signup = (
  req: UserCreationRequest, 
  res: any
): void => {
  const {
    body: {
      username,
      password
    }
  } = req;
  console.log(req,'req');
  const response: UserDetails = {
    id: generateUUID(),
    username,
    password
  }
  res.send(response);
}

export { 
  signup
}