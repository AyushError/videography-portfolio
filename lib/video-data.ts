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
    id: "Revels Artists Reveal",
    title: "Revels Artists Reveal",
    type: "Event Ad",
    tools: "DaVinci Resolve, After Effects",
    description: "artist reveal date release",
    thumbnail: "/placeholder.svg?height=300&width=400",
    videoSrc: "/v1.mp4",
    featured: true,
  },
  {
    id: "creators-journey",
    title: "Fun Reel for Revels",
    type: "Fun Reel for Revels",
    tools: "DaVinci Resolve",
    description: "15 days to go",
    thumbnail: "/placeholder.svg?height=300&width=400",
    videoSrc: "/v2.mp4",
    featured: true,
  },
  {
    id: "Startup Dreams",
    title: "M# intro",
    type: "M# intro",
    tools: "DaVinci Resolve,Inshot",
    description: "video to the special event M#",
    thumbnail: "/placeholder.svg?height=300&width=400",
    videoSrc: "/v3.mp4",
    featured: true,
  },
]

// Special videos for specific sections
export const heroVideo = {
  src: "/v4.mp4", // Using placeholder for now
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
