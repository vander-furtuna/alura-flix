import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import { database } from '../database/db'
import { Video } from '../types/videos'

const LOCAL_STORAGE_KEY = 'vander.flix@videos'

// Define the context type
type VideosContextType = {
  videos: Video[] | null
  addVideo: (video: Video) => void
}

// Create the videos context
const VideosContext = createContext<VideosContextType | undefined>(undefined)

// Create the videos provider component
export function VideosProvider({ children }: { children: ReactNode }) {
  const [videos, setVideos] = useState<Video[] | null>(null)

  const updateVideosOnLocalStorage = useCallback(() => {
    if (videos) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(videos))
    }
  }, [videos])
  // Function to add a new video
  const addVideo = useCallback(
    (video: Video) => {
      setVideos((prevVideos) => prevVideos && [...prevVideos, video])
      updateVideosOnLocalStorage()
    },
    [updateVideosOnLocalStorage],
  )

  useEffect(() => {
    if (videos === null) {
      const storedVideos = localStorage.getItem(LOCAL_STORAGE_KEY)

      if (storedVideos) {
        setVideos(JSON.parse(storedVideos))
      } else {
        setVideos(database)
      }
    }
    console.log(videos)
  }, [videos])

  return (
    <VideosContext.Provider value={{ videos, addVideo }}>
      {children}
    </VideosContext.Provider>
  )
}

// Custom hook to access the videos context
export const useVideos = () => {
  const context = useContext(VideosContext)

  if (!context) {
    throw new Error('useVideos must be used within a VideosProvider')
  }

  return context
}
