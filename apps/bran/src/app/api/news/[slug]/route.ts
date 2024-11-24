import { z } from 'zod'

import { products } from '../../data'

export async function GET(
  _: Request,
  { params }: { params: { slug: string } }
) {
  await new Promise(resolve => setTimeout(resolve, 1000))

  const slug = z.string().parse(params.slug)

  const product = products.find(product => product.slug === slug)

  if (!product) {
    return Response.json({ message: 'Product not found.' }, { status: 400 })
  }

  return Response.json(product)
}
