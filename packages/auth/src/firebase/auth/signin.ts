import {
  getAuth,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  fetchSignInMethodsForEmail,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword
} from 'firebase/auth'

import { firebase_app } from '@/firebase/config'

const auth = getAuth(firebase_app)

export async function signInWithEmailAndPassword(
  email: string,
  password: string
) {
  try {
    const userCredential = await firebaseSignInWithEmailAndPassword(
      auth,
      email,
      password
    )
    const user = userCredential.user

    // Retorna sucesso e os dados do usuário autenticado
    return { success: true, user }
  } catch (error: any) {
    // Trata os erros possíveis e os retorna
    return { success: false, error: error.message || 'Erro desconhecido.' }
  }
}

// Função para enviar o link de autenticação para o e-mail
export async function sendSignInLink(email: string) {
  const actionCodeSettings = {
    url: `${window.location.origin}/complete-signin`, // URL para concluir o login
    handleCodeInApp: true // Garantir que o link seja tratado no app
  }

  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings)
    window.localStorage.setItem('emailForSignIn', email)
    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}

// Função para verificar se o link é válido e concluir o login
export async function completeSignIn() {
  const link = window.location.href

  if (!isSignInWithEmailLink(auth, link)) {
    return { success: false, error: 'O link de autenticação não é válido.' }
  }

  const email = window.localStorage.getItem('emailForSignIn')
  if (!email) {
    return {
      success: false,
      error: 'Nenhum e-mail encontrado para autenticação.'
    }
  }

  try {
    const signInMethods = await fetchSignInMethodsForEmail(auth, email)

    if (signInMethods.length > 0 && !signInMethods.includes('emailLink')) {
      return {
        success: false,
        error: 'O e-mail já está vinculado a outra forma de login.'
      }
    }

    const result = await signInWithEmailLink(auth, email, link)
    window.localStorage.removeItem('emailForSignIn')

    return { success: true, user: result.user }
  } catch (error) {
    return { success: false, error }
  }
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider()

  try {
    const result = await signInWithPopup(auth, provider)
    const user = result.user

    return { success: true, user }
  } catch (error) {
    return { success: false, error }
  }
}
