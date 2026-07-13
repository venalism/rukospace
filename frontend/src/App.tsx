import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Search from './pages/Search'
import PropertyDetail from './pages/PropertyDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import DashboardOwner from './pages/DashboardOwner'
import DashboardTenant from './pages/DashboardTenant'
import DashboardAdmin from './pages/DashboardAdmin'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-surface-gray text-on-surface font-body-md antialiased">
        {/* Navigation */}
        <header className="fixed top-0 w-full z-50 flex justify-between items-center px-lg py-md max-w-container-max mx-auto bg-surface border-b border-border-subtle shadow-sm left-0 right-0">
          <div className="flex items-center gap-xl">
            <Link className="font-title-md text-title-md font-bold text-trust-navy" to="/">RukoSpace</Link>
            <nav className="hidden md:flex gap-lg">
              <Link className="text-trust-navy border-b-2 border-trust-navy pb-1 font-body-md" to="/">For Tenants</Link>
              <Link className="text-on-surface-variant hover:text-trust-navy transition-colors font-body-md" to="/">For Landlords</Link>
              <Link className="text-on-surface-variant hover:text-trust-navy transition-colors font-body-md" to="/search">List Property</Link>
            </nav>
          </div>
          <div className="flex items-center gap-md">
            <Link to="/login" className="text-trust-navy font-body-md font-semibold hover:text-trust-navy transition-colors">Login</Link>
            <Link to="/register" className="bg-trust-navy text-on-primary px-md py-sm rounded-lg font-body-md font-bold hover:opacity-90 transition-opacity">Register</Link>
          </div>
        </header>

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
