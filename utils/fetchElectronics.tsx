const fetchElectronics = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/getElectronics
  `);
  console.log(res);
  const data = await res.json();
  console.log("fetchElectronics:", data);
  return data;
};

export default fetchElectronics;
