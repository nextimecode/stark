'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { useAuthContext } from '@/context/AuthContext'

export default function Admin() {
  // Access the user object from the authentication context
  // const { user } = useAuthContext();
  const { user } = useAuthContext() as { user: any } // Use 'as' to assert the type as { user: any }
  const router = useRouter()

  useEffect(() => {
    // Redirect to the home page if the user is not logged in
    if (user == null) {
      router.push('/')
    }
    // }, [ user ] );
  }, [user, router]) // Include 'router' in the dependency array to resolve eslint warning

  return <h1>Only logged-in users can view this page</h1>
}
