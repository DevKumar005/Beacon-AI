import React, { useEffect, useState } from 'react';

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Track mouse coordinates for the premium interactive dynamic lighting spotlight
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-between bg-[#020204] text-zinc-100 overflow-hidden font-sans antialiased selection:bg-cyan-500/30">
      
      {/* 1. --- BACKGROUND LAYER MATRIX (Everything visual sits strictly back here) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        
        {/* Interactive Desktop Mouse-Tracking Spotlight Halo */}
        <div 
          className="absolute inset-0 opacity-40 transition-opacity duration-1000 hidden md:block"
          style={{
            background: `radial-gradient(circle 450px at ${mousePosition.x}% ${mousePosition.y}%, rgba(147, 51, 234, 0.04), rgba(6, 182, 212, 0.03), transparent 80%)`
          }}
        />

        {/* Top Ambient Radial Starfield Mask */}
        <div className="absolute top-0 left-1/2 h-[600px] w-[1200px] -translate-x-1/2 bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.12),rgba(147,51,234,0.03),transparent_50%)]" />

        {/* Gemini-Style Fluid Wave Matrix */}
        <div className="absolute bottom-0 left-0 right-0 h-[60vh] w-full overflow-hidden">
          {/* Deep background baseline anchor to smoothly blend dark convergence */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020204] via-[#020204]/40 to-transparent z-10" />

          {/* Wave Layer 1: Electric Cyan Ambient Base Core */}
          <div 
            className="absolute bottom-[-30%] left-[-25%] w-[150%] h-[150%] rounded-[46%_44%_48%_45%] bg-gradient-to-tr from-cyan-500/30 via-blue-600/15 to-transparent blur-3xl animate-[wave_24s_infinite_linear]"
            style={{ transformOrigin: '49% 51%' }}
          />

          {/* Wave Layer 2: Deep Ultraviolet Shift Layer */}
          <div 
            className="absolute bottom-[-35%] left-[-15%] w-[140%] h-[145%] rounded-[43%_47%_44%_46%] bg-gradient-to-b from-indigo-600/10 via-purple-600/15 to-transparent blur-3xl animate-[wave_19s_infinite_linear_reverse]"
            style={{ transformOrigin: '52% 48%' }}
          />

          {/* Wave Layer 3: Cosmic Neon Pink Peak Wave */}
          <div 
            className="absolute bottom-[-40%] left-[-10%] w-[135%] h-[140%] rounded-[41%_45%_42%_47%] bg-gradient-to-tl from-pink-500/20 via-purple-500/10 to-transparent blur-3xl animate-[wave_16s_infinite_linear]"
            style={{ transformOrigin: '47% 53%' }}
          />

          {/* Wave Layer 4: High-Contrast Accent Neon Cyan Line Overlay */}
          <div 
            className="absolute bottom-[-20%] left-[-20%] w-[145%] h-[130%] rounded-[45%_41%_47%_43%] bg-gradient-to-br from-cyan-400/10 via-emerald-500/5 to-transparent blur-2xl animate-[wave_28s_infinite_linear_reverse]"
            style={{ transformOrigin: '51% 49%' }}
          />
        </div>
      </div>

      {/* 2. --- FOREGROUND CONTENT LAYER (Sits safely on top at z-10) --- */}
      <div className="relative flex flex-col items-center justify-between w-full min-h-screen z-10">
        
        {/* Header / Premium Top Branding Nav */}
        <header className="w-full max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-crosshair">
            <div className="relative h-7 w-7 rounded-lg bg-gradient-to-tr from-cyan-400 via-indigo-500 to-pink-500 p-[1px] shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <div className="h-full w-full rounded-[7px] bg-[#020204] flex items-center justify-center">
                <div className="h-2 w-2 rounded-sm bg-gradient-to-tr from-cyan-400 to-pink-400 animate-pulse" />
              </div>
            </div>
            <span className="font-mono text-xs tracking-[0.4em] uppercase text-zinc-300 font-bold bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
              Beacon Core
            </span>
          </div>
          
          <div className="flex items-center gap-2 rounded-full border border-zinc-800/80 bg-zinc-900/30 px-3.5 py-1.5 text-xs font-mono text-zinc-400 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            v4.0.0-alpha.stable
          </div>
        </header>

        {/* Main Core Viewport */}
        <main className="flex-1 flex flex-col items-center justify-center text-center px-4 max-w-4xl -mt-10">
          
          {/* Cinematic Premium Heading */}
          <div className="relative select-none">
            <h1 className="text-6xl font-black tracking-tighter sm:text-8xl lg:text-9xl bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]">
              BEACON AI
            </h1>
          </div>

          {/* Smooth Subtitle Context with Integrated Project Focus */}
          <p className="mt-8 text-lg sm:text-xl text-zinc-400 max-w-2xl font-light tracking-wide leading-relaxed">
            Illuminating the path to community support and public assistance.{' '}
            <span className="block mt-3 font-mono text-xs uppercase tracking-widest font-semibold bg-gradient-to-r from-cyan-400 via-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse [animation-duration:3s]">
             Assembling eligibility engines  
            </span>
          </p>

          {/* Smooth Subtitle Context with Integrated Project Focus */}
          <p className="mt-8 text-lg sm:text-xl text-zinc-400 max-w-2xl font-light tracking-wide leading-relaxed">
            <span className="block mt-4 text-sm font-mono tracking-widest uppercase font-bold text-transparent bg-gradient-to-r from-cyan-400 via-indigo-400 via-purple-350 to-pink-400 bg-clip-text animate-[pulse_3s_infinite]">
              Currently in active building phase.
            </span>
          </p>
        </main>

        {/* Footer Meta Metrics */}
        <footer className="w-full max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-zinc-500 tracking-widest border-t border-zinc-900/50">
          <div className="flex items-center gap-2">
            <span className="inline-block h-1 w-1 rounded-full bg-cyan-500 animate-ping" />
            SYSTEM OPERATIONAL // NODE ACTIVE
          </div>
          <div>© {new Date().getFullYear()} BEACON LABS INC.</div>
        </footer>

      </div>
    </div>
  );
}

export default App;