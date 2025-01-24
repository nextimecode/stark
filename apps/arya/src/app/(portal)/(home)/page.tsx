import { Metadata } from 'next'

import { BenefitsSection } from '../../../components/BenefitsSection'
import { TestimonialsSection } from '../../../components/TestimonialsSection'
import { Hero } from '@/components/Hero'
import { HowItWorks } from '@/components/HowItWorks'

export const metadata: Metadata = {
  title: 'Portal'
}

export default function Home() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <TestimonialsSection />
      <BenefitsSection />
    </main>
  )
}
