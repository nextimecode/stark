'use client'
export const dynamic = 'force-dynamic'

// import { useEffect } from 'react'

// import { useRouter } from 'next/navigation'

import { useAuthContext } from '@nextime/auth'
// import { env } from '@/env'

export default function Home() {
  const { user } = useAuthContext() as { user: any } // Use 'as' to assert the type as { user: any }
  console.error(user)
  // const router = useRouter()

  // useEffect(() => {
  //   // Redirect to the home page if the user is not logged in
  //   if (user == null) {
  //     router.push(`${env.NEXT_PUBLIC_ARYA_URL}/`)
  //   }
  //   // }, [ user ] );
  // }, [user, router]) // Include 'router' in the dependency array to resolve eslint warning

  return (
    <main>
      <h1>Hello World</h1>
    </main>
  )
}
