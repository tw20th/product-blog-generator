"use client";

import { useRouter } from "next/navigation";

const CATEGORIES = [
  "ゲーミングチェア",
  "在宅ワーク",
  "GTRacing",
  "Dowinx",
  "子供向け",
  "姿勢改善",
];

export const CategoryButtons = () => {
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((tag) => (
        <button
          key={tag}
          onClick={() => router.push(`/category/${encodeURIComponent(tag)}`)}
          className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200"
        >
          #{tag}
        </button>
      ))}
    </div>
  );
};
