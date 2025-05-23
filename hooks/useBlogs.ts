import { useEffect, useState, useCallback } from 'react'

export type BlogPost = {
  id: string
  title: string
  slug: string
  createdAt: string
  views: number
  category: string
  tags: string[]
  content: string
  imageUrl: string // ← これを追加！
}

export const useBlogs = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/blogs')
        const data = await res.json()
        setBlogs(data)
      } catch (error) {
        console.error('ブログ取得エラー:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  const filterByCategory = useCallback(
    (category: string) => blogs.filter((b) => b.category === category),
    [blogs]
  )

  const getRelatedBlogs = useCallback(
    (target: BlogPost) => {
      return blogs.filter((blog) => {
        if (blog.id === target.id) return false
        const sameCategory = blog.category === target.category
        const sharedTags = blog.tags.some((tag) => target.tags.includes(tag))
        return sameCategory || sharedTags
      })
    },
    [blogs]
  )

  return { blogs, loading, filterByCategory, getRelatedBlogs }
}
