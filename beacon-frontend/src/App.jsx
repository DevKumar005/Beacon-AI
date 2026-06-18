import React from 'react';

function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-zinc-50 font-sans antialiased selection:bg-teal-500 selection:text-zinc-950">
      {/* Decorative background glow ambient effect */}
      <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[1000px] -translate-x-1/2 bg-[radial-gradient(circle_at_top,rgba(20,184,166,0.15),transparent_50%)]" />

      <main className="text-center px-4 max-w-2xl">
        {/* Core Project Branding Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-xs font-medium tracking-wide text-teal-400 uppercase">
          <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
          System Active
        </div>

        {/* Impact Title */}
        <h1 className="mt-6 text-5xl font-extrabold tracking-tight sm:text-7xl bg-gradient-to-b from-zinc-50 via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
          BEACON AI
        </h1>

        {/* Lead Statement */}
        <p className="mt-6 text-lg sm:text-xl text-zinc-400 font-medium leading-relaxed">
          Building something next-gen. 
          <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 font-semibold">
            Fresh 3D interface architecture coming up.
          </span>
        </p>

        {/* Subtitle / Loader Indicator */}
        <div className="mt-10 flex items-center justify-center gap-3 text-sm tracking-widest text-zinc-500 font-mono uppercase">
          <div className="flex gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-500/60 animate-[bounce_1s_infinite_100ms]" />
            <span className="h-1.5 w-1.5 rounded-full bg-teal-500/60 animate-[bounce_1s_infinite_200ms]" />
            <span className="h-1.5 w-1.5 rounded-full bg-teal-500/60 animate-[bounce_1s_infinite_300ms]" />
          </div>
          Initializing Milestone 1
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="absolute bottom-6 text-xs text-zinc-600 font-mono tracking-wider">
        © {new Date().getFullYear()} BEACON AI // FRONTEND MAIN PIPELINE
      </footer>
    </div>
  );
}

export default App;