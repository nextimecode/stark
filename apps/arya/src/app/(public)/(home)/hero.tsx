import Link from 'next/link'
import { Title } from '@/components/title'
import { env } from '@/env'

export function Hero() {
  return (
    <section id="hero">
      <div className="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 md:items-center md:gap-8 xl:gap-20">
          <div>
            <h1 className="font-heading block text-3xl font-bold text-gray-800 sm:text-4xl lg:text-6xl lg:leading-tight dark:text-white">
              Descubra conexões que fazem sentido com o{' '}
              <Title size="text-6xl" color="violet">
                NeXTverso
              </Title>
            </h1>
            <p className="mt-3 text-lg text-gray-800 dark:text-neutral-300">
              Construa relações mais fortes – seja no amor, no trabalho ou na
              amizade. Nosso sistema inovador analisa compatibilidade com base
              em interesses, valores e personalidades, ajudando você a encontrar
              as conexões que realmente importa.
            </p>

            <div className="my-7 grid w-full gap-3 sm:inline-flex">
              <Link
                href={`${env.NEXT_PUBLIC_NED_URL}/?redirect=${encodeURIComponent(env.NEXT_PUBLIC_SANSA_URL)}`}
                className="text-md bg-primary inline-flex animate-[button-glow_2.5s_ease-in-out_infinite] items-center justify-center gap-x-2 rounded-lg border border-transparent px-4 py-3 font-semibold transition-all duration-300 hover:animate-none disabled:pointer-events-none disabled:opacity-50 dark:text-white"
              >
                Grátis Por Tempo Limitado
                <svg
                  className="size-4 shrink-0"
                  aria-hidden="true"
                  width="24"
                  height="24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Link>
              <Link
                href="#faq"
                className="inline-flex items-center justify-center gap-x-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-xs hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
              >
                Saiba Mais
              </Link>
            </div>

            <div className="my-5 hidden gap-x-5 md:block">
              <p className="text-sm text-gray-800 dark:text-neutral-200">
                Uma relação saudável depende de comunicação, respeito e
                compatibilidade, e nosso aplicativo tenta fortalecer esses laços
                com análise de dados e feedback personalizado.
              </p>
            </div>
          </div>

          <div>
            <video
              className="rounded-md object-cover md:h-[600px] md:w-[600px]"
              src="movie.mp4"
              muted
              playsInline
              autoPlay
              loop
            />
          </div>
        </div>
      </div>
    </section>
  )
}
