# Amazon 2.0 Clone App ⚡

## [Install Tailwind CSS with Next.js](https://v2.tailwindcss.com/docs/guides/nextjs)

```
npx create-next-app -e with-tailwindcss amazon-clone
cd amazon-clone
```

### If you're on Next.js v10 or newer

```
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
```

### Generate your tailwind.config.js and postcss.config.js files

```
npx tailwindcss init -p
```

### Configure tailwind.config.js:

```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amazonBlue: {
          light: "#232F3E",
          lighter: "#37475A",
          dark: "#398596",
          DEFAULT: "#131921",
        },
        amazonGray: "#DADADA",
        amazonYellow: {
          hover: "#F3A847",
          DEFAULT: "#F9BD69",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};

```

## Create .env.local in the root:

```
# Authentication
GOOGLE_ID=key_goes_here
GOOGLE_SECRET=key_goes_here
JWT_SECRET=secret_goes here
NEXTAUTH_URL=http://localhost:3000
# Stripe
STRIPE_PUBLIC_KEY=key_goes_here
STRIPE_SECRET_KEY=key_goes_here

# Stripe Terminal/CLI
STRIPE_SIGNING_SECRET=key_goes_here

HOST=http://localhost:3000

# Need to add this to... google cloud
# http://localhost:3000/api/auth/callback/google
```

## Install Dependecies:

```
npm install @heroicons/react react-redux @reduxjs/toolkit @tailwindcss/line-clamp firebase firebase-admin
npm install -D @tailwindcss/line-clamp
npm install @headlessui/react
npm run dev

```

## Update tailwing.config.js:

```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        amazonBlue: {
          light: "#232F3E",
          DEFAULT: "#131921",
        },
        amazonGray: "#DADADA",
        amazonYellow: {
          hover: "#F3A847",
          DEFAULT: "#F9BD69",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};

```

## Usage of line-clamp:

Use the line-clamp-{n} utilities to specify how many lines of text should be visible before truncating:

```
<p class="line-clamp-3">
  Et molestiae hic earum repellat aliquid est doloribus delectus. Enim illum odio porro ut omnis dolor debitis natus. Voluptas possimus deserunt sit delectus est saepe nihil. Qui voluptate possimus et quia. Eligendi voluptas voluptas dolor cum. Rerum est quos quos id ut molestiae fugit.
</p>
```

To remove any line-clamping, use line-clamp-none:

```
<p class="line-clamp-3 md:line-clamp-none">
  Et molestiae hic earum repellat aliquid est doloribus delectus. Enim illum odio porro ut omnis dolor debitis natus. Voluptas possimus deserunt sit delectus est saepe nihil. Qui voluptate possimus et quia. Eligendi voluptas voluptas dolor cum. Rerum est quos quos id ut molestiae fugit.
</p>
```

## Add Redux to Project:

### In redux/store.tsx:

```
import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./slices/basketSlice";

export const store = configureStore({
  reducer: {
    basket: basketReducer,
  },
});

```

### In redux/slices/basketSlice.tsx:

```
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {},
    removeFromBasket: (state, action) => {},
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state: any) => state.basket.items;

export default basketSlice.reducer;

```

### In pages/\_app.tsx:

```
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  // To fix hydration UI mismatch issues, we need to wait until the component has mounted.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;

```

## Update next.config.js with image domains for later use:

```
/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images:{
    domains:["fakestoreapi.com"]
  }
}
```

## Create components folder in the root directory:

### In pages/index.js:

```
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Footer, Header } from "../components";

const Home: NextPage = () => {
  return (
    // <div className="flex min-h-screen flex-col items-center justify-center py-2">
    <div className="">
      <Head>
        <title>Amazon Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Footer />
    </div>
  );
};

export default Home;
```

### Create components/Header.tsx

```
import React from "react";

type Props = {};

function Header({}: Props) {
  return <header>Header</header>;
}

export default Header;

```

### Create components/Footer.tsx

```
import Image from "next/image";
import React from "react";

type Props = {};

function Footer({}: Props) {
  return (
    <footer className="flex h-24 w-full items-center justify-center border-t">
      <p className="flex items-center justify-center gap-2">
        Powered by{" "}
        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      </p>
    </footer>
  );
}

export default Footer;

```

### Create components/DropDown.tsx:

```
import React from "react";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const links = [
  { href: "/", label: "All Departments" },
  { href: "/", label: "Alexa Skills" },
  { href: "/", label: "Amazon Devices" },
  { href: "/", label: "Apps & Games" },
  { href: "/", label: "Baby" },
  { href: "/", label: "Books" },
  { href: "/", label: "Beauty" },
  { href: "/", label: "Gift Cards" },
  { href: "/", label: "Health & Personal Care" },
  { href: "/", label: "Garden & Outdoors" },
  { href: "/", label: "Fashion" },
  { href: "/", label: "Grocery" },
];

function DropDown() {
  return (
    <Menu>
      <Menu.Button className="w-16 pl-4 flex space-x-2 items-center bg-amazonGray  rounded-l-md">
        <span className="text-sm">All</span>
        <ChevronDownIcon className="w-3 h-4" />
      </Menu.Button>
      <Menu.Items className="flex flex-col absolute w-fit p-2 top-12 bg-amazonGray/95 rounded-md">
        {links.map((link) => (
          <Menu.Item
            as="a"
            key={link.href}
            href={link.href}
            className="px-4 py-1 text-sm ui-active:bg-blue-500 ui-active:text-white ui-not-active:bg-white ui-not-active:text-black"
          >
            {link.label}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}

export default DropDown;

```

### Update styles/globals.css:

```
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .navLink {
    @apply cursor-pointer hover:underline;
  }
}
```

### Update components/Header.tsx:

