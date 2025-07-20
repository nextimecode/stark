import { ReactNode } from 'react'
import Link from 'next/link'
import { AchievementIcon } from './icon/AchievementIcon'
import { BuildingAndSquareIcon } from './icon/BuidingAndSquareIcon'
import { DiamondGridIcon } from './icon/DimongGridIcon'
import { DocumentAndClipboardIcon } from './icon/DocumentAndClipboardIcon'

interface CardProps {
  buttonText?: string
  description: string
  highlightColor?: string
  highlightText?: string
  href: string
  icon?: ReactNode
  title: string
}

export function BenefitsSection() {
  return (
    <section>
      <div className="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl dark:text-white">
            Comece agora e crie conexões significativas
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Experimente o NeXTverso gratuitamente e transforme suas interações
            em experiências inesquecíveis.
          </p>
          <Link
            href="/register"
            className="text-md hover:bg-primary-500 mt-6 inline-block animate-[button-glow_2.5s_ease-in-out_infinite] rounded-md px-6 py-3 font-medium text-white transition-all duration-300 hover:animate-none"
          >
            Aproveite a Gratuidade por Tempo Limitado
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-12 gap-4 xl:gap-6">
          {/* Primeira coluna */}
          <div className="col-span-12 grid gap-4 md:order-2 md:col-span-6 lg:col-span-4 xl:gap-6">
            <Card
              href="./how-it-works.html"
              title="Como Funciona"
              buttonText="Saiba Mais"
              description="Nosso aplicativo avalia compatibilidade com base em dados científicos, ajudando você a descobrir e fortalecer conexões."
              highlightColor="bg-linear-to-l from-purple-400 to-blue-600"
              icon={<DiamondGridIcon />}
            />
            <Card
              href="./examples.html"
              title="Resultados Visuais"
              buttonText="Veja Exemplos"
              description="Receba análises detalhadas em gráficos interativos e compreenda os pontos fortes e oportunidades de melhoria em suas conexões."
              icon={<BuildingAndSquareIcon />}
            />
          </div>

          {/* Segunda coluna */}
          <div className="col-span-12 grid gap-4 md:order-1 md:col-span-6 lg:col-span-4 xl:gap-6">
            <Card
              href="https://www.16personalities.com/br/teste-de-personalidade"
              title="Teste de Compatibilidade"
              buttonText="Fazer o Teste"
              description="Baseado no MBTI (Indicador de Tipos de Myers-Briggs), este teste avalia diferentes tipos de personalidade."
              icon={<DocumentAndClipboardIcon />}
            />
            <Card
              href="./invite.html"
              title="Convide Alguém"
              buttonText="Enviar Convite"
              description="Envie um convite para que amigos, familiares ou parceiros também participem do teste e comparem os resultados."
            />
          </div>

          {/* Terceira coluna */}
          <div className="col-span-12 grid gap-4 md:order-3 md:grid-cols-2 lg:col-span-4 lg:grid-cols-1 xl:gap-6">
            <Card
              href="./feedback.html"
              title="Aprimoramento Contínuo"
              buttonText="Enviar Feedback"
              description="Nosso algoritmo melhora com o feedback dos usuários. Avalie os resultados para contribuir com a evolução da plataforma."
              icon={<AchievementIcon />}
            />
            <Card
              href="./privacy.html"
              title="Autonomia nas Conexões"
              buttonText="Saiba Mais"
              description="Fornecemos gráficos e análises para apoiar suas decisões, mas as conexões que você cria estão sempre em suas mãos."
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export function Card({
  buttonText,
  description,
  highlightColor,
  highlightText,
  href,
  icon,
  title
}: CardProps) {
  return (
    <div
      // href={href}
      className="relative rounded-lg border border-neutral-800 shadow-md before:absolute before:inset-0 before:z-10 before:rounded-xl before:border before:border-transparent before:transition hover:shadow-lg hover:before:animate-[border-gradient_2.5s_ease-in-out_infinite] focus:outline-hidden dark:rounded-xl"
      // target="_blank"
    >
      <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-xl p-6 text-center">
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
        {/* {buttonText && (
        <p className="mt-6 inline-flex items-center gap-x-1 text-blue-600 font-medium dark:text-secondary">
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
      )} */}
      </div>
    </div>
  )
}
