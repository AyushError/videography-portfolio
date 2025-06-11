"use client"

import { useEffect, useState } from "react"

export function PerformanceMonitor() {
  const [fps, setFps] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show in development or when explicitly enabled
    const showMonitor =
      process.env.NODE_ENV === "development" || localStorage.getItem("show-performance-monitor") === "true"

    setIsVisible(showMonitor)

    if (!showMonitor) return

    let frames = 0
    let lastTime = performance.now()
    let animationId: number

    const measureFPS = () => {
      frames++
      const currentTime = performance.now()

      if (currentTime >= lastTime + 1000) {
        setFps(Math.round((frames * 1000) / (currentTime - lastTime)))
        frames = 0
        lastTime = currentTime
      }

      animationId = requestAnimationFrame(measureFPS)
    }

    animationId = requestAnimationFrame(measureFPS)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed top-4 right-4 z-[10000] bg-black/80 text-white px-3 py-2 rounded text-sm font-mono">
      <div>FPS: {fps}</div>
      <div className={`text-xs ${fps >= 55 ? "text-green-400" : fps >= 30 ? "text-yellow-400" : "text-red-400"}`}>
        {fps >= 55 ? "Smooth" : fps >= 30 ? "Good" : "Laggy"}
      </div>
    </div>
  )
}
