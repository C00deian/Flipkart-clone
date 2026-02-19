export type Product = {
  id: number;
  name: string;
  description: string;
  brand: string;
  images: UploadedImageType[];
  reviews: Review[];
  quantity: number;
  price: number;
  inStock: boolean;
  category: Category;
};

export type ProductFormType = {
  // id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  images: UploadedImageType[];
  reviews: Review[];
  quantity: number;
  price: number;
  inStock: boolean;
};

export type ImageType = {
  color: string;
  colorCode: string;
  imageUrl: File | null;
};

export type UploadedImageType = {
  color: string;
  colorCode: string;
  imageUrl: string;
};

export interface Review {
  id: number;
  rating: number;
  title?: string | null;
  comment: string;
  userId: string;
  isVerifiedPurchase?: boolean;
  helpfulCount?: number;
  createdAt: string;
}

export type Category = {
  id: number;
  name: string;
  slug: string;
  imageUrl: string;
};

export type CategoryFormType = {
  name: string;
  slug: string;
  imageUrl: string;
};
