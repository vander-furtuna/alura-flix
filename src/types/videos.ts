export type Category = 'FRONTEND' | 'BACKEND' | 'MOBILE' | null

export interface Video {
  id: string
  title: string
  description: string
  url: string
  thumbnailUrl: string
  category: Category
  isFeatured: boolean
}
