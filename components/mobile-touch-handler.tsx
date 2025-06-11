"use client"

import { useEffect } from "react"

export function MobileTouchHandler() {
  useEffect(() => {
    // Prevent zoom on double tap for iOS
    let lastTouchEnd = 0
    const preventZoom = (e: TouchEvent) => {
      const now = new Date().getTime()
      if (now - lastTouchEnd <= 300) {
        e.preventDefault()
      }
      lastTouchEnd = now
    }

    // Add touch-friendly interactions
    const addTouchFeedback = () => {
      const interactiveElements = document.querySelectorAll("button, a, [role='button']")

      interactiveElements.forEach((element) => {
        element.addEventListener("touchstart", () => {
          element.classList.add("touch-active")
        })

        element.addEventListener("touchend", () => {
          setTimeout(() => {
            element.classList.remove("touch-active")
          }, 150)
        })

        element.addEventListener("touchcancel", () => {
          element.classList.remove("touch-active")
        })
      })
    }

    // Smooth scroll for mobile
    const smoothScrollToSection = (target: string) => {
      const element = document.querySelector(target)
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        })
      }
    }

    // Handle viewport height for mobile browsers
    const setVH = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty("--vh", `${vh}px`)
    }

    // Optimize scroll performance on mobile
    let ticking = false
    const optimizeScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Scroll optimizations here
          ticking = false
        })
        ticking = true
      }
    }

    // Event listeners
    document.addEventListener("touchend", preventZoom, { passive: false })
    window.addEventListener("resize", setVH)
    window.addEventListener("orientationchange", setVH)
    window.addEventListener("scroll", optimizeScroll, { passive: true })

    // Initialize
    addTouchFeedback()
    setVH()

    return () => {
      document.removeEventListener("touchend", preventZoom)
      window.removeEventListener("resize", setVH)
      window.removeEventListener("orientationchange", setVH)
      window.removeEventListener("scroll", optimizeScroll)
    }
  }, [])

  return null
}
