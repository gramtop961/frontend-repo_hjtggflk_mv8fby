import { motion } from "framer-motion";

export default function Hero(){
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_-10%,#a3e63533,transparent_30%),radial-gradient(circle_at_80%_-10%,#22d3ee33,transparent_30%)]"/>
        <img src="https://images.unsplash.com/photo-1487452066049-a710f7296400?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHx1cmJhbnxlbnwwfDB8fHwxNzYzODA2OTA2fDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80" alt="urban" className="w-full h-[50vh] md:h-[70vh] object-cover contrast-125 saturate-125 opacity-70"/>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black"/>
      </div>
      <div className="relative max-w-7xl mx-auto px-6 pt-20 md:pt-28 pb-16 md:pb-28">
        <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="text-white text-4xl md:text-6xl font-black tracking-tight">
          THE LATEST DROP
        </motion.h1>
        <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1,duration:0.6}} className="text-zinc-300 mt-4 max-w-xl">
          Limited releases, built for the city. Miss it now, miss it forever.
        </motion.p>
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2,duration:0.6}} className="mt-8 flex flex-wrap gap-3">
          <a href="#shop" className="px-5 py-3 bg-lime-400 text-black font-bold rounded-md hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(163,230,53,0.45)] transition">Shop now</a>
          <a href="#" className="px-5 py-3 border border-zinc-700 text-white rounded-md hover:bg-white/10 transition">Lookbook</a>
        </motion.div>
      </div>
    </section>
  )
}
