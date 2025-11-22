import { useState } from "react";

const API = import.meta.env.VITE_BACKEND_URL || "";

export default function Auth(){
  const [step,setStep] = useState('phone')
  const [phone,setPhone] = useState('')
  const [code,setCode] = useState('')
  const [message,setMessage] = useState('')

  const request = async()=>{
    const res = await fetch(`${API}/api/auth/otp/request`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({phone})})
    const json = await res.json()
    setMessage('Code sent. Use 123456 in demo.')
    setStep('otp')
  }

  const verify = async()=>{
    const res = await fetch(`${API}/api/auth/otp/verify`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({phone,code})})
    const json = await res.json()
    if(json.session_id){
      localStorage.setItem('session_id', json.session_id)
      setMessage('Signed in')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-zinc-950/60 border border-zinc-800 rounded-2xl p-6">
      <div className="text-white text-xl font-black mb-4">Sign in</div>
      {step==='phone' && (
        <div>
          <label className="block text-sm text-zinc-400 mb-2">Phone Number</label>
          <div className="relative">
            <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+1 555 123 4567" className="w-full px-4 py-3 bg-black/60 border border-zinc-800 rounded-md text-white outline-none focus:border-lime-400 transition"/>
            <div className="pointer-events-none absolute inset-0 rounded-md [mask-image:radial-gradient(120px_20px_at_var(--x,50%)_var(--y,50%),#000_20%,transparent_60%)] ring-1 ring-lime-400/20"/>
          </div>
          <button onClick={request} className="mt-4 w-full px-4 py-3 rounded-md font-bold text-black bg-lime-400 hover:scale-[1.01] transition">Get Code</button>
        </div>
      )}
      {step==='otp' && (
        <div>
          <label className="block text-sm text-zinc-400 mb-2">Enter OTP</label>
          <input value={code} onChange={e=>setCode(e.target.value)} placeholder="123456" className="w-full px-4 py-3 bg-black/60 border border-zinc-800 rounded-md text-white outline-none focus:border-lime-400 transition"/>
          <button onClick={verify} className="mt-4 w-full px-4 py-3 rounded-md font-bold text-black bg-lime-400 hover:scale-[1.01] transition">Verify</button>
        </div>
      )}
      {message && <p className="mt-3 text-zinc-300 text-sm">{message}</p>}
    </div>
  )
}
