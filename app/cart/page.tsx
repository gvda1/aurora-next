'use client';
import React from 'react';
import { PRODUCTS } from '@/lib/products';
import { moneyFromUSD, type Currency } from '@/lib/currency';

export default function Cart(){
  const [items,setItems]=React.useState<{id:string;qty:number}[]>(()=>{ try{return JSON.parse(localStorage.getItem('cart')||'[]');}catch{return[];} });
  React.useEffect(()=>localStorage.setItem('cart',JSON.stringify(items)),[items]);
  const [currency,setCurrency]=React.useState<Currency>((process.env.NEXT_PUBLIC_DEFAULT_CURRENCY as Currency)||'EUR');
  const subtotalUsd=items.reduce((s,i)=>s+(PRODUCTS.find(p=>p.id===i.id)?.priceUsd||0)*i.qty,0);
  return (
    <div style={{padding:'2rem'}}>
      <h2>Your cart</h2>
      {items.length===0? <p>Empty. <a href="/">Shop</a></p> : (
        <>
          <div style={{display:'grid',gap:12}}>
            {items.map(i=>{ const p=PRODUCTS.find(x=>x.id===i.id)!; return (
              <div key={i.id} style={{display:'flex',gap:12,alignItems:'center',border:'1px solid #e5e7eb',borderRadius:12,padding:8,background:'#fff'}}>
                <img src={p.image} alt={p.name} style={{width:120,height:90,objectFit:'cover',borderRadius:8}}/>
                <div style={{flex:1}}>
                  <div>{p.name}</div>
                  <div style={{opacity:.7,fontSize:14}}>{moneyFromUSD(p.priceUsd,currency)}</div>
                  <div style={{marginTop:6,display:'flex',gap:6,alignItems:'center'}}>
                    <button onClick={()=>setItems(prev=>prev.map(x=>x.id===i.id?{...x,qty:Math.max(1,x.qty-1)}:x))}>-</button>
                    <input type="number" value={i.qty} onChange={e=>setItems(prev=>prev.map(x=>x.id===i.id?{...x,qty:Math.max(1,Number(e.target.value||1))}:x))} style={{width:54}}/>
                    <button onClick={()=>setItems(prev=>prev.map(x=>x.id===i.id?{...x,qty:x.qty+1}:x))}>+</button>
                    <button onClick={()=>setItems(prev=>prev.filter(x=>x.id!==i.id))} style={{marginLeft:8,color:'#b91c1c'}}>Remove</button>
                  </div>
                </div>
                <div style={{fontWeight:600}}>{moneyFromUSD(p.priceUsd*i.qty,currency)}</div>
              </div>
            );})}
          </div>
          <div style={{marginTop:16,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div>Subtotal: <b>{moneyFromUSD(subtotalUsd,currency)}</b></div>
            <form onSubmit={async(e)=>{e.preventDefault(); const res=await fetch('/api/checkout',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({items})}); const data=await res.json(); if(data.url) location.href=data.url; }}>
              <button style={{borderRadius:12,padding:'10px 14px',background:'#2563eb',color:'#fff'}}>Checkout</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
