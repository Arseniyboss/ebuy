import { BASE_URL } from '@/baseUrl'

export const revalidateTag = async (tag: string) => {
  await fetch(`${BASE_URL}/api/revalidate?tag=${tag}`)
}
