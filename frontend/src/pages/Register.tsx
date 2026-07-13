import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Register() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('tenant')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: fullName, email, phone, password, role })
      })
      
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed')
      }
      
      // Auto login or redirect to login
      navigate('/login')
    } catch (err: any) {
      setError(err.message)
    }
  }

  const roleOptions = [
    { value: 'tenant', label: 'Penyewa (Tenant)', icon: 'person_search', desc: 'Mencari dan menyewa ruko' },
    { value: 'owner', label: 'Pemilik Ruko (Owner)', icon: 'domain_add', desc: 'Memasarkan properti Anda' },
    { value: 'agent', label: 'Agen Properti (Agent)', icon: 'support_agent', desc: 'Mengelola listing klien' },
  ]

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-margin-mobile py-3xl">
      <div className="w-full max-w-[448px]">
        {/* Card */}
        <div className="bg-surface-container-lowest rounded-xl p-xl border border-border-subtle shadow-sm">
          {/* Header */}
          <div className="text-center mb-xl">
            <div className="w-16 h-16 bg-surface-container-low rounded-full flex items-center justify-center mx-auto mb-md">
              <span className="material-symbols-outlined text-[32px] text-trust-navy" style={{ fontVariationSettings: "'FILL' 1" }}>person_add</span>
            </div>
            <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-trust-navy">Daftar RukoSpace</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs">Buat akun untuk mulai mencari atau memasarkan ruko.</p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-error-container text-on-error-container p-md rounded-lg mb-lg flex items-center gap-sm font-body-sm text-body-sm">
              <span className="material-symbols-outlined text-[18px]">error</span>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleRegister} className="flex flex-col gap-lg">
            <div className="flex flex-col gap-sm">
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">Nama Lengkap</label>
              <div className="flex items-center bg-surface-gray rounded-lg px-md py-sm border border-border-subtle focus-within:border-trust-navy transition-colors">
                <span className="material-symbols-outlined text-outline mr-sm text-[20px]">person</span>
                <input
                  type="text"
                  className="w-full bg-transparent border-none focus:ring-0 font-body-md text-body-md text-on-surface placeholder:text-outline p-0"
                  placeholder="Nama lengkap Anda"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  required
                />
              </div>
            </div>

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
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">Telepon</label>
              <div className="flex items-center bg-surface-gray rounded-lg px-md py-sm border border-border-subtle focus-within:border-trust-navy transition-colors">
                <span className="material-symbols-outlined text-outline mr-sm text-[20px]">phone</span>
                <input
                  type="text"
                  className="w-full bg-transparent border-none focus:ring-0 font-body-md text-body-md text-on-surface placeholder:text-outline p-0"
                  placeholder="08123456789"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-sm">
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">Password</label>
              <div className="flex items-center bg-surface-gray rounded-lg px-md py-sm border border-border-subtle focus-within:border-trust-navy transition-colors">
                <span className="material-symbols-outlined text-outline mr-sm text-[20px]">lock</span>
                <input
                  type="password"
                  className="w-full bg-transparent border-none focus:ring-0 font-body-md text-body-md text-on-surface placeholder:text-outline p-0"
                  placeholder="Minimal 6 karakter"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
            </div>

            <div className="flex flex-col gap-sm">
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">Daftar Sebagai</label>
              <div className="grid grid-cols-1 gap-sm">
                {roleOptions.map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setRole(opt.value)}
                    className={`flex items-center gap-md p-md rounded-lg border transition-colors text-left ${
                      role === opt.value
                        ? 'border-trust-navy bg-surface-container-low'
                        : 'border-border-subtle bg-surface-gray hover:border-trust-navy'
                    }`}
                  >
                    <span className={`material-symbols-outlined text-[24px] ${role === opt.value ? 'text-trust-navy' : 'text-outline'}`}>
                      {opt.icon}
                    </span>
                    <div>
                      <div className={`font-body-sm text-body-sm font-semibold ${role === opt.value ? 'text-trust-navy' : 'text-on-surface'}`}>
                        {opt.label}
                      </div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">{opt.desc}</div>
                    </div>
                    {role === opt.value && (
                      <span className="material-symbols-outlined text-trust-navy ml-auto" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-trust-navy text-on-primary font-body-md text-body-md font-bold py-md rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-sm"
            >
              <span className="material-symbols-outlined text-[20px]">person_add</span>
              Daftar
            </button>
          </form>

          {/* Footer */}
          <div className="mt-xl text-center border-t border-border-subtle pt-lg">
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Sudah punya akun?{' '}
              <Link to="/login" className="text-trust-navy font-semibold hover:underline">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
