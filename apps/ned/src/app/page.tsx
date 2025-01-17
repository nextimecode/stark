'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { logEvent } from 'firebase/analytics'

import { useAuthContext } from '@/context/AuthContext'
import { sendSignInLink, signInWithGoogle } from '@/firebase/auth/signin'
import { analytics } from '@/firebase/config'

export default function Home() {
  const { user, loading } = useAuthContext()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [isLinkSent, setIsLinkSent] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (!loading && user) {
      console.log('user', user)
      // router.push(`${process.env.NEXT_PUBLIC_SANSA_URL}/`)
    }
  }, [loading, user, router])

  const handleGoogleLogin = async () => {
    const { success, error } = await signInWithGoogle()

    if (success) {
      if (analytics) {
        logEvent(analytics, 'login', { method: 'Google' })
      }
      router.push(`${process.env.NEXT_PUBLIC_SANSA_URL}/`)
    } else {
      setErrorMessage(
        (error as Error)?.message || 'Falha ao fazer login com o Google.'
      )
    }
  }

  const handleForm = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    const { success, error } = await sendSignInLink(email)

    if (!success) {
      setErrorMessage(
        error === 'auth/email-already-in-use'
          ? 'Este e-mail já está vinculado a outra forma de login. Por favor, use sua senha ou outro método.'
          : (error as Error)?.message || 'Falha ao enviar o link de login.'
      )
      return
    }

    if (analytics) {
      logEvent(analytics, 'login', { method: 'email_link_sent' })
    }

    setIsLinkSent(true)
  }

  if (loading || (!loading && user)) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div
          className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Carregando</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
        <div className="p-4 sm:p-7">
          <div>
            {!isLinkSent ? (
              <>
                <div className="text-center pb-4">
                  <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                    Entrar
                  </h1>
                  {/* <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
                    Faça login na sua conta
                    <a
                      className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
                      href="../examples/html/signup.html"
                    >
                      Sign up here
                    </a>
                  </p> */}
                </div>
                <button
                  type="button"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                  onClick={handleGoogleLogin}
                >
                  <svg
                    className="w-4 h-auto"
                    width="46"
                    height="47"
                    viewBox="0 0 46 47"
                    fill="none"
                  >
                    <path
                      d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
                      fill="#34A853"
                    />
                    <path
                      d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
                      fill="#EB4335"
                    />
                  </svg>
                  Entrar com Google
                </button>
                <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600">
                  Ou
                </div>
                <form onSubmit={handleForm}>
                  <div className="grid gap-y-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm mb-2 dark:text-white"
                      >
                        Email
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                          required
                          aria-describedby="email-error"
                          onChange={e => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    {errorMessage && (
                      <p className="text-red-500 text-sm">{errorMessage}</p>
                    )}
                    {/*
                    <div>
                      <div className="flex justify-between items-center">
                        <label
                          htmlFor="password"
                          className="block text-sm mb-2 dark:text-white"
                        >
                          Password
                        </label>
                        <a
                          className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
                          href="../examples/html/recover-account.html"
                        >
                          Forgot password?
                        </a>
                      </div>
                      <div className="relative">
                        <input
                          type="password"
                          id="password"
                          name="password"
                          className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                          required
                          aria-describedby="password-error"
                        />
                      </div>
                    </div> */}

                    {/* <div className="flex items-center">
                      <div className="flex">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                        />
                      </div>
                      <div className="ms-3">
                        <label
                          htmlFor="remember-me"
                          className="text-sm dark:text-white"
                        >
                          Remember me
                        </label>
                      </div>
                    </div> */}

                    <button
                      type="submit"
                      className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      Enviar Link de Login
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="bg-white rounded">
                <h1 className="text-2xl font-bold mb-6 text-black">
                  Link Enviado
                </h1>
                <p className="text-gray-700">
                  Verifique sua caixa de entrada e clique no link enviado para
                  concluir o login.
                </p>
                {/* <button
                  onClick={() => router.push('/')}
                  className="mt-4 w-full bg-blue-500 text-white font-semibold py-2 rounded"
                >
                  Voltar para a página inicial
                </button> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  // return (
  //   <div className="flex flex-col items-center justify-center h-screen">
  //     <div className="w-full max-w-xs">
  //       {!isLinkSent ? (
  //         <form
  //           onSubmit={handleForm}
  //           className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
  //         >
  //           <h1 className="text-3xl font-bold mb-6 text-black">Sign In</h1>
  //           <div className="mb-4">
  //             <label
  //               htmlFor="email"
  //               className="block text-gray-700 text-sm font-bold mb-2"
  //             >
  //               Email
  //             </label>
  //             <input
  //               onChange={e => setEmail(e.target.value)}
  //               required
  //               type="email"
  //               name="email"
  //               id="email"
  //               placeholder="example@mail.com"
  //               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  //             />
  //           </div>
  //           {errorMessage && (
  //             <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
  //           )}
  //           {errorMessage ===
  //             'Este e-mail já está vinculado a outra forma de login. Por favor, use sua senha ou outro método.' && (
  //             <p className="text-gray-700">
  //               Já possui uma conta?{' '}
  //               <a href="/login" className="text-blue-500">
  //                 Faça login aqui
  //               </a>
  //               .
  //             </p>
  //           )}
  //           <div className="flex items-center justify-between mt-4">
  //             <button
  //               type="submit"
  //               className="w-full bg-blue-500 text-white font-semibold py-2 rounded"
  //             >
  //               Enviar Link de Login
  //             </button>
  //           </div>
  //         </form>
  //       ) : (
  //         <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
  //           <h1 className="text-2xl font-bold mb-6 text-black">Link Enviado</h1>
  //           <p className="text-gray-700">
  //             Verifique sua caixa de entrada e clique no link enviado para
  //             concluir o login.
  //           </p>
  //           <button
  //             onClick={() => router.push('/')}
  //             className="mt-4 w-full bg-blue-500 text-white font-semibold py-2 rounded"
  //           >
  //             Voltar para a página inicial
  //           </button>
  //         </div>
  //       )}
  //       <div className="mt-4">
  //         <button
  //           onClick={handleGoogleLogin}
  //           className="w-full bg-red-500 text-white font-semibold py-2 rounded"
  //         >
  //           Login com Google
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // )
}
