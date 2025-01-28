import { ReactNode } from 'react'

import Link from 'next/link'

import { AchievementIcon } from './Icon/AchievementIcon'
import { BuildingAndSquareIcon } from './Icon/BuidingAndSquareIcon'
import { DiamondGridIcon } from './Icon/DimongGridIcon'
import { DocumentAndClipboardIcon } from './Icon/DocumentAndClipboardIcon'

export function BenefitsSection() {
  return (
    <section>
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Comece agora e crie conexões significativas
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Experimente o NeXTverso gratuitamente e transforme suas interações
            em experiências inesquecíveis.
          </p>
          <Link
            href="/register"
            className="mt-6 inline-block px-6 py-3 text-md font-medium text-white hover:bg-primary-500 hover:animate-none rounded-md transition-all duration-300 animate-button-glow"
          >
            Aproveite a Gratuidade por Tempo Limitado
          </Link>
        </div>
        <div className="grid grid-cols-12 gap-4 xl:gap-6 mt-12">
          {/* Primeira coluna */}
          <div className="col-span-12 md:col-span-6 md:order-2 lg:col-span-4 grid gap-4 xl:gap-6">
            <Card
              href="./how-it-works.html"
              title="Como Funciona"
              description="Nosso aplicativo avalia compatibilidade com base em dados científicos, ajudando você a descobrir e fortalecer conexões."
              buttonText="Saiba Mais"
              highlightColor="bg-linear-to-l from-purple-400 to-blue-600"
              icon={<DiamondGridIcon />}
            />
            <Card
              href="./examples.html"
              title="Resultados Visuais"
              description="Receba análises detalhadas em gráficos interativos e compreenda os pontos fortes e oportunidades de melhoria em suas conexões."
              buttonText="Veja Exemplos"
              icon={<BuildingAndSquareIcon />}
            />
          </div>

          {/* Segunda coluna */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4 md:order-1 grid gap-4 xl:gap-6">
            <Card
              href="https://www.16personalities.com/br/teste-de-personalidade"
              title="Teste de Compatibilidade"
              description="Baseado no MBTI (Indicador de Tipos de Myers-Briggs), este teste avalia diferentes tipos de personalidade."
              buttonText="Fazer o Teste"
              icon={<DocumentAndClipboardIcon />}
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
              icon={<AchievementIcon />}
            />
            <Card
              href="./privacy.html"
              title="Autonomia nas Conexões"
              description="Fornecemos gráficos e análises para apoiar suas decisões, mas as conexões que você cria estão sempre em suas mãos."
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
  buttonText,
  highlightText,
  highlightColor,
  icon
}: CardProps) {
  return (
    <div
      // href={href}
      className="border border-neutral-800 rounded-lg shadow-md relative focus:outline-hidden before:absolute before:inset-0 before:z-10 before:border before:rounded-xl before:transition before:border-transparent hover:before:animate-border-gradient hover:shadow-lg dark:rounded-xl"
      // target="_blank"
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
