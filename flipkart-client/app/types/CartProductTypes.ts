export type CartProductType = {
  id: number;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImage: SelectedImageType;
  quantity: number;
  price: number;
};


export interface CartDto {
  id: string;
  userId: string;
  items: CartItemDto[];
  totalAmount: number;
  totalQuantity: number;
}

export interface CartItemDto {
  id: string;
  productId: string;
  productName: string;
  unitPrice: number;
  quantity: number;
  productImage: string
}

export type CartItemType = {
  productId: number;
  name: string;
  image: string
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};



export type SelectedImageType = {
  color: string;
  colorCode: string;
  imageUrl: string;
};
