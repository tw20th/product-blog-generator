'use client'

import { useSchools, School } from '@/hooks/useSchools'
import { useSortedItems } from '@/hooks/useSortedItems'
import SortSelect from '@/components/SortSelect'
import SchoolCard from '@/components/SchoolCard'

export default function RankingPage() {
  const { schools, loading } = useSchools()

  const sortFunctions = {
    ratingHigh: (a: School, b: School) => b.rating - a.rating,
    priceLow: (a: School, b: School) => a.price - b.price,
    priceHigh: (a: School, b: School) => b.price - a.price,
  }

  const {
    sortKey,
    setSortKey,
    sortedItems: sortedSchools,
  } = useSortedItems<School, keyof typeof sortFunctions>(
    schools,
    sortFunctions,
    'ratingHigh'
  )

  if (loading) return <p>読み込み中...</p>

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">人気の習い事ランキング</h1>
      <SortSelect value={sortKey} onChange={setSortKey} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedSchools.map((school) => (
          <SchoolCard key={school.id} school={school} />
        ))}
      </div>
    </main>
  )
}
