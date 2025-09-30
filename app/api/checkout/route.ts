import { NextResponse } from 'next/server';
import { stripe, priceMap } from '@/lib/stripe';

export async function POST(req: Request){
  try{
    const { items } = await req.json(); // [{id, qty}]
    const line_items = (items||[]).map((i:any)=>({ price: priceMap[i.id], quantity: i.qty }));
    const session = await stripe.checkout.sessions.create({
      mode:'payment', line_items,
      success_url: process.env.STRIPE_SUCCESS_URL!,
      cancel_url: process.env.STRIPE_CANCEL_URL!
    });
    return NextResponse.json({ url: session.url });
  }catch(e:any){
    return NextResponse.json({ error: e.message||'Checkout failed' }, { status: 400 });
  }
}
