import { Metadata } from 'next'

import { Charts } from '../../../components/Charts'
import { PersonalityCharts } from '../../../components/PersonalityCharts'
import { BenefitsSection } from '@/components/BenefitsSection'
import { FAQ } from '@/components/FAQ'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { HowItWorks } from '@/components/HowItWorks'
import { TestimonialsSection } from '@/components/TestimonialsSection'

export const metadata: Metadata = {
  title: 'Home'
}

export default function Home() {
  return (
    <main>
      <div className="flex flex-col gap-20 lg:gap-28">
        <Hero />
        <HowItWorks />
        <Charts />
        <PersonalityCharts />
        <TestimonialsSection />
        <BenefitsSection />
        <FAQ />
        <Footer />
      </div>
    </main>
  )
}
