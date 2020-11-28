import { v4 as UUIDv4, v4 } from 'uuid'

const generateUUID = (): string => UUIDv4()

export { 
  generateUUID,
}