# Ayush Singh Portfolio - Video Management Guide

## Adding New Videos

To add new videos to your portfolio, simply edit the `lib/video-data.ts` file:

### 1. Add a new video to the videoData array:

\`\`\`typescript
{
  id: "unique-video-id",
  title: "Your Video Title",
  type: "Video Type (e.g., Brand Ad, Music Video, etc.)",
  tools: "Software Used (e.g., Premiere Pro, After Effects)",
  description: "Brief description of the video",
  thumbnail: "/path/to/thumbnail-image.jpg",
  videoSrc: "/path/to/video-file.mp4",
  featured: true, // Optional: set to true to show in featured section
}
\`\`\`

### 2. Video File Organization:

Create a `public/videos/` folder and organize your videos:
\`\`\`
public/
├── videos/
│   ├── hero-background.mp4
│   ├── ayush-showreel.mp4
│   ├── brand-revolution.mp4
│   ├── creators-journey.mp4
│   └── ... (your other videos)
└── thumbnails/
    ├── brand-revolution.jpg
    ├── creators-journey.jpg
    └── ... (your thumbnails)
\`\`\`

### 3. Special Videos:

- **Hero Background Video**: Update `heroVideo.src` in the config
- **Showreel Video**: Update `showreelVideo.src` in the config
- **Before/After Videos**: Update `beforeAfterVideos` object in the config

### 4. Video Formats:

- **Recommended format**: MP4 (H.264)
- **Recommended resolution**: 1920x1080 or higher
- **Recommended file size**: Under 50MB for web optimization
- **Thumbnail format**: JPG or PNG, 400x300px recommended

### 5. Quick Add Template:

Copy this template and fill in your details:

\`\`\`typescript
{
  id: "project-name-here",
  title: "Project Title",
  type: "Project Type",
  tools: "Tools Used",
  description: "What makes this project special",
  thumbnail: "/thumbnails/project-name.jpg",
  videoSrc: "/videos/project-name.mp4",
  featured: true, // Remove this line if not featured
},
\`\`\`

That's it! Your new video will automatically appear in the portfolio grid.
