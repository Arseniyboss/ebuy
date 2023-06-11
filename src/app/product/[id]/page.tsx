import Image from 'next/image'
import { getProductById } from '@api/products/getProductById'
import { notFound } from 'next/navigation'

export type Params = {
  params: {
    id: string
  }
}

export const generateMetadata = async ({ params }: Params) => {
  const product = await getProductById(params.id)
  return { title: product ? product.name : 'Not Found' }
}

const Product = async ({ params }: Params) => {
  const product = await getProductById(params.id)

  if (!product) {
    return notFound()
  }

  return (
    <article>
      <Image src={product.image} alt='' width={250} height={250} priority />
      <h1>{product.name}</h1>
      <h2>{product.price}</h2>
      <p>{product.description}</p>
    </article>
  )
}

export default Product
