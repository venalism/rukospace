import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom'

export default function DashboardAdmin() {
  const { user } = useAuthStore()
  const navigate = useNavigate()

  if (!user || user.role !== 'admin') {
    return <div className="p-3xl text-center text-error-red font-body-md">Unauthorized access. Please login as Admin.</div>
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
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>admin_panel_settings</span>
          Verification Queue
        </a>
        <a className="flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-container-low hover:text-trust-navy rounded-lg transition-colors font-technical-data text-technical-data" href="#">
          <span className="material-symbols-outlined">domain</span>
          All Properties
        </a>
        <a className="flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-container-low hover:text-trust-navy rounded-lg transition-colors font-technical-data text-technical-data" href="#">
          <span className="material-symbols-outlined">group</span>
          User Management
        </a>
        <a className="flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-container-low hover:text-trust-navy rounded-lg transition-colors font-technical-data text-technical-data" href="#">
          <span className="material-symbols-outlined">analytics</span>
          Analytics
        </a>
        <div className="font-label-caps text-label-caps text-outline mt-lg mb-sm px-md">SYSTEM</div>
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
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-xl gap-md">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-trust-navy">Admin Dashboard</h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-xs">Manage platform properties, users, and verifications.</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-lg mb-2xl">
          <div className="bg-surface-container-lowest border border-border-subtle rounded-xl p-lg hover-elevate relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-md opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-[48px] text-trust-navy">pending_actions</span>
            </div>
            <div className="font-technical-data text-technical-data text-on-surface-variant flex items-center gap-xs">
              <span className="material-symbols-outlined text-[16px]">pending_actions</span> Pending Verification
            </div>
            <div className="font-display-lg text-display-lg text-action-amber mt-sm">0</div>
          </div>
          <div className="bg-surface-container-lowest border border-border-subtle rounded-xl p-lg hover-elevate relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-md opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-[48px] text-success-teal">verified</span>
            </div>
            <div className="font-technical-data text-technical-data text-on-surface-variant flex items-center gap-xs">
              <span className="material-symbols-outlined text-[16px]">verified</span> Verified Properties
            </div>
            <div className="font-display-lg text-display-lg text-success-teal mt-sm">0</div>
          </div>
          <div className="bg-surface-container-lowest border border-border-subtle rounded-xl p-lg hover-elevate relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-md opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-[48px] text-trust-navy">domain</span>
            </div>
            <div className="font-technical-data text-technical-data text-on-surface-variant flex items-center gap-xs">
              <span className="material-symbols-outlined text-[16px]">domain</span> Total Properties
            </div>
            <div className="font-display-lg text-display-lg text-trust-navy mt-sm">0</div>
          </div>
          <div className="bg-surface-container-lowest border border-border-subtle rounded-xl p-lg hover-elevate relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-md opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-[48px] text-electric-blue">group</span>
            </div>
            <div className="font-technical-data text-technical-data text-on-surface-variant flex items-center gap-xs">
              <span className="material-symbols-outlined text-[16px]">group</span> Total Users
            </div>
            <div className="font-display-lg text-display-lg text-electric-blue mt-sm">0</div>
          </div>
        </div>

        {/* Verification Queue */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
          <div className="lg:col-span-2 flex flex-col gap-lg">
            <div className="flex justify-between items-center border-b border-border-subtle pb-sm">
              <h2 className="font-title-md text-title-md text-trust-navy flex items-center gap-sm">
                <span className="material-symbols-outlined">verified_user</span>
                Verification Queue
              </h2>
              <span className="font-label-caps text-label-caps text-on-surface-variant">0 PENDING</span>
            </div>

            {/* Verification Table Header */}
            <div className="bg-surface-container-lowest border border-border-subtle rounded-xl overflow-hidden">
              <div className="bg-surface-gray border-b border-border-subtle px-lg py-md grid grid-cols-4 gap-md">
                <span className="font-label-caps text-label-caps text-on-surface-variant">PROPERTY</span>
                <span className="font-label-caps text-label-caps text-on-surface-variant">OWNER</span>
                <span className="font-label-caps text-label-caps text-on-surface-variant">SUBMITTED</span>
                <span className="font-label-caps text-label-caps text-on-surface-variant text-right">ACTION</span>
              </div>
              <div className="flex flex-col items-center justify-center py-2xl text-center gap-sm">
                <span className="material-symbols-outlined text-[48px] text-outline">task_alt</span>
                <p className="font-body-md text-body-md text-on-surface-variant">No properties pending verification.</p>
                <p className="font-body-sm text-body-sm text-outline">All caught up! 🎉</p>
              </div>
            </div>
          </div>

          {/* Right Widgets */}
          <div className="flex flex-col gap-xl">
            {/* Recent Activity */}
            <div className="bg-surface-container-lowest border border-border-subtle rounded-xl p-lg hover-elevate">
              <h2 className="font-title-md text-title-md text-trust-navy border-b border-border-subtle pb-sm mb-md flex items-center gap-sm">
                <span className="material-symbols-outlined">history</span> Recent Activity
              </h2>
              <div className="flex flex-col items-center justify-center py-xl text-center gap-sm">
                <span className="material-symbols-outlined text-[32px] text-outline">update</span>
                <p className="font-body-sm text-body-sm text-on-surface-variant">No recent activity.</p>
              </div>
            </div>

            {/* System Health */}
            <div className="bg-trust-navy rounded-xl p-lg hover-elevate relative overflow-hidden text-on-primary">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at right, #ffffff 0%, transparent 70%)' }}></div>
              <h2 className="font-title-md text-title-md border-b border-primary-container pb-sm mb-md flex items-center gap-sm relative z-10">
                <span className="material-symbols-outlined">monitor_heart</span> System Status
              </h2>
              <div className="flex flex-col gap-md relative z-10">
                <div className="flex justify-between items-center">
                  <span className="font-body-sm text-body-sm text-primary-fixed">API Server</span>
                  <span className="bg-success-teal px-sm py-xs rounded font-label-caps text-label-caps text-on-primary flex items-center gap-xs">
                    <span className="w-2 h-2 bg-on-primary rounded-full animate-pulse"></span> ONLINE
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-body-sm text-body-sm text-primary-fixed">Database</span>
                  <span className="bg-success-teal px-sm py-xs rounded font-label-caps text-label-caps text-on-primary flex items-center gap-xs">
                    <span className="w-2 h-2 bg-on-primary rounded-full animate-pulse"></span> ONLINE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
