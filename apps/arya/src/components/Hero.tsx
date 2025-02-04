import Link from 'next/link'

import { Title } from '@/components/Title'

export function Hero() {
  return (
    <section id="hero">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center">
          <div>
            <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl lg:text-6xl lg:leading-tight dark:text-white">
              Descubra conexões que fazem sentido com o{' '}
              <Title color="violet" size="text-6xl">
                NeXTverso
              </Title>
            </h1>
            <p className="mt-3 text-lg text-gray-800 dark:text-neutral-300">
              Construa relações mais fortes – seja no amor, no trabalho ou na
              amizade. Nosso sistema inovador analisa compatibilidade com base
              em interesses, valores e personalidades, ajudando você a encontrar
              as conexões que realmente importam.
            </p>

            <div className="my-7 grid gap-3 w-full sm:inline-flex">
              <Link
                className="transition-all duration-300 hover:animate-none animate-button-glow py-3 px-4 inline-flex justify-center items-center gap-x-2 text-md font-semibold rounded-lg border border-transparent bg-primary dark:text-white disabled:opacity-50 disabled:pointer-events-none"
                href="/register"
              >
                Grátis Por Tempo Limitado
                <svg
                  className="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Link>
              <Link
                className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                href="#faq"
              >
                Saiba Mais
              </Link>
            </div>

            <div className="hidden md:block my-5 gap-x-5">
              <p className="text-sm text-gray-800 dark:text-neutral-200">
                Uma relação saudável depende de comunicação, respeito e
                compatibilidade, e nosso aplicativo tenta fortalecer esses laços
                com análise de dados e feedback personalizado.
              </p>
            </div>
          </div>

          <div>
            <video
              className="md:w-[600px] md:h-[600px] rounded-md object-cover"
              src="movie.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
      </div>
    </section>
  )
}
