import { useState, useRef, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Search from './pages/Search'
import PropertyDetail from './pages/PropertyDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import DashboardOwner from './pages/DashboardOwner'
import DashboardTenant from './pages/DashboardTenant'
import DashboardAdmin from './pages/DashboardAdmin'
import { useAuthStore } from './store/authStore'

function NavBar() {
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const isDashboard = location.pathname.startsWith('/dashboard')

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleLogout = () => {
    useAuthStore.getState().logout()
    setDropdownOpen(false)
    navigate('/login')
  }

  const getDashboardPath = () => {
    if (!user) return '/login'
    if (user.role === 'admin') return '/dashboard/admin'
    if (user.role === 'owner' || user.role === 'agent') return '/dashboard/owner'
    return '/dashboard/tenant'
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-surface border-b border-border-subtle shadow-sm left-0 right-0">
      <div className="max-w-container-max mx-auto w-full flex justify-between items-center px-lg py-md">
        <div className="flex items-center gap-xl">
          <Link className="font-title-md text-title-md font-bold text-trust-navy" to="/">RukoSpace</Link>
          {/* Hide nav links when on any dashboard */}
          {!isDashboard && (
            <nav className="hidden md:flex gap-lg">
              <Link className={`${location.pathname === '/' ? 'text-trust-navy border-b-2 border-trust-navy' : 'text-on-surface-variant hover:text-trust-navy'} pb-1 transition-colors font-body-md`} to="/">For Tenants</Link>
              <Link className={`${location.pathname === '/search' ? 'text-trust-navy border-b-2 border-trust-navy' : 'text-on-surface-variant hover:text-trust-navy'} pb-1 transition-colors font-body-md`} to="/search">Search Property</Link>
              <Link className={`text-on-surface-variant hover:text-trust-navy pb-1 transition-colors font-body-md`} to={user ? getDashboardPath() : '/login'}>List Property</Link>
            </nav>
          )}
        </div>

        {/* Right side: Auth-aware */}
        {user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-sm bg-surface-container-low hover:bg-surface-gray border border-border-subtle rounded-lg px-md py-sm transition-colors"
            >
              <div className="w-8 h-8 bg-trust-navy rounded-full flex items-center justify-center">
                <span className="text-on-primary font-bold text-[14px]">
                  {user.full_name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
              <span className="font-body-md text-on-surface font-semibold hidden sm:inline">
                Hi, {user.full_name?.split(' ')[0] || 'User'}
              </span>
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                {dropdownOpen ? 'expand_less' : 'expand_more'}
              </span>
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-sm w-56 bg-surface-container-lowest border border-border-subtle rounded-xl shadow-lg overflow-hidden z-50 animate-in fade-in">
                <div className="px-lg py-md border-b border-border-subtle">
                  <div className="font-body-md text-on-surface font-semibold">{user.full_name}</div>
                  <div className="font-body-sm text-on-surface-variant capitalize">{user.role}</div>
                </div>
                <div className="py-xs">
                  <Link
                    to="/"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-md px-lg py-sm hover:bg-surface-container-low transition-colors font-body-md text-on-surface"
                  >
                    <span className="material-symbols-outlined text-[20px]">home</span>
                    Homepage
                  </Link>
                  <Link
                    to={getDashboardPath()}
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-md px-lg py-sm hover:bg-surface-container-low transition-colors font-body-md text-on-surface"
                  >
                    <span className="material-symbols-outlined text-[20px]">dashboard</span>
                    Dashboard
                  </Link>
                </div>
                <div className="border-t border-border-subtle py-xs">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-md px-lg py-sm hover:bg-error-container transition-colors font-body-md text-error-red"
                  >
                    <span className="material-symbols-outlined text-[20px]">logout</span>
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-md">
            <Link to="/login" className="text-trust-navy font-body-md font-semibold hover:text-trust-navy transition-colors">Login</Link>
            <Link to="/register" className="bg-trust-navy text-on-primary px-md py-sm rounded-lg font-body-md font-bold hover:opacity-90 transition-opacity">Register</Link>
          </div>
        )}
      </div>
    </header>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-surface-gray text-on-surface font-body-md antialiased">
        {/* Navigation */}
        <NavBar />

        <main className="flex-1 w-full max-w-container-max mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/properties/:id" element={<PropertyDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes placeholder */}
            <Route path="/dashboard/owner" element={<DashboardOwner />} />
            <Route path="/dashboard/tenant" element={<DashboardTenant />} />
            <Route path="/dashboard/admin" element={<DashboardAdmin />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="w-full py-xl px-lg mt-3xl flex flex-col items-center gap-lg bg-inverse-surface">
          <div className="font-title-md text-title-md font-bold text-primary-fixed">RukoSpace</div>
          <div className="flex flex-wrap justify-center gap-md font-body-sm text-body-sm">
            <Link className="text-surface-variant hover:text-primary-fixed transition-colors" to="/">About Us</Link>
            <Link className="text-surface-variant hover:text-primary-fixed transition-colors" to="/">Contact</Link>
            <Link className="text-surface-variant hover:text-primary-fixed transition-colors" to="/">Privacy Policy</Link>
            <Link className="text-surface-variant hover:text-primary-fixed transition-colors" to="/">Terms of Service</Link>
            <Link className="text-surface-variant hover:text-primary-fixed transition-colors" to="/">Scan QR Code</Link>
          </div>
          <div className="font-body-sm text-body-sm text-surface-variant">© 2024 RukoSpace. All rights reserved.</div>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App

