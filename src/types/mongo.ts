import { Types } from 'mongoose'

type AssignId = {
  _id: Types.ObjectId
}

export type OmitId<T> = Omit<T, '_id'>
export type IdMapper<T> = OmitId<T> & AssignId
