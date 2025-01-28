export function HowItWorks() {
  return (
    <section id="how-it-works">
      <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Como Funciona o NeXTverso
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Descubra como o NeXTverso pode ajudar você a criar conexões por meio
            de etapas simples e intuitivas.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center gap-12 mt-12">
          {iconBlocks.map((block, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center text-center rounded-xl"
            >
              <div className="relative flex justify-center items-center w-12 h-12 bg-white rounded-xl before:absolute before:-inset-px before:-z-[1] before:bg-gradient-to-br before:from-blue-600 before:via-transparent before:to-violet-600 before:rounded-xl dark:bg-neutral-900">
                {block.icon}
              </div>
              <div className="mt-5">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {block.title}
                </h3>
                <p className="mt-1 text-gray-600 dark:text-neutral-400">
                  {block.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const iconBlocks = [
  {
    icon: (
      <svg
        className="shrink-0 w-6 h-6 text-blue-600 dark:text-secondary"
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
        <rect width="10" height="14" x="3" y="8" rx="2" />
        <path d="M5 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-2.4" />
        <path d="M8 18h.01" />
      </svg>
    ),
    title: 'Crie Seu Perfil',
    description:
      'Responda perguntas sobre seus interesses, valores e personalidade para criar seu perfil exclusivo.'
  },
  {
    icon: (
      <svg
        className="shrink-0 w-6 h-6 text-blue-600 dark:text-secondary"
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
        <path d="M20 7h-9" />
        <path d="M14 17H5" />
        <circle cx="17" cy="17" r="3" />
        <circle cx="7" cy="7" r="3" />
      </svg>
    ),
    title: 'Convide e Compare',
    description:
      'Convide amigos, familiares ou parceiros para participar do teste e compare os resultados em tempo real.'
  },
  {
    icon: (
      <svg
        className="shrink-0 w-6 h-6 text-blue-600 dark:text-secondary"
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
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    title: 'Visualize a Compatibilidade',
    description:
      'Receba gráficos detalhados de compatibilidade para entender como você se conecta com os outros.'
  }
]
