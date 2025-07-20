'use client'

import { useFormStatus } from 'react-dom'

export function AddMBTIButton() {
  const { pending } = useFormStatus()
  return (
    <button disabled={pending} type="submit">
      {pending ? 'carregando' : 'Salvar MBTI'}
    </button>
  )
}
