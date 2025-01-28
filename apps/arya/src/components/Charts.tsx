import { RadarChart } from './RadarChart'

export function Charts() {
  return (
    <section id="how-it-works">
      <div className="max-w-[85rem] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center">
          <RadarChart />
          <RadarChart />
          <RadarChart />
        </div>
      </div>
    </section>
  )
}
