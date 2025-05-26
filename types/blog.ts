export type Blog = {
  id?: string;
  slug: string;
  title: string;
  content: string;
  imageUrl?: string;
  tags: string[];
  category: string;
  productId: string;
  createdAt: string;
  views: number;
};
