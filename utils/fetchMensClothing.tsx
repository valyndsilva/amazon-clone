const fetchMensClothing = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/getMensClothing`);
  // console.log(res);
  const data = await res.json();
  // console.log("fetchMensClothing:", data);
  return data; //fakeStoreApi
  // return data.products; //dummyJSON
};

export default fetchMensClothing;
