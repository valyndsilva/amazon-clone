import Head from "next/head";
import Image from "next/image";
import {
  AdBlock,
  Banner,
  BestSellers,
  Deals,
  Footer,
  Header,
  LightningDeals,
  ProductFeed,
  SimpleBlock,
} from "../components";
import {
  fetchElectronics,
  fetchJewelery,
  fetchMensClothing,
  fetchProducts,
  fetchWomensClothing,
} from "../utils";

type Props = {
  products: Product[];
  jewelery: Product[];
  mensClothing: Product[];
  womensClothing: Product[];
  electronics: Product[];
};

const Home = ({
  products,
  jewelery,
  electronics,
  mensClothing,
  womensClothing,
}: Props) => {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="max-w-screen-2xl mx-auto">
        {/* Banner */}
        <Banner />
        <div className="grid  md:grid-cols-2 lg:grid-cols-4 -mt-20 md:-mt-40 lg:-mt-52 xl:-mt-80">
          <Deals
            title="Top Deal"
            productTitle="Oral Care, Shaving Appliances and Beauty by Oral B, Braun, Olay and Pantene"
            text="Show more deals"
            image="/assets/adblock-1.jpg"
          />
          <AdBlock
            title="More titles to explore than ever"
            text="Browse Kindle Unlimited"
            image="adblock-2"
          />
          <AdBlock
            title="Unlimited streaming of movies & TV"
            text="Find out more"
            image="adblock-11"
          />
          <div className="z-30 m-5 p-5">
            <Image
              src={`/assets/adblock-12.jpg`}
              width={390}
              height={250}
              alt="Warm essentials for baby's first winter - Shop Now"
              className="object-cover mx-auto py-3"
            />
            <div className="flex flex-col bg-white p-5">
              <h2 className="text-lg font-bold mb-2">
                Sign in for your best experience
              </h2>
              <button className="mt-auto button">Sign in securely</button>
            </div>
          </div>
        </div>
        <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-4 ">
          <AdBlock
            title="Happy Place: Fearne Cotton"
            text="Stream now"
            image="adblock-3"
          />
          <AdBlock
            title="We have a surprise for you"
            text="See terms and conditions"
            image="adblock-4"
          />
          <AdBlock
            title="Playlist: Home Gym Workout"
            text="Stream now"
            image="adblock-5"
          />
          <AdBlock
            title="New year, new fun on Amazon Kids+"
            text="1-month free trial"
            image="adblock-6"
          />
        </div>

        <BestSellers
          products={mensClothing}
          title="Best Sellers in Men's Clothing"
        />
        <BestSellers
          products={electronics}
          title="Best Sellers in Computers & Accessories"
        />
        {/* <BestSellers
          products={womensClothing}
          title="Best Sellers in Women's Clothing"
        />
        <BestSellers products={jewelery} title="Best Sellers in Jewelery" /> */}

        {/* Product Feed */}
        <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-4">
          <AdBlock
            title="Always the perfect gift"
            text="Shop Gift Cards"
            image="adblock-10"
          />
          <AdBlock
            title="Get an Amazon Gift Card for Your Old Device"
            text="Learn More"
            image="adblock-7"
          />
          <AdBlock
            title="Lost Ark by Amazon Games"
            text="Shop now"
            image="adblock-8"
          />
          <AdBlock
            title="Create, find, and share gift lists"
            text="Discover"
            image="adblock-9"
          />
        </div>
        <LightningDeals products={products} title="Lightning Deals" />

        <SimpleBlock title="Explore more Amazon Devices" />

        <ProductFeed products={products} />
      </main>
      <Footer />
    </div>
  );
};

export default Home;

// Pre-rendering data
export async function getServerSideProps(context: any) {
  // const response1 = await fetch("https://fakestoreapi.com/products");
  // const products = await response1.json();

  // const response2 = await fetch(
  //   "https://fakestoreapi.com/products/category/jewelery"
  // );
  // const jewelery = await response2.json();

  // const response3 = await fetch(
  //   "https://fakestoreapi.com/products/category/men's%20clothing"
  // );
  // const mensClothing = await response3.json();

  // const response4 = await fetch(
  //   "https://fakestoreapi.com/products/category/women's%20clothing"
  // );
  // const womensClothing = await response4.json();

  // const response5 = await fetch(
  //   "https://fakestoreapi.com/products/category/electronics"
  // );
  // const electronics = await response5.json();

  const [products, jewelery, womensClothing, mensClothing, electronics] =
    await Promise.all([
      fetchProducts(),
      fetchWomensClothing(),
      fetchMensClothing(),
      fetchJewelery(),
      fetchElectronics(),
    ]);
  return {
    props: {
      products: products,
      jewelery: jewelery,
      womensClothing: womensClothing,
      mensClothing: mensClothing,
      electronics: electronics,
    },
  };
}
