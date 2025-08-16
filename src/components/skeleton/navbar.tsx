const NavbarSkeleton = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 w-full">
        <div className="flex items-center">
          {/* Placeholder botón hamburguesa */}
          <div className="h-10 w-10 rounded-md bg-slate-200 dark:bg-slate-800 animate-pulse" />
        </div>

        <div className="hidden sm:flex items-center">
          {/* Placeholder título */}
          <div className="h-5 w-36 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
        </div>

        <div className="flex items-center space-x-3">
          <div className="hidden sm:block">
            {/* Placeholder theme switch */}
            <div className="h-6 w-10 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
          </div>

          {/* Placeholder avatar */}
          <div className="h-9 w-9 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />

          <div className="sm:hidden">
            <div className="h-6 w-10 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
          </div>
        </div>
      </div>
    </nav>
  );
};
export default NavbarSkeleton;
