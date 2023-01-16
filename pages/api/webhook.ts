// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import * as firebaseAdmin from "firebase-admin";
import serviceAccountCredentials from "../../serviceAccountCredentials.json";

// Secure a connection to firebase from the backend:
const serviceAccount =
  serviceAccountCredentials as firebaseAdmin.ServiceAccount;

// To protect your app from double initialization
// (if no app initialized ? initialize app : use admin app already configured)
const app = !firebaseAdmin.apps.length
  ? firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(serviceAccount),
    })
  : firebaseAdmin.app();

// Establish connection to Stripe:
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_SIGNING_SECRET; // Endpoint secret used when setting up the listener/emulator

const fulfillOrder = async (session: any) => {
  // session here is the stripe checkout session
  console.log("Fulfilling order", session);
  return app
    .firestore()
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: firebaseAdmin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log(
        `SUCCESS: Order ID: ${session.id} has been added to the Firestore Database.`
      );
    });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // to stream the contents of an HTTP request to a variable as a buffer of information
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig_header = req.headers["stripe-signature"];

    let event;
    // Verify the event genuinely is from Stripe
    try {
      event = stripe.webhooks.constructEvent(
        payload,
        sig_header,
        endpointSecret
      );
    } catch (err: any) {
      console.log("❌ Error message:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the checkout.session.completed event
    try {
      if (event.type === "checkout.session.completed") {
        const session = event.data.object;

        // Fulfill the order...
        return fulfillOrder(session)
          .then(() => res.status(200))
          .catch((err) =>
            res.status(400).send(`Webhook Error: ${err.message}`)
          );
      }
    } catch (error) {
      console.log("🚀 ~ file: webhook.ts", error);
    }
    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
  }
}

// You can configure the endpoint with a config file.
// Disable bodyParse when using webhook. Request as stream instead of a parsed object.
export const config = {
  api: {
    bodyParser: false,
    externalResolver: true, // resolved by stripe
  },
};
