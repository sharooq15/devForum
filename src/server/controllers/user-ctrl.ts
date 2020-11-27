// NOTE: User related operation will be listed here.
import { v4 as UUIDv4 } from 'uuid'

type UserDetails = {
    id: string;
    name: string;
    password: string;
}

type UserCreationRequest = {
    name: string;
    password: string;
}

const signup = (
    req: UserCreationRequest, 
    res: any
): void => {
    const response: UserDetails = {
        id: UUIDv4(),
        name: req.name,
        password: req.password
    }
    res.send(response);
}

export { 
    signup
}