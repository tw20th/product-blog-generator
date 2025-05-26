import { useParams } from 'next/navigation'
import { useSchools } from '@/hooks/useSchools'
import { useBlogs } from '@/hooks/useBlogs'
import SchoolCard from '@/components/SchoolCard'
import BlogCard from '@/components/BlogCard'

const CategoryPage = () => {
  const { schools, loading: loadingSchools } = useSchools()
  const { blogs, loading: loadingBlogs } = useBlogs()
  const params = useParams()
  const tag = params?.tag

  if (!tag || typeof tag !== 'string') return <p>カテゴリが見つかりません。</p>
  if (loadingSchools || loadingBlogs) return <p>読み込み中...</p>

  const matchedSchools = schools.filter((school) => school.tags?.includes(tag))
  const matchedBlogs = blogs.filter((blog) => blog.tags?.includes(tag))

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-pink-600 mb-6 text-center">
        「{tag}」に関連する情報
      </h1>

      {matchedSchools.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-4">スクール一覧</h2>
          <ul className="grid gap-6 md:grid-cols-2 mb-10">
            {matchedSchools.map((school) => (
              <li key={school.id}>
                <SchoolCard school={school} />
              </li>
            ))}
          </ul>
        </>
      )}

      {matchedBlogs.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-4">関連ブログ記事</h2>
          <ul className="grid gap-6 md:grid-cols-2">
            {matchedBlogs.map((blog) => (
              <li key={blog.slug}>
                <BlogCard blog={blog} />
              </li>
            ))}
          </ul>
        </>
      )}

      {matchedSchools.length === 0 && matchedBlogs.length === 0 && (
        <p className="text-center text-gray-600">
          関連する情報が見つかりませんでした。
        </p>
      )}
    </main>
  )
}

export default CategoryPage
