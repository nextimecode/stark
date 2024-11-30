import { Metadata } from 'next'
import { StarkButton } from '@stark/ui';

export const metadata: Metadata = {
  title: 'Dashboard'
}

export default function Home() {
  return (
    <main>
      <StarkButton>Hello World</StarkButton>
    </main>
  )
}
