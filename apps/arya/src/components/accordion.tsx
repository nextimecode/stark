export function Accordion() {
  return (
    <>
      <div className="hs-accordion-group">
        <div
          className="hs-accordion-to-destroy hs-accordion hs-accordion-active:border-gray-200 dark:hs-accordion-active:border-neutral-700 rounded-xl border border-transparent bg-white dark:border-transparent dark:bg-neutral-800"
          id="hs-destroy-heading-one"
        >
          <button
            className="hs-accordion-toggle hs-accordion-active:text-blue-600 dark:hs-accordion-active:text-blue-500 inline-flex w-full items-center justify-between gap-x-3 px-5 py-4 text-start font-semibold text-gray-800 hover:text-gray-500 disabled:pointer-events-none disabled:opacity-50 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 dark:focus:outline-none"
            aria-expanded="false"
            aria-controls="hs-destroy-collapse-one"
          >
            Accordion #1
            <svg
              className="hs-accordion-active:hidden block size-3.5"
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
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
            <svg
              className="hs-accordion-active:block hidden size-3.5"
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
              <path d="M5 12h14"></path>
            </svg>
          </button>
          <div
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            id="hs-destroy-collapse-one"
            aria-labelledby="hs-destroy-heading-one"
            role="region"
          >
            <div className="px-5 pb-4">
              <p className="text-gray-800 dark:text-neutral-200">
                <em>This is the third item's accordion body.</em> It is hidden
                by default, until the collapse plugin adds the appropriate
                classes that we use to style each element. These classes control
                the overall appearance, as well as the showing and hiding via
                CSS transitions.
              </p>
            </div>
          </div>
        </div>

        <div
          className="hs-accordion-to-destroy hs-accordion hs-accordion-active:border-gray-200 active dark:hs-accordion-active:border-neutral-700 rounded-xl border border-transparent bg-white dark:border-transparent dark:bg-neutral-800"
          id="hs-destroy-heading-two"
        >
          <button
            className="hs-accordion-toggle hs-accordion-active:text-blue-600 dark:hs-accordion-active:text-blue-500 inline-flex w-full items-center justify-between gap-x-3 px-5 py-4 text-start font-semibold text-gray-800 hover:text-gray-500 disabled:pointer-events-none disabled:opacity-50 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 dark:focus:outline-none"
            aria-expanded="true"
            aria-controls="hs-destroy-collapse-two"
          >
            Accordion #2
            <svg
              className="hs-accordion-active:hidden block size-3.5"
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
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
            <svg
              className="hs-accordion-active:block hidden size-3.5"
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
              <path d="M5 12h14"></path>
            </svg>
          </button>
          <div
            className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
            id="hs-destroy-collapse-two"
            aria-labelledby="hs-destroy-heading-two"
            role="region"
          >
            <div className="px-5 pb-4">
              <p className="text-gray-800 dark:text-neutral-200">
                <em>This is the second item's accordion body.</em> It is hidden
                by default, until the collapse plugin adds the appropriate
                classes that we use to style each element. These classes control
                the overall appearance, as well as the showing and hiding via
                CSS transitions.
              </p>
            </div>
          </div>
        </div>

        <div
          className="hs-accordion-to-destroy hs-accordion hs-accordion-active:border-gray-200 dark:hs-accordion-active:border-neutral-700 rounded-xl border border-transparent bg-white dark:border-transparent dark:bg-neutral-800"
          id="hs-destroy-heading-three"
        >
          <button
            className="hs-accordion-toggle hs-accordion-active:text-blue-600 dark:hs-accordion-active:text-blue-500 inline-flex w-full items-center justify-between gap-x-3 px-5 py-4 text-start font-semibold text-gray-800 hover:text-gray-500 disabled:pointer-events-none disabled:opacity-50 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 dark:focus:outline-none"
            aria-expanded="false"
            aria-controls="hs-destroy-collapse-three"
          >
            Accordion #3
            <svg
              className="hs-accordion-active:hidden block size-3.5"
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
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
            <svg
              className="hs-accordion-active:block hidden size-3.5"
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
              <path d="M5 12h14"></path>
            </svg>
          </button>
          <div
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            id="hs-destroy-collapse-three"
            aria-labelledby="hs-destroy-heading-three"
            role="region"
          >
            <div className="px-5 pb-4">
              <p className="text-gray-800 dark:text-neutral-200">
                <em>This is the first item's accordion body.</em> It is hidden
                by default, until the collapse plugin adds the appropriate
                classes that we use to style each element. These classes control
                the overall appearance, as well as the showing and hiding via
                CSS transitions.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          className="inline-flex items-center gap-x-1 rounded-lg border border-gray-200 bg-white px-2 py-1 text-sm text-gray-800 hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
          id="hs-destroy-accordion"
          type="button"
        >
          <svg
            className="size-3.5 shrink-0"
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
          Destroy accordion
        </button>
        <button
          className="inline-flex items-center gap-x-1 rounded-lg border border-transparent bg-gray-100 px-2 py-1 text-sm text-gray-800 hover:bg-gray-200 disabled:pointer-events-none disabled:opacity-50 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:hover:text-white"
          id="hs-auto-init-accordion"
          type="button"
        >
          <svg
            className="size-3.5 shrink-0"
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
            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
            <path d="M3 3v5h5"></path>
            <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path>
            <path d="M16 16h5v5"></path>
          </svg>
          Reinitialize accordion
        </button>
      </div>
    </>
  )
}
