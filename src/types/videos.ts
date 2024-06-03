export type Category = 'FRONTEND' | 'BACKEND' | 'MOBILE' | 'NONE'

export interface Video {
  id: string
  title: string
  description: string
  url: string
  thumbnailUrl: string
  category: Category
  isFeatured: boolean
}
