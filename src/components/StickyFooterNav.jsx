import { NavLink } from "react-router-dom";
import { Home, ShoppingBag, User, Grid2X2 } from "lucide-react";

export default function StickyFooterNav(){
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-black/80 backdrop-blur border-t border-zinc-800">
      <div className="grid grid-cols-4">
        <NavLink to="/" end className={({isActive})=>`flex flex-col items-center py-3 ${isActive? 'text-white':'text-zinc-400'} hover:text-white transition`}>
          <Home className="w-6 h-6 mb-1" />
          <span className="text-xs">Home</span>
        </NavLink>
        <NavLink to="/shop" className={({isActive})=>`flex flex-col items-center py-3 ${isActive? 'text-white':'text-zinc-400'} hover:text-white transition`}>
          <Grid2X2 className="w-6 h-6 mb-1" />
          <span className="text-xs">Shop</span>
        </NavLink>
        <NavLink to="/cart" className={({isActive})=>`flex flex-col items-center py-3 ${isActive? 'text-white':'text-zinc-400'} hover:text-white transition`}>
          <ShoppingBag className="w-6 h-6 mb-1" />
          <span className="text-xs">Cart</span>
        </NavLink>
        <NavLink to="/profile" className={({isActive})=>`flex flex-col items-center py-3 ${isActive? 'text-white':'text-zinc-400'} hover:text-white transition`}>
          <User className="w-6 h-6 mb-1" />
          <span className="text-xs">Profile</span>
        </NavLink>
      </div>
    </nav>
  )
}
