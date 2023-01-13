const fetchWomensClothing = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/getWomensClothing`);
  console.log(res);
  const data = await res.json();
  console.log("fetchWomensClothing:", data);
  return data;
};

export default fetchWomensClothing;
