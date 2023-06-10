export type Params = {
  params: {
    id: string
  }
}

const Product = ({ params }: Params) => {
  return <article>{params.id}</article>
}

export default Product
