import { Types } from 'mongoose'

type OmitId<T> = Omit<T, '_id'>

type AssignId = {
  _id: Types.ObjectId
}

export type IdMapper<T> = OmitId<T> & AssignId
