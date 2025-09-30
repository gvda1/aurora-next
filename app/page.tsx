'use client';
import React from 'react';
import { PRODUCTS } from '@/lib/products';
import { moneyFromUSD, type Currency } from '@/lib/currency';

function useCart(){
  const [items,setItems]=React.useState<{id:string;qty:number}[]>(()=>{ try{return JSON.parse(localStorage.getItem('cart')||'[]');}catch{return[];} });
  React.useEffect(()=>localStorage.setItem('cart',JSON.stringify(items)),[items]);
  const add=(id:string)=>setItems(p=>{ const e=p.find(x=>x.id===id); return e? p.map(x=>x.id===id?{...x,qty:x.qty+1}:x):[...p,{id,qty:1}] });
  const totalUsd=items.reduce((s,i)=>s+(PRODUCTS.find(p=>p.id===i.id)?.priceUsd||0)*i.qty,0);
  const totalQty=items.reduce((s,i)=>s+i.qty,0);
  return { items, add, setItems, totalUsd, totalQty };
}

export default function Home(){
  const cart=useCart();
  const [currency,setCurrency]=React.useState<Currency>((process.env.NEXT_PUBLIC_DEFAULT_CURRENCY as Currency)||'EUR');
  return (
    <div style={{padding:'2rem'}}>
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h1 style={{margin:0}}>Aurora</h1>
        <div>
          <select onChange={e=>setCurrency(e.target.value as Currency)} defaultValue={currency}>
            <option>EUR</option><option>USD</option><option>GBP</option>
          </select>
          <a href="/cart" style={{marginLeft:12}}>Bag ({cart.totalQty})</a>
        </div>
      </header>
      <section style={{display:'grid',gap:16,gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',marginTop:24}}>
        {PRODUCTS.map(p=> (
          <article key={p.id} style={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:16,padding:12}}>
            <img src={p.image} alt={p.name} style={{width:'100%',borderRadius:12,aspectRatio:'4/3',objectFit:'cover'}}/>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'start',marginTop:8}}>
              <div>{p.name}</div>
              <div style={{fontWeight:600}}>{moneyFromUSD(p.priceUsd,currency)}</div>
            </div>
            <button onClick={()=>cart.add(p.id)} style={{marginTop:8,borderRadius:12,padding:'8px 12px',background:'#2563eb',color:'#fff'}}>Add</button>
          </article>
        ))}
      </section>
    </div>
  );
}
