import { User as UserType } from './user'
import { OmitId } from './mongo'

export type UserCredentials = Omit<UserType, '_id' | 'name'>
export type User = OmitId<UserType>
