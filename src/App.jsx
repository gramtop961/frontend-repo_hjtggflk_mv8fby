import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Header from './components/Header'
import StickyFooterNav from './components/StickyFooterNav'
import Hero from './components/Hero'
import Grid from './components/Grid'
import PDP from './components/PDP'
import Cart from './components/Cart'
import Auth from './components/Auth'

function Home(){
  return (
    <div>
      <Hero />
      <main className="max-w-7xl mx-auto px-6 -mt-12 md:-mt-16 relative z-10">
        <div className="rounded-3xl bg-black/60 border border-zinc-800 p-5 md:p-8 backdrop-blur">
          <Grid />
        </div>
      </main>
    </div>
  )
}

export default function App(){
  return (
    <div className="min-h-screen bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_-10%,#a3e63522,transparent_30%),radial-gradient(circle_at_80%_-10%,#22d3ee22,transparent_30%)]"/>
      <BrowserRouter>
        <Header />
        <div className="pt-2 pb-20 md:pb-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:slug" element={<div className="max-w-7xl mx-auto px-6 py-10"><PDP /></div>} />
            <Route path="/cart" element={<div className="max-w-7xl mx-auto px-6 py-10"><Cart /></div>} />
            <Route path="/profile" element={<div className="max-w-7xl mx-auto px-6 py-10"><Auth /></div>} />
            <Route path="*" element={<div className="text-center text-zinc-400 py-20">Not Found</div>} />
          </Routes>
        </div>
        <StickyFooterNav />
      </BrowserRouter>
    </div>
  )
}
