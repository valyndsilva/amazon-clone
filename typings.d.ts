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
