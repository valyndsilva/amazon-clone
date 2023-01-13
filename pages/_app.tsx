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
