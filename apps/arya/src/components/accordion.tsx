export function Accordion() {
  return (
    <>
      <div className="hs-accordion-group">
        <div
          className="hs-accordion-to-destroy hs-accordion hs-accordion-active:border-gray-200 bg-white border border-transparent rounded-xl dark:hs-accordion-active:border-neutral-700 dark:bg-neutral-800 dark:border-transparent"
          id="hs-destroy-heading-one"
        >
          <button
            className="hs-accordion-toggle hs-accordion-active:text-blue-600 inline-flex justify-between items-center gap-x-3 w-full font-semibold text-start text-gray-800 py-4 px-5 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:outline-none dark:focus:text-neutral-400"
            aria-expanded="false"
            aria-controls="hs-destroy-collapse-one"
          >
            Accordion #1
            <svg
              className="hs-accordion-active:hidden block size-3.5"
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
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
            <svg
              className="hs-accordion-active:block hidden size-3.5"
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
              <path d="M5 12h14"></path>
            </svg>
          </button>
          <div
            id="hs-destroy-collapse-one"
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            role="region"
            aria-labelledby="hs-destroy-heading-one"
          >
            <div className="pb-4 px-5">
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
          className="hs-accordion-to-destroy hs-accordion hs-accordion-active:border-gray-200 active bg-white border border-transparent rounded-xl dark:hs-accordion-active:border-neutral-700 dark:bg-neutral-800 dark:border-transparent"
          id="hs-destroy-heading-two"
        >
          <button
            className="hs-accordion-toggle hs-accordion-active:text-blue-600 inline-flex justify-between items-center gap-x-3 w-full font-semibold text-start text-gray-800 py-4 px-5 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:outline-none dark:focus:text-neutral-400"
            aria-expanded="true"
            aria-controls="hs-destroy-collapse-two"
          >
            Accordion #2
            <svg
              className="hs-accordion-active:hidden block size-3.5"
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
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
            <svg
              className="hs-accordion-active:block hidden size-3.5"
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
              <path d="M5 12h14"></path>
            </svg>
          </button>
          <div
            id="hs-destroy-collapse-two"
            className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
            role="region"
            aria-labelledby="hs-destroy-heading-two"
          >
            <div className="pb-4 px-5">
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
          className="hs-accordion-to-destroy hs-accordion hs-accordion-active:border-gray-200 bg-white border border-transparent rounded-xl dark:hs-accordion-active:border-neutral-700 dark:bg-neutral-800 dark:border-transparent"
          id="hs-destroy-heading-three"
        >
          <button
            className="hs-accordion-toggle hs-accordion-active:text-blue-600 inline-flex justify-between items-center gap-x-3 w-full font-semibold text-start text-gray-800 py-4 px-5 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:outline-none dark:focus:text-neutral-400"
            aria-expanded="false"
            aria-controls="hs-destroy-collapse-three"
          >
            Accordion #3
            <svg
              className="hs-accordion-active:hidden block size-3.5"
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
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
            <svg
              className="hs-accordion-active:block hidden size-3.5"
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
              <path d="M5 12h14"></path>
            </svg>
          </button>
          <div
            id="hs-destroy-collapse-three"
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            role="region"
            aria-labelledby="hs-destroy-heading-three"
          >
            <div className="pb-4 px-5">
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

      <div className="flex flex-wrap gap-2 mt-4">
        <button
          type="button"
          id="hs-destroy-accordion"
          className="py-1 px-2 inline-flex items-center gap-x-1 text-sm rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:text-white dark:border-neutral-700 dark:hover:bg-neutral-800"
        >
          <svg
            className="shrink-0 size-3.5"
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
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
          Destroy accordion
        </button>
        <button
          type="button"
          id="hs-auto-init-accordion"
          className="py-1 px-2 inline-flex items-center gap-x-1 text-sm rounded-lg border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-white/10 dark:hover:bg-white/20 dark:text-white dark:hover:text-white"
        >
          <svg
            className="shrink-0 size-3.5"
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
