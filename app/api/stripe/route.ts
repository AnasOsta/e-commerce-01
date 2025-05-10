import prisma from "@/app/lib/db";
import { redis } from "@/app/lib/redis";
import { stripe } from "@/app/lib/stripe";
import { headers } from "next/headers";
import Stripe from "stripe";
import { unstable_noStore as noStore } from "next/cache";
export async function POST(req: Request) {
  noStore();
  const body = await req.text();

  const signature = (await headers()).get("Stripe-Signature") as string;

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: unknown) {
    return new Response(`Webhook Error: ${err}`, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;

      await prisma.order.create({
        data: {
          amount: session.amount_total!,
          status: session.payment_status!,
          userId: session.metadata?.userId,
        },
      });

      await redis.del(`cart-${session.metadata?.userId}`);
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  return new Response(null, { status: 200 });
}
