export type Currency = 'USD'|'EUR'|'GBP';
const R = { USD:1, EUR:0.92, GBP:0.79 } as const;
export const moneyFromUSD = (n:number, c:Currency)=>{
  const v = Math.round(n * R[c] * 100) / 100;
  return new Intl.NumberFormat(undefined,{style:'currency',currency:c}).format(v);
}
