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
import { profileFormSchema, type ProfileFormValues } from './schema'
import ValuesSection from './values-section'

export function ProfileForm() {
  const router = useRouter()
  const [openSections, setOpenSections] = useState({
    basic: true,
    family: false,
    friendship: false,
    interests: false,
    personality: false,
    professional: false,
    relationship: false,
    romantic: false,
    values: false
  })

  const form = useForm<ProfileFormValues>({
    defaultValues: {
      age: 18,
      careerObjectives: '',
      communicationExpectation: '',
      communicationPreference: '',
      communicationStyle: 'mixed',
      conflictResolutionStyle: 'collaborative',
      coreValues: '',
      currentPosition: '',
      desiredContactFrequency: 'weekly',
      email: '',
      familyContactFrequency: '',
      familyDynamics: [],
      familyRole: '',
      familyTraditionsImportance: '',
      friendActivities: [],
      friendHobbies: [],
      hobbies: '',
      intimacyExpectation: '',
      introExtroScale: 5,
      leisureActivities: '',
      lifeGoals: '',
      location: '',
      maritalStatus: '',
      mbtiType: '',
      musicPreference: '',
      name: '',
      professionalExperience: '',
      relationshipDuration: '',
      relationshipExpectations: '',
      relationshipFocus: 'romantic',
      socializationFrequency: '',
      technicalSkills: '',
      workArea: '',
      workPreferences: []
    },
    resolver: zodResolver(profileFormSchema)
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
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
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
          <Button className="flex items-center gap-2" type="submit">
            <Save className="h-4 w-4" />
            Salvar e Continuar
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ProfileForm
