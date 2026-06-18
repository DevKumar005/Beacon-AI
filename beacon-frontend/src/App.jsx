import React from 'react';

function App() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-between bg-[#030303] text-zinc-100 overflow-hidden font-sans antialiased">
      
      {/* Top Ambient Glow */}
      <div className="absolute top-0 left-1/2 -z-10 h-[500px] w-[1000px] -translate-x-1/2 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.08),transparent_60%)] pointer-events-none" />

      {/* Header / Branding */}
      <header className="w-full max-w-7xl mx-auto px-6 py-8 flex justify-between items-center z-10">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-gradient-to-tr from-cyan-500 to-pink-500 animate-spin [animation-duration:6s]" />
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-zinc-400 font-semibold">Beacon Core</span>
        </div>
        <div className="rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-1 text-xs font-mono text-zinc-400 backdrop-blur-md">
          v4.0.0-alpha
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 max-w-4xl z-10 -mt-16">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-950/30 px-4 py-2 text-xs font-medium tracking-widest text-cyan-400 uppercase backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          Phase 1 // System Booting
        </div>

        {/* Big Premium Heading */}
        <h1 className="mt-8 text-6xl font-black tracking-tighter sm:text-8xl lg:text-9xl bg-gradient-to-b from-white via-zinc-200 to-zinc-600 bg-clip-text text-transparent drop-shadow-sm select-none">
          BEACON AI
        </h1>

        {/* Subtitle / Building Phase Statement */}
        <p className="mt-6 text-xl sm:text-2xl text-zinc-400 max-w-xl font-light tracking-wide leading-relaxed">
          Architecting a fluid, next-generation intelligence framework.{' '}
          <span className="block mt-2 font-medium bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Currently in active building phase.
          </span>
        </p>
      </main>

      {/* Footer Details */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 z-10 text-xs font-mono text-zinc-600 tracking-wider">
        <div>INITIALIZING MILESTONE 1 PIPELINE</div>
        <div>© {new Date().getFullYear()} BEACON LABS INC.</div>
      </footer>

      {/* --- Gemini-Style Bluish-Pinkish Animated Wave Container --- */}
      <div className="absolute bottom-0 left-0 right-0 h-[45vh] w-full overflow-hidden pointer-events-none z-0 select-none">
        
        {/* Deep background color block to anchor the wave gradient blending */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent z-10" />

        {/* Wave Layer 1: Cyan/Blue Core Fluid */}
        <div 
          className="absolute bottom-[-10%] left-[-20%] w-[140%] h-[120%] rounded-[42%_40%_45%_43%] bg-gradient-to-tr from-cyan-600/30 via-blue-600/20 to-transparent blur-2xl animate-[wave_20s_infinite_linear]"
          style={{ transformOrigin: '50% 48%' }}
        />

        {/* Wave Layer 2: Vivid Pink/Purple Secondary Fluid (Offset to create movement overlap) */}
        <div 
          className="absolute bottom-[-15%] left-[-10%] w-[130%] h-[125%] rounded-[40%_43%_41%_44%] bg-gradient-to-tl from-pink-600/25 via-purple-600/20 to-transparent blur-3xl animate-[wave_15s_infinite_linear_reverse]"
          style={{ transformOrigin: '48% 52%' }}
        />

        {/* Wave Layer 3: Accent Neon Highlight for that glowing edge effect */}
        <div 
          className="absolute bottom-[-5%] left-[-15%] w-[135%] h-[115%] rounded-[44%_42%_43%_41%] bg-gradient-to-br from-cyan-400/10 via-pink-400/15 to-transparent blur-xl animate-[wave_25s_infinite_linear]"
          style={{ transformOrigin: '51% 49%' }}
        />
      </div>

    </div>
  );
}

export default App;