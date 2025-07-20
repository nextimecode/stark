'use client'

import Link from 'next/link'
import { User } from 'lucide-react'
import { env } from '@/env'
import { Title } from './title'

const nedUrl = env.NEXT_PUBLIC_NED_URL
const sansaUrl = env.NEXT_PUBLIC_SANSA_URL

export function Header() {
  return (
    // <!-- ========== HEADER ========== -->
    <header className="z-50 flex w-full flex-wrap py-7 md:flex-nowrap md:justify-start">
      <nav
        className="relative mx-auto flex w-full max-w-7xl basis-full flex-wrap items-center px-4 md:grid md:grid-cols-12 md:px-6"
        aria-label="Global"
      >
        <div className="md:col-span-3">
          <Link href="/">
            <Title size="text-xl lg:text-3xl" color="violet">
              NeXTverso
            </Title>
          </Link>
        </div>

        <div className="ms-auto flex items-center gap-x-2 py-1 md:order-3 md:col-span-3 md:ps-6">
          <Link
            href={`${nedUrl}?redirect=${encodeURIComponent(sansaUrl)}`}
            className="bg-primary focus:bg-primary-600 inline-flex items-center gap-x-2 rounded-xl border border-transparent px-3 py-2 text-sm font-semibold text-white transition-all duration-300 hover:animate-[button-glow_2.5s_ease-in-out_infinite] focus:outline-hidden disabled:pointer-events-none disabled:opacity-50"
          >
            <User className="h-4 w-4" />
            Conta NeXTIME
          </Link>

          <div className="md:hidden">
            <button
              className="hs-collapse-toggle flex size-[38px] items-center justify-center rounded-xl border border-gray-200 text-sm font-semibold text-black hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700"
              aria-label="Toggle navigation"
              type="button"
              aria-controls="navbar-collapse-with-animation"
              data-hs-collapse="#navbar-collapse-with-animation"
            >
              <svg
                className="hs-collapse-open:hidden size-4 shrink-0"
                aria-hidden="true"
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
                <line x1="3" x2="21" y1="6" y2="6" />
                <line x1="3" x2="21" y1="12" y2="12" />
                <line x1="3" x2="21" y1="18" y2="18" />
              </svg>
              <svg
                className="hs-collapse-open:block hidden size-4 shrink-0"
                aria-hidden="true"
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
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        </div>
        {/* <!-- End Button Group --> */}

        {/* <!-- Collapse --> */}
        <div
          className="hs-collapse hidden grow basis-full overflow-hidden transition-all duration-300 md:order-2 md:col-span-6 md:block md:w-auto md:basis-auto"
          id="navbar-collapse-with-animation"
        >
          <div className="mt-5 flex flex-col gap-x-0 gap-y-4 md:mt-0 md:flex-row md:items-center md:justify-center md:gap-x-7 md:gap-y-0">
            <div>
              <a
                href="#how-it-works"
                className="hover:before:bg-secondary relative inline-block text-black before:absolute before:start-0 before:bottom-0.5 before:-z-1 before:h-1 before:w-full dark:text-white"
                aria-current="page"
              >
                Como funciona?
              </a>
            </div>
            <div>
              <a
                href="#personality-charts"
                className="hover:before:bg-secondary relative inline-block text-black before:absolute before:start-0 before:bottom-0.5 before:-z-1 before:h-1 before:w-full dark:text-white"
              >
                MBTI
              </a>
            </div>
            <div>
              <a
                href="#faq"
                className="hover:before:bg-secondary relative inline-block text-black before:absolute before:start-0 before:bottom-0.5 before:-z-1 before:h-1 before:w-full dark:text-white"
              >
                FAQ
              </a>
            </div>
          </div>
        </div>
        {/* <!-- End Collapse --> */}
      </nav>
    </header>
    // <!-- ========== END HEADER ========== -->
  )
}
