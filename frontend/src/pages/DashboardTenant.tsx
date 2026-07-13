import { useState, useEffect } from 'react'
import { useAuthStore } from '../store/authStore'
import { useNavigate, Link } from 'react-router-dom'

export default function DashboardTenant() {
  const { user, token } = useAuthStore()
  const navigate = useNavigate()
  const [bookings, setBookings] = useState<any[]>([])

  useEffect(() => {
    if (token && user?.role === 'tenant') {
      fetch(`${import.meta.env.VITE_API_URL}/bookings/mine`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => setBookings(Array.isArray(data) ? data : []))
      .catch(err => console.error(err))
    }
  }, [token, user])

  if (!user || user.role !== 'tenant') {
    return <div className="p-3xl text-center text-error-red font-body-md">Unauthorized access. Please login as a Tenant.</div>
  }

  const handleLogout = () => {
    useAuthStore.getState().logout()
    navigate('/login')
  }

  return (
    <main className="max-w-container-max mx-auto px-margin-mobile md:px-gutter pt-[104px] pb-3xl min-h-screen">
      {/* Welcome Header */}
      <header className="mb-xl flex flex-col md:flex-row md:justify-between md:items-end gap-md">
        <div>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface mb-xs">
            Welcome back, {user.full_name || 'Tenant'}!
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Here is an overview of your active rentals and upcoming activities.
          </p>
        </div>
        <Link
          to="/search"
          className="bg-action-amber text-trust-navy font-label-caps text-label-caps font-bold px-lg py-md rounded-lg flex items-center gap-sm hover:shadow-[0px_10px_15px_-3px_rgba(15,76,129,0.1)] transition-all"
        >
          <span className="material-symbols-outlined">search</span>
          Search more properties
        </Link>
        <button
          onClick={handleLogout}
          className="border border-error-red text-error-red font-label-caps text-label-caps px-md py-md rounded-lg flex items-center gap-sm hover:bg-error-container transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
          Logout
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Left Column: Active Rentals & Upcoming Surveys */}
        <div className="lg:col-span-8 flex flex-col gap-xl">
          {/* My Active Rentals */}
          <section>
            <h2 className="font-title-md text-title-md text-trust-navy mb-md flex items-center gap-sm">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>store</span>
              My Active Rentals
            </h2>
            <div className="bg-surface-container-lowest border border-border-subtle rounded-xl p-2xl flex flex-col items-center justify-center text-center gap-md">
              <span className="material-symbols-outlined text-[48px] text-outline">store</span>
              <h3 className="font-title-md text-title-md text-on-surface-variant">No Active Rentals</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant max-w-[384px]">
                You don't have any active rental properties yet. Browse available properties to get started.
              </p>
              <Link
                to="/search"
                className="bg-trust-navy text-on-primary font-label-caps text-label-caps px-lg py-sm rounded-lg hover:opacity-90 transition-opacity mt-md"
              >
                BROWSE PROPERTIES
              </Link>
            </div>
          </section>

          {/* Upcoming Surveys */}
          <section>
            <h2 className="font-title-md text-title-md text-trust-navy mb-md flex items-center gap-sm">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>event</span>
              Upcoming Surveys
            </h2>
            <div className="bg-surface-container-lowest border border-border-subtle rounded-xl p-lg flex flex-col gap-md">
              {bookings.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-xl text-center gap-sm">
                  <span className="material-symbols-outlined text-[32px] text-outline">event_busy</span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">No upcoming surveys scheduled.</p>
                </div>
              ) : (
                bookings.map(b => {
                  const date = new Date(b.RequestedDatetime)
                  const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
                  return (
                    <div key={b.ID} className="flex flex-col sm:flex-row sm:items-center justify-between p-md bg-surface-gray rounded-lg border border-border-subtle gap-md">
                      <div className="flex items-start gap-md">
                        <div className="bg-surface-container text-trust-navy p-md rounded-lg flex flex-col items-center justify-center min-w-[70px]">
                          <span className="font-label-caps text-label-caps">{months[date.getMonth()]}</span>
                          <span className="font-headline-lg-mobile text-headline-lg-mobile text-trust-navy">{date.getDate()}</span>
                        </div>
                        <div>
                          <h4 className="font-title-md text-title-md text-on-surface mb-xs">Property #{b.PropertyID}</h4>
                          <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-xs mb-sm">
                            <span className="material-symbols-outlined text-[16px]">schedule</span>
                            {date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                          </p>
                          <span className={`px-sm py-xs rounded font-label-caps text-label-caps ${
                            b.Status === 'approved'
                              ? 'bg-[#D1FAE5] text-[#065F46]'
                              : b.Status === 'rejected'
                              ? 'bg-error-container text-on-error-container'
                              : 'bg-surface-container border border-surface-tint text-surface-tint'
                          }`}>
                            {b.Status?.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-sm sm:flex-col">
                        <button className="flex-1 border border-border-subtle text-on-surface-variant font-label-caps text-label-caps px-md py-sm rounded hover:bg-surface-container transition-colors text-center">
                          Cancel
                        </button>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </section>
        </div>

        {/* Right Column: Quick Stats & Payment History */}
        <div className="lg:col-span-4 flex flex-col gap-xl">
          {/* Quick Stats */}
          <section className="grid grid-cols-2 gap-md">
            <div className="bg-surface-container-lowest border border-border-subtle rounded-xl p-md flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-trust-navy text-[32px] mb-sm" style={{ fontVariationSettings: "'FILL' 1" }}>domain</span>
              <span className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">0</span>
              <span className="font-label-caps text-label-caps text-on-surface-variant">Active Properties</span>
            </div>
            <div className="bg-surface-container-lowest border border-border-subtle rounded-xl p-md flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-success-teal text-[32px] mb-sm" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
              <span className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">0</span>
              <span className="font-label-caps text-label-caps text-on-surface-variant">Pending Invoices</span>
            </div>
          </section>

          {/* Payment History */}
          <section>
            <div className="flex justify-between items-center mb-md">
              <h2 className="font-title-md text-title-md text-trust-navy flex items-center gap-sm">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>receipt_long</span>
                Recent Payments
              </h2>
              <a className="font-label-caps text-label-caps text-trust-navy hover:underline" href="#">View All</a>
            </div>
            <div className="bg-surface-container-lowest border border-border-subtle rounded-xl overflow-hidden">
              <div className="flex flex-col items-center justify-center py-2xl text-center gap-sm">
                <span className="material-symbols-outlined text-[32px] text-outline">receipt</span>
                <p className="font-body-sm text-body-sm text-on-surface-variant">No payment history yet.</p>
              </div>
            </div>
          </section>

          {/* Support Card */}
          <section className="bg-surface-container border border-surface-tint rounded-xl p-lg flex items-start gap-md mt-auto">
            <span className="material-symbols-outlined text-surface-tint text-[32px]">support_agent</span>
            <div>
              <h3 className="font-title-md text-title-md text-trust-navy mb-xs">Need Assistance?</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-md">Our support team is ready to help with maintenance requests or lease inquiries.</p>
              <button className="border border-surface-tint text-surface-tint font-label-caps text-label-caps px-md py-sm rounded hover:bg-surface-tint hover:text-on-primary transition-colors">
                Contact Support
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