```
import Image from "next/image";
import React from "react";
import {
  Bars3Icon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import DropDown from "./DropDown";
type Props = {};

function Header({}: Props) {
  return (
    <header>
      <div className="flex items-center bg-amazonBlue flex-grow p-2 py-2 space-x-2">
        {/* Logo */}
        <div className="flex  items-center flex-grow sm:flex-grow-0 ">
          <div className="mt-2">
            <Image
              src="/amazon.png"
              alt=""
              width={100}
              height={40}
              className="object-contain cursor-pointer"
            />
          </div>
          <span className="items-center text-white text-xs">.co.uk</span>
        </div>
        {/* Select Address */}
        <div className="flex flex-col text-white space-x-4">
          <span className="font-light text-xs ml-9 text-gray-300">Hello</span>
          <div className="flex text-sm items-center ">
            <MapPinIcon className="w-5 h-5" />
            <span className="font-bold text-sm leading-3">
              Select your address
            </span>
          </div>
        </div>
        {/* Search Input */}
        <div className="hidden sm:flex flex-grow cursor-pointer h-10 bg-amazonYellow hover:bg-amazonYellow-hover rounded-md">
          <DropDown />
          <input
            className="p-2 h-full w-6 flex-grow flex-shrink focus:outline-none px-4"
            type="text"
          />
          <MagnifyingGlassIcon className="h-10 p-2" />
        </div>
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace:no-wrap">
          <div className="navLink ">
            <p>Hello, sign in</p>
            <p className="flex">
              <span className="font-extrabold md:text-sm">
                Accounts & Lists
              </span>{" "}
              <ChevronDownIcon className="w-3 h-4" />
            </p>
          </div>
          <div className="navLink ">
            <p className="">Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>
          <div className="relative navLink flex items-center">
            <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-amazonYellow rounded-full text-center text-black font-bold">
              1
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className="hidden md:inline-flex font-extrabold md:text-sm mt-2">
              Basket
            </p>
          </div>
        </div>
      </div>
      {/* Links */}
      <div className="flex items-center bg-amazonBlue-light text-white text-sm space-x-5 p-2 pl-6">
        <p className="link flex items-center">
          <Bars3Icon className="h-6 mr-1" /> All
        </p>
        <p className="link">Best Sellers</p>
        <p className="link">Gift Ideas</p>
        <p className="link">Prime Video</p>
        <p className="link">Customer Service</p>
        <p className="link">Music</p>
        <p className="link hidden md:inline-flex">Today's Deals</p>
        <p className="link hidden md:inline-flex">New Releases</p>
        <p className="link hidden md:inline-flex">Books</p>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Audible</p>
        <p className="link hidden lg:inline-flex">Vouchers</p>
        <p className="link hidden xl:inline-flex">PC & Video Games</p>
      </div>
    </header>
  );
}

export default Header;

```

### Install [React Responsive Carousel](https://www.npmjs.com/package/react-responsive-carousel):

```
npm install react-responsive-carousel
```

### Create components/Banner.tsx:

```
import React from "react";

type Props = {};

function Banner({}: Props) {
  return <div>Banner</div>;
}

export default Banner;

```

### Update components/index.tsx:

```
export { default as Header } from "./Header";
export { default as DropDown } from "./DropDown";
export { default as Banner } from "./Banner";
export { default as Footer } from "./Footer";
```

### Update pages/index.tsx:

```
import type { NextPage } from "next";
import Head from "next/head";
import { Banner, Footer, Header } from "../components";

const Home: NextPage = () => {
  return (
    // <div className="flex min-h-screen flex-col items-center justify-center py-2">
    <div className="bg-gray-100">
      <Head>
        <title>Amazon Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="max-w-screen-2xl mx-auto">
        {/* Banner */}
        <Banner />

        {/* Product Feed */}
      </main>

      <Footer />
    </div>
  );
};

export default Home;


```

### Update components/Banner.tsx:

```
import Image from "next/image";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
type Props = {};

function Banner({}: Props) {
  return (
    <div className="relative">
      <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        <div>
          <img src="/assets/amazon-slide-1.jpg" alt="slide 1" />
        </div>
        <div>
          <img src="/assets/amazon-slide-2.jpg" alt="slide 2" />
        </div>
        <div>
          <img src="/assets/amazon-slide-3.jpg" alt="slide 3" />
        </div>
        <div>
          <img src="/assets/amazon-slide-4.jpg" alt="slide 4" />
        </div>
      </Carousel>
    </div>
  );
}

export default Banner;

```

### Using a Rest API like Fake Store API

Update next.config.js to whitelist the domain akestoreapi.com:

```
/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images:{
    domains:["fakestoreapi.com"]
  }
}

```

### Install [React Currency Formatter](https://www.npmjs.com/package/react-currency-formatter)

```
npm i react-currency-formatter
npm i --save-dev @types/react-currency-formatter
```

To solve the common error: While resolving: react-currency-formatter@1.1.0 Found: react@18.2.0

```
npm install react-currency-formatter --save --force
npm install react-currency-formatter --legacy-peer-deps
npm install --save --legacy-peer-deps
npm cache clean --force
npm config set legacy-peer-deps true
npm install
```

### Create typings.d.ts in the root:

```
interface Product {
  id: string;
  title: string;
  price: string;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

type Rating = {
  rate: string;
  count: string;
};

```

### Update pages/index.tsx:

```
import Head from "next/head";
import { Banner, Footer, Header, ProductFeed } from "../components";

type Props = {
  products: Product[];
};

const Home = ({ products }: Props) => {
  return (
    // <div className="flex min-h-screen flex-col items-center justify-center py-2">
    <div className="bg-gray-100">
      <Head>
        <title>Amazon Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="max-w-screen-2xl mx-auto">
        {/* Banner */}
        <Banner />

        {/* Product Feed */}
        <ProductFeed products={products} />
      </main>

      <Footer />
    </div>
  );
};

export default Home;

// Pre-rendering data
export async function getServerSideProps(context: any) {
  const response = await fetch("https://fakestoreapi.com/products");
  const products = await response.json();

  return {
    props: {
      products: products,
    },
  };
}

//https://fakestoreapi.com/products

```

### Create components/ProductFeed.tsx:

```
import React from "react";
import Product from "./Product";

type Props = {
  products: Product[];
};

function ProductFeed({ products }: Props) {
  return (
    <div>
      {products?.map((product,index) => (
       <Product key={index} product={product}  />
      ))}
    </div>
  );
}

export default ProductFeed;



```

### Create components/Product.tsx:

```
import React from "react";

type Props = {
  product: Product;
};

function Product({ product }: Props) {
  return <div>Product</div>;
}

export default Product;

```

### Update styles/globals.tsx:

