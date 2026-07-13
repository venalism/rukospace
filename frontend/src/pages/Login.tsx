import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const setAuth = useAuthStore(state => state.setAuth)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Login failed')
      }
      
      setAuth(data.token, data.user)
      if (data.user.role === 'admin') navigate('/dashboard/admin')
      else if (data.user.role === 'owner' || data.user.role === 'agent') navigate('/dashboard/owner')
      else navigate('/dashboard/tenant')
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-margin-mobile py-3xl">
      <div className="w-full max-w-[448px]">
        {/* Card */}
        <div className="bg-surface-container-lowest rounded-xl p-xl border border-border-subtle shadow-sm">
          {/* Header */}
          <div className="text-center mb-xl">
            <div className="w-16 h-16 bg-surface-container-low rounded-full flex items-center justify-center mx-auto mb-md">
              <span className="material-symbols-outlined text-[32px] text-trust-navy" style={{ fontVariationSettings: "'FILL' 1" }}>lock_open</span>
            </div>
            <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-trust-navy">Login to RukoSpace</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs">Masuk untuk mengelola properti atau jadwal survei.</p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-error-container text-on-error-container p-md rounded-lg mb-lg flex items-center gap-sm font-body-sm text-body-sm">
              <span className="material-symbols-outlined text-[18px]">error</span>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-lg">
            <div className="flex flex-col gap-sm">
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">Email</label>
              <div className="flex items-center bg-surface-gray rounded-lg px-md py-sm border border-border-subtle focus-within:border-trust-navy transition-colors">
                <span className="material-symbols-outlined text-outline mr-sm text-[20px]">mail</span>
                <input
                  type="email"
                  className="w-full bg-transparent border-none focus:ring-0 font-body-md text-body-md text-on-surface placeholder:text-outline p-0"
                  placeholder="email@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-sm">
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">Password</label>
              <div className="flex items-center bg-surface-gray rounded-lg px-md py-sm border border-border-subtle focus-within:border-trust-navy transition-colors">
                <span className="material-symbols-outlined text-outline mr-sm text-[20px]">lock</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full bg-transparent border-none focus:ring-0 font-body-md text-body-md text-on-surface placeholder:text-outline p-0"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-sm text-outline hover:text-on-surface transition-colors focus:outline-none"
                  tabIndex={-1}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-trust-navy text-on-primary font-body-md text-body-md font-bold py-md rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-sm"
            >
              <span className="material-symbols-outlined text-[20px]">login</span>
              Login
            </button>
          </form>

          {/* Footer */}
          <div className="mt-xl text-center border-t border-border-subtle pt-lg">
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Belum punya akun?{' '}
              <Link to="/register" className="text-trust-navy font-semibold hover:underline">Daftar Sekarang</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
