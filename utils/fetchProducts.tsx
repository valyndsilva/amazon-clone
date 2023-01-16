const fetchProducts = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/getProducts`);
  // console.log(res);
  const data = await res.json();
  // console.log("fetchProducts:",data);
  return data; //fakeStoreApi
  // return data.products; //dummyJSON
};

export default fetchProducts;
