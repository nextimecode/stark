// firebase/auth/signin.ts

"use client";

import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "@/firebase/client";

export async function signInWithEmailAndPassword(
  email: string,
  password: string,
) {
  try {
    const userCredential = await firebaseSignInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    return {
      success: true,
      data: { user },
    };
  } catch (error) {
    console.error(
      "Error signInWithEmailAndPassword:",
      (error as Error).message,
    );
    return {
      success: false,
      error: (error as Error).message || "Erro desconhecido.",
    };
  }
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    return {
      success: true,
      data: { user },
    };
  } catch (error) {
    console.error("Error signInWithGoogle:", (error as Error).message);
    return {
      success: false,
      error: (error as Error).message || "Erro desconhecido.",
    };
  }
}
