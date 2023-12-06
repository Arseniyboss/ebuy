import { PageParams } from '@/types/params'
import { Params as ParamsType, ReturnValue } from '@/utils/api/withAuth/types'

export interface Params extends ParamsType {
  params: PageParams['params']
}

export type Handler<T> = ({ request, user, params }: Params) => ReturnValue<T>
