import { Link, NavLink } from "react-router-dom";
import { ShoppingBag, User, Flame, ChevronRight } from "lucide-react";

export default function Header() {
  return (
    <header className="hidden md:block sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <Flame className="w-7 h-7 text-lime-400 drop-shadow-[0_0_20px_rgba(163,230,53,0.5)]" />
          </div>
          <span className="text-white font-black tracking-wide text-xl">THE DROP ZONE</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <NavLink to="/" end className={({isActive})=>`uppercase tracking-wider ${isActive? 'text-white':'text-zinc-300 hover:text-white'} transition`}>The Latest Drop</NavLink>
          <NavLink to="/shop/hoodies" className={({isActive})=>`${isActive? 'text-white':'text-zinc-300 hover:text-white'} uppercase tracking-wider`}>Hoodies</NavLink>
          <NavLink to="/shop/sneakers" className={({isActive})=>`${isActive? 'text-white':'text-zinc-300 hover:text-white'} uppercase tracking-wider`}>Sneakers</NavLink>
          <NavLink to="/shop" className={({isActive})=>`${isActive? 'text-white':'text-zinc-300 hover:text-white'} uppercase tracking-wider`}>All</NavLink>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/profile" className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-200 hover:text-white transition group">
            <User className="w-6 h-6" />
          </Link>
          <Link to="/cart" className="px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-lime-400/60 hover:shadow-[0_0_30px_rgba(163,230,53,0.25)] text-white transition inline-flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            <span className="hidden lg:inline">Cart</span>
            <ChevronRight className="w-4 h-4 hidden sm:inline" />
          </Link>
        </div>
      </div>
    </header>
  )
}
