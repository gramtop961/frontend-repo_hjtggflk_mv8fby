import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API = import.meta.env.VITE_BACKEND_URL || "";

export default function PDP(){
  const { slug } = useParams()
  const [p,setP] = useState(null)
  const [sel,setSel] = useState(null)
  const [qty,setQty] = useState(1)

  useEffect(()=>{
    (async()=>{
      const res = await fetch(`${API}/api/products/${slug}`)
      setP(await res.json())
    })()
  },[slug])

  const add = async ()=>{
    const cartId = localStorage.getItem('cart_id') || crypto.randomUUID();
    localStorage.setItem('cart_id', cartId)
    await fetch(`${API}/api/cart/${cartId}/add`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({slug: p.slug, size: sel||undefined, qty})})
    alert('Added to cart')
  }

  if(!p) return <div className="text-zinc-400">Loading...</div>

  const low = (p.sizes||[]).some(s=>s.stock>0 && s.stock<=3)

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="bg-zinc-950/60 border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="aspect-square">
          <img src={(p.images&&p.images[0])} alt={p.name} className="w-full h-full object-cover"/>
        </div>
        <div className="grid grid-cols-4 gap-2 p-2">
          {(p.images||[]).slice(0,4).map((img,i)=> (
            <img key={i} src={img} className="h-20 w-full object-cover rounded-md"/>
          ))}
        </div>
      </div>

      <div className="relative">
        <h1 className="text-white text-3xl font-black tracking-tight">{p.name}</h1>
        <p className="text-zinc-400 mt-2">{p.description}</p>
        <p className="text-white text-2xl mt-4">${p.price}</p>

        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-zinc-300 font-semibold">Select Size</span>
            {low && <span className="text-xs text-lime-300">Low Stock</span>}
          </div>
          <div className="flex flex-wrap gap-2">
            {(p.sizes||[]).map(s=>{
              const disabled = s.stock<=0
              const active = sel===s.size
              return (
                <button key={s.size} disabled={disabled} onClick={()=>setSel(s.size)} className={`px-3 py-2 rounded-md border text-sm ${active? 'border-lime-400 text-white' : 'border-zinc-700 text-zinc-300'} ${disabled? 'opacity-40 cursor-not-allowed': 'hover:border-lime-400 hover:text-white'} transition`}>
                  {s.size}
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button onClick={()=>setQty(Math.max(1, qty-1))} className="px-3 py-2 border border-zinc-700 rounded-md text-white">-</button>
          <span className="text-white w-8 text-center">{qty}</span>
          <button onClick={()=>setQty(qty+1)} className="px-3 py-2 border border-zinc-700 rounded-md text-white">+</button>
        </div>

        <div className="sticky bottom-6 mt-6">
          <button onClick={add} style={{background: p.accent||'#7CFF2E'}} className="w-full text-black font-bold px-5 py-4 rounded-md hover:scale-[1.01] transition shadow-[0_0_35px_rgba(124,255,46,0.35)]">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
