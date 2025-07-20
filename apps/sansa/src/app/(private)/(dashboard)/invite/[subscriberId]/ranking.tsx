import Image from 'next/image'
import cooper from '@/assets/medal-cooper.svg'
import gold from '@/assets/medal-gold.svg'
import silver from '@/assets/medal-silver.svg'
// import { getRanking } from '@/http/api'
import { getRanking } from '@/mocks/ranking'

export async function Ranking() {
  const { ranking } = await getRanking()

  return (
    <div className="w-full max-w-[440px] space-y-5">
      <h2 className="font-heading text-xl leading-none font-semibold text-gray-200">
        Ranking de indicações
      </h2>

      <div className="space-y-4">
        {ranking.map((rank, index) => {
          const rankingPosition = index + 1

          return (
            <div
              key={rank.id}
              className="relative flex flex-col justify-center gap-3 rounded-xl border border-gray-600 bg-gray-700 p-6"
            >
              <span className="text-sm leading-none text-gray-300">
                <span className="font-semibold">{rankingPosition}&ordm;</span> |{' '}
                {rank.name}
              </span>

              <span className="font-heading text-2xl leading-none font-semibold text-gray-200">
                {rank.score}
              </span>

              {rankingPosition === 1 && (
                <Image className="absolute top-0 right-8" alt="" src={gold} />
              )}

              {rankingPosition === 2 && (
                <Image className="absolute top-0 right-8" alt="" src={silver} />
              )}

              {rankingPosition === 3 && (
                <Image className="absolute top-0 right-8" alt="" src={cooper} />
              )}
            </div>
          )
        })}

        {ranking.length === 0 && (
          <p className="text-gray-300">Nenhuma indicação registrada</p>
        )}
      </div>
    </div>
  )
}
