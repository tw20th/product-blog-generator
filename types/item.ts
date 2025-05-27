export type MonitoredItem = {
  id?: string;
  productName: string;
  price: string;
  score: number;
  featureHighlights?: string[];
  tag?: string[];
  imageKeyword: string;
  fromRakutenItemId?: string;
  priceHistory?: { date: string; price: number }[];
};
