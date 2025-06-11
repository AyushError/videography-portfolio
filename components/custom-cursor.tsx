"use client"

import { useState, useEffect, useRef } from "react"

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number; timestamp: number }>>([])
  const trailRef = useRef<Array<{ x: number; y: number; id: number; timestamp: number }>>([])
  const idCounter = useRef(0)
  const animationRef = useRef<number>()

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })

      // Add to trail with timestamp
      const newTrailPoint = {
        x: e.clientX,
        y: e.clientY,
        id: idCounter.current++,
        timestamp: Date.now(),
      }

      trailRef.current = [newTrailPoint, ...trailRef.current.slice(0, 20)]
      setTrail([...trailRef.current])
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    // Animate trail particles
    const animateTrail = () => {
      const now = Date.now()
      trailRef.current = trailRef.current.filter((point) => now - point.timestamp < 1000)
      setTrail([...trailRef.current])
      animationRef.current = requestAnimationFrame(animateTrail)
    }

    document.addEventListener("mousemove", updatePosition)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll("button, a, [role='button'], input, textarea")
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter)
      el.addEventListener("mouseleave", handleMouseLeave)
    })

    animationRef.current = requestAnimationFrame(animateTrail)

    return () => {
      document.removeEventListener("mousemove", updatePosition)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <>
      {/* Artistic Trail */}
      {trail.map((point, index) => {
        const age = Date.now() - point.timestamp
        const opacity = Math.max(0, 1 - age / 1000)
        const scale = Math.max(0.1, 1 - age / 1000)

        return (
          <div
            key={point.id}
            className="fixed pointer-events-none z-50"
            style={{
              left: point.x,
              top: point.y,
              transform: "translate(-50%, -50%)",
            }}
          >
            {/* Outer glow */}
            <div
              className="absolute rounded-full"
              style={{
                width: `${40 * scale}px`,
                height: `${40 * scale}px`,
                background: `radial-gradient(circle, rgba(255,255,255,${opacity * 0.1}) 0%, transparent 70%)`,
                transform: "translate(-50%, -50%)",
              }}
            />

            {/* Inner particle */}
            <div
              className="absolute rounded-full"
              style={{
                width: `${8 * scale}px`,
                height: `${8 * scale}px`,
                background: `rgba(255,255,255,${opacity * 0.8})`,
                transform: "translate(-50%, -50%)",
                boxShadow: `0 0 ${20 * scale}px rgba(255,255,255,${opacity * 0.5})`,
              }}
            />

            {/* Color particle */}
            <div
              className="absolute rounded-full"
              style={{
                width: `${4 * scale}px`,
                height: `${4 * scale}px`,
                background: `hsl(${(index * 30 + Date.now() * 0.1) % 360}, 70%, 60%)`,
                transform: "translate(-50%, -50%)",
                opacity: opacity * 0.6,
                filter: `blur(${2 * (1 - scale)}px)`,
              }}
            />
          </div>
        )
      })}

      {/* Main Cursor */}
      <div
        className="fixed pointer-events-none z-50 transition-all duration-200 ease-out"
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${isHovering ? 2 : 1})`,
        }}
      >
        {/* Outer ring */}
        <div
          className="absolute w-8 h-8 border border-white/30 rounded-full"
          style={{
            transform: "translate(-50%, -50%)",
            animation: isHovering ? "spin 2s linear infinite" : "none",
          }}
        />

        {/* Inner dot */}
        <div
          className="absolute w-2 h-2 bg-white rounded-full"
          style={{
            transform: "translate(-50%, -50%)",
            boxShadow: "0 0 10px rgba(255,255,255,0.8)",
          }}
        />

        {/* Hover effect */}
        {isHovering && (
          <div
            className="absolute w-12 h-12 border border-white/20 rounded-full animate-ping"
            style={{
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
      </div>

      {/* Click Ripple */}
      {isClicking && (
        <div
          className="fixed pointer-events-none z-40"
          style={{
            left: position.x,
            top: position.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="w-20 h-20 border-2 border-white/40 rounded-full animate-ping" />
          <div
            className="absolute w-32 h-32 border border-white/20 rounded-full animate-ping"
            style={{ animationDelay: "0.1s" }}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
    </>
  )
}
