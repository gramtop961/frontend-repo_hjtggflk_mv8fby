import { motion } from "framer-motion";

export default function ProductCard({ item, onQuickAdd }){
  const lowStock = (item.sizes||[]).some(s=>s.stock>0 && s.stock<=3)
  const soldOut = (item.sizes||[]).every(s=>s.stock<=0)
  return (
    <motion.div whileHover={{y:-4}} className="group bg-zinc-950/60 border border-zinc-800 rounded-xl overflow-hidden">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img src={(item.images&&item.images[0])||'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop'} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500"/>
        {soldOut && <span className="absolute top-3 left-3 px-2 py-1 text-xs font-bold bg-black/80 text-white border border-zinc-700">Sold Out</span>}
        {!soldOut && lowStock && <span className="absolute top-3 left-3 px-2 py-1 text-xs font-bold bg-black/80 text-lime-300 border border-lime-500/40">Low Stock</span>}
      </div>
      <div className="p-4 flex items-center justify-between">
        <div>
          <h3 className="text-white font-semibold tracking-wide">{item.name}</h3>
          <p className="text-zinc-400 text-sm">${item.price}</p>
        </div>
        <button onClick={()=>onQuickAdd(item)} style={{boxShadow:`0 0 20px ${item.accent||'#7CFF2E'}33`}} className="px-3 py-2 rounded-md font-bold text-black" 
          aria-label="Quick add" 
          
          
          
          
          >
          <span style={{color:'#000', background: item.accent||'#7CFF2E'}} className="block px-3 py-2 rounded-md group-hover:scale-105 transition">Quick Add</span>
        </button>
      </div>
    </motion.div>
  )
}
