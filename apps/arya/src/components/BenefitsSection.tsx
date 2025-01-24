import { ReactNode } from 'react'

export function BenefitsSection() {
  return (
    <section className="py-16 text-white">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Comece agora e crie conexões significativas
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Experimente o NeXTverso gratuitamente e transforme suas interações
            em experiências inesquecíveis.
          </p>
          <a
            href="/get-started"
            className="mt-6 inline-block px-6 py-3 text-lg font-medium text-white bg-primary-500 rounded-md transition-all duration-300 hover:animate-button-glow"
          >
            Comece de Graça
          </a>
        </div>
        <div className="grid grid-cols-12 gap-4 xl:gap-6 mt-12">
          {/* Primeira coluna */}
          <div className="col-span-12 md:col-span-6 md:order-2 lg:col-span-4 grid gap-4 xl:gap-6">
            <Card
              href="./how-it-works.html"
              title="Como Funciona"
              description="Nosso aplicativo avalia compatibilidade com base em dados científicos, ajudando você a descobrir e fortalecer conexões."
              buttonText="Saiba Mais"
              highlightColor="bg-gradient-to-l from-purple-400 to-blue-600"
            />
            <Card
              href="./examples.html"
              title="Resultados Visuais"
              description="Receba análises detalhadas em gráficos interativos e compreenda os pontos fortes e oportunidades de melhoria em suas conexões."
              buttonText="Veja Exemplos"
              icon={
                <svg
                  className="shrink-0 size-10 mb-3"
                  xmlns="http://www.w3.org/2000/svg"
                  width="46"
                  height="46"
                  viewBox="0 0 46 46"
                  fill="none"
                >
                  <path
                    d="M21 25H32C33.6569 25 35 26.3431 35 28V37C35 38.6569 33.6569 40 32 40H21V25Z"
                    stroke="#2563EB"
                    strokeWidth="2"
                  />
                  <path
                    d="M9 11H18C19.6569 11 21 12.3431 21 14V25H6V14C6 12.3431 7.34315 11 9 11Z"
                    stroke="#2563EB"
                    strokeWidth="2"
                  />
                  <path
                    d="M6 25H21V40H9C7.34315 40 6 38.6569 6 37V25Z"
                    stroke="#2563EB"
                    strokeWidth="2"
                  />
                  <rect
                    x="27"
                    y="4"
                    width="14"
                    height="14"
                    rx="3"
                    stroke="#C084FC"
                    strokeWidth="2"
                  />
                </svg>
              }
            />
          </div>

          {/* Segunda coluna */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4 md:order-1 grid gap-4 xl:gap-6">
            <Card
              href="./test.html"
              title="Teste de Compatibilidade"
              description="Descubra o quanto você combina com outra pessoa em termos de personalidade, valores e interesses."
              buttonText="Fazer o Teste"
            />
            <Card
              href="./invite.html"
              title="Convide Alguém"
              description="Envie um convite para que amigos, familiares ou parceiros também participem do teste e comparem os resultados."
              buttonText="Enviar Convite"
            />
          </div>

          {/* Terceira coluna */}
          <div className="col-span-12 lg:col-span-4 md:order-3 grid md:grid-cols-2 lg:grid-cols-1 gap-4 xl:gap-6">
            <Card
              href="./feedback.html"
              title="Aprimoramento Contínuo"
              description="Nosso algoritmo melhora com o feedback dos usuários. Avalie os resultados para contribuir com a evolução da plataforma."
              buttonText="Enviar Feedback"
            />
            <Card
              href="./privacy.html"
              title="Privacidade Garantida"
              description="Seus dados são protegidos com criptografia de ponta a ponta e total conformidade com a LGPD."
              buttonText="Saiba Mais"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

interface CardProps {
  href: string
  title: string
  description: string
  buttonText?: string
  highlightText?: string
  highlightColor?: string
  icon?: ReactNode
}

export function Card({
  href,
  title,
  description,
  buttonText = 'Learn more',
  highlightText,
  highlightColor,
  icon
}: CardProps) {
  return (
    <a
      href={href}
      className="relative focus:outline-none before:absolute before:inset-0 before:z-10 before:border before:rounded-xl before:transition before:border-transparent hover:before:animate-border-gradient hover:shadow-lg dark:rounded-xl"
    >
      <div className="relative overflow-hidden p-6 flex flex-col justify-center items-center text-center rounded-xl">
        {icon}
        {highlightText && (
          <span className={`text-7xl font-bold ${highlightColor}`}>
            {highlightText}
          </span>
        )}
        <h3 className="mt-6 text-lg font-semibold text-gray-800 dark:text-neutral-200">
          {title}
        </h3>
        <p className="mt-2 text-gray-500 dark:text-neutral-400">
          {description}
        </p>
        <p className="mt-6 inline-flex items-center gap-x-1 text-blue-600 font-medium dark:text-blue-500">
          {buttonText}
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
        </p>
      </div>
    </a>
  )
}
