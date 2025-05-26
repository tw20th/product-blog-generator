import { BlogPost } from '@/types/blog'

type Props = {
  blog: BlogPost
}

export default function BlogCard({ blog }: Props) {
  const preview = blog.content
    ?.slice(0, 80)
    ?.replace(/本文:.*/, '')
    .replace(/タイトル:/, '')
    .trim()

  return (
    <div className="bg-white rounded-2xl shadow p-4 hover:shadow-md transition">
      <img
        src={blog.imageUrl}
        alt={blog.title}
        className="w-full h-48 object-cover rounded-xl mb-3"
      />
      <h3 className="text-lg font-bold text-pink-700 mb-1">{blog.title}</h3>
      <p className="text-sm text-gray-700 mb-2">{preview}...</p>
      <a
        href={`/blog/${blog.slug}`}
        className="inline-block text-sm text-blue-600 hover:underline"
      >
        記事を読む
      </a>
    </div>
  )
}
