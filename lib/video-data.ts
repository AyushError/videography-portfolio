// Video data configuration - Easy to manage and update
export interface VideoItem {
  id: string
  title: string
  type: string
  tools: string
  description: string
  thumbnail: string
  videoSrc: string
  featured?: boolean
}

export const videoData: VideoItem[] = [
  {
    id: "brand-revolution",
    title: "Brand Revolution",
    type: "Brand Ad",
    tools: "Premiere Pro, After Effects",
    description: "Turned 30 seconds into pure emotion",
    thumbnail: "/placeholder.svg?height=300&width=400",
    videoSrc: "/placeholder-video.mp4",
    featured: true,
  },
  {
    id: "creators-journey",
    title: "Creator's Journey",
    type: "Creator Reel",
    tools: "DaVinci Resolve",
    description: "Raw authenticity meets cinematic flow",
    thumbnail: "/placeholder.svg?height=300&width=400",
    videoSrc: "/placeholder-video.mp4",
    featured: true,
  },
  {
    id: "startup-dreams",
    title: "Startup Dreams",
    type: "Company Story",
    tools: "Premiere Pro, After Effects",
    description: "From idea to impact in 2 minutes",
    thumbnail: "/placeholder.svg?height=300&width=400",
    videoSrc: "/placeholder-video.mp4",
    featured: true,
  },
]

// Special videos for specific sections
export const heroVideo = {
  src: "/placeholder-video.mp4", // Using placeholder for now
  fallbackImage: "/placeholder.svg?height=1080&width=1920",
}

export const showreelVideo = {
  src: "/placeholder-video.mp4", // Using placeholder for now
  title: "Ayush Singh Showreel",
}

export const beforeAfterVideos = {
  before: {
    src: "/placeholder-video.mp4", // Using placeholder for now
    thumbnail: "/placeholder.svg?height=300&width=500",
  },
  after: {
    src: "/placeholder-video.mp4", // Using placeholder for now
    thumbnail: "/placeholder.svg?height=300&width=500",
    title: "Before & After Transformation",
  },
}

// Helper functions
export const getFeaturedVideos = () => videoData.filter((video) => video.featured)
export const getAllVideos = () => videoData
export const getVideoById = (id: string) => videoData.find((video) => video.id === id)