```
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .navLink {
    @apply cursor-pointer hover:underline;
  }
  .button {
    @apply p-2 text-xs md:text-sm bg-gradient-to-b from-yellow-200 to-yellow-400 border border-yellow-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 active:from-yellow-500;
  }
}


```

### Update components/Product.tsx:

```
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React, { useState } from "react";
// import Currency from "react-currency-formatter";

type Props = {
  product: Product;
};

function Product({ product }: Props) {
  // Generate Random Rating
  //   const MAX_RATING = 5;
  //   const MIN_RATING = 1;
  //   const [rating] = useState(
  //     Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  //   );

   // const starRating = Math.floor(product.rating.rate);
  // To avoid invalid Array length Error:
  const starRating = Math.max(0, Math.floor(product.rating?.rate));

  //Generate Random Prime Delivery Rating
  const [hasPrime] = useState(Math.random() < 0.5); // If less than 0.5 should have prime delivery
  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {product.category}
      </p>
      <Image
        src={product.image}
        alt={product.title}
        height={200}
        width={200}
        className="object-contain mx-auto h-60"
      />
      <h4 className="my-3">{product.title}</h4>
      <div className="flex">
        {Array(starRating)
          .fill(undefined)
          .map((_, index) => (
            <StarIcon className="h-5 text-yellow-500" />
          ))}
      </div>
      <p className="text-xs my-2 line-clamp-2">{product.description}</p>
      <div className="mb-5">
        {/* <Currency
          quantity={Number(product.price)}
          currency="GBP"
        /> */}
        £{product.price}
      </div>
      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <Image
            src="/assets/amazon-prime.png"
            alt="prime delivery"
            width={48}
            height={48}
            className=""
          />
          <p className="text-xs text-gray-500">FREE Next-day delivery</p>
        </div>
      )}
      <button className="mt-auto button">Add to Basket</button>
    </div>
  );
}

export default Product;

```

### Update components/ProductFeed.tsx:

```
import Image from "next/image";
import React from "react";
import Product from "./Product";

type Props = {
  products: Product[];
};

function ProductFeed({ products }: Props) {
  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products?.slice(0, 4).map((product) => (
        <Product key={product.id} product={product} />
      ))}
      <Image
        className="md:col-span-full mx-auto"
        src="/assets/amazon-ad.jpeg"
        alt="Discover your next great read with kindle book deals"
        width={1500}
        height={400}
      />
      {/* {products?.slice(5, products.length).map((product) => ( */}
      {products?.slice(5, 13).map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductFeed;

```

### Create components/AdBlock.tsx:

```
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  title: string;
  productTitle?: string;
  text: string;
  image: string;
  deal?: boolean;
};

function AdBlock({ title, productTitle, text, image, deal }: Props) {
  return (
    <div className="bg-white z-30 m-5 p-5">
      <h2 className="text-xl font-bold">{title}</h2>
      <Image
        src={`/assets/${image}.jpg`}
        width={390}
        height={390}
        alt={title}
        className="object-cover mx-auto py-3"
      />
      {deal && (
        <div className="flex space-x-2 items-center">
          <span className="bg-red-700 px-1 py-2 text-xs text-white">
            Up to 63% off
          </span>
          <span className="text-red-700 p-1 font-bold text-xs">Deal</span>
        </div>
      )}
      {productTitle && <p className="text-xs pt-2 pb-5">{productTitle}</p>}

      <Link href="/" className="text-xs text-amazonBlue-dark">
        {text}
      </Link>
    </div>
  );
}

export default AdBlock;

```

### Update styles/globals.css:

```
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .navLink {
    @apply cursor-pointer hover:underline;
  }
  .button {
    @apply p-2 text-xs md:text-sm bg-gradient-to-b from-yellow-200 to-yellow-400 border border-yellow-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 active:from-yellow-500;
  }
  .carousel.carousel-slider .control-arrow {
    @apply cursor-pointer !bg-gray-100 !shadow-lg !my-auto h-1/2 rounded-sm  hover:!bg-gray-200  !p-5;
  }
  .carousel .control-prev.control-arrow:before {
    @apply !border-r-black;
  }
  .carousel .control-next.control-arrow:before {
    @apply !border-l-black;
  }
}


```

### Create components/BestSellers.tsx:

```
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Product from "./Product";
import Image from "next/image";
type Props = {
  products: Product[];
  title: string;
};

function BestSellers({ products, title }: Props) {
  console.log(products);
  return (
    <div className="m-5">
      <div className="bg-white p-5">
        <h2 className="font-bold text-xl">{title}</h2>
        <Carousel
          autoPlay
          infiniteLoop
          showStatus={false}
          showIndicators={false}
          showThumbs={false}
          interval={5000}
          centerMode={true}
          centerSlidePercentage={20}
          className="carousel bg-white"
        >
          {products?.map((product, index) => (
            <Image
              key={index}
              src={product.image}
              alt={product.title}
              width={180}
              height={250}
              className=" bg-white p-5 h-60 object-contain"
            />
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default BestSellers;


```

### Create components/LightningDeals.tsx:

```
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import Deal from "./Deal";
type Props = {
  products: Product[];
  title: string;
};

function LightiningDeals({ products, title }: Props) {
  console.log(products);
  return (
      <div className="m-5 bg-white p-5">
        <div className="flex items-center space-x-4">
          <h2 className="font-bold text-xl">{title}</h2>
          <span className="text-sm text-amazonBlue-dark">See more</span>
        </div>
        <Carousel
          autoPlay
          infiniteLoop
          showStatus={false}
          showIndicators={false}
          showThumbs={false}
          interval={5000}
          centerMode={true}
          centerSlidePercentage={20}
          className="carousel bg-white"
        >
          {products?.map((product, index) => (
            <Deal key={index} productTitle={product.title} image={product.image} />
          ))}
        </Carousel>
      </div>
  );
}

export default LightiningDeals;

```

### Create components/SimpleBlock.tsx:

