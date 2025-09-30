import Stripe from 'stripe';
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion:'2024-06-20' });
export const priceMap: Record<string,string> = {
  p1: process.env.STRIPE_PRICE_P1!,
  p2: process.env.STRIPE_PRICE_P2!,
  p3: process.env.STRIPE_PRICE_P3!,
  p6: process.env.STRIPE_PRICE_P6!,
};
