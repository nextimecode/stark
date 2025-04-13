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
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Loader2 } from 'lucide-react'

interface Test {
  id: string
  relationshipType: {
    id: number
    name: string
  }
}

interface InvitationFormProps {
  userId: string
  tests: Test[]
  selectedTest: Test | null
}

export function InvitationForm({
  userId,
  tests,
  selectedTest,
}: InvitationFormProps) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [testId, setTestId] = useState(selectedTest?.id || '')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          senderId: userId,
          email,
          relationshipTypeId: selectedTest.relationshipType.id,
          testId,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to create invitation')
      }

      router.push('/invitations')
      router.refresh()
    } catch (err: any) {
      setError(err.message)
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
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              placeholder="Enter recipient's email"
              required
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
          onClick={handleSubmit}
          disabled={isSubmitting || !email || !testId}
          className="w-full"
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