```
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Product from "./Product";
import Image from "next/image";
type Props = {
  title: string;
};

function SimpleBlock({ title }: Props) {
  const products = [
    "/assets/device-1.jpg",
    "/assets/device-2.jpg",
    "/assets/device-3.jpg",
    "/assets/device-4.jpg",
    "/assets/device-5.jpg",
    "/assets/device-6.jpg",
    "/assets/device-7.jpg",
    "/assets/device-8.jpg",
    "/assets/device-9.jpg",
    "/assets/device-10.jpg",
    "/assets/device-11.jpg",
    "/assets/device-12.jpg",
  ];
  return (
    <div className="m-5">
      <div className="bg-white p-5">
        <div className="flex items-center space-x-4">
          <h2 className="font-bold text-xl">{title}</h2>
          <span className="text-sm text-amazonBlue-dark">See more</span>
        </div>
        <Carousel
          autoPlay
          infiniteLoop
          showStatus={false}
          showIndicators={false}
          showThumbs={false}
          interval={5000}
          centerMode={true}
          centerSlidePercentage={20}
          className="carousel bg-white"
        >
          {products?.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt="amazon device"
              width={180}
              height={250}
              className=" bg-white p-5 h-60 object-contain"
            />
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default SimpleBlock;

```

### Create components/Deal.tsx:

```
import Image from "next/image";
import React from "react";

type Props = {
  productTitle: string;
  image: string;
};

function Deal({ image, productTitle }: Props) {
  return (
    <div>
      <Image
        src={image}
        width={390}
        height={390}
        alt={productTitle}
        className="object-contain mx-auto py-3 p-5 h-60"
      />
      <div className="flex space-x-2 items-center">
        <span className="bg-red-700 px-1 py-2 text-xs text-white">
          Up to 50% off
        </span>
        <span className="text-red-700 p-1 font-bold text-xs">Deal</span>
      </div>
      <p className="text-xs pt-2 pb-5">{productTitle}</p>
    </div>
  );
}

export default Deal;

```

### Create components/Deals.tsx:

```
import Link from "next/link";
import React from "react";
import Deal from "./Deal";

type Props = {
  title: string;
  productTitle: string;
  text: string;
  image: string;
};

function Deals({ title, productTitle, text, image }: Props) {
  return (
    <div className="bg-white z-30 m-5 p-5">
      <h2 className="text-lg font-bold">{title}</h2>
      <Deal productTitle={productTitle} image={image} />
      <Link href="/" className="text-xs text-amazonBlue-dark">
        {text}
      </Link>
    </div>
  );
}

export default Deals;

```

### Update components/index.tsx:

```
export { default as Header } from "./Header";
export { default as DropDown } from "./DropDown";
export { default as Banner } from "./Banner";
export { default as ProductFeed } from "./ProductFeed";
export { default as AdBlock } from "./AdBlock";
export { default as BestSellers } from "./BestSellers";
export { default as Deals } from "./Deals";
export { default as Deal } from "./Deal";
export { default as LightningDeals } from "./LightningDeals";
export { default as SimpleBlock } from "./SimpleBlock";
export { default as Footer } from "./Footer";

```

### Update pages/index.tsx:

```
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
  const response1 = await fetch("https://fakestoreapi.com/products");
  const products = await response1.json();

  const response2 = await fetch(
    "https://fakestoreapi.com/products/category/jewelery"
  );
  const jewelery = await response2.json();

  const response3 = await fetch(
    "https://fakestoreapi.com/products/category/men's%20clothing"
  );
  const mensClothing = await response3.json();

  const response4 = await fetch(
    "https://fakestoreapi.com/products/category/women's%20clothing"
  );
  const womensClothing = await response4.json();

  const response5 = await fetch(
    "https://fakestoreapi.com/products/category/electronics"
  );
  const electronics = await response5.json();
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

```

## Implementing Authentication using [Next-Auth](https://next-auth.js.org/):

### Install dependencies:

```
npm install next-auth
```

### Setup Firebase:

Go to https://console.firebase.google.com/
Add new project: amazon-clone > Continue
Project settings > </> (Click on the web icon to Add Firebase to your web app)
Register app: amazon-clone > Register app

#### Install dependencies:

```
npm install firebase
```

#### Create firebase.ts in the root:

Copy the code provided by firebase to initialize Firebase and begin using the SDKs for the products you'd like to use.

```
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBu5OnCb9b9IORzixII6yS4QAHaDi_04RE",
  authDomain: "clone-3ae4b.firebaseapp.com",
  projectId: "clone-3ae4b",
  storageBucket: "clone-3ae4b.appspot.com",
  messagingSenderId: "504696714564",
  appId: "1:504696714564:web:2a8919273e98414391d311"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
```

### Generate NEXT SECRET to use as JWT_SECRET in .env.local:

```
openssl rand -base64 32
```

### Create pages/ap/auth/[...nextauth].tsx:

```
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";

export default NextAuth({
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],

  secret: process.env.JWT_SECRET, // if not defined you get an error [NO SECRET]
});

```

#### Google Authentication

Next go to Build > Authentication > Get Started >Sign-in providers: Google > Choose Project support email > Save

### Update pages/\_app.tsx:

```
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  // To fix hydration UI mismatch issues, we need to wait until the component has mounted.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;


```

### Usage Example:

```
import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session } = useSession()
  if(session) {
    return <>
      Signed in as {session.user.email} <br/>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  }
  return <>
    Not signed in <br/>
    <button onClick={() => signIn()}>Sign in</button>
  </>
}

```

### Update components/Header.tsx:

