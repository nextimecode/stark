export function ThemeSelector() {
  return (
    <div className="hs-dropdown">
      <button
        className="hs-dropdown-toggle hs-dark-mode group flex items-center font-medium text-gray-600 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-neutral-500"
        type="button"
      >
        <svg
          className="hs-dark-mode-active:hidden block size-4"
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
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
        </svg>
        <svg
          className="hs-dark-mode-active:block hidden size-4"
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
          <circle cx="12" cy="12" r="4"></circle>
          <path d="M12 2v2"></path>
          <path d="M12 20v2"></path>
          <path d="m4.93 4.93 1.41 1.41"></path>
          <path d="m17.66 17.66 1.41 1.41"></path>
          <path d="M2 12h2"></path>
          <path d="M20 12h2"></path>
          <path d="m6.34 17.66-1.41 1.41"></path>
          <path d="m19.07 4.93-1.41 1.41"></path>
        </svg>
      </button>

      <div
        className="hs-dropdown-menu hs-dropdown-open:opacity-100 z-10 mt-2 mb-2 hidden origin-bottom-left space-y-1 rounded-lg bg-white p-2 opacity-0 shadow-md transition-[margin,opacity] duration-300 dark:divide-neutral-700 dark:border dark:border-neutral-700 dark:bg-neutral-800"
        id="selectThemeDropdown"
      >
        <button
          className="flex w-full items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
          data-hs-theme-click-value="default"
          type="button"
        >
          Default (Light)
        </button>
        <button
          className="flex w-full items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
          data-hs-theme-click-value="dark"
          type="button"
        >
          Dark
        </button>
        <button
          className="flex w-full items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
          data-hs-theme-click-value="auto"
          type="button"
        >
          Auto (System)
        </button>
      </div>
    </div>
  )
}
