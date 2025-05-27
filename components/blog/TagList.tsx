"use client";

type TagListProps = {
  tags: string[];
  selected: string | null;
  onSelect: (tag: string | null) => void;
};

export const TagList = ({ tags, selected, onSelect }: TagListProps) => {
  const uniqueTags = Array.from(new Set(tags));

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => onSelect(null)}
        className={`px-3 py-1 rounded-full border text-sm ${
          selected === null
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-600 hover:bg-gray-100"
        }`}
      >
        すべて
      </button>
      {uniqueTags.map((tag) => (
        <button
          key={tag}
          onClick={() => onSelect(tag)}
          className={`px-3 py-1 rounded-full border text-sm ${
            selected === tag
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
        >
          #{tag}
        </button>
      ))}
    </div>
  );
};
