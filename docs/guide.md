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

### Configure Tailwind to remove unused styles in production

Add this line to tailwind.config.js:

```
purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
```

## Create .env.local in the root:

```
# Authentication
GOOGLE_ID=key_goes_here
GOOGLE_SECRET=key_goes_here
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

function MyApp({ Component, pageProps }: AppProps) {
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
