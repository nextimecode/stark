'use client'

import type React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Loader2 } from 'lucide-react'

interface InvitationFormProps {
  selectedTest: null | Test
  tests: Test[]
  userId: string
}

interface Test {
  id: string
  relationshipType: {
    id: number
    name: string
  }
}

export function InvitationForm({
  selectedTest,
  tests,
  userId
}: InvitationFormProps) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [testId, setTestId] = useState(selectedTest?.id || '')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const selectedTest = tests.find(test => test.id === testId)

      if (!selectedTest) {
        throw new Error('Please select a test')
      }

      const response = await fetch('/api/invitations', {
        body: JSON.stringify({
          email,
          relationshipTypeId: selectedTest.relationshipType.id,
          senderId: userId,
          testId
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to create invitation')
      }

      router.push('/invitations')
      router.refresh()
    } catch (error_: any) {
      setError(error_.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Invitation</CardTitle>
        <CardDescription>
          Invite someone to take the test and compare results
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-destructive/15 text-destructive rounded-md p-3 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              placeholder="Enter recipient's email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="test">Select Test</Label>
            <Select value={testId} onValueChange={setTestId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a test" />
              </SelectTrigger>
              <SelectContent>
                {tests.map(test => (
                  <SelectItem key={test.id} value={test.id}>
                    {test.relationshipType.name.charAt(0).toUpperCase() +
                      test.relationshipType.name.slice(1)}{' '}
                    Test
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          disabled={isSubmitting || !email || !testId}
          onClick={handleSubmit}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending Invitation...
            </>
          ) : (
            'Send Invitation'
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
