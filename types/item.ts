export type MonitoredItem = {
  id?: string;
  productName: string;
  price: string;
  score: number;
  featureHighlights?: string[];
  tag?: string[];
  fromRakutenItemId?: string;
  priceHistory?: { date: string; price: number }[];

  // ✅ 以下を追加
  imageKeyword?: string;
  imageUrl?: string;
  itemUrl?: string;
};
