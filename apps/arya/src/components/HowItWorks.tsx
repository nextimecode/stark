import { Title } from './Title'

export function HowItWorks() {
  return (
    <section className="py-16">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 sm:text-4xl lg:text-5xl dark:text-white">
            Como Funciona?
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-neutral-300">
            Descubra conexões de maneira simples e intuitiva. Veja como nossos
            algoritmos criam análises detalhadas para você.
          </p>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-3">
          <div className="text-center">
            <div className="flex justify-center items-center w-16 h-16 mx-auto rounded-full bg-violet-100 dark:bg-violet-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-violet-600 dark:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 11c.942 0 1.842-.37 2.516-1.055a3.517 3.517 0 00-.033-4.913C13.842 3.37 12.942 3 12 3c-.942 0-1.842.37-2.516 1.055a3.517 3.517 0 00.033 4.913A3.482 3.482 0 0012 11z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19.428 15.928A6.002 6.002 0 0115 13h-.051a4.517 4.517 0 01-6.898 0H8a6.002 6.002 0 01-4.428 2.928A2 2 0 002 17h20a2 2 0 00-2-2.072z"
                />
              </svg>
            </div>
            <h3 className="mt-6 text-xl font-semibold text-gray-800 dark:text-white">
              Crie Seu Perfil
            </h3>
            <p className="mt-4 text-gray-600 dark:text-neutral-400">
              Responda perguntas sobre seus interesses, valores e personalidade
              para criar seu perfil exclusivo.
            </p>
          </div>

          <div className="text-center">
            <div className="flex justify-center items-center w-16 h-16 mx-auto rounded-full bg-violet-100 dark:bg-violet-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-violet-600 dark:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 14l2-2 4 4M7 10l-2-2m0 0l-2 2m2-2v4m0 0H3"
                />
              </svg>
            </div>
            <h3 className="mt-6 text-xl font-semibold text-gray-800 dark:text-white">
              Convide e Compare
            </h3>
            <p className="mt-4 text-gray-600 dark:text-neutral-400">
              Convide amigos, familiares ou parceiros para participar do teste e
              compare os resultados em tempo real.
            </p>
          </div>

          <div className="text-center">
            <div className="flex justify-center items-center w-16 h-16 mx-auto rounded-full bg-violet-100 dark:bg-violet-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-violet-600 dark:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 10h11m4 0h3m-7 5h4m4 0h2m-6 0h-4m4-5h-6m-2 0H3"
                />
              </svg>
            </div>
            <h3 className="mt-6 text-xl font-semibold text-gray-800 dark:text-white">
              Visualize a Compatibilidade
            </h3>
            <p className="mt-4 text-gray-600 dark:text-neutral-400">
              Receba gráficos detalhados e um índice de compatibilidade para
              entender como você se conecta com os outros.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
