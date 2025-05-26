'use client'

import { School } from '@/types/school' // ← こちらだけを使う

type Props = {
  school: School
}

export default function SchoolCard({ school }: Props) {
  return (
    <div className="p-5 border rounded-2xl shadow-sm hover:shadow-lg transition bg-white">
      <h2 className="text-lg font-bold text-pink-700 mb-1">{school.name}</h2>
      <p className="text-sm text-gray-700 mb-2">{school.description}</p>
      <p className="text-sm text-gray-600 mb-1">対象年齢：{school.targetAge}</p>
      <p className="text-sm mb-1">
        月額料金：
        <span className="font-semibold text-blue-700">
          ¥{school.price.toLocaleString()}
        </span>
      </p>
      <p className="text-sm mb-3">
        評価：<span className="text-yellow-500">⭐ {school.rating}</span>
      </p>
      <a
        href={school.link}
        className="inline-block bg-pink-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-pink-600 transition"
        target="_blank"
        rel="noopener noreferrer"
      >
        公式サイトを見る
      </a>
    </div>
  )
}
