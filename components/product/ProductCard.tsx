import Image from "next/image";

type ProductCardProps = {
  productName: string;
  price: string;
  imageUrl: string;
  score: number;
  featureHighlights?: string[]; // optional
  tag?: string[]; // optional に変更
};

export const ProductCard = ({
  productName,
  price,
  imageUrl,
  score,
  featureHighlights,
  tag,
}: ProductCardProps) => {
  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden p-4 flex flex-col gap-2">
      <div className="w-full h-48 relative">
        <Image
          src={imageUrl}
          alt={productName}
          fill
          className="object-cover rounded-xl"
        />
      </div>
      <h2 className="text-lg font-semibold">{productName}</h2>
      <div className="text-gray-600 text-sm">価格：{price} 円</div>

      <div className="flex flex-wrap gap-1 mt-2">
        {Array.isArray(featureHighlights) &&
          featureHighlights.map((feature) => (
            <span
              key={feature}
              className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full"
            >
              {feature}
            </span>
          ))}
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="text-sm text-gray-500">スコア</div>
        <span className="text-xl font-bold text-green-600">{score}</span>
      </div>

      <div className="flex flex-wrap gap-1 mt-2">
        {Array.isArray(tag) &&
          tag.map((t) => (
            <span
              key={t}
              className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md"
            >
              #{t}
            </span>
          ))}
      </div>
    </div>
  );
};
