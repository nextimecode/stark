import { Metadata } from 'next'

import { Accordion } from '@/components/Accordion'
import { BenefitsSection } from '@/components/BenefitsSection'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { HowItWorks } from '@/components/HowItWorks'
import { TestimonialsSection } from '@/components/TestimonialsSection'

export const metadata: Metadata = {
  title: 'Portal'
}

export default function Home() {
  return (
    <main>
      <Hero />
      <Accordion />
      <HowItWorks />
      <TestimonialsSection />
      <BenefitsSection />
      <Footer />
    </main>
  )
}
