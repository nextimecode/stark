import Link from 'next/link'

interface TestimonialCardProps {
  location: string
  name: string
  text: string
}

export const TestimonialCard = ({
  location,
  name,
  text
}: TestimonialCardProps) => {
  return (
    <div className="hover:border-primary-500 min-w-[300px] rounded-lg border border-neutral-800 p-6 shadow-md transition-all duration-300 hover:animate-[hover-glow_2.5s_ease-in-out_infinite] hover:shadow-lg">
      <p className="text-gray-300">{text}</p>
      <div className="mt-4 flex items-center">
        {/* <img
          className="w-10 h-10 rounded-full"
          src="https://via.placeholder.com/40"
          alt={name}
        /> */}
        <div>
          <p className="font-medium text-white">{name}</p>
          <p className="text-sm text-gray-500">{location}</p>
        </div>
      </div>
    </div>
  )
}

export function TestimonialsSection() {
  const testimonials = [
    {
      location: 'São Paulo, Brasil',
      name: 'Maria Silva',
      text: 'O NeXTverso mudou completamente como vejo minhas conexões. Agora, consigo entender melhor como me relaciono com amigos e colegas.'
    },
    {
      location: 'Rio de Janeiro, Brasil',
      name: 'João Oliveira',
      text: 'Foi incrível descobrir a compatibilidade com meus amigos de forma tão intuitiva. Recomendo a todos!'
    },
    {
      location: 'Belo Horizonte, Brasil',
      name: 'Ana Costa',
      text: 'O teste de compatibilidade foi super divertido e útil. Adorei os gráficos e as análises detalhadas!'
    },
    {
      location: 'Curitiba, Brasil',
      name: 'Carlos Almeida',
      text: 'Com o NeXTverso, finalmente consegui entender melhor as dinâmicas no meu ambiente de trabalho. Um verdadeiro divisor de águas!'
    },
    {
      location: 'Porto Alegre, Brasil',
      name: 'Beatriz Rocha',
      text: 'Eu não acreditava que um teste pudesse ser tão preciso. É ótimo ver como o NeXTverso facilita nossas interações.'
    },
    {
      location: 'Fortaleza, Brasil',
      name: 'Lucas Moreira',
      text: 'A funcionalidade de convidar amigos para o teste é incrível! Eu e meus amigos tivemos insights valiosos sobre nossas relações.'
    },
    {
      location: 'Dublin, Irlanda',
      name: "Liam O'Connor",
      text: 'A experiência com o NeXTverso foi fantástica! Descobri muito sobre como me conecto com as pessoas ao meu redor.'
    },
    {
      location: 'Madrid, Espanha',
      name: 'Sofia Martínez',
      text: 'Uma ferramenta incrível para explorar relações pessoais. O design é intuitivo e os insights são valiosos.'
    },
    {
      location: 'Buenos Aires, Argentina',
      name: 'Mateo Fernández',
      text: 'O NeXTverso é revolucionário! Senti que meus relacionamentos melhoraram graças aos insights oferecidos.'
    }
  ]

  return (
    <section>
      <div className="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl dark:text-white">
            Amado por usuários incríveis
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Pessoas ao redor do mundo já fazem parte do NeXTverso, criando
            conexões significativas e transformadoras
          </p>
          <Link
            href="/register"
            className="text-md hover:bg-primary-500 mt-6 inline-block animate-[button-glow_2.5s_ease-in-out_infinite] rounded-md px-6 py-3 font-medium text-white transition-all duration-300 hover:animate-none"
          >
            Faça Parte da Comunidade
          </Link>
        </div>

        <div className="mt-12 flex gap-4 overflow-x-auto md:grid md:grid-cols-3 md:gap-10 md:overflow-x-visible">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              text={testimonial.text}
              location={testimonial.location}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
