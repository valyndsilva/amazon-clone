// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  id: string;
};

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { items, email } = req.body; //pulled from checkoutSession in pages/checkout.tsx
  console.log(items);
  console.log(email);

  const transformedItems: TransformedItem[] = items.map((item: StripeItem) => ({
    quantity: item.itemQty,
    price_data: {
      //description: item.description,
      currency: "gbp",
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        images: [item.image],
      },
    },
  }));

  // Step 2 - Create checkout session on the backend
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    // shipping_rates: ["shr_1MPneRCDRVOAYVA1duIzK8qJ"], // Returns Error 500
    shipping_address_collection: {
      allowed_countries: ["GB", "US", "CA"],
    },
    line_items: transformedItems,
    mode: "payment",
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(items.map((item: { image: any }) => item.image)),
    },
  });
  res.status(200).json({ id: session.id });
}
