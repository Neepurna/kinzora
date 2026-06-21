'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Email o contraseña incorrectos')
      setLoading(false)
      return
    }

    router.push('/admin')
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-heading text-2xl font-bold text-[#C89B52]">Kinzora</h1>
          <p className="text-[#D6D0C7]/50 text-sm mt-1">Panel de administración</p>
        </div>

        <form onSubmit={handleLogin} className="glass-dark rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-xs text-[#D6D0C7]/60 uppercase tracking-wider mb-1.5">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#111] border border-[rgba(200,155,82,0.15)] rounded-xl px-4 py-3 text-[#F8F4EE] text-sm focus:outline-none focus:border-[#C89B52]/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-[#D6D0C7]/60 uppercase tracking-wider mb-1.5">
              Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#111] border border-[rgba(200,155,82,0.15)] rounded-xl px-4 py-3 text-[#F8F4EE] text-sm focus:outline-none focus:border-[#C89B52]/50 transition-colors"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gold-gradient text-[#0A0A0A] font-semibold text-sm disabled:opacity-50 hover:opacity-90 transition-opacity cursor-pointer"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
