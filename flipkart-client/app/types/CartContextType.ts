import { CartItemType, CartProductType } from "./CartProductTypes";

export type CartContextType = {
  cartId: string | null;
  cartTotalQty: number;
  cartTotalAmount: number;
  cartProducts: CartItemType[];
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveProductFromCart: (product: CartItemType) => void;
  handleCartQtyIncrease: (product: CartItemType) => void;
  handleCartQtyDecrease: (product: CartItemType) => void;
  handleClearCart: () => void;
};
