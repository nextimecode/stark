import { Metadata } from 'next'

import { Charts } from '@/components/charts'

import { BenefitsSection } from './benefits-section'
import { FAQ } from './faq'
import { Footer } from './footer'
import { Hero } from './hero'
import { HowItWorks } from './how-it-works'
import { PersonalityCharts } from './personality-charts'
import { TestimonialsSection } from './testimonials-section'

export const metadata: Metadata = {
  title: 'Home'
}

export default function Home() {
  return (
    <div className="flex flex-col gap-20 lg:gap-32">
      <Hero />
      <HowItWorks />
      <Charts />
      <PersonalityCharts />
      <TestimonialsSection />
      <BenefitsSection />
      <FAQ />
      <Footer />
    </div>
  )
}
