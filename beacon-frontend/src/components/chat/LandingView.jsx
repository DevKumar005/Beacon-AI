import React from 'react';

/**
 * LandingView
 *
 * Drop-in child for the <main> slot of AppLayout. Purely presentational —
 * it owns no navigation logic itself; the parent decides what `onStart`
 * actually does (e.g. setView('chat')).
 */
export default function LandingView({ onStart = () => {} }) {
  return (
    // `relative` is the one addition beyond the spec, and it's load-bearing:
    // with `justify-center` centering everything in this container, the
    // disclaimer would get pulled into the vertical middle along with the
    // headline/button if it were just another flex child. Taking it out of
    // flow with `absolute` lets the hero content center independently while
    // the disclaimer stays pinned to the literal bottom of the view.
    <div className="relative h-full flex flex-col items-center justify-center bg-[#030303] px-6 text-center">

      <h1 className="max-w-xs sm:max-w-md text-4xl sm:text-5xl font-bold tracking-tight leading-tight text-zinc-100">
        BEACON AI Benefits Navigator
      </h1>

      <p className="mt-4 max-w-xs sm:max-w-sm text-base text-zinc-400 leading-relaxed">
        Interpret complex benefits guidelines and understand your next steps.
      </p>

      <button
        onClick={onStart}
        className="mt-8 bg-zinc-100 text-zinc-950 font-semibold px-8 py-3 rounded-full hover:bg-zinc-200 transition-colors"
      >
        Get Started
      </button>

      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 max-w-xs text-xs text-zinc-600">
        BEACON AI provides information, not legal eligibility decisions.
      </p>
    </div>
  );
}