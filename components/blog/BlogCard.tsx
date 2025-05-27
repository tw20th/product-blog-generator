"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

type BlogCardProps = {
  slug: string;
  title: string;
  imageUrl?: string;
  tags?: string[];
  views?: number;
  createdAt?: string;
};

export const BlogCard = ({
  slug,
  title,
  imageUrl,
  tags = [],
  views = 0,
  createdAt,
}: BlogCardProps) => {
  return (
    <Link href={`/blog/${slug}`}>
      <motion.div
        className="bg-white shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {imageUrl && (
          <div className="relative w-full h-48">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover rounded-t-2xl"
            />
          </div>
        )}

        <div className="p-4 space-y-2">
          <h2 className="text-lg font-semibold line-clamp-2">{title}</h2>

          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="text-xs text-gray-500 flex justify-between mt-2">
            <span>👁 {views}</span>
            {createdAt && (
              <span>{new Date(createdAt).toLocaleDateString()}</span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
