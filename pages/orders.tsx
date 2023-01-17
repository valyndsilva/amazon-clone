import { collection, doc, getDocs, orderBy, query } from "firebase/firestore";
import moment from "moment";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import React from "react";
import { Header, Order } from "../components";
import db from "../firebaseConfig";

type Props = {
  orders: Order[];
  userName: string;
};

function orders({ orders, userName }: Props) {
  //   console.log(orders);

  const { data: session } = useSession();
  return (
    <div>
      <Header />
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
          Your Orders
        </h1>
        {session ? (
          <h2>{orders.length} orders placed</h2>
        ) : (
          <h2> Please sign in to see your orders...</h2>
        )}

        <div className="mt-5 space-y-4">
          {orders?.map((order,index) => (
            <div key={index}>
              <Order order={order} userName={userName} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default orders;

export const getServerSideProps: GetServerSideProps = async (context) => {
  //   console.log({ context });

  //Anything in here is node.js
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  // Get the users logged in credentials
  const session = await getSession(context);
  //   console.log({ session });
  //   console.log("User email:", session!.user?.email);
  const userEmail = session?.user?.email as any;
  const userName = session?.user?.name;

  if (!session) {
    return {
      props: {},
    };
  }
  //Firebsae V8
  //   const stripeOrders = await db
  //     .collection("users")
  //     .doc(session.user.email)
  //     .collection("orders")
  //     .orderBy("timestamp", "desc")
  //     .get();

  //Firebsae V9
  //   Collection Reference
  const collectionRef = collection(db, "users", userEmail, "orders");
  const filter = orderBy("timestamp", "desc");
  //   const querySnapshot = await getDocs(collectionRef, filter);
  //   querySnapshot.forEach((doc) => {
  //     console.log(doc.data());
  //   });

  const q = query(collectionRef, filter);
  const stripeOrders = await getDocs(q);
  // const stripeOrders = await getDocs(collectionRef, filter);
  // const stripeOrders = await getDocs(collectionRef);
  // console.log(stripeOrders);

  // Stripe orders
  const orders = await Promise.all(
    // map through each order and get the data each one would be a promise.
    // Promise.all will wait for all of them to resolve
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount, // / 100,
      //amountShipping: order.data().amount_shipping / 100,
      images: order.data().images,
      // get the timestamp from firebase and convert it to a date object so we can format it
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );

  return {
    props: { orders, userName, session },
  };
};
