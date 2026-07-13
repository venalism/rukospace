import { useState, useEffect } from 'react'
import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom'

type TabKey = 'dashboard' | 'properties' | 'analytics' | 'transactions' | 'settings'

interface Property {
  ID: string
  Title: string
  Address: string
  PricePerMonth: number
  AreaSqm: number
  ListingStatus: string
  LegalityStatus: string
  CreatedAt: string
  ElectricityPowerWatt: number
  WaterSource: string
  ParkingSpaces: number
  ZoningType: string
}

interface Booking {
  ID: string
  PropertyID: string
  TenantID: string
  RequestedDatetime: string
  Status: string
  Notes: string
  CreatedAt: string
}

export default function DashboardOwner() {
  const { user, token } = useAuthStore()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<TabKey>('dashboard')
  const [properties, setProperties] = useState<Property[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(false)

  if (!user || (user.role !== 'owner' && user.role !== 'agent')) {
    return <div className="p-3xl text-center text-error-red font-body-md">Unauthorized access. Please login as an Owner.</div>
  }

  const apiBase = import.meta.env.VITE_API_URL
  const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }

  const fetchData = async (tab: TabKey) => {
    setLoading(true)
    try {
      if (tab === 'dashboard' || tab === 'properties' || tab === 'analytics') {
        const [propRes, bookRes] = await Promise.all([
          fetch(`${apiBase}/properties`, { headers }),
          fetch(`${apiBase}/bookings/received`, { headers }),
        ])
        if (propRes.ok) {
          const allProps = await propRes.json()
          // Filter properties owned by this user
          setProperties(Array.isArray(allProps) ? allProps : [])
        }
        if (bookRes.ok) {
          const allBookings = await bookRes.json()
          setBookings(Array.isArray(allBookings) ? allBookings : [])
        }
      } else if (tab === 'transactions') {
        const bookRes = await fetch(`${apiBase}/bookings/received`, { headers })
        if (bookRes.ok) {
          const allBookings = await bookRes.json()
          setBookings(Array.isArray(allBookings) ? allBookings : [])
        }
      }
    } catch (err) {
      console.error('Failed to fetch data:', err)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchData(activeTab)
  }, [activeTab])

  const handleLogout = () => {
    useAuthStore.getState().logout()
    navigate('/login')
  }

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      'active': 'bg-success-teal/10 text-success-teal border border-success-teal/20',
      'verified': 'bg-success-teal/10 text-success-teal border border-success-teal/20',
      'pending_verification': 'bg-action-amber/10 text-action-amber border border-action-amber/20',
      'pending': 'bg-action-amber/10 text-action-amber border border-action-amber/20',
      'draft': 'bg-outline/10 text-outline border border-outline/20',
      'rejected': 'bg-error-red/10 text-error-red border border-error-red/20',
      'approved': 'bg-success-teal/10 text-success-teal border border-success-teal/20',
      'completed': 'bg-trust-navy/10 text-trust-navy border border-trust-navy/20',
    }
    return styles[status] || 'bg-outline/10 text-outline border border-outline/20'
  }

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `Rp ${(price / 1000000).toLocaleString('id-ID')} jt`
    } else if (price >= 1000) {
      return `Rp ${(price / 1000).toLocaleString('id-ID')} rb`
    }
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price)
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  const sidebarItems: { key: TabKey; icon: string; label: string; section?: string }[] = [
    { key: 'dashboard', icon: 'dashboard', label: 'Dashboard', section: 'MANAGEMENT' },
    { key: 'properties', icon: 'domain', label: 'My Properties' },
    { key: 'analytics', icon: 'analytics', label: 'Analytics' },
    { key: 'transactions', icon: 'receipt_long', label: 'Transactions' },
    { key: 'settings', icon: 'settings', label: 'Settings', section: 'ACCOUNT' },
  ]

  const activeProperties = properties.filter(p => p.ListingStatus === 'active')
  const pendingProperties = properties.filter(p => p.ListingStatus === 'pending_verification')
  const pendingBookings = bookings.filter(b => b.Status === 'pending')
  const totalRevenue = activeProperties.reduce((sum, p) => sum + p.PricePerMonth, 0)

  // ============ TAB CONTENT RENDERERS ============

  const renderDashboard = () => (
    <>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-xl gap-md">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-trust-navy">Welcome back, {user.full_name || 'Owner'}</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-xs">Here is what's happening with your properties today.</p>
        </div>
        <button className="flex items-center gap-sm bg-action-amber text-on-surface px-lg py-md rounded-lg hover-elevate font-label-caps text-label-caps transition-all">
          <span className="material-symbols-outlined">qr_code_scanner</span>
          GENERATE QR FOR NEW LISTING
        </button>
      </div>

      {/* Analytics Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-lg mb-2xl">
        <div className="bg-surface-container-lowest border border-border-subtle rounded-xl p-lg hover-elevate relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-md opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-[64px] text-trust-navy">payments</span>
          </div>
          <div className="font-technical-data text-technical-data text-on-surface-variant flex items-center gap-xs">
            <span className="material-symbols-outlined text-[16px]">monitoring</span> Projected Revenue
          </div>
          <div className="font-display-lg text-display-lg text-trust-navy mt-md truncate" title={formatPrice(totalRevenue)}>{formatPrice(totalRevenue)}</div>
          <div className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-xs mt-sm">
            <span className="material-symbols-outlined text-[14px]">info</span> {activeProperties.length > 0 ? `From ${activeProperties.length} active properties` : 'No data yet'}
          </div>
        </div>
        <div className="bg-surface-container-lowest border border-border-subtle rounded-xl p-lg hover-elevate relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-md opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-[64px] text-action-amber">domain</span>
          </div>
          <div className="font-technical-data text-technical-data text-on-surface-variant flex items-center gap-xs">
            <span className="material-symbols-outlined text-[16px]">domain</span> Total Properties
          </div>
          <div className="font-display-lg text-display-lg text-trust-navy mt-md">{properties.length}</div>
          <div className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-xs mt-sm">
            <span className="material-symbols-outlined text-[14px]">location_on</span> {activeProperties.length} active, {pendingProperties.length} pending
          </div>
        </div>
        <div className="bg-trust-navy rounded-xl p-lg hover-elevate relative overflow-hidden group text-on-primary">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at right, #ffffff 0%, transparent 70%)' }}></div>
          <div className="absolute top-0 right-0 p-md opacity-20 group-hover:opacity-40 transition-opacity">
            <span className="material-symbols-outlined text-[64px]">event_available</span>
          </div>
          <div className="font-technical-data text-technical-data text-primary-fixed flex items-center gap-xs relative z-10">
            <span className="material-symbols-outlined text-[16px]">calendar_month</span> Active Bookings
          </div>
          <div className="font-display-lg text-display-lg mt-md relative z-10">{pendingBookings.length}</div>
          <div className="font-body-sm text-body-sm text-primary-fixed-dim flex items-center gap-xs mt-sm relative z-10">
            <span className="material-symbols-outlined text-[14px]">schedule</span> {pendingBookings.length > 0 ? `${pendingBookings.length} surveys pending` : 'No surveys scheduled'}
          </div>
        </div>
      </div>

      {/* Lower Section Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
        <div className="lg:col-span-2 flex flex-col gap-lg">
          <div className="flex justify-between items-center border-b border-border-subtle pb-sm">
            <h2 className="font-title-md text-title-md text-trust-navy">Recent Properties</h2>
            <button onClick={() => setActiveTab('properties')} className="font-technical-data text-technical-data text-trust-navy hover:underline">View All</button>
          </div>

          {properties.length === 0 ? (
            <div className="bg-surface-container-lowest border border-border-subtle rounded-xl p-2xl flex flex-col items-center justify-center text-center gap-md">
              <span className="material-symbols-outlined text-[48px] text-outline">domain_add</span>
              <h3 className="font-title-md text-title-md text-on-surface-variant">No Properties Yet</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant max-w-[384px]">Start by adding your first property listing. Click the button above to generate a QR code for your property.</p>
              <button className="bg-trust-navy text-on-primary font-label-caps text-label-caps px-lg py-sm rounded-lg hover:opacity-90 transition-opacity mt-md">
                ADD FIRST PROPERTY
              </button>
            </div>
          ) : (
            <div className="bg-surface-container-lowest border border-border-subtle rounded-xl overflow-hidden">
              {properties.slice(0, 5).map((prop) => (
                <div key={prop.ID} className="px-lg py-md flex items-center justify-between border-b border-border-subtle last:border-b-0 hover:bg-surface-gray/50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="font-body-md text-on-surface font-semibold truncate">{prop.Title}</div>
                    <div className="font-body-sm text-on-surface-variant truncate">{prop.Address}</div>
                  </div>
                  <div className="flex items-center gap-md ml-md">
                    <span className="font-body-sm text-on-surface font-semibold">{formatPrice(prop.PricePerMonth)}/mo</span>
                    <span className={`inline-block px-sm py-xs rounded-md font-label-caps text-label-caps whitespace-nowrap ${getStatusBadge(prop.ListingStatus)}`}>
                      {prop.ListingStatus.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Col: Widgets */}
        <div className="flex flex-col gap-xl">
          <div className="bg-surface-container-lowest border border-border-subtle rounded-xl p-lg hover-elevate">
            <h2 className="font-title-md text-title-md text-trust-navy border-b border-border-subtle pb-sm mb-md flex items-center gap-sm">
              <span className="material-symbols-outlined">event</span> Upcoming Visits
            </h2>
            {pendingBookings.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-xl text-center">
                <span className="material-symbols-outlined text-[32px] text-outline mb-sm">event_busy</span>
                <p className="font-body-sm text-body-sm text-on-surface-variant">No upcoming visits scheduled.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-sm">
                {pendingBookings.slice(0, 3).map((b) => (
                  <div key={b.ID} className="flex items-center justify-between py-sm border-b border-border-subtle last:border-b-0">
                    <div>
                      <div className="font-body-sm text-on-surface">{formatDate(b.RequestedDatetime)}</div>
                      <div className="font-body-sm text-on-surface-variant text-[12px]">{b.Notes || 'No notes'}</div>
                    </div>
                    <span className={`px-sm py-xs rounded-md font-label-caps text-label-caps ${getStatusBadge(b.Status)}`}>
                      {b.Status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )

  const renderMyProperties = () => (
    <div className="flex flex-col gap-lg">
      <div className="flex justify-between items-center border-b border-border-subtle pb-sm">
        <h2 className="font-title-md text-title-md text-trust-navy flex items-center gap-sm">
          <span className="material-symbols-outlined">domain</span>
          My Properties
        </h2>
        <span className="font-label-caps text-label-caps text-on-surface-variant">{properties.length} TOTAL</span>
      </div>

      <div className="bg-surface-container-lowest border border-border-subtle rounded-xl overflow-hidden">
        <div className="bg-surface-gray border-b border-border-subtle px-lg py-md grid grid-cols-6 gap-md">
          <span className="font-label-caps text-label-caps text-on-surface-variant col-span-2">PROPERTY</span>
          <span className="font-label-caps text-label-caps text-on-surface-variant">PRICE/MO</span>
          <span className="font-label-caps text-label-caps text-on-surface-variant">AREA</span>
          <span className="font-label-caps text-label-caps text-on-surface-variant">STATUS</span>
          <span className="font-label-caps text-label-caps text-on-surface-variant">DETAILS</span>
        </div>
        {properties.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-2xl text-center gap-sm">
            <span className="material-symbols-outlined text-[48px] text-outline">domain_add</span>
            <p className="font-body-md text-body-md text-on-surface-variant">You haven't listed any properties yet.</p>
            <button className="bg-trust-navy text-on-primary font-label-caps text-label-caps px-lg py-sm rounded-lg hover:opacity-90 transition-opacity mt-sm">
              ADD PROPERTY
            </button>
          </div>
        ) : (
          properties.map((prop) => (
            <div key={prop.ID} className="px-lg py-md grid grid-cols-6 gap-md border-b border-border-subtle last:border-b-0 items-center hover:bg-surface-gray/50 transition-colors">
              <div className="col-span-2">
                <div className="font-body-md text-on-surface font-semibold truncate">{prop.Title}</div>
                <div className="font-body-sm text-on-surface-variant truncate">{prop.Address}</div>
              </div>
              <div className="font-body-sm text-on-surface font-semibold">{formatPrice(prop.PricePerMonth)}</div>
              <div className="font-body-sm text-on-surface">{prop.AreaSqm} m²</div>
              <div>
                <span className={`inline-block px-sm py-xs rounded-md font-label-caps text-label-caps ${getStatusBadge(prop.ListingStatus)}`}>
                  {prop.ListingStatus.replace('_', ' ')}
                </span>
              </div>
              <div className="flex gap-xs">
                <span className="material-symbols-outlined text-[16px] text-outline" title={`${prop.ElectricityPowerWatt || 0}W`}>bolt</span>
                <span className="material-symbols-outlined text-[16px] text-outline" title={`${prop.ParkingSpaces} spots`}>local_parking</span>
                <span className="material-symbols-outlined text-[16px] text-outline" title={prop.ZoningType || '-'}>map</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )

  const renderAnalytics = () => (
    <div className="flex flex-col gap-xl">
      <div className="border-b border-border-subtle pb-sm">
        <h2 className="font-title-md text-title-md text-trust-navy flex items-center gap-sm">
          <span className="material-symbols-outlined">analytics</span>
          Property Analytics
        </h2>
      </div>

      {/* Revenue Summary */}
      <div className="bg-trust-navy rounded-xl p-xl text-on-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at right, #ffffff 0%, transparent 70%)' }}></div>
        <div className="relative z-10">
          <h3 className="font-title-md text-title-md mb-md flex items-center gap-sm">
            <span className="material-symbols-outlined">insights</span>
            Revenue Overview
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-lg">
            <div className="min-w-0">
              <div className="font-display-lg text-display-lg truncate" title={formatPrice(totalRevenue)}>{formatPrice(totalRevenue)}</div>
              <div className="font-body-sm text-primary-fixed truncate">Projected Monthly</div>
            </div>
            <div className="min-w-0">
              <div className="font-display-lg text-display-lg truncate" title={String(properties.length)}>{properties.length}</div>
              <div className="font-body-sm text-primary-fixed truncate">Total Properties</div>
            </div>
            <div className="min-w-0">
              <div className="font-display-lg text-display-lg truncate" title={String(activeProperties.length)}>{activeProperties.length}</div>
              <div className="font-body-sm text-primary-fixed truncate">Active Listings</div>
            </div>
            <div className="min-w-0">
              <div className="font-display-lg text-display-lg truncate" title={String(bookings.length)}>{bookings.length}</div>
              <div className="font-body-sm text-primary-fixed truncate">Total Bookings</div>
            </div>
          </div>
        </div>
      </div>

      {/* Property Status Breakdown */}
      <div>
        <h3 className="font-body-md text-on-surface-variant font-semibold mb-md flex items-center gap-sm">
          <span className="material-symbols-outlined text-[18px]">domain</span>
          Property Status Breakdown
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-lg">
          <div className="bg-surface-container-lowest border border-border-subtle rounded-xl p-lg hover-elevate text-center">
            <div className="font-display-lg text-display-lg text-success-teal">{activeProperties.length}</div>
            <div className="font-technical-data text-technical-data text-on-surface-variant mt-xs">Active</div>
          </div>
          <div className="bg-surface-container-lowest border border-border-subtle rounded-xl p-lg hover-elevate text-center">
            <div className="font-display-lg text-display-lg text-action-amber">{pendingProperties.length}</div>
            <div className="font-technical-data text-technical-data text-on-surface-variant mt-xs">Pending Verification</div>
          </div>
          <div className="bg-surface-container-lowest border border-border-subtle rounded-xl p-lg hover-elevate text-center">
            <div className="font-display-lg text-display-lg text-outline">{properties.filter(p => p.ListingStatus === 'draft').length}</div>
            <div className="font-technical-data text-technical-data text-on-surface-variant mt-xs">Draft</div>
          </div>
          <div className="bg-surface-container-lowest border border-border-subtle rounded-xl p-lg hover-elevate text-center">
            <div className="font-display-lg text-display-lg text-error-red">{properties.filter(p => p.ListingStatus === 'rejected').length}</div>
            <div className="font-technical-data text-technical-data text-on-surface-variant mt-xs">Rejected</div>
          </div>
        </div>
      </div>

      {/* Booking Stats */}
      <div>
        <h3 className="font-body-md text-on-surface-variant font-semibold mb-md flex items-center gap-sm">
          <span className="material-symbols-outlined text-[18px]">calendar_month</span>
          Booking Statistics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
          <div className="bg-surface-container-lowest border border-border-subtle rounded-xl p-lg hover-elevate text-center">
            <div className="font-display-lg text-display-lg text-action-amber">{pendingBookings.length}</div>
            <div className="font-technical-data text-technical-data text-on-surface-variant mt-xs">Pending Surveys</div>
          </div>
          <div className="bg-surface-container-lowest border border-border-subtle rounded-xl p-lg hover-elevate text-center">
            <div className="font-display-lg text-display-lg text-success-teal">{bookings.filter(b => b.Status === 'approved').length}</div>
            <div className="font-technical-data text-technical-data text-on-surface-variant mt-xs">Approved</div>
          </div>
          <div className="bg-surface-container-lowest border border-border-subtle rounded-xl p-lg hover-elevate text-center">
            <div className="font-display-lg text-display-lg text-trust-navy">{bookings.filter(b => b.Status === 'completed').length}</div>
            <div className="font-technical-data text-technical-data text-on-surface-variant mt-xs">Completed</div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderTransactions = () => (
    <div className="flex flex-col gap-lg">
      <div className="flex justify-between items-center border-b border-border-subtle pb-sm">
        <h2 className="font-title-md text-title-md text-trust-navy flex items-center gap-sm">
          <span className="material-symbols-outlined">receipt_long</span>
          Survey Bookings
        </h2>
        <span className="font-label-caps text-label-caps text-on-surface-variant">{bookings.length} TOTAL</span>
      </div>

      <div className="bg-surface-container-lowest border border-border-subtle rounded-xl overflow-hidden">
        <div className="bg-surface-gray border-b border-border-subtle px-lg py-md grid grid-cols-5 gap-md">
          <span className="font-label-caps text-label-caps text-on-surface-variant">BOOKING ID</span>
          <span className="font-label-caps text-label-caps text-on-surface-variant">SCHEDULED</span>
          <span className="font-label-caps text-label-caps text-on-surface-variant">NOTES</span>
          <span className="font-label-caps text-label-caps text-on-surface-variant">STATUS</span>
          <span className="font-label-caps text-label-caps text-on-surface-variant text-right">ACTION</span>
        </div>
        {bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-2xl text-center gap-sm">
            <span className="material-symbols-outlined text-[48px] text-outline">event_busy</span>
            <p className="font-body-md text-body-md text-on-surface-variant">No bookings received yet.</p>
            <p className="font-body-sm text-body-sm text-outline">Bookings will appear here when tenants schedule surveys.</p>
          </div>
        ) : (
          bookings.map((booking) => (
            <div key={booking.ID} className="px-lg py-md grid grid-cols-5 gap-md border-b border-border-subtle last:border-b-0 items-center hover:bg-surface-gray/50 transition-colors">
              <div className="font-body-sm text-on-surface font-mono truncate">{booking.ID.slice(0, 8)}...</div>
              <div className="font-body-sm text-on-surface">{formatDate(booking.RequestedDatetime)}</div>
              <div className="font-body-sm text-on-surface-variant truncate">{booking.Notes || '-'}</div>
              <div>
                <span className={`inline-block px-sm py-xs rounded-md font-label-caps text-label-caps ${getStatusBadge(booking.Status)}`}>
                  {booking.Status}
                </span>
              </div>
              <div className="flex justify-end gap-sm">
                {booking.Status === 'pending' && (
                  <>
                    <button
                      onClick={async () => {
                        await fetch(`${apiBase}/bookings/${booking.ID}/status`, {
                          method: 'PATCH', headers, body: JSON.stringify({ status: 'approved' })
                        })
                        fetchData('transactions')
                      }}
                      className="px-md py-xs bg-success-teal text-on-primary rounded-lg font-body-sm font-bold hover:opacity-90 transition-opacity"
                    >Approve</button>
                    <button
                      onClick={async () => {
                        await fetch(`${apiBase}/bookings/${booking.ID}/status`, {
                          method: 'PATCH', headers, body: JSON.stringify({ status: 'rejected' })
                        })
                        fetchData('transactions')
                      }}
                      className="px-md py-xs bg-error-red text-on-primary rounded-lg font-body-sm font-bold hover:opacity-90 transition-opacity"
                    >Reject</button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )

  const renderSettings = () => (
    <div className="flex flex-col gap-xl">
      <div className="border-b border-border-subtle pb-sm">
        <h2 className="font-title-md text-title-md text-trust-navy flex items-center gap-sm">
          <span className="material-symbols-outlined">settings</span>
          Account Settings
        </h2>
      </div>

      {/* Profile Info */}
      <div className="bg-surface-container-lowest border border-border-subtle rounded-xl p-xl">
        <h3 className="font-body-md text-on-surface font-semibold mb-lg flex items-center gap-sm">
          <span className="material-symbols-outlined text-[20px] text-trust-navy">person</span>
          Profile Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
          <div className="flex flex-col gap-xs">
            <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">Name</label>
            <div className="bg-surface-gray rounded-lg px-md py-sm border border-border-subtle font-body-md text-on-surface">
              {user.full_name}
            </div>
          </div>
          <div className="flex flex-col gap-xs">
            <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">Role</label>
            <div className="bg-surface-gray rounded-lg px-md py-sm border border-border-subtle font-body-md text-on-surface capitalize">
              {user.role}
            </div>
          </div>
        </div>
      </div>

      {/* Property Summary */}
      <div className="bg-surface-container-lowest border border-border-subtle rounded-xl p-xl">
        <h3 className="font-body-md text-on-surface font-semibold mb-lg flex items-center gap-sm">
          <span className="material-symbols-outlined text-[20px] text-trust-navy">domain</span>
          Property Summary
        </h3>
        <div className="flex flex-col gap-md">
          <div className="flex justify-between items-center py-sm border-b border-border-subtle">
            <span className="font-body-md text-on-surface">Total Properties</span>
            <span className="font-body-md text-on-surface font-semibold">{properties.length}</span>
          </div>
          <div className="flex justify-between items-center py-sm border-b border-border-subtle">
            <span className="font-body-md text-on-surface">Active Listings</span>
            <span className="font-body-md text-success-teal font-semibold">{activeProperties.length}</span>
          </div>
          <div className="flex justify-between items-center py-sm">
            <span className="font-body-md text-on-surface">Total Bookings Received</span>
            <span className="font-body-md text-on-surface font-semibold">{bookings.length}</span>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-surface-container-lowest border border-error-red/20 rounded-xl p-xl">
        <h3 className="font-body-md text-error-red font-semibold mb-lg flex items-center gap-sm">
          <span className="material-symbols-outlined text-[20px]">warning</span>
          Danger Zone
        </h3>
        <div className="flex justify-between items-center">
          <div>
            <div className="font-body-md text-on-surface">Logout</div>
            <div className="font-body-sm text-on-surface-variant">Log out from the current session.</div>
          </div>
          <button
            onClick={handleLogout}
            className="px-lg py-sm bg-error-red text-on-primary rounded-lg font-body-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-sm"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            Logout
          </button>
        </div>
      </div>
    </div>
  )

  const tabContent: Record<TabKey, () => JSX.Element> = {
    dashboard: renderDashboard,
    properties: renderMyProperties,
    analytics: renderAnalytics,
    transactions: renderTransactions,
    settings: renderSettings,
  }

  return (
    <div className="pt-[73px] flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 hidden lg:flex flex-col bg-surface-container-lowest border-r border-border-subtle pt-xl px-md gap-sm sticky top-[73px] h-[calc(100vh-73px)]">
        {sidebarItems.map((item, idx) => (
          <div key={item.key}>
            {item.section && (
              <div className={`font-label-caps text-label-caps text-outline mb-sm px-md ${idx > 0 ? 'mt-lg' : ''}`}>
                {item.section}
              </div>
            )}
            <button
              onClick={() => setActiveTab(item.key)}
              className={`w-full flex items-center gap-md px-md py-sm rounded-lg transition-colors font-technical-data text-technical-data text-left ${
                activeTab === item.key
                  ? 'bg-surface-container-low text-trust-navy'
                  : 'text-on-surface-variant hover:bg-surface-container-low hover:text-trust-navy'
              }`}
            >
              <span
                className="material-symbols-outlined"
                style={activeTab === item.key ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {item.icon}
              </span>
              {item.label}
            </button>
          </div>
        ))}

        <button
          onClick={handleLogout}
          className="flex items-center gap-md px-md py-sm text-error-red hover:bg-error-container rounded-lg transition-colors font-technical-data text-technical-data mt-auto mb-xl"
        >
          <span className="material-symbols-outlined">logout</span>
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-lg md:p-xl lg:p-2xl max-w-container-max mx-auto w-full">
        {loading ? (
          <div className="flex items-center justify-center py-3xl">
            <span className="material-symbols-outlined animate-spin text-trust-navy text-[40px]">progress_activity</span>
          </div>
        ) : (
          tabContent[activeTab]()
        )}
      </main>
    </div>
  )
}
