// app/recover/page.tsx

'use client'

import { type FormEvent, useState } from 'react'
import Link from 'next/link'
import { Title } from '@/components/'
import { Logo } from '@/components/logo'
import { sendPasswordResetEmail } from '@/firebase/auth'
import { auth } from '@/firebase/client'

export default function Recover() {
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handlePasswordReset = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      await sendPasswordResetEmail(auth, email)
      setSuccessMessage(
        'E-mail de redefinição de senha enviado com sucesso. Verifique sua caixa de entrada.'
      )
    } catch {
      setErrorMessage(
        'Não foi possível enviar o e-mail de redefinição de senha. Verifique se o endereço de e-mail está correto.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="dark:bg-system-gray6 dark:border-system-gray2 shadow-card w-full max-w-xl rounded-xl border border-gray-200 bg-white">
        <div className="p-4 sm:p-7">
          <div>
            <div className="pb-4">
              <Logo className="mx-auto" width={81} height={100} />
            </div>
            <div className="pb-4 text-center">
              <Title size="text-3xl" color="blue">
                Recuperar Senha
              </Title>
              <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
                Insira seu e-mail para receber instruções de redefinição de
                senha.
              </p>
            </div>
            <form onSubmit={handlePasswordReset}>
              <div className="grid gap-y-4">
                <div>
                  <label
                    className="mb-2 block text-sm dark:text-white"
                    htmlFor="email"
                  >
                    E-mail
                  </label>
                  <div className="relative">
                    <input
                      className="dark:bg-system-gray6 dark:border-system-gray2 block w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      required
                      onChange={e => setEmail(e.target.value)}
                      placeholder="Digite seu e-mail"
                    />
                  </div>
                </div>
                {errorMessage && (
                  <p className="text-sm text-red-500">{errorMessage}</p>
                )}
                {successMessage && (
                  <p className="text-sm text-green-500">{successMessage}</p>
                )}
                <button
                  className="inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700 focus:bg-blue-700 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50"
                  disabled={isLoading}
                  type="submit"
                >
                  {isLoading ? 'Enviando...' : 'Enviar'}
                </button>
              </div>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600 dark:text-neutral-400">
              Lembrou sua senha?{' '}
              <Link
                href="/"
                className="font-medium text-blue-600 decoration-2 hover:underline focus:underline focus:outline-hidden dark:text-blue-500"
              >
                Faça login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
