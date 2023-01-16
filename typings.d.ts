interface Product {
  [x: string]: any;
  id: string;
  title: string;
  price: string;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

type Rating = {
  rate: number;
  count: number;
};

type TransformedItem = {
  quantity: number;
  price_data: {
    // description: string;
    currency: string;
    unit_amount: number;
    product_data: {
      name: string;
      // images: string;
    };
  };
};

type StripeItem = {
  [x: string]: any;
  price: number;
  title: string;
  // image: string;
  // description: string;
};

type Price = {
  active: boolean;
  billing_scheme: string;
  created: string;
  currency: string;
  custom_unit_amount: number;
  id: string;
  livemode: boolean;
  lookup_key: string;
  metadata: [string];
  nickname: string;
  object: string;
  product: string;
  recurring: string;
  tax_behavior: string;
  tiers_mode: string;
  transform_quantity: string;
  type: string;
  unit_amount: number;
  unit_amount_decimal: string;
};
type OrderItem = {
  amount_discount: number;
  amount_subtotal: number;
  amount_tax: number;
  amount_total: number;
  currency: string;
  description: string;
  id: string;
  object: string;
  price: Price;
  quantity: number;
};

type Order = {
  amount: number;
  id: string;
  images: [string];
  items: OrderItem[];
  timestamp: number;
};

interface JProduct {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: [string];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}
