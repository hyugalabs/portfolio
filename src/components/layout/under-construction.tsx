export function UnderConstruction() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center">
      <div className="flex items-center gap-3">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-8 w-8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="6" width="20" height="8" rx="1" />
          <path d="M17 14v7M7 14v7M17 3v3M7 3v3M10 14 2.3 6.3M14 6l7.7 7.7M8 6l8 8" />
        </svg>
        <h1 className="text-2xl font-semibold tracking-tight">
          Hyuga Labs - Under Construction
        </h1>
      </div>
    </main>
  );
}
