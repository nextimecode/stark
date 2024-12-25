import { Metadata } from 'next'
import Image from 'next/image'

interface NewsProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params
}: NewsProps): Promise<Metadata> {
  const slug = (await params).slug
  return {
    title: slug
  }
}

// export async function generateStaticParams() {
//   const posts = await fetch('https://.../posts').then(res => res.json())

//   return posts.map((post: any) => ({
//     slug: post.slug
//   }))
// }

export default function NewsPage() {
  return (
    <div>
      <article>
        <h2 className="text-2xl font-bold mb-4">Título do Artigo</h2>
        <Image
          src="/images/edoras.jpg"
          alt="Edoras"
          width={1200}
          height={630}
        />
        <p className="mb-4">
          Data de publicação:{' '}
          <time dateTime="2023-01-01">1 de Janeiro de 2023</time>
        </p>
        <div className="text-gray-700 text-lg leading-relaxed">
          <p>Primeiro parágrafo do artigo...</p>
          <p>Segundo parágrafo...</p>
        </div>
      </article>
    </div>
  )
}
