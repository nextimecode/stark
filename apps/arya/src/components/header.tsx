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
    <header className="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full py-7">
      <nav
        className="relative max-w-7xl w-full flex flex-wrap md:grid md:grid-cols-12 basis-full items-center px-4 md:px-6 mx-auto"
        aria-label="Global"
      >
        <div className="md:col-span-3">
          <Link href="/">
            <Title color="violet" size="text-xl lg:text-3xl">
              NeXTverso
            </Title>
          </Link>
        </div>

        <div className="flex items-center gap-x-2 ms-auto py-1 md:ps-6 md:order-3 md:col-span-3">
          <Link
            className="transition-all duration-300 hover:animate-[button-glow_2.5s_ease-in-out_infinite] py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-xl border border-transparent bg-primary text-white font-semibold disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-primary-600"
            href={`${nedUrl}?redirect=${encodeURIComponent(sansaUrl)}`}
          >
            <User className="h-4 w-4" />
            Conta NeXTIME
          </Link>

          <div className="md:hidden">
            <button
              type="button"
              className="hs-collapse-toggle size-[38px] flex justify-center items-center text-sm font-semibold rounded-xl border border-gray-200 text-black hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-neutral-700 dark:hover:bg-neutral-700"
              data-hs-collapse="#navbar-collapse-with-animation"
              aria-controls="navbar-collapse-with-animation"
              aria-label="Toggle navigation"
            >
              <svg
                aria-hidden="true"
                className="hs-collapse-open:hidden shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" x2="21" y1="6" y2="6" />
                <line x1="3" x2="21" y1="12" y2="12" />
                <line x1="3" x2="21" y1="18" y2="18" />
              </svg>
              <svg
                aria-hidden="true"
                className="hs-collapse-open:block hidden shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
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
          id="navbar-collapse-with-animation"
          className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block md:w-auto md:basis-auto md:order-2 md:col-span-6"
        >
          <div className="flex flex-col gap-y-4 gap-x-0 mt-5 md:flex-row md:justify-center md:items-center md:gap-y-0 md:gap-x-7 md:mt-0">
            <div>
              <a
                className="relative inline-block text-black before:absolute before:bottom-0.5 before:start-0 before:-z-1 before:w-full before:h-1 hover:before:bg-secondary dark:text-white"
                href="#how-it-works"
                aria-current="page"
              >
                Como funciona?
              </a>
            </div>
            <div>
              <a
                className="relative inline-block text-black before:absolute before:bottom-0.5 before:start-0 before:-z-1 before:w-full before:h-1 hover:before:bg-secondary dark:text-white"
                href="#personality-charts"
              >
                MBTI
              </a>
            </div>
            <div>
              <a
                className="relative inline-block text-black before:absolute before:bottom-0.5 before:start-0 before:-z-1 before:w-full before:h-1 hover:before:bg-secondary dark:text-white"
                href="#faq"
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
