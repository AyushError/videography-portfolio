"use client"

import React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowUpRight, Play, Mail, Instagram, Linkedin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { VideoLightbox } from "../components/video-lightbox"
import { FlowCursor } from "../components/flow-cursor"
import { SoundManager } from "../components/sound-manager"
import { videoData, showreelVideo } from "../lib/video-data"
import { MobileTouchHandler } from "../components/mobile-touch-handler"
import { MagneticElement } from "../components/magnetic-element"
import { PerformanceMonitor } from "../components/performance-monitor"

// Intersection Observer Hook
function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      { threshold: 0.1, ...options },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return [ref, isIntersecting] as const
}

// Reveal Animation Component
function RevealText({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [ref, isIntersecting] = useIntersectionObserver()

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

// Stagger Animation Component
function StaggerContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [ref, isIntersecting] = useIntersectionObserver()

  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, index) => (
        <div
          className={`transition-all duration-700 ease-out ${
            isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}

export default function Portfolio() {
  const [lightboxVideo, setLightboxVideo] = useState<{ src: string; title: string } | null>(null)
  const [scrollY, setScrollY] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)

    // Initial load animation
    setTimeout(() => setIsLoaded(true), 500)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const openLightbox = (videoSrc: string, title: string) => {
    setLightboxVideo({ src: videoSrc, title })
  }

  const closeLightbox = () => {
    setLightboxVideo(null)
  }

  return (
    <>
      <FlowCursor />
      <PerformanceMonitor />
      <MobileTouchHandler />
      <SoundManager />

      <div className="min-h-screen bg-zinc-950 text-zinc-100 overflow-x-hidden">
        {/* Noise Texture Overlay */}
        <div className="fixed inset-0 opacity-[0.015] pointer-events-none z-0">
          <div className="w-full h-full bg-noise"></div>
        </div>

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8">
            <div className="flex justify-between items-center">
              <MagneticElement strength={0.2}>
                <div className="text-sm font-light tracking-wider text-zinc-100">AYUSH SINGH</div>
              </MagneticElement>
              <div className="hidden md:flex space-x-12 text-sm font-light tracking-wide">
                <MagneticElement cursorText="WORK" role="button" ariaLabel="View work section">
                  <button
                    className="hover:text-zinc-400 transition-colors duration-300"
                    onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    WORK
                  </button>
                </MagneticElement>
                <MagneticElement cursorText="ABOUT" role="button" ariaLabel="View about section">
                  <button
                    className="hover:text-zinc-400 transition-colors duration-300"
                    onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    ABOUT
                  </button>
                </MagneticElement>
                <MagneticElement cursorText="CONTACT" role="button" ariaLabel="View contact section">
                  <button
                    className="hover:text-zinc-400 transition-colors duration-300"
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    CONTACT
                  </button>
                </MagneticElement>
              </div>
              {/* Mobile menu button */}
              <button className="md:hidden text-zinc-100 p-2">
                <div className="w-5 h-0.5 bg-zinc-100 mb-1"></div>
                <div className="w-5 h-0.5 bg-zinc-100 mb-1"></div>
                <div className="w-5 h-0.5 bg-zinc-100"></div>
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center">
          {/* Background Video with Parallax */}
          <div
            className="absolute inset-0 scale-110"
            style={{ transform: `translateY(${scrollY * 0.5}px) scale(1.1)` }}
          >
            <Image
              src="/placeholder.svg?height=1080&width=1920"
              alt="Hero background"
              fill
              className="object-cover opacity-20"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/60 via-zinc-950/40 to-zinc-950/80" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 text-center max-w-5xl mx-auto px-4 md:px-8">
            <div
              className={`transition-all duration-1500 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            >
              <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-thin tracking-tight leading-none mb-6 md:mb-8 flow-text">
                <div className="overflow-hidden mb-2">
                  <div
                    className={`transform transition-transform duration-1000 ease-flow ${isLoaded ? "translate-y-0" : "translate-y-full"}`}
                  >
                    VISUAL
                  </div>
                </div>
                <div className="overflow-hidden">
                  <div
                    className={`text-zinc-400 transform transition-transform duration-1000 ease-flow ${isLoaded ? "translate-y-0" : "translate-y-full"}`}
                    style={{ transitionDelay: "200ms" }}
                  >
                    STORYTELLER
                  </div>
                </div>
              </h1>

              <div className="max-w-2xl mx-auto mb-8 md:mb-12 overflow-hidden">
                <p
                  className={`text-base md:text-lg lg:text-xl font-light leading-relaxed text-zinc-300 tracking-wide px-4 transform transition-all duration-1000 ease-flow ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
                  style={{ transitionDelay: "400ms" }}
                >
                  Crafting cinematic narratives through the art of editing.
                  <br className="hidden sm:block" />
                  Every frame tells a story.
                </p>
              </div>

              <MagneticElement cursorText="PLAY" ariaLabel="Play showreel video">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-zinc-600 text-zinc-100 hover:bg-zinc-100/10 hover:text-zinc-100 focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-zinc-950 transition-all duration-300 px-6 md:px-8 py-4 md:py-6 text-sm tracking-wider font-light btn-flow touch-manipulation"
                  onClick={() => openLightbox(showreelVideo.src, showreelVideo.title)}
                  aria-label="Play Ayush Singh's video showreel"
                >
                  <Play className="mr-2 md:mr-3 h-4 w-4" aria-hidden="true" />
                  VIEW REEL
                </Button>
              </MagneticElement>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-zinc-400 to-transparent animate-pulse"></div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 md:py-32 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 md:gap-24 items-center">
              <div>
                <RevealText>
                  <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-12 leading-tight flow-text">
                    <div className="overflow-hidden">
                      <div className="transform transition-transform duration-1000 ease-flow translate-y-0">
                        Transforming raw footage into
                      </div>
                    </div>
                    <div className="overflow-hidden">
                      <div
                        className="text-zinc-400 transform transition-transform duration-1000 ease-flow translate-y-0"
                        style={{ transitionDelay: "100ms" }}
                      >
                        cinematic experiences
                      </div>
                    </div>
                  </h2>
                </RevealText>

                <RevealText delay={200}>
                  <p className="text-lg font-light leading-relaxed text-zinc-300 mb-8 tracking-wide">
                    I specialize in creating compelling visual narratives that resonate with audiences. Through
                    meticulous attention to pacing, color, and sound, I transform ordinary footage into extraordinary
                    stories.
                  </p>
                </RevealText>

                <RevealText delay={400}>
                  <p className="text-lg font-light leading-relaxed text-zinc-300 mb-12 tracking-wide">
                    Every project is an opportunity to push creative boundaries and explore new ways of visual
                    storytelling.
                  </p>
                </RevealText>

                <RevealText delay={600}>
                  <p className="text-sm font-light tracking-wider text-zinc-400 uppercase">
                    Video Editor & Storyteller
                  </p>
                </RevealText>
              </div>

              <div className="relative">
                <RevealText delay={300}>
                  <div className="aspect-[4/5] relative overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=600&width=480"
                      alt="Ayush Singh"
                      fill
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-700 image-hover-effect"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/20 to-transparent"></div>
                  </div>
                </RevealText>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Work */}
        <section id="work" className="py-16 md:py-32 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <RevealText>
              <div className="text-center mb-24">
                <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6 flow-text">
                  <div className="overflow-hidden">
                    <div className="transform transition-transform duration-1000 ease-flow translate-y-0">
                      Selected Work
                    </div>
                  </div>
                </h2>
                <p className="text-lg font-light text-zinc-400 tracking-wide">
                  A curated collection of recent projects
                </p>
              </div>
            </RevealText>

            <StaggerContainer className="space-y-32">
              {videoData.slice(0, 3).map((item, index) => (
                <div
                  key={item.id}
                  className={`grid lg:grid-cols-2 gap-8 md:gap-16 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
                >
                  <div className={`space-y-6 md:space-y-8 ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                    <div className="space-y-3 md:space-y-4">
                      <div className="flex items-center gap-3 md:gap-4">
                        <span className="text-xs font-light tracking-wider text-zinc-500 uppercase">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-xs font-light tracking-wider text-zinc-500 uppercase">{item.type}</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight flow-text">
                        <div className="overflow-hidden">
                          <div className="transform transition-transform duration-1000 ease-flow translate-y-0">
                            {item.title}
                          </div>
                        </div>
                      </h3>
                    </div>

                    <p className="text-base md:text-lg font-light leading-relaxed text-zinc-300 tracking-wide">
                      {item.description}
                    </p>

                    <div className="space-y-2">
                      <p className="text-sm font-light tracking-wide text-zinc-500">Tools</p>
                      <p className="text-sm font-light tracking-wide text-zinc-300">{item.tools}</p>
                    </div>

                    <MagneticElement cursorText="VIEW" ariaLabel={`View ${item.title} project`}>
                      <Button
                        variant="ghost"
                        className="text-zinc-300 hover:text-zinc-100 hover:bg-transparent focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-zinc-950 p-0 h-auto font-light tracking-wide group touch-manipulation"
                        onClick={() => openLightbox(item.videoSrc, item.title)}
                        aria-label={`View ${item.title} project video`}
                      >
                        View Project
                        <ArrowUpRight
                          className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                          aria-hidden="true"
                        />
                      </Button>
                    </MagneticElement>
                  </div>

                  <div className={`relative aspect-video ${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                    <MagneticElement strength={0.1} cursorText="PLAY">
                      <div
                        className="relative overflow-hidden cursor-pointer group touch-manipulation"
                        onClick={() => openLightbox(item.videoSrc, item.title)}
                      >
                        <Image
                          src={item.thumbnail || "/placeholder.svg"}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105 group-active:scale-105"
                        />
                        <div className="absolute inset-0 bg-zinc-950/20 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="w-12 md:w-16 h-12 md:h-16 border border-zinc-100 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <Play className="h-4 md:h-6 w-4 md:w-6 text-zinc-100 ml-1" />
                          </div>
                        </div>
                      </div>
                    </MagneticElement>
                  </div>
                </div>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-32 px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <RevealText>
              <p className="text-xl md:text-2xl font-light leading-relaxed tracking-wide text-zinc-300 flow-text">
                <div className="overflow-hidden">
                  <div className="transform transition-transform duration-1000 ease-flow translate-y-0">
                    "Crafting stories that resonate."
                  </div>
                </div>
              </p>
            </RevealText>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-32 px-4 md:px-8 bg-zinc-900/20">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 md:gap-24">
              <div>
                <RevealText>
                  <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-12 leading-tight flow-text">
                    <div className="overflow-hidden">
                      <div className="transform transition-transform duration-1000 ease-flow translate-y-0">
                        Let's create something
                      </div>
                    </div>
                    <div className="overflow-hidden">
                      <div
                        className="text-zinc-400 transform transition-transform duration-1000 ease-flow translate-y-0"
                        style={{ transitionDelay: "100ms" }}
                      >
                        extraordinary
                      </div>
                    </div>
                  </h2>
                </RevealText>

                <RevealText delay={200}>
                  <p className="text-lg font-light leading-relaxed text-zinc-300 mb-12 tracking-wide">
                    Ready to bring your vision to life? I'd love to hear about your project and explore how we can tell
                    your story together.
                  </p>
                </RevealText>

                <StaggerContainer className="space-y-6">
                  <MagneticElement cursorText="EMAIL" ariaLabel="Send email to Ayush Singh">
                    <Link
                      href="mailto:singh.ayush6400@gmail.com"
                      className="flex items-center gap-4 text-zinc-300 hover:text-zinc-100 focus:text-zinc-100 focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-zinc-950 transition-colors duration-300 group"
                      aria-label="Send email to singh.ayush6400@gmail.com"
                    >
                      <Mail className="h-5 w-5" aria-hidden="true" />
                      <span className="font-light tracking-wide">singh.ayush6400@gmail.com</span>
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                        aria-hidden="true"
                      />
                    </Link>
                  </MagneticElement>

                  <MagneticElement strength={0.2} cursorText="INSTAGRAM">
                    <Link
                      href="https://instagram.com/AyushError"
                      className="flex items-center gap-4 text-zinc-300 hover:text-zinc-100 transition-colors duration-300 group"
                    >
                      <Instagram className="h-5 w-5" />
                      <span className="font-light tracking-wide">@AyushError</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                  </MagneticElement>

                  <MagneticElement strength={0.2} cursorText="LINKEDIN">
                    <Link
                      href="https://www.linkedin.com/in/ayush-singh-67b65b290/"
                      className="flex items-center gap-4 text-zinc-300 hover:text-zinc-100 transition-colors duration-300 group"
                    >
                      <Linkedin className="h-5 w-5" />
                      <span className="font-light tracking-wide">LinkedIn</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                  </MagneticElement>
                </StaggerContainer>
              </div>

              <div>
                <RevealText delay={300}>
                  <form className="space-y-8">
                    <div className="space-y-6">
                      <Input
                        placeholder="Your name"
                        className="bg-transparent border-0 border-b border-zinc-700 rounded-none px-0 py-4 text-zinc-100 placeholder-zinc-500 focus:border-zinc-400 font-light tracking-wide"
                      />
                      <Input
                        type="email"
                        placeholder="Email address"
                        className="bg-transparent border-0 border-b border-zinc-700 rounded-none px-0 py-4 text-zinc-100 placeholder-zinc-500 focus:border-zinc-400 font-light tracking-wide"
                      />
                      <Textarea
                        placeholder="Tell me about your project..."
                        rows={4}
                        className="bg-transparent border-0 border-b border-zinc-700 rounded-none px-0 py-4 text-zinc-100 placeholder-zinc-500 focus:border-zinc-400 resize-none font-light tracking-wide"
                      />
                    </div>

                    <MagneticElement cursorText="SEND" ariaLabel="Send message">
                      <Button
                        variant="outline"
                        type="submit"
                        className="border-zinc-600 text-zinc-100 hover:bg-zinc-100/10 hover:text-zinc-100 focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-zinc-950 transition-all duration-300 px-8 py-3 font-light tracking-wider btn-flow"
                        aria-label="Send contact message"
                      >
                        SEND MESSAGE
                      </Button>
                    </MagneticElement>
                  </form>
                </RevealText>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-8 border-t border-zinc-800">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm font-light tracking-wide text-zinc-500 text-center sm:text-left">
              © 2025 Ayush Singh. All rights reserved.
            </p>
            <p className="text-sm font-light tracking-wide text-zinc-500 text-center sm:text-right">
              Crafted with intention
            </p>
          </div>
        </footer>
      </div>

      {/* Video Lightbox */}
      {lightboxVideo && (
        <VideoLightbox
          isOpen={!!lightboxVideo}
          onClose={closeLightbox}
          videoSrc={lightboxVideo.src}
          title={lightboxVideo.title}
        />
      )}
    </>
  )
}
