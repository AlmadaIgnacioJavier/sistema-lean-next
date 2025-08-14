function Spinner() {
  return (
    <div
      className="flex flex-col items-center space-y-4"
      role="status"
      aria-live="polite"
    >
      <svg
        className="h-10 w-10 text-gray-600 dark:text-gray-300 animate-spin"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle
          className="opacity-25 stroke-current text-gray-300 dark:text-gray-600"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75 fill-current text-gray-700 dark:text-white"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      <span className="text-sm text-gray-700 dark:text-white/90">
        Cargando...
      </span>
    </div>
  );
}

export default Spinner;
