import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Footer, Header, ProductDetails } from "../../components";
import { getBasketCount, getSubTotal, getTotalAmount } from "../../redux/slices/basketSlice";

type Props = {
  product: any;
};

function Id({ product }: Props) {
  // console.log(product);
 const dispatch = useDispatch();

   useEffect(() => {
     dispatch(getBasketCount());
    //  dispatch(getTax());
     dispatch(getSubTotal());
     dispatch(getTotalAmount());
   }, [dispatch]);

  return (
    <div>
      <Header />
      <main>
        <ProductDetails key={product.id} product={product} />
      </main>
      <Footer/>
    </div>
  );
}

export default Id;

export async function getServerSideProps(context: any) {
  const id = context.params.id; // Get ID from `/product/1`
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await response.json();
  console.log(product);

  return {
    props: { product },
  };
}
