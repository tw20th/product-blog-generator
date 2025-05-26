import SchoolCard from './SchoolCard'
import { useSchools } from '@/hooks/useSchools'

const PopularSchools = () => {
  const { schools, loading } = useSchools()

  if (loading) return <p>読み込み中...</p>

  const sorted = schools
    .filter((school) => typeof school.rating === 'number')
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3) // 上位3件

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4 text-center text-pink-600">
        人気のスクール
      </h2>
      <ul className="grid gap-6 md:grid-cols-3">
        {sorted.map((school) => (
          <li key={school.id}>
            <SchoolCard school={school} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default PopularSchools
