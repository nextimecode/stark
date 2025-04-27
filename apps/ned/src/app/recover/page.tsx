"use client";

import { FormEvent, useState } from "react";

import Link from "next/link";

import { Title } from "@/components/";
import { Logo } from "@/components/logo";

import { sendPasswordResetEmail } from "firebase/auth";

import { auth } from "@/firebase/client";

export default function Recover() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordReset = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage(
        "E-mail de redefinição de senha enviado com sucesso. Verifique sua caixa de entrada.",
      );
    } catch (error) {
      setErrorMessage(
        "Não foi possível enviar o e-mail de redefinição de senha. Verifique se o endereço de e-mail está correto.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-xl bg-white border border-gray-200 rounded-xl  dark:bg-system-gray6 dark:border-system-gray2 shadow-card">
        <div className="p-4 sm:p-7">
          <div>
            <div className="pb-4">
              <Logo className="mx-auto" width={81} height={100} />
            </div>
            <div className="text-center pb-4">
              <Title color="blue" size="text-3xl">
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
                    htmlFor="email"
                    className="block text-sm mb-2 dark:text-white"
                  >
                    E-mail
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-system-gray6 dark:border-system-gray2 dark:text-white dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      required
                      placeholder="Digite seu e-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                {errorMessage && (
                  <p className="text-red-500 text-sm">{errorMessage}</p>
                )}
                {successMessage && (
                  <p className="text-green-500 text-sm">{successMessage}</p>
                )}
                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  disabled={isLoading}
                >
                  {isLoading ? "Enviando..." : "Enviar"}
                </button>
              </div>
            </form>
            <p className="mt-4 text-sm text-gray-600 dark:text-neutral-400 text-center">
              Lembrou sua senha?{" "}
              <Link
                href="/"
                className="text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500"
              >
                Faça login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
