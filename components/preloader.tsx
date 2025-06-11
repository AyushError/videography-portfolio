"use client"

import { useEffect } from "react"

export function Preloader({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    // Simple 2 second loading time
    const timer = setTimeout(() => {
      onComplete()
    }, 2000)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        {/* Logo/Brand */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-pulse">AYUSH SINGH</h1>
          <p className="text-gray-400 text-lg">Video Editor & Storyteller</p>
        </div>

        {/* Simple loading animation */}
        <div className="flex justify-center space-x-2 mb-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-white rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>

        <p className="text-gray-500 text-sm">Crafting cinematic experiences...</p>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-float opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