```
import Image from "next/image";
import React from "react";
import {
  Bars3Icon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import DropDown from "./DropDown";
import { useSession, signIn, signOut } from "next-auth/react";
import { DiffieHellmanGroup } from "crypto";

type Props = {};

function Header({}: Props) {
  const { data: session } = useSession();
  console.log(session);

  return (
    <header>
      <div className="flex items-center bg-amazonBlue flex-grow p-2 py-2 space-x-2">
        {/* Logo */}
        <div className="flex  items-center flex-grow sm:flex-grow-0 ">
          <div className="mt-2">
            <Image
              src="/amazon.png"
              alt=""
              width={100}
              height={40}
              className="object-contain cursor-pointer"
            />
          </div>
          <span className="items-center text-white text-xs">.co.uk</span>
        </div>
        {/* Select Address */}
        <div className="flex flex-col text-white space-x-4">
          <span className="font-light text-xs ml-9 text-gray-300">Hello</span>
          <div className="flex text-sm items-center ">
            <MapPinIcon className="w-5 h-5" />
            <span className="font-bold text-sm leading-3">
              Select your address
            </span>
          </div>
        </div>
        {/* Search Input */}
        <div className="hidden sm:flex flex-grow cursor-pointer h-10 bg-amazonYellow hover:bg-amazonYellow-hover rounded-md">
          <DropDown />
          <input
            className="p-2 h-full w-6 flex-grow flex-shrink focus:outline-none px-4"
            type="text"
          />
          <MagnifyingGlassIcon className="h-10 p-2" />
        </div>
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace:no-wrap">
          <div
            className="navLink"
            onClick={!session ? () => signIn() : () => signOut()}
          >
            {session ? (
              <p>Hello, {session!.user!.name}</p>
            ) : (
              <p>Hello, sign in</p>
            )}

            <p className="flex">
              <span className="font-extrabold md:text-sm">
                Accounts & Lists
              </span>{" "}
              <ChevronDownIcon className="w-3 h-4" />
            </p>
          </div>
          <div className="navLink ">
            <p className="">Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>
          <div className="relative navLink flex items-center">
            <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-amazonYellow rounded-full text-center text-black font-bold">
              1
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className="hidden md:inline-flex font-extrabold md:text-sm mt-2">
              Basket
            </p>
          </div>
        </div>
      </div>
      {/* Links */}
      <div className="flex items-center bg-amazonBlue-light text-white text-sm space-x-5 p-2 pl-6">
        <p className="link flex items-center">
          <Bars3Icon className="h-6 mr-1" /> All
        </p>
        <p className="link">Best Sellers</p>
        <p className="link">Gift Ideas</p>
        <p className="link">Prime Video</p>
        <p className="link">Customer Service</p>
        <p className="link">Music</p>
        <p className="link hidden md:inline-flex">Today's Deals</p>
        <p className="link hidden md:inline-flex">New Releases</p>
        <p className="link hidden md:inline-flex">Books</p>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Audible</p>
        <p className="link hidden lg:inline-flex">Vouchers</p>
        <p className="link hidden xl:inline-flex">PC & Video Games</p>
      </div>
    </header>
  );
}

export default Header;

```

Click on sign in and you get an error: Error 400: redirect_uri_mismatch
You can't sign in to this app because it doesn't comply with Google's OAuth 2.0 policy.
If you're the app developer, register the redirect URI in the Google Cloud Console.
Request details: redirect_uri=http://localhost:3000/api/auth/callback/google

Go to https://console.cloud.google.com/
Create new project:amazon-clone > Create > Select Project > Dashboard > APIs and services > OAuth consent screen > User Type > External > Create
App name:Amazon, email:email, app Logo
Developer contact information: email
Save and Continue X 3 > Back to Dashboard
Credentials > Create Credentials > Create OAuth Client ID > Web application
NAme: amazon-clone
Authorised JavaScript origins:http://localhost:3000
Authorised redirect URIs:http://localhost:3000/api/auth/callback/google
Create
Copy the Google Client ID and Secret and add it into your .env.local file.

#### Update .env.local file

```
# Authentication
GOOGLE_ID=key_goes_here
GOOGLE_SECRET=key_goes_here
JWT_SECRET=secret_goes_here
NEXTAUTH_URL=http://localhost:3000
# Stripe
STRIPE_PUBLIC_KEY=key_goes_here
STRIPE_SECRET_KEY=key_goes_here

# Stripe Terminal/CLI
STRIPE_SIGNING_SECRET=key_goes_here

HOST=http://localhost:3000

# Need to add this to... google cloud
# http://localhost:3000/api/auth/callback/google
```

## Create Checkout

### Create pages/checkout.tsx

```
import React from "react";
import { Header } from "../components";

type Props = {};

function checkout({}: Props) {
  return (
    <div className="bg-amazonGray">
      <Header />
    </div>
  );
}

export default checkout;

```

### Update components/Header.tsx:

Update the links for the amazon logo and basket icon.

```
import Image from "next/image";
import React from "react";
import {
  Bars3Icon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import DropDown from "./DropDown";
import { useSession, signIn, signOut } from "next-auth/react";
import { DiffieHellmanGroup } from "crypto";
import { useRouter } from "next/router";

type Props = {};

function Header({}: Props) {
  const { data: session } = useSession();
  console.log(session);
  const router = useRouter();
  return (
    <header>
      <div className="flex items-center bg-amazonBlue flex-grow p-2 py-2 space-x-2">
        {/* Logo */}
        <div className="flex  items-center flex-grow sm:flex-grow-0"   onClick={() => router.push("/")}>
          <div className="mt-2">
            <Image
              src="/amazon.png"
              alt=""
              width={100}
              height={40}
              className="object-contain cursor-pointer"
            />
          </div>
          <span className="items-center text-white text-xs">.co.uk</span>
        </div>
        {/* Select Address */}
        <div className="flex flex-col text-white space-x-4">
          <span className="font-light text-xs ml-9 text-gray-300">Hello</span>
          <div className="flex text-sm items-center ">
            <MapPinIcon className="w-5 h-5" />
            <span className="font-bold text-sm leading-3">
              Select your address
            </span>
          </div>
        </div>
        {/* Search Input */}
        <div className="hidden sm:flex flex-grow cursor-pointer h-10 bg-amazonYellow hover:bg-amazonYellow-hover rounded-md">
          <DropDown />
          <input
            className="p-2 h-full w-6 flex-grow flex-shrink focus:outline-none px-4"
            type="text"
          />
          <MagnifyingGlassIcon className="h-10 p-2" />
        </div>
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace:no-wrap">
          <div
            className="navLink"
            onClick={!session ? () => signIn() : () => signOut()}
          >
            {session ? (
              <p>Hello, {session!.user!.name}</p>
            ) : (
              <p>Hello, sign in</p>
            )}

            <p className="flex">
              <span className="font-extrabold md:text-sm">
                Accounts & Lists
              </span>{" "}
              <ChevronDownIcon className="w-3 h-4" />
            </p>
          </div>
          <div className="navLink ">
            <p className="">Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>
          <div
            className="relative navLink flex items-center"
            onClick={() => router.push("/checkout")}
          >
            <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-amazonYellow rounded-full text-center text-black font-bold">
              1
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className="hidden md:inline-flex font-extrabold md:text-sm mt-2">
              Basket
            </p>
          </div>
        </div>
      </div>
      {/* Links */}
      <div className="flex items-center bg-amazonBlue-light text-white text-sm space-x-5 p-2 pl-6">
        <p className="link flex items-center">
          <Bars3Icon className="h-6 mr-1" /> All
        </p>
        <p className="link">Best Sellers</p>
        <p className="link">Gift Ideas</p>
        <p className="link">Prime Video</p>
        <p className="link">Customer Service</p>
        <p className="link">Music</p>
        <p className="link hidden md:inline-flex">Today's Deals</p>
        <p className="link hidden md:inline-flex">New Releases</p>
        <p className="link hidden md:inline-flex">Books</p>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Audible</p>
        <p className="link hidden lg:inline-flex">Vouchers</p>
        <p className="link hidden xl:inline-flex">PC & Video Games</p>
      </div>
    </header>
  );
}

export default Header;

```

