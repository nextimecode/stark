import { Metadata } from 'next'
import Link from 'next/link'

import { FAQ } from '../../../components/FAQ'
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
      <div className="flex flex-col gap-20 lg:gap-28">
        <Hero />
        <HowItWorks />
        <TestimonialsSection />
        <BenefitsSection />
        <FAQ />
        <Footer />
      </div>
    </main>
  )
}
