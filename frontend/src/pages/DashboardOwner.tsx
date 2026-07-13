import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom'

export default function DashboardOwner() {
  const { user } = useAuthStore()
  const navigate = useNavigate()

  if (!user || (user.role !== 'owner' && user.role !== 'agent')) {
    return <div className="p-3xl text-center text-error-red font-body-md">Unauthorized access. Please login as an Owner.</div>
  }

  const handleLogout = () => {
    useAuthStore.getState().logout()
    navigate('/login')
  }

  return (
    <div className="pt-[73px] flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 hidden lg:flex flex-col bg-surface-container-lowest border-r border-border-subtle pt-xl px-md gap-sm sticky top-[73px] h-[calc(100vh-73px)]">
        <div className="font-label-caps text-label-caps text-outline mb-sm px-md">MANAGEMENT</div>
        <a className="flex items-center gap-md px-md py-sm bg-surface-container-low text-trust-navy rounded-lg font-technical-data text-technical-data" href="#">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
          Dashboard
        </a>
        <a className="flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-container-low hover:text-trust-navy rounded-lg transition-colors font-technical-data text-technical-data" href="#">
          <span className="material-symbols-outlined">domain</span>
          My Properties
        </a>
        <a className="flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-container-low hover:text-trust-navy rounded-lg transition-colors font-technical-data text-technical-data" href="#">
          <span className="material-symbols-outlined">analytics</span>
          Analytics
        </a>
        <a className="flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-container-low hover:text-trust-navy rounded-lg transition-colors font-technical-data text-technical-data" href="#">
          <span className="material-symbols-outlined">receipt_long</span>
          Transactions
        </a>
        <div className="font-label-caps text-label-caps text-outline mt-lg mb-sm px-md">ACCOUNT</div>
        <a className="flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-container-low hover:text-trust-navy rounded-lg transition-colors font-technical-data text-technical-data" href="#">
          <span className="material-symbols-outlined">settings</span>
          Settings
        </a>
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
          {/* Card 1 - Revenue */}
          <div className="bg-surface-container-lowest border border-border-subtle rounded-xl p-lg hover-elevate relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-md opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-[64px] text-trust-navy">payments</span>
            </div>
            <div className="font-technical-data text-technical-data text-on-surface-variant flex items-center gap-xs">
              <span className="material-symbols-outlined text-[16px]">monitoring</span> Projected Revenue
            </div>
            <div className="font-display-lg text-display-lg text-trust-navy mt-md">Rp 0</div>
            <div className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-xs mt-sm">
              <span className="material-symbols-outlined text-[14px]">info</span> No data yet
            </div>
          </div>
          {/* Card 2 - QR Scans */}
          <div className="bg-surface-container-lowest border border-border-subtle rounded-xl p-lg hover-elevate relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-md opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-[64px] text-action-amber">qr_code</span>
            </div>
            <div className="font-technical-data text-technical-data text-on-surface-variant flex items-center gap-xs">
              <span className="material-symbols-outlined text-[16px]">visibility</span> Total On-site Scans
            </div>
            <div className="font-display-lg text-display-lg text-trust-navy mt-md">0</div>
            <div className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-xs mt-sm">
              <span className="material-symbols-outlined text-[14px]">location_on</span> Across 0 properties
            </div>
          </div>
          {/* Card 3 - Active Bookings */}
          <div className="bg-trust-navy rounded-xl p-lg hover-elevate relative overflow-hidden group text-on-primary">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at right, #ffffff 0%, transparent 70%)' }}></div>
            <div className="absolute top-0 right-0 p-md opacity-20 group-hover:opacity-40 transition-opacity">
              <span className="material-symbols-outlined text-[64px]">event_available</span>
            </div>
            <div className="font-technical-data text-technical-data text-primary-fixed flex items-center gap-xs relative z-10">
              <span className="material-symbols-outlined text-[16px]">calendar_month</span> Active Bookings
            </div>
            <div className="font-display-lg text-display-lg mt-md relative z-10">0</div>
            <div className="font-body-sm text-body-sm text-primary-fixed-dim flex items-center gap-xs mt-sm relative z-10">
              <span className="material-symbols-outlined text-[14px]">schedule</span> No surveys scheduled
            </div>
          </div>
        </div>

        {/* Lower Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
          {/* Left Col: Property Management */}
          <div className="lg:col-span-2 flex flex-col gap-lg">
            <div className="flex justify-between items-center border-b border-border-subtle pb-sm">
              <h2 className="font-title-md text-title-md text-trust-navy">Recent Properties</h2>
              <a className="font-technical-data text-technical-data text-trust-navy hover:underline" href="#">View All</a>
            </div>

            {/* Empty State */}
            <div className="bg-surface-container-lowest border border-border-subtle rounded-xl p-2xl flex flex-col items-center justify-center text-center gap-md">
              <span className="material-symbols-outlined text-[48px] text-outline">domain_add</span>
              <h3 className="font-title-md text-title-md text-on-surface-variant">No Properties Yet</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant max-w-[384px]">Start by adding your first property listing. Click the button above to generate a QR code for your property.</p>
              <button className="bg-trust-navy text-on-primary font-label-caps text-label-caps px-lg py-sm rounded-lg hover:opacity-90 transition-opacity mt-md">
                ADD FIRST PROPERTY
              </button>
            </div>
          </div>

          {/* Right Col: Widgets */}
          <div className="flex flex-col gap-xl">
            {/* Calendar Widget */}
            <div className="bg-surface-container-lowest border border-border-subtle rounded-xl p-lg hover-elevate">
              <h2 className="font-title-md text-title-md text-trust-navy border-b border-border-subtle pb-sm mb-md flex items-center gap-sm">
                <span className="material-symbols-outlined">event</span> Upcoming Visits
              </h2>
              <div className="flex flex-col items-center justify-center py-xl text-center">
                <span className="material-symbols-outlined text-[32px] text-outline mb-sm">event_busy</span>
                <p className="font-body-sm text-body-sm text-on-surface-variant">No upcoming visits scheduled.</p>
              </div>
            </div>

            {/* Digital Contract Widget */}
            <div className="bg-surface-container-lowest border border-border-subtle rounded-xl p-lg hover-elevate">
              <h2 className="font-title-md text-title-md text-trust-navy border-b border-border-subtle pb-sm mb-md flex items-center gap-sm">
                <span className="material-symbols-outlined">history_edu</span> Digital Contracts (SPSM)
              </h2>
              <div className="flex flex-col items-center justify-center py-xl text-center">
                <span className="material-symbols-outlined text-[32px] text-outline mb-sm">description</span>
                <p className="font-body-sm text-body-sm text-on-surface-variant">No active contracts.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
