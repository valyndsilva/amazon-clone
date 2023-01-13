const fetchJewelery = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/getJewelery`);
  console.log(res);
  const data = await res.json();
  console.log("fetchJewelery:", data);
  return data;
};

export default fetchJewelery;
