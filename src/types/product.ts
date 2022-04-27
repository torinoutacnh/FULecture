export enum ProductTypeEnum {
  Single = 0,
  Room = 2,
  AdditionFee = 3,
  Extra = 5,
  General = 6,
  Detail = 7,
  CardPayment = 8,
  Combo = 1,
  Sample = 9,
  Complex = 10,
  CHARGES = 11
}

export type TProductInGroup = {
  product_id: number;
  product_name: string;
  is_and: boolean;
  group_id: number;
  quantity: number;
  default: number;
  min: number;
  max: number;
  default_min_max: string;
};

export type TGroupProduct = {
  base_product_id: number;
  product_id: number;
  is_and: boolean;
  default: number;
  min: number;
  max: number;
  group_id: number;
  quantity: number;
  default_min_max: string;
  product_name: string;
  product_childs: TProductInGroup[];
};

export type TProductBase = {
  product_id?: number;
  product_type?: ProductTypeEnum;
  is_available: boolean;
  code?: string;
  product_name?: string;
  pic_url?: string;
  cat_id?: number;
  description?: string;
  seo_name?: string;
  seo_key_words?: string;
  seo_description?: string;
  tags?: string[];
  atts?: string[];
  groups?: TGroupProduct[];
};

export type TProductMaster = TProductBase & {
  child_products: TProductBase[];
};

export type TProductInMenu = {
  product_id: number;
  price1: number;
  price2: number;
  price3: number;
  price4: number;
  price5: number;
  price6: number;
  price7: number;
  price8: number;
  price9: number;
  price10: number;
  is_fixed_price: boolean;
};