### Update pages/checkout.tsx:

```
import Image from "next/image";
import React from "react";
import { Header } from "../components";

type Props = {};

function checkout({}: Props) {
  return (
    <div className="bg-amazonGray">
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* Left */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="/assets/amazon-ad.jpeg"
            alt="amazon ad"
            width={1500}
            height={250}
            className="object-contain"
          />
          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">Your Shopping Basket</h1>
          </div>
        </div>
        {/* Right */}
        <div></div>
      </main>
    </div>
  );
}

export default checkout;

```

## Implementing Redux for Add to Basket Functionality:

### In redux/store.tsx:

```
import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./slices/basketSlice";

// Global Store
export const store = configureStore({
  reducer: {
    basket: basketReducer,
  },
});

```

### In redux/slices/basketSlice.tsx:

```
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    // Declare actions here
    addToBasket: (state, action) => {},
    removeFromBasket: (state, action) => {},
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state: any) => state.basket.items;

export default basketSlice.reducer;

```

### Update components/Product.tsx:

```
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import Currency from "react-currency-formatter";
import { addToBasket } from "../redux/slices/basketSlice";

type Props = {
  product: any;
};

function Product({ product }: Props) {
  // Generate Random Rating
  //   const MAX_RATING = 5;
  //   const MIN_RATING = 1;
  //   const [rating] = useState(
  //     Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  //   );
   // const starRating = Math.floor(product.rating.rate);
  // To avoid invalid Array length Error:
  const starRating = Math.max(0, Math.floor(product.rating?.rate));

  //Generate Random Prime Delivery Rating
  const [hasPrime] = useState(Math.random() < 0.5); // If less than 0.5 should have prime delivery

  // Add to basket
  const dispatch = useDispatch();
  const addItemToBasket = () => {
    const item =product;
    //Push item as an action into REDUX store
    dispatch(addToBasket(item));
  };
  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {product.category}
      </p>
      <Image
        src={product.image}
        alt={product.title}
        height={200}
        width={200}
        className="object-contain mx-auto h-60"
      />
      <h4 className="my-3">{product.title}</h4>
      <div className="flex">
        {Array(starRating)
          .fill(undefined)
          .map((_, index) => (
            <StarIcon className="h-5 text-yellow-500" />
          ))}
      </div>
      <p className="text-xs my-2 line-clamp-2">{product.description}</p>
      <div className="mb-5">
        {/* <Currency
          quantity={Number(product.price)}
          currency="GBP"
        /> */}
        £{product.price}
      </div>
      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <Image
            src="/assets/amazon-prime.png"
            alt="prime delivery"
            width={48}
            height={48}
            className=""
          />
          <p className="text-xs text-gray-500">FREE Next-day delivery</p>
        </div>
      )}
      <button className="mt-auto button" onClick={addItemToBasket}>
        Add to Basket
      </button>
    </div>
  );
}

export default Product;

```

### Update redux/slices/basketSlice.tsx:

```
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    // Declare actions here
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload]; // preseve the existing items in basket using "...state.items", add new item using "action.payload"
    },
    removeFromBasket: (state, action) => {},
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state: any) => state.basket.items;

export default basketSlice.reducer;

```

### Update components/Header.tsx:

```
import Image from "next/image";
import React from "react";
import {
  Bars3Icon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import DropDown from "./DropDown";
import { useSession, signIn, signOut } from "next-auth/react";
import { DiffieHellmanGroup } from "crypto";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "../redux/slices/basketSlice";

type Props = {};

function Header({}: Props) {
  const { data: session } = useSession();
  // console.log(session);
  const router = useRouter();
  const items = useSelector(selectItems);
  return (
    <header>
      <div className="flex items-center bg-amazonBlue flex-grow p-2 py-2 space-x-2">
        {/* Logo */}
        <div className="flex  items-center flex-grow sm:flex-grow-0"   onClick={() => router.push("/")}>
          <div className="mt-2">
            <Image
              src="/amazon.png"
              alt=""
              width={100}
              height={40}
              className="object-contain cursor-pointer"
            />
          </div>
          <span className="items-center text-white text-xs">.co.uk</span>
        </div>
        {/* Select Address */}
        <div className="flex flex-col text-white space-x-4">
          <span className="font-light text-xs ml-9 text-gray-300">Hello</span>
          <div className="flex text-sm items-center ">
            <MapPinIcon className="w-5 h-5" />
            <span className="font-bold text-sm leading-3">
              Select your address
            </span>
          </div>
        </div>
        {/* Search Input */}
        <div className="hidden sm:flex flex-grow cursor-pointer h-10 bg-amazonYellow hover:bg-amazonYellow-hover rounded-md">
          <DropDown />
          <input
            className="p-2 h-full w-6 flex-grow flex-shrink focus:outline-none px-4"
            type="text"
          />
          <MagnifyingGlassIcon className="h-10 p-2" />
        </div>
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace:no-wrap">
          <div
            className="navLink"
            onClick={!session ? () => signIn() : () => signOut()}
          >
            {session ? (
              <p>Hello, {session!.user!.name}</p>
            ) : (
              <p>Hello, sign in</p>
            )}

            <p className="flex">
              <span className="font-extrabold md:text-sm">
                Accounts & Lists
              </span>{" "}
              <ChevronDownIcon className="w-3 h-4" />
            </p>
          </div>
          <div className="navLink ">
            <p className="">Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>
          <div
            className="relative navLink flex items-center"
            onClick={() => router.push("/checkout")}
          >
            <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-amazonYellow rounded-full text-center text-black font-bold">
              {items?.length}
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className="hidden md:inline-flex font-extrabold md:text-sm mt-2">
              Basket
            </p>
          </div>
        </div>
      </div>
      {/* Links */}
      <div className="flex items-center bg-amazonBlue-light text-white text-sm space-x-5 p-2 pl-6">
        <p className="link flex items-center">
          <Bars3Icon className="h-6 mr-1" /> All
        </p>
        <p className="link">Best Sellers</p>
        <p className="link">Gift Ideas</p>
        <p className="link">Prime Video</p>
        <p className="link">Customer Service</p>
        <p className="link">Music</p>
        <p className="link hidden md:inline-flex">Today's Deals</p>
        <p className="link hidden md:inline-flex">New Releases</p>
        <p className="link hidden md:inline-flex">Books</p>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Audible</p>
        <p className="link hidden lg:inline-flex">Vouchers</p>
        <p className="link hidden xl:inline-flex">PC & Video Games</p>
      </div>
    </header>
  );
}

export default Header;
```

