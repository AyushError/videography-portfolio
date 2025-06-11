"use client"

import { useEffect, useRef, useState } from "react"

export function FlowCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [cursorText, setCursorText] = useState("")
  const animationRef = useRef<number>()
  const mousePosition = useRef({ x: 0, y: 0 })
  const currentPosition = useRef({ x: 0, y: 0 })
  const lastUpdateTime = useRef(0)
  const isSmoothingEnabled = useRef(true)

  // Browser detection and optimization flags
  const isFirefox = useRef(false)
  const isSafari = useRef(false)
  const isHighPerformanceDevice = useRef(true)
  const hasReducedMotion = useRef(false)

  useEffect(() => {
    // Browser detection
    const userAgent = navigator.userAgent
    isFirefox.current = userAgent.indexOf("Firefox") !== -1
    isSafari.current = /^((?!chrome|android).)*safari/i.test(userAgent)

    // Performance detection
    isHighPerformanceDevice.current = navigator.hardwareConcurrency > 4
    hasReducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    // Adjust settings based on browser and device
    if (isFirefox.current) {
      isSmoothingEnabled.current = false
    }

    // Check if mobile
    const isMobile = window.innerWidth <= 768
    if (isMobile) return

    const updateCursor = () => {
      const now = Date.now()

      // Throttle updates for better performance (targeting 60fps)
      if (now - lastUpdateTime.current < 16) {
        animationRef.current = requestAnimationFrame(updateCursor)
        return
      }

      // Adjust speed based on browser
      let speed = isHovering ? 0.15 : 0.2

      if (isFirefox.current) {
        // Higher values for more direct movement in Firefox
        speed = isHovering ? 0.3 : 0.4
      } else if (isSafari.current) {
        // Slightly slower for Safari to reduce jitter
        speed = isHovering ? 0.12 : 0.18
      }

      // Reduce animation complexity for reduced motion preference
      if (hasReducedMotion.current) {
        speed = 0.8 // Much more direct movement
      }

      const deltaX = mousePosition.current.x - currentPosition.current.x
      const deltaY = mousePosition.current.y - currentPosition.current.y

      currentPosition.current.x += deltaX * speed
      currentPosition.current.y += deltaY * speed

      // Only update state if position changed significantly (reduce DOM operations)
      if (Math.abs(deltaX) > 0.5 || Math.abs(deltaY) > 0.5) {
        setPosition({
          x: currentPosition.current.x,
          y: currentPosition.current.y,
        })
      }

      lastUpdateTime.current = now
      animationRef.current = requestAnimationFrame(updateCursor)
    }

    // Throttled mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      // Skip processing if less than 16ms since last update (targeting 60fps)
      if (Date.now() - lastUpdateTime.current < 10) return

      mousePosition.current = { x: e.clientX, y: e.clientY }
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    // Debounced setup function for better performance
    const debounce = (fn: Function, ms = 100) => {
      let timeoutId: ReturnType<typeof setTimeout>
      return function (this: any, ...args: any[]) {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => fn.apply(this, args), ms)
      }
    }

    // Handle interactive elements
    const setupInteractiveElements = () => {
      const elements = document.querySelectorAll('button, a, [role="button"], .magnetic')

      elements.forEach((element) => {
        element.addEventListener("mouseenter", () => {
          setIsHovering(true)
          const text = element.getAttribute("data-cursor-text")
          if (text) setCursorText(text)
        })

        element.addEventListener("mouseleave", () => {
          setIsHovering(false)
          setCursorText("")
        })
      })
    }

    const debouncedSetupInteractiveElements = debounce(setupInteractiveElements, 100)

    // Event listeners with passive option for better performance
    document.addEventListener("mousemove", handleMouseMove, { passive: true })
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true })
    document.addEventListener("mouseenter", handleMouseEnter, { passive: true })

    debouncedSetupInteractiveElements()
    animationRef.current = requestAnimationFrame(updateCursor)

    // Handle visibility change to pause animations when tab is not active
    const handleVisibilityChange = () => {
      if (document.hidden && animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      } else if (!document.hidden) {
        animationRef.current = requestAnimationFrame(updateCursor)
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isHovering])

  // Don't render on mobile devices
  if (typeof window !== "undefined" && window.innerWidth <= 768) {
    return null
  }

  // Determine particle count based on device performance
  const particleCount = isHighPerformanceDevice.current ? 5 : 2
  const shouldShowParticles = !hasReducedMotion.current

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className={`fixed pointer-events-none z-[9999] transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          // Use translate3d for hardware acceleration (especially important for Safari)
          transform: "translate3d(-50%, -50%, 0)",
          // Reduce jitter in Safari
          backfaceVisibility: "hidden",
          // Hint for browser optimization
          willChange: "transform",
          // Ensure crisp rendering
          imageRendering: "crisp-edges",
        }}
      >
        {/* Outer blob */}
        <div
          className={`relative transition-all duration-300 ease-out ${
            isHovering ? "scale-150" : "scale-100"
          } ${hasReducedMotion.current ? "transition-none" : ""}`}
        >
          {/* Main blob */}
          <div
            className={`w-8 h-8 rounded-full transition-all duration-300 ${
              isHovering
                ? "bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400"
                : "bg-gradient-to-r from-white/20 to-white/10"
            } ${hasReducedMotion.current ? "transition-none" : ""}`}
            style={{
              filter: isSafari.current ? "blur(6px)" : "blur(8px)", // Reduce blur for Safari performance
              animation: hasReducedMotion.current ? "none" : "pulse 2s ease-in-out infinite",
              // Force hardware acceleration
              transform: "translateZ(0)",
            }}
          />

          {/* Inner dot */}
          <div
            className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"
            style={{
              boxShadow: hasReducedMotion.current ? "none" : "0 0 10px rgba(255, 255, 255, 0.8)",
              // Force hardware acceleration
              transform: "translate3d(-50%, -50%, 0)",
            }}
          />

          {/* Cursor text */}
          {cursorText && (
            <div
              className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 text-white text-xs font-light tracking-wider whitespace-nowrap"
              style={{
                // Force hardware acceleration for text
                transform: "translate3d(-50%, 0, 0)",
              }}
            >
              {cursorText}
            </div>
          )}
        </div>

        {/* Trailing particles - only show if motion is not reduced and device can handle it */}
        {shouldShowParticles && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {[...Array(particleCount)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/40 rounded-full"
                style={{
                  animation: `float ${2 + i * 0.5}s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`,
                  transform: `translate3d(${Math.cos(i * 2) * 20}px, ${Math.sin(i * 2) * 20}px, 0)`,
                  // Reduce particle complexity for Firefox
                  opacity: isFirefox.current ? 0.3 : 0.4,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Global styles with browser-specific optimizations */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        
        @media (max-width: 768px) {
          * {
            cursor: auto !important;
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: translateZ(0) scale(1);
            opacity: 0.8;
          }
          50% {
            transform: translateZ(0) scale(1.1);
            opacity: 1;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translate3d(0, 0px, 0);
            opacity: 0.3;
          }
          50% {
            transform: translate3d(0, -10px, 0);
            opacity: 0.8;
          }
        }

        /* Firefox-specific optimizations */
        @-moz-document url-prefix() {
          .fixed {
            /* Improve rendering performance in Firefox */
            image-rendering: optimizeSpeed;
          }
        }

        /* Safari-specific optimizations */
        @supports (-webkit-appearance: none) {
          .fixed {
            /* Improve rendering performance in Safari */
            -webkit-transform: translate3d(0, 0, 0);
            -webkit-backface-visibility: hidden;
            -webkit-perspective: 1000;
          }
        }

        /* High performance device optimizations */
        @media (min-resolution: 2dppx) {
          .fixed {
            /* Better rendering on high DPI displays */
            image-rendering: -webkit-optimize-contrast;
            image-rendering: crisp-edges;
          }
        }

        /* Ensure these don't apply on mobile */
        @media (max-width: 768px) {
          .hover-scale, .click-scale {
            transform: none !important;
          }
        }
      `}</style>
    </>
  )
}
