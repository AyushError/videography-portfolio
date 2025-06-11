"use client"

import { useState, useEffect, useRef } from "react"
import { X, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VideoLightboxProps {
  isOpen: boolean
  onClose: () => void
  videoSrc: string
  title: string
}

export function VideoLightbox({ isOpen, onClose, videoSrc, title }: VideoLightboxProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (isOpen && videoRef.current && !videoError) {
      videoRef.current.play().catch(() => {
        setVideoError(true)
      })
      setIsPlaying(true)
    }
  }, [isOpen, videoError])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  const togglePlay = () => {
    if (videoRef.current && !videoError) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play().catch(() => {
          setVideoError(true)
        })
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleVideoError = () => {
    setVideoError(true)
    setIsPlaying(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8">
      <div className="relative w-full max-w-6xl aspect-video bg-zinc-900 overflow-hidden">
        {!videoError ? (
          <video
            ref={videoRef}
            src={videoSrc}
            className="w-full h-full object-cover"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onError={handleVideoError}
          />
        ) : (
          <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 border border-zinc-700 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Play className="h-8 w-8 text-zinc-400 ml-1" />
              </div>
              <h3 className="text-xl font-light tracking-wide text-zinc-300 mb-2">{title}</h3>
              <p className="text-zinc-500 font-light">Video preview will be available soon</p>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/50 to-transparent opacity-100 md:opacity-0 md:hover:opacity-100 transition-opacity duration-300">
          <div className="absolute top-4 md:top-8 right-4 md:right-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-zinc-100 hover:bg-zinc-100/10 border border-zinc-700 touch-manipulation w-12 h-12 md:w-auto md:h-auto"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 right-4 md:right-8 flex items-center justify-between">
            <h3 className="text-lg md:text-xl font-light tracking-wide text-zinc-100 truncate pr-4">{title}</h3>
            {!videoError && (
              <Button
                variant="ghost"
                size="icon"
                onClick={togglePlay}
                className="text-zinc-100 hover:bg-zinc-100/10 border border-zinc-700 touch-manipulation w-12 h-12 md:w-auto md:h-auto flex-shrink-0"
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-1" />}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
