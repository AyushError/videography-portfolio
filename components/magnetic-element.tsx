"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface MagneticElementProps {
  children: React.ReactNode
  className?: string
  cursorText?: string
  role?: string
  ariaLabel?: string
}

export function MagneticElement({ children, className, cursorText, role, ariaLabel }: MagneticElementProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const handleFocus = () => setIsFocused(true)
    const handleBlur = () => setIsFocused(false)

    element.addEventListener("focus", handleFocus)
    element.addEventListener("blur", handleBlur)

    return () => {
      element.removeEventListener("focus", handleFocus)
      element.removeEventListener("blur", handleBlur)
    }
  }, [])

  return (
    <div
      ref={elementRef}
      className={cn("transition-all duration-200 ease-out", className)}
      data-cursor-text={cursorText}
      role={role}
      aria-label={ariaLabel}
      tabIndex={role === "button" ? 0 : undefined}
      style={{
        outline: isFocused ? "2px solid rgba(255, 255, 255, 0.5)" : "none",
        outlineOffset: "2px",
      }}
    >
      {children}
    </div>
  )
}
