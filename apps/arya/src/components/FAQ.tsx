import React from 'react'

type FAQItem = {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: 'O que é o NeXTverso?',
    answer:
      'O NeXTverso é uma plataforma que analisa compatibilidade com base em interesses, valores e personalidades, ajudando a fortalecer conexões no amor, trabalho ou amizade.'
  },
  {
    question: 'Como funciona o teste de compatibilidade?',
    answer:
      'O teste utiliza perguntas específicas para avaliar traços de personalidade, valores e interesses. Com base nas respostas, geramos gráficos e um índice de compatibilidade personalizado.'
  },
  {
    question: 'Posso convidar outra pessoa para fazer o teste?',
    answer:
      'Sim! Você pode convidar amigos, familiares ou parceiros para participar do teste e comparar os resultados em tempo real.'
  },
  {
    question: 'Quais dados o NeXTverso coleta?',
    answer:
      'Coletamos informações sobre interesses, valores e traços de personalidade para gerar análises de compatibilidade.'
  },
  {
    question: 'É possível usar o NeXTverso gratuitamente?',
    answer:
      'Sim, você pode usar o NeXTverso gratuitamente por tempo limitado. Aproveite essa oportunidade para descobrir suas conexões!'
  },
  {
    question: 'Como os resultados são calculados?',
    answer:
      'Os resultados são baseados em modelos científicos, como o MBTI e análise de interesses compartilhados. Nosso algoritmo avalia os dados e gera um índice de compatibilidade.'
  },
  {
    question: 'Os resultados são 100% precisos?',
    answer:
      'Os resultados são sugestões baseadas nos dados fornecidos e em modelos analíticos. Eles ajudam a identificar padrões, mas não garantem precisão absoluta.'
  },
  {
    question: 'Como faço para enviar feedback sobre o aplicativo?',
    answer:
      'Você pode enviar feedback para o email contato@nextime.com.br. Suas opiniões são fundamentais para melhorar nossa plataforma.'
  },
  {
    question: 'Posso acessar os testes que já fiz?',
    answer:
      'Sim, todos os testes realizados ficam armazenados no seu perfil para que você possa consultá-los sempre que quiser.'
  }
]

export const FAQ = () => {
  return (
    <section id="faq">
      <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-2xl mx-auto mb-10 lg:mb-14 text-center">
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
            Talvez você esteja se perguntando…
          </h2>
        </div>
        <div className="max-w-2xl mx-auto divide-y divide-gray-200 dark:divide-neutral-700">
          {faqData.map((item, index) => (
            <div key={index} className="py-8 first:pt-0 last:pb-0 flex gap-x-5">
              <svg
                className="shrink-0 mt-1 size-6 text-gray-500 dark:text-neutral-500"
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
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <path d="M12 17h.01" />
              </svg>
              <div className="grow">
                <h3 className="md:text-lg font-semibold text-gray-800 dark:text-neutral-200">
                  {item.question}
                </h3>
                <p className="mt-1 text-gray-500 dark:text-neutral-500">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
