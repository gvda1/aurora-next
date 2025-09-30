export const metadata = { title: 'Aurora', description: 'Premium tech' };
export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="en">
      <body style={{background:'#f7f7fb',color:'#0a0a0a', margin:0}}>
        <main style={{maxWidth:960, margin:'0 auto'}}>{children}</main>
      </body>
    </html>
  );
}
