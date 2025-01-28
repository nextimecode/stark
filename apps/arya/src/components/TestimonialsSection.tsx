import Link from 'next/link'

interface TestimonialCardProps {
  text: string
  name: string
  location: string
}

export const TestimonialCard = ({
  text,
  name,
  location
}: TestimonialCardProps) => {
  return (
    <div className="min-w-[300px] p-6 border border-neutral-800 rounded-lg shadow-md transition-all duration-300 hover:animate-hover-glow hover:shadow-lg hover:border-primary-500">
      <p className="text-gray-300">{text}</p>
      <div className="mt-4 flex items-center">
        {/* <img
          className="w-10 h-10 rounded-full"
          src="https://via.placeholder.com/40"
          alt={name}
        /> */}
        <div>
          <p className="font-medium text-white">{name}</p>
          <p className="text-gray-500 text-sm">{location}</p>
        </div>
      </div>
    </div>
  )
}

export function TestimonialsSection() {
  const testimonials = [
    {
      text: 'O NeXTverso mudou completamente como vejo minhas conexões. Agora, consigo entender melhor como me relaciono com amigos e colegas.',
      name: 'Maria Silva',
      location: 'São Paulo, Brasil'
    },
    {
      text: 'Foi incrível descobrir a compatibilidade com meus amigos de forma tão intuitiva. Recomendo a todos!',
      name: 'João Oliveira',
      location: 'Rio de Janeiro, Brasil'
    },
    {
      text: 'O teste de compatibilidade foi super divertido e útil. Adorei os gráficos e as análises detalhadas!',
      name: 'Ana Costa',
      location: 'Belo Horizonte, Brasil'
    },
    {
      text: 'Com o NeXTverso, finalmente consegui entender melhor as dinâmicas no meu ambiente de trabalho. Um verdadeiro divisor de águas!',
      name: 'Carlos Almeida',
      location: 'Curitiba, Brasil'
    },
    {
      text: 'Eu não acreditava que um teste pudesse ser tão preciso. É ótimo ver como o NeXTverso facilita nossas interações.',
      name: 'Beatriz Rocha',
      location: 'Porto Alegre, Brasil'
    },
    {
      text: 'A funcionalidade de convidar amigos para o teste é incrível! Eu e meus amigos tivemos insights valiosos sobre nossas relações.',
      name: 'Lucas Moreira',
      location: 'Fortaleza, Brasil'
    },
    {
      text: 'A experiência com o NeXTverso foi fantástica! Descobri muito sobre como me conecto com as pessoas ao meu redor.',
      name: "Liam O'Connor",
      location: 'Dublin, Irlanda'
    },
    {
      text: 'Uma ferramenta incrível para explorar relações pessoais. O design é intuitivo e os insights são valiosos.',
      name: 'Sofia Martínez',
      location: 'Madrid, Espanha'
    },
    {
      text: 'O NeXTverso é revolucionário! Senti que meus relacionamentos melhoraram graças aos insights oferecidos.',
      name: 'Mateo Fernández',
      location: 'Buenos Aires, Argentina'
    }
  ]

  return (
    <section>
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Amado por usuários incríveis
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Pessoas ao redor do mundo já fazem parte do NeXTverso, criando
            conexões significativas e transformadoras
          </p>
          <Link
            href="/register"
            className="mt-6 inline-block px-6 py-3 text-md font-medium text-white hover:bg-primary-500 hover:animate-none rounded-md transition-all duration-300 animate-button-glow"
          >
            Faça Parte da Comunidade
          </Link>
        </div>

        <div className="flex gap-4 overflow-x-auto mt-12 md:overflow-x-visible md:grid md:gap-10 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              text={testimonial.text}
              name={testimonial.name}
              location={testimonial.location}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
