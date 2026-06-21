export default function AppLayout({ header, footer, children }) {
  return (
    <div className="h-[100dvh] w-full flex flex-col overflow-hidden bg-zinc-950 text-zinc-100">
      <header className="h-16 shrink-0 flex items-center px-4 border-b border-zinc-800/80 bg-zinc-900/60 backdrop-blur-md z-20">
        {header}
      </header>
      <main className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
        {children}
      </main>
      <footer className="shrink-0 border-t border-zinc-800/80 bg-zinc-900/60 backdrop-blur-md px-4 py-3">
        {footer}
      </footer>
    </div>
  );
}