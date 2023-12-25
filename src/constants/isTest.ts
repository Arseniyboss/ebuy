const { NODE_ENV, CYPRESS_TEST } = process.env
export const isTest = NODE_ENV === 'test' || CYPRESS_TEST === 'true'
