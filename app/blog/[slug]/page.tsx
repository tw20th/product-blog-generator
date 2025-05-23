'use client'

import { notFound } from 'next/navigation'
import { useBlogs, BlogPost } from '@/hooks/useBlogs'
import { useEffect, useState } from 'react'
import Image from 'next/image'

type Props = {
  params: {
    slug: string
  }
}

export default function BlogDetailPage({ params }: Props) {
  const { getRelatedBlogs } = useBlogs()
  const [blog, setBlog] = useState<BlogPost | null>(null)
  const [related, setRelated] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${params.slug}`)
        if (!res.ok) {
          setBlog(null)
          return
        }

        const data = await res.json()
        setBlog(data)
        setRelated(getRelatedBlogs(data))
      } catch (err) {
        console.error('記事取得エラー:', err)
        setBlog(null)
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [params.slug, getRelatedBlogs])

  if (loading) return <p className="p-6">読み込み中...</p>
  if (!blog) return notFound()

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <p className="text-sm text-gray-600 mb-4">
        投稿日: {new Date(blog.createdAt).toLocaleDateString()} | 閲覧数:{' '}
        {blog.views}
      </p>

      {blog.imageUrl && (
        <div className="relative w-full h-64 mb-6">
          <Image
            src={blog.imageUrl}
            alt={blog.title}
            layout="fill"
            objectFit="cover"
            className="rounded shadow"
          />
        </div>
      )}

      <article className="prose mb-8">
        <p>{blog.content}</p>
      </article>

      <h2 className="text-2xl font-semibold mb-2">関連記事</h2>
      <ul className="space-y-3">
        {related.map((item) => (
          <li key={item.id} className="border p-3 rounded">
            <a
              href={`/blog/${item.slug}`}
              className="text-lg font-medium text-blue-600 hover:underline"
            >
              {item.title}
            </a>
            <p className="text-sm text-gray-500">
              カテゴリー: {item.category} | 投稿日:{' '}
              {new Date(item.createdAt).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </main>
  )
}
