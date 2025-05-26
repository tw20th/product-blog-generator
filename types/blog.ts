// types/blog.ts
export type BlogPost = {
  id: string
  title: string
  slug: string
  createdAt: string
  views: number
  category: string
  tags: string[]
  content: string
  imageUrl: string
}
