"use client"

import { useEffect, useRef } from "react"

export function SoundManager() {
  const hoverSoundRef = useRef<HTMLAudioElement>(null)
  const clickSoundRef = useRef<HTMLAudioElement>(null)
  const whooshSoundRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    // Create audio elements
    hoverSoundRef.current = new Audio("/sounds/hover.mp3")
    clickSoundRef.current = new Audio("/sounds/click.mp3")
    whooshSoundRef.current = new Audio("/sounds/whoosh.mp3")

    // Set volume
    if (hoverSoundRef.current) hoverSoundRef.current.volume = 0.3
    if (clickSoundRef.current) clickSoundRef.current.volume = 0.4
    if (whooshSoundRef.current) whooshSoundRef.current.volume = 0.2

    const playHoverSound = () => {
      if (hoverSoundRef.current) {
        hoverSoundRef.current.currentTime = 0
        hoverSoundRef.current.play().catch(() => {})
      }
    }

    const playClickSound = () => {
      if (clickSoundRef.current) {
        clickSoundRef.current.currentTime = 0
        clickSoundRef.current.play().catch(() => {})
      }
    }

    const playWhooshSound = () => {
      if (whooshSoundRef.current) {
        whooshSoundRef.current.currentTime = 0
        whooshSoundRef.current.play().catch(() => {})
      }
    }

    // Add event listeners to interactive elements
    const buttons = document.querySelectorAll("button")
    const links = document.querySelectorAll("a")
    const cards = document.querySelectorAll("[data-sound='hover']")

    buttons.forEach((button) => {
      button.addEventListener("mouseenter", playHoverSound)
      button.addEventListener("click", playClickSound)
    })

    links.forEach((link) => {
      link.addEventListener("mouseenter", playHoverSound)
      link.addEventListener("click", playClickSound)
    })

    cards.forEach((card) => {
      card.addEventListener("mouseenter", playWhooshSound)
    })

    return () => {
      buttons.forEach((button) => {
        button.removeEventListener("mouseenter", playHoverSound)
        button.removeEventListener("click", playClickSound)
      })

      links.forEach((link) => {
        link.removeEventListener("mouseenter", playHoverSound)
        link.removeEventListener("click", playClickSound)
      })

      cards.forEach((card) => {
        card.removeEventListener("mouseenter", playWhooshSound)
      })
    }
  }, [])

  return null
}
