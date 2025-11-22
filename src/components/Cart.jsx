import { useEffect, useState } from "react";

const API = import.meta.env.VITE_BACKEND_URL || "";

export default function Cart(){
  const [cart,setCart]=useState(null)

  const load=async()=>{
    const cartId = localStorage.getItem('cart_id') || crypto.randomUUID();
    localStorage.setItem('cart_id', cartId)
    const res = await fetch(`${API}/api/cart/${cartId}`)
    setCart(await res.json())
  }

  useEffect(()=>{load()},[])

  const inc=async(it,delta)=>{
    const cartId = localStorage.getItem('cart_id')
    const qty = Math.max(0,(it.qty||1)+delta)
    await fetch(`${API}/api/cart/${cartId}/update`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({slug:it.slug,size:it.size,qty})})
    await load()
  }
  const remove=async(it)=>{
    const cartId = localStorage.getItem('cart_id')
    await fetch(`${API}/api/cart/${cartId}/update`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({slug:it.slug,size:it.size,remove:true})})
    await load()
  }

  if(!cart) return <div className="text-zinc-400">Loading...</div>

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        {cart.items.length===0 && <div className="text-zinc-400">Your cart is empty.</div>}
        {cart.items.map((it,i)=> (
          <div key={i} className="flex items-center gap-4 p-3 bg-zinc-950/60 border border-zinc-800 rounded-xl">
            <div className="h-20 w-20 rounded-md overflow-hidden bg-zinc-900/60">
              {it.image && <img src={it.image} className="w-full h-full object-cover"/>}
            </div>
            <div className="flex-1">
              <div className="text-white font-semibold">{it.name}</div>
              <div className="text-zinc-400 text-sm">Size {it.size}</div>
              <div className="mt-2 flex items-center gap-2">
                <button onClick={()=>inc(it,-1)} className="px-2 py-1 border border-zinc-700 rounded text-white">-</button>
                <span className="w-8 text-center text-white">{it.qty}</span>
                <button onClick={()=>inc(it,1)} className="px-2 py-1 border border-zinc-700 rounded text-white">+</button>
                <button onClick={()=>remove(it)} className="ml-3 text-red-400 hover:text-red-300">Remove</button>
              </div>
            </div>
            <div className="text-white font-semibold">${it.price}</div>
          </div>
        ))}
      </div>
      <div className="bg-zinc-950/60 border border-zinc-800 rounded-xl p-5 h-fit sticky top-24">
        <div className="text-white text-lg font-bold">Summary</div>
        <div className="mt-3 flex items-center justify-between text-zinc-300">
          <span>Subtotal</span>
          <span>${cart.subtotal}</span>
        </div>
        <div className="mt-6">
          <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2">
            <span className="w-6 h-6 rounded-full bg-lime-400/20 border border-lime-400/40 inline-flex items-center justify-center text-lime-300">1</span>
            Shipping
            <span className="w-6 h-6 rounded-full bg-white/5 border border-white/10 inline-flex items-center justify-center text-zinc-300 ml-2">2</span>
            Payment
            <span className="w-6 h-6 rounded-full bg-white/5 border border-white/10 inline-flex items-center justify-center text-zinc-300 ml-2">3</span>
            Review
          </div>
          <button className="w-full mt-2 px-4 py-3 rounded-md font-bold text-black bg-lime-400 hover:scale-[1.01] transition shadow-[0_0_30px_rgba(163,230,53,0.35)]">Checkout</button>
        </div>
      </div>
    </div>
  )
}
