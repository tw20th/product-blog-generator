// components/SchoolCard.tsx
'use client'

import { School } from '@/hooks/useSchools'

type Props = {
  school: School
}

export default function SchoolCard({ school }: Props) {
  return (
    <div className="p-4 border rounded shadow hover:shadow-lg transition">
      <h2 className="text-xl font-semibold mb-1">{school.name}</h2>
      <p className="mb-2">{school.description}</p>
      <p className="text-sm text-gray-600 mb-1">対象年齢: {school.targetAge}</p>
      <p className="mb-1">月額: ¥{school.price.toLocaleString()}</p>
      <p className="mb-2">評価: ⭐ {school.rating}</p>
      <a
        href={school.link}
        className="inline-block text-blue-600 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        公式ページへ
      </a>
    </div>
  )
}
