import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { env } from '@/env'
import { admin } from '@/firebase/admin'

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = env.NEXT_PUBLIC_NED_URL

interface NewInvitationPageProps {
  searchParams: {
    testId?: string
  }
}

async function getUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) redirect(REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE)

  let decodedToken
  try {
    decodedToken = await admin.auth().verifySessionCookie(token)
  } catch {
    redirect(REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE)
  }

  if (!decodedToken.email || typeof decodedToken.email_verified !== 'boolean') {
    redirect(REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE)
  }

  return {
    uid: decodedToken.uid,
    email: decodedToken.email,
    emailVerified: decodedToken.email_verified
  }
}

export default async function NewInvitationPage({
  searchParams
}: NewInvitationPageProps) {
  const user = await getUser()
  const userId = user.uid
  // const testId = searchParams.testId

  let selectedTest = null
  // if (testId) {
  //   selectedTest = await prisma.test.findUnique({
  //     where: { id: testId, userId },
  //     include: { relationshipType: true }
  //   })

  //   if (!selectedTest) redirect('/dashboard')
  // }

  // const tests = await prisma.test.findMany({
  //   where: { userId },
  //   include: { relationshipType: true },
  //   orderBy: { createdAt: 'desc' }
  // })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Invite Someone</h1>
        <p className="text-muted-foreground">
          Invite someone to take the test and compare results
        </p>
      </div>
      {/* <InvitationForm
        userId={userId}
        tests={tests}
        selectedTest={selectedTest}
      /> */}
    </div>
  )
}
