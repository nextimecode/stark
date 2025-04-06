'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Save } from 'lucide-react'

import BasicSection from './basic-section'
import FamilySection from './family-section'
import FriendshipSection from './friendship-section'
import InterestsSection from './interests-section'
import PersonalitySection from './personality-section'
import ProfessionalSection from './professional-section'
import RelationshipSection from './relationship-section'
import RomanticSection from './romantic-section'
import { ProfileFormValues, profileFormSchema } from './schema'
import ValuesSection from './values-section'

export function ProfileForm() {
  const router = useRouter()
  const [openSections, setOpenSections] = useState({
    basic: true,
    personality: false,
    interests: false,
    values: false,
    relationship: false,
    romantic: false,
    professional: false,
    friendship: false,
    family: false
  })

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: '',
      email: '',
      age: 18,
      location: '',
      mbtiType: '',
      introExtroScale: 5,
      communicationStyle: 'mixed',
      hobbies: '',
      musicPreference: '',
      leisureActivities: '',
      coreValues: '',
      lifeGoals: '',
      relationshipExpectations: '',
      relationshipFocus: 'romantic',
      desiredContactFrequency: 'weekly',
      conflictResolutionStyle: 'collaborative',
      maritalStatus: '',
      relationshipDuration: '',
      communicationExpectation: '',
      intimacyExpectation: '',
      technicalSkills: '',
      professionalExperience: '',
      workArea: '',
      currentPosition: '',
      workPreferences: [],
      careerObjectives: '',
      friendHobbies: [],
      socializationFrequency: '',
      communicationPreference: '',
      friendActivities: [],
      familyContactFrequency: '',
      familyRole: '',
      familyTraditionsImportance: '',
      familyDynamics: []
    }
  })

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      router.push('/dashboard')
    } catch (error) {
      console.error('Erro ao salvar os dados:', error)
    }
  }

  const toggleSection = (section: keyof typeof openSections) =>
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }))

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <BasicSection
          form={form}
          open={openSections.basic}
          toggle={() => toggleSection('basic')}
        />
        <PersonalitySection
          form={form}
          open={openSections.personality}
          toggle={() => toggleSection('personality')}
        />
        <InterestsSection
          form={form}
          open={openSections.interests}
          toggle={() => toggleSection('interests')}
        />
        <ValuesSection
          form={form}
          open={openSections.values}
          toggle={() => toggleSection('values')}
        />
        <RelationshipSection
          form={form}
          open={openSections.relationship}
          toggle={() => toggleSection('relationship')}
        />
        <RomanticSection
          form={form}
          open={openSections.romantic}
          toggle={() => toggleSection('romantic')}
        />
        <ProfessionalSection
          form={form}
          open={openSections.professional}
          toggle={() => toggleSection('professional')}
        />
        <FriendshipSection
          form={form}
          open={openSections.friendship}
          toggle={() => toggleSection('friendship')}
        />
        <FamilySection
          form={form}
          open={openSections.family}
          toggle={() => toggleSection('family')}
        />
        <div className="flex justify-end pt-6">
          <Button type="submit" className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Salvar e Continuar
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ProfileForm