Test the "Add to Basket" button
Use Redux Dev Tools in Developer Console.

### Create components/CheckoutProduct.tsx:

```
import React from "react";

type Props = {
  product: Product;
};

function CheckoutProduct({ product }: Props) {
  return (
    <div>
      <h1>{product?.title}</h1>
    </div>
  );
}

export default CheckoutProduct;

```

### Update pages/checkout.tsx:

```
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import { CheckoutProduct, Header } from "../components";
import Product from "../components/Product";
import { selectItems } from "../redux/slices/basketSlice";

type Props = {};

function checkout({}: Props) {
  const items = useSelector(selectItems);
  return (
    <div className="bg-amazonGray">
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* Left */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="/assets/amazon-ad.jpeg"
            alt="amazon ad"
            width={1500}
            height={250}
            className="object-contain"
          />
          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0
                ? "Your Amazon Basket is empty"
                : "Shopping Basket"}
            </h1>
            {items.map((item: Product) => (
              <CheckoutProduct key={item.id} product={item} />
            ))}
          </div>
        </div>
        {/* Right */}
        <div></div>
      </main>
    </div>
  );
}

export default checkout;

```

### Update components/CheckoutProduct.tsx:

```
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../redux/slices/basketSlice";

type Props = {
  product: any;
};

function CheckoutProduct({ product }: Props) {
  console.log(product);
  console.log(product.rating);
  const starRating = Math.floor(product.rating?.rate);
  // To avoid invalid Array length Error:
  // const starRating = Math.max(0, Math.floor(product.rating?.rate));

  //Generate Random Prime Delivery Rating
  const [hasPrime] = useState(Math.random() < 0.5); // If less than 0.5 should have prime delivery

  // Add to basket
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    console.log(product);
    const item = product;
    //Push item as an action into REDUX store
    dispatch(addToBasket(item));
  };
  const removeItemFromBasket = () => {
    const item = product;
    //Push item as an action into REDUX store
    dispatch(removeFromBasket(item.id));
  };
  return (
    <div className="grid grid-cols-5">
      <div className="col-span-1">
        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
          className="object-contain"
        />
      </div>
      <div className="col-span-3 mx-5">
        <h4 className="my-3">{product.title}</h4>
        {/* <div className="flex">
          {Array(starRating)
            .fill(undefined)
            .map((_, index) => (
              <StarIcon className="h-5 text-yellow-500" />
            ))}
        </div> */}
        <p className="text-xs my-2 line-clamp-3">{product.description}</p>
        <div className="mb-5">£{product.price}</div>
        {hasPrime && (
          <div className="flex items-center space-x-2 -mt-5">
            <Image
              src="/assets/amazon-prime.png"
              alt="prime delivery"
              width={48}
              height={48}
              className=""
            />
            <p className="text-xs text-gray-500">FREE Next-day delivery</p>
          </div>
        )}
      </div>
      <div className="col-span-1 flex flex-col space-y-2 my-auto justify-self-end">
        <button className="mt-auto button" onClick={addItemToBasket}>
          Add to Basket
        </button>
        <button className="mt-auto button" onClick={removeItemFromBasket}>
          Remove from Basket
        </button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
```

### Update redux/slices/basketSlice.tsx:

```
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    // Declare actions here
    addToBasket: (state: any, action: any) => {
      state.items = [...state.items, action.payload]; // preseve the existing items in basket using "...state.items", add new item using "action.payload"
    },
    removeFromBasket: (state: any, action: any) => {
      const index = state.items.findIndex(
        (basketItem:Product) => basketItem.id === action.payload
      );
      let newBasket = [...state.items];
      if (index >= 0) {
        //Item exists in basket... Remove it...
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cannot remove product (id:${action.payload}) as it is not in the basket`
        );
      }
      state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state: any) => state.basket.items;

export default basketSlice.reducer;

