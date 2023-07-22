export type OmitId<T> = Omit<T, '_id'>
export type OmitUserId<T> = Omit<T, 'userId'>
export type OmitPassword<T> = Omit<T, 'password'>
export type OmitCartItems<T> = Omit<T, 'cartItems'>
export type OmitReviews<T> = Omit<T, 'reviews'>
export type OmitTimestamps<T> = Omit<T, 'createdAt' | 'updatedAt'>
export type OmitPush<T> = Omit<T, 'push'>
