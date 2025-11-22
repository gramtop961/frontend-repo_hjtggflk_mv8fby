import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const API = import.meta.env.VITE_BACKEND_URL || "";

export default function Grid(){
  const [items,setItems] = useState([])
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    async function run(){
      try{
        await fetch(`${API}/api/seed-products`, {method:'POST'})
      }catch(e){}
      const res = await fetch(`${API}/api/products`)
      const json = await res.json()
      setItems(json.items||[])
      setLoading(false)
    }
    run()
  },[])

  const quickAdd = async (item)=>{
    const cartId = localStorage.getItem('cart_id') || crypto.randomUUID();
    localStorage.setItem('cart_id', cartId)
    await fetch(`${API}/api/cart/${cartId}/add`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({slug: item.slug})})
    // visual confirmation
    alert('Added to cart')
  }

  if(loading){
    return <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" aria-busy>
      {Array.from({length:8}).map((_,i)=>(
        <div key={i} className="h-72 bg-zinc-900/60 border border-zinc-800 rounded-xl animate-pulse"/>
      ))}
    </div>
  }

  return (
    <div id="shop" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6">
      {items.map(it=> <ProductCard key={it._id} item={it} onQuickAdd={quickAdd} />)}
    </div>
  )
}
