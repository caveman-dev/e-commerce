export interface CartUi {
    productId: number;
    title: string;
    description: string;
    price: number;
    discountedPrice: number;
    discountPercent: number;
    quantity: number;
    brand: string;
    color: string;
    sizes?: (SizesEntity)[] | null;
    imageUrls?: (string)[] | null;
    mainImageUrl: string;
    cartQuantity: number;
    cartSize: string;
    cartTotalPrice: number;
    cartTotalItem?: null;
    cartDiscount: number;
    cartDiscountedPrice: number;
    cartItemId: number;
  }
export interface SizesEntity {
    sizeQuantity: number;
    name: string;
  }