```

### Update redux/slices/basketSlice.tsx:

```
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    // Declare actions here
    addToBasket: (state: any, action: any) => {
      state.items = [...state.items, action.payload]; // preseve the existing items in basket using "...state.items", add new item using "action.payload"
    },
    removeFromBasket: (state: any, action: any) => {
      const index = state.items.findIndex(
        (basketItem: Product) => basketItem.id === action.payload
      );
      let newBasket = [...state.items];
      if (index >= 0) {
        //Item exists in basket... Remove it...
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cannot remove product (id:${action.payload}) as it is not in the basket`
        );
      }
      state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state: any) => state.basket?.items;
// Calculate the total number of items
export const selectTotal = (state: any) =>
  state.basket?.items.reduce((total, item) => total + item.price, 0); // total starts at 0. Iterate through the items

export default basketSlice.reducer;


```

### Update pages/checkout.tsx:

```
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import { CheckoutProduct, Header } from "../components";
import Product from "../components/Product";
import { selectItems, selectTotal } from "../redux/slices/basketSlice";

type Props = {};

function checkout({}: Props) {
  const items = useSelector(selectItems);
  console.log(items);
  const total = useSelector(selectTotal);
  console.log(total);

  const { data: session } = useSession();
  return (
    <div className="bg-amazonGray">
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* Left */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="/assets/amazon-ad.jpeg"
            alt="amazon ad"
            width={1500}
            height={250}
            className="object-contain"
          />
          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items?.length === 0
                ? "Your Amazon Basket is empty"
                : "Shopping Basket"}
            </h1>
            {items?.map((item: Product) => (
              <CheckoutProduct key={item.id} product={item} />
            ))}
          </div>
        </div>
        {/* Right */}
        <div className="flex flex-col bg-white p-10 shadow-md ">
          {items?.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items):
                <span className="ml-2">£{Number(total).toFixed(2)}</span>
              </h2>
              <button
                disabled={!session}
                className={`button mt-2 ${
                  !session &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
              >
                {!session ? "Sign in to checkout" : "Proceed to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default checkout;
```

## Persist State with Redux Persist using Redux Toolkit in React:

[Resource 1](https://blog.logrocket.com/persist-state-redux-persist-redux-toolkit-react/):
[Resource 2](https://edvins.io/how-to-use-redux-persist-with-redux-toolkit)

### Persisting state with Redux Persist

```
npm i redux-persist redux-thunk
```

### Update redux/store.tsx:

```
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import basketReducer from "./slices/basketSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

// export const store = configureStore({
//   reducer: {
//     basket: basketReducer,
//   },
// });

const reducers = combineReducers({
  basket: basketReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
```

In the code above, we replaced the value of the reducer property in the store from userReducer to persistedReducer, which is an enhanced reducer with configuration to persist the userReducer state to local storage. Aside from local storage, we can also use other storage engines like sessionStorage and Redux Persist Cookie Storage Adapter.

To use a different storage engine, we just need to modify the value of the storage property of persistConfig with the storage engine we want to use. For example, to use the sessionStorage engine, we’ll first import it as follows:

```
import storageSession from 'reduxjs-toolkit-persist/lib/storage/session'
```

Then, modify persistConfig to look like the following code:

```
const persistConfig = {
  key: 'root',f
  storageSession,
}
```

Note: In the modification to the store above, we also included the Thunk middleware, which will intercept and stop non-serializable values in action before they get to the reducer. When using Redux Persist without using the Thunk middleware, we‘d get an error in the browser’s console reading a non-serializable value was detected in the state.

Finally, we passed our store as a parameter to persistStore, which is the function that persists and rehydrates the state. With this function, our store will be saved to the local storage, and even after a browser refresh, our data will still remain.

In most use cases, we might want to delay the rendering of our app’s UI until the persisted data is available in the Redux store. For that, Redux Persist includes the PersistGate component. To use PersistGate, go to the pages/\_app.tsx file in the src directory and add the following import:

### Update pages/_app_.tsx:

```
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { persistor, store } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  // To fix hydration UI mismatch issues, we need to wait until the component has mounted.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;

```

## To avoid 504: GATEWAY_TIMEOUT in Vercel implement Serverless Functions:

### Deploy Next.js API Routes as Serverless Functions inside /pages/api/

#### In pages/api/getProducts.ts:

```
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const Products = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();
    console.log(products);

    return products;
  };

  const resProducts = await Products();
  console.log("getProducts", resProducts);
  response.status(200).json(resProducts);
}

```

#### In pages/api/getWomensClothing.ts:

```
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const Products = async () => {
    const response = await fetch(
      "https://fakestoreapi.com/products/category/women's%20clothing"
    );
    const products = await response.json();
    console.log(products);

    return products;
  };

  const resProducts = await Products();
  console.log("getProducts", resProducts);
  response.status(200).json(resProducts);
}

```

#### In pages/api/getMensClothing.ts:

```
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const Products = async () => {
    const response = await fetch(
      "https://fakestoreapi.com/products/category/men's%20clothing"
    );
    const products = await response.json();
    console.log(products);

    return products;
  };

  const resProducts = await Products();
  console.log("getProducts", resProducts);
  response.status(200).json(resProducts);
}
```

#### In pages/api/getJewelery.ts:

```
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const Products = async () => {
    const response = await fetch(
      "https://fakestoreapi.com/products/category/jewelery"
    );
    const products = await response.json();
    console.log(products);

    return products;
  };

  const resProducts = await Products();
  console.log("getProducts", resProducts);
  response.status(200).json(resProducts);
}

```

#### In pages/api/getElectronics.ts:

```
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const Products = async () => {
    const response = await fetch(
      "https://fakestoreapi.com/products/category/electronics"
    );
    const products = await response.json();
    console.log(products);

    return products;
  };

  const resProducts = await Products();
  console.log("getProducts", resProducts);
  response.status(200).json(resProducts);
}
```

You can test the API routes: Ex: https://localhost:3000/api/getProducts

#### Fetch the API Routes.

##### Create a utils/index.tsx:

```
export { default as fetchProducts } from "./fetchProducts";
export { default as fetchWomensClothing } from "./fetchWomensClothing";
export { default as fetchMensClothing } from "./fetchMensClothing";
export { default as fetchJewelery } from "./fetchJewelery";
export { default as fetchElectronics } from "./fetchElectronics";

```

##### Create a utils/fetchProducts.tsx:

```
const fetchProducts = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/getProducts`);
  console.log(res);
  const data = await res.json();
  console.log("fetchProducts:",data);
  return data;
};

export default fetchProducts;

```

##### Create a utils/fetchWomensClothing.tsx:

```
const fetchWomensClothing = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/getWomensClothing`);
  console.log(res);
  const data = await res.json();
  console.log("fetchWomensClothing:", data);
  return data;
};

export default fetchWomensClothing;

```

##### Create a utils/fetchMensClothing.tsx:

```
const fetchMensClothing = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/getMensClothing`);
  console.log(res);
  const data = await res.json();
  console.log("fetchMensClothing:", data);
  return data;
};

export default fetchMensClothing;

```

##### Create a utils/fetchJewelery.tsx:

```
const fetchJewelery = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/getJewelery`);
  console.log(res);
  const data = await res.json();
  console.log("fetchJewelery:", data);
  return data;
};

export default fetchJewelery;

```

##### Create a utils/fetchElectronics.tsx:

```
const fetchElectronics = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/getElectronics
  `);
  console.log(res);
  const data = await res.json();
  console.log("fetchElectronics:", data);
  return data;
};

export default fetchElectronics;


```

### Update pages/index.tsx:

```
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

```
