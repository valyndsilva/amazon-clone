import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const Products = async () => {
    const response = await fetch(
      "https://fakestoreapi.com/products/category/jewelery"
    );
    // const response = await fetch("https://dummyjson.com/products/category/fragrances");
    const products = await response.json();
    // console.log(products);

    return products;
  };

  const resProducts = await Products();
  // console.log("getProducts", resProducts);
  response.status(200).json(resProducts);
}
