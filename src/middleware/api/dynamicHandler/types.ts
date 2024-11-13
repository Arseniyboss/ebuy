import { PageParams } from '@/types/params'
import { Params as ParamsType, ReturnValue } from '@/middleware/api/types'

export interface Params extends ParamsType {
  params: PageParams['params']
}

export type Handler<T> = ({ request, user, params }: Params) => ReturnValue<T>
