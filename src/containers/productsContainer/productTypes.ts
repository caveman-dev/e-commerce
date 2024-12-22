import { KeyValue } from '../../types/commonTypes';

export interface ProductFormValues {
    id?:number | string
    title: string;
    description: string;
    price:number | null;
    quantity:number | null;
    discountedPrice:number | null;
    discountedPersent:number | null;
    brand: string;
    color: string;
    size:Sizes[]
    topLevelCategory:LabelValue | null;
    secondLevelCategory: LabelValue | null;
    thirdLevelCategory: LabelValue | null;
    mainImageUrl: string,
    imageUrls:string[],
}

export interface Sizes {
    name:string;
    sizeQuantity:number;
}

export interface LabelValue extends KeyValue {
    label?:string;
}

export interface ProductUi {
    id?: number;
    title: string;
    description: string;
    price: number | null;
    discountedPrice: number | null;
    discountPercent?: number;
    discountedPersent?: number | null;
    quantity: number | null;
    brand: string;
    color: string;
    size?: (SizeEntity)[] | null;
    imageUrls?: (string)[] | null;
    mainImageUrl: string;
    ratings?: null;
    reviews?: (ReviewsEntity)[] | null;
    numRatings?: number;
    category?: Category;
    averageRating?: number;
    labels?: (string)[] | null;
    createdAt?: string;
    wishlist?: null;
    cart?: null;
    topLevelCategory?:LabelValue | null;
    secondLevelCategory?: LabelValue | null;
    thirdLevelCategory?: LabelValue | null;
  }
export interface SizeEntity {
    sizeQuantity: number;
    name: string;
  }
export interface ReviewsEntity {
    id: number;
    review: string;
    createdAt: string;
    rating: number;
  }
export interface Category {
    id: number;
    name: string;
    level: number;
    topLevelCategory: TopLevelCategoryOrSecondLevelCategory;
    secondLevelCategory: TopLevelCategoryOrSecondLevelCategory;
    children?: (null)[] | null;
  }
export interface TopLevelCategoryOrSecondLevelCategory {
    id: number;
    name: string;
    level: number;
    children?: (null)[] | null;
  }
