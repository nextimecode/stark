import Link from 'next/link'

import { Title } from '@/components/Title'

export function Hero() {
  return (
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
            amizade. Nosso sistema inovador analisa compatibilidade com base em
            interesses, valores e personalidades, ajudando você a encontrar as
            conexões que realmente importam.
          </p>

          <div className="mt-7 grid gap-3 w-full sm:inline-flex">
            <a
              className="transition-all duration-300 hover:animate-button-glow py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary dark:text-white hover:bg-primary-300 disabled:opacity-50 disabled:pointer-events-none"
              href="/register"
            >
              Use grátis enquanto pode
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
            </a>
            <a
              className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
              href="#"
            >
              Saiba Mais
            </a>
          </div>

          <div className="my-5 lg:mt-10 grid grid-cols-1 gap-x-5">
            <p className="text-sm text-gray-800 dark:text-neutral-200">
              Uma relação saudável depende de comunicação, respeito e
              compatibilidade, e nosso aplicativo tenta fortalecer esses laços
              com análise de dados e feedback personalizado.
            </p>
            {/* <Link href="https://www.instagram.com/phdduarte/">
              <p className="mt-2 font-bold">Pedro Duarte</p>
            </Link> */}
          </div>
        </div>

        <div className="relative ms-4">
          <video
            className="md:w-[600px] md:h-[600px] rounded-md object-cover"
            src="/movie.mp4"
            autoPlay
            loop
            muted
          ></video>
        </div>

        {/* <div className="relative ms-4">
          <Image
            className="w-full rounded-md"
            src="https://images.unsplash.com/photo-1665686377065-08ba896d16fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&h=800&q=80"
            alt="Image Description"
            width={700}
            height={800}
          />
          <div className="absolute inset-0 -z-1 bg-linear-to-tr from-gray-200 via-white/0 to-white/0 size-full rounded-md mt-4 -mb-4 me-4 -ms-4 lg:mt-6 lg:-mb-6 lg:me-6 lg:-ms-6 dark:from-neutral-800 dark:via-neutral-900/0 dark:to-neutral-900/0"></div>

          <div className="absolute bottom-0 start-0">
            <svg
              className="w-2/3 ms-auto h-auto text-white dark:text-neutral-900"
              width="630"
              height="451"
              viewBox="0 0 630 451"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="531"
                y="352"
                width="99"
                height="99"
                fill="currentColor"
              />
              <rect
                x="140"
                y="352"
                width="106"
                height="99"
                fill="currentColor"
              />
              <rect
                x="482"
                y="402"
                width="64"
                height="49"
                fill="currentColor"
              />
              <rect
                x="433"
                y="402"
                width="63"
                height="49"
                fill="currentColor"
              />
              <rect
                x="384"
                y="352"
                width="49"
                height="50"
                fill="currentColor"
              />
              <rect
                x="531"
                y="328"
                width="50"
                height="50"
                fill="currentColor"
              />
              <rect x="99" y="303" width="49" height="58" fill="currentColor" />
              <rect x="99" y="352" width="49" height="50" fill="currentColor" />
              <rect x="99" y="392" width="49" height="59" fill="currentColor" />
              <rect x="44" y="402" width="66" height="49" fill="currentColor" />
              <rect
                x="234"
                y="402"
                width="62"
                height="49"
                fill="currentColor"
              />
              <rect
                x="334"
                y="303"
                width="50"
                height="49"
                fill="currentColor"
              />
              <rect x="581" width="49" height="49" fill="currentColor" />
              <rect x="581" width="49" height="64" fill="currentColor" />
              <rect
                x="482"
                y="123"
                width="49"
                height="49"
                fill="currentColor"
              />
              <rect
                x="507"
                y="124"
                width="49"
                height="24"
                fill="currentColor"
              />
              <rect x="531" y="49" width="99" height="99" fill="currentColor" />
            </svg>
          </div>
        </div> */}
      </div>
    </div>
  )
}
