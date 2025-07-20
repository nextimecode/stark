'use client'

import React, { useState } from 'react'

export const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false)

  const dismissBanner = () => {
    setShowBanner(false) // Atualiza o estado para não mostrar o banner
  }
  return (
    <div>
      {showBanner && (
        <div
          className="fixed start-1/2 bottom-0 z-60 mx-auto w-full -translate-x-1/2 transform p-6 sm:max-w-4xl"
          id="cookies-simple-with-dismiss-button"
        >
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
            <div className="flex items-center justify-between gap-x-5 sm:gap-x-10">
              <h2 className="text-sm text-gray-600 dark:text-neutral-400">
                By continuing to use this site you consent to the use of cookies
                in accordance with our
                <a
                  href="#"
                  className="inline-flex items-center gap-x-1.5 font-medium text-blue-600 decoration-2 hover:underline dark:text-blue-500"
                >
                  Cookies Policy.
                </a>
              </h2>
              <button
                className="inline-flex items-center gap-x-2 rounded-full border border-transparent bg-gray-100 p-2 text-sm font-semibold text-gray-800 hover:bg-gray-200 disabled:pointer-events-none disabled:opacity-50 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:hover:text-white"
                aria-label="Dismiss"
                type="button"
                onClick={dismissBanner} // Utiliza a prop `onDismiss` para remover o elemento
              >
                <svg
                  className="size-5 shrink-0"
                  width="24"
                  height="24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
