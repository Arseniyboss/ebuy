const LOCAL_URL = 'http://localhost:3000'
const VERCEL_URL = process.env.NEXT_PUBLIC_VERCEL_URL
export const BASE_URL = VERCEL_URL ? `https://${VERCEL_URL}` : LOCAL_URL
