export type Product = { id:string; name:string; priceUsd:number; image:string };
export const PRODUCTS: Product[] = [
  { id:'p1', name:'Aurex One — 128GB', priceUsd:899, image:'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop' },
  { id:'p2', name:'Aurex One — 256GB', priceUsd:999, image:'https://images.unsplash.com/photo-1510552776732-01acc9a4c46e?q=80&w=1200&auto=format&fit=crop' },
  { id:'p3', name:'Halo Buds Pro', priceUsd:249, image:'https://images.unsplash.com/photo-1585386959984-a4155223168f?q=80&w=1200&auto=format&fit=crop' },
  { id:'p6', name:'Orbit Watch Titanium', priceUsd:699, image:'https://images.unsplash.com/photo-1518441902110-5815b1fdab2f?q=80&w=1200&auto=format&fit=crop' }
];
