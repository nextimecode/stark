import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { adminAuth } from '@/firebase/admin'

interface NewInvitationPageProps {
  searchParams: {
    testId?: string
  }
}

export default async function NewInvitationPage({
  searchParams
}: NewInvitationPageProps) {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) {
    redirect('/auth')
  }

  let decodedToken

  try {
    decodedToken = await adminAuth.verifyIdToken(token)
  } catch {
    redirect('/auth')
  }

  const userId = decodedToken.uid
  // const testId = searchParams.testId

  const selectedTest = null

  // if (testId) {
  //   selectedTest = await prisma.test.findUnique({
  //     where: {
  //       id: testId,
  //       userId
  //     },
  //     include: {
  //       relationshipType: true
  //     }
  //   })

  //   if (!selectedTest) {
  //     redirect('/dashboard')
  //   }
  // }

  // const tests = await prisma.test.findMany({
  //   where: {
  //     userId
  //   },
  //   include: {
  //     relationshipType: true
  //   },
  //   orderBy: {
  //     createdAt: 'desc'
  //   }
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
