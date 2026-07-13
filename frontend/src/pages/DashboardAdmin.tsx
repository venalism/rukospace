import { useState, useEffect } from 'react'
import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom'

type TabKey = 'verification' | 'properties' | 'users' | 'analytics' | 'settings'

interface Property {
  ID: string
  Title: string
  Address: string
  PricePerMonth: number
  AreaSqm: number
  ListingStatus: string
  LegalityStatus: string
  CreatedAt: string
  OwnerID: string
}

interface User {
  ID: string
  FullName: string
  Email: string
  Phone: string
  Role: string
  CreatedAt: string
}

interface Stats {
  total_users: number
  total_properties: number
  pending_count: number
  verified_count: number
  rejected_count: number
  users_by_role: {
    tenant: number
    owner: number
    agent: number
    admin: number
  }
}

export default function DashboardAdmin() {
  const { user, token } = useAuthStore()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<TabKey>('verification')
  const [pendingProperties, setPendingProperties] = useState<Property[]>([])
  const [allProperties, setAllProperties] = useState<Property[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(false)

  if (!user || user.role !== 'admin') {
    return <div className="p-3xl text-center text-error-red font-body-md">Unauthorized access. Please login as Admin.</div>
  }

  const apiBase = import.meta.env.VITE_API_URL
  const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }

  const fetchData = async (tab: TabKey) => {
    setLoading(true)
    try {
      if (tab === 'verification') {
        const res = await fetch(`${apiBase}/admin/properties/pending`, { headers })
        if (res.ok) setPendingProperties(await res.json())
      } else if (tab === 'properties') {
        const res = await fetch(`${apiBase}/admin/properties`, { headers })
        if (res.ok) setAllProperties(await res.json())
      } else if (tab === 'users') {
        const res = await fetch(`${apiBase}/admin/users`, { headers })
        if (res.ok) setUsers(await res.json())
      } else if (tab === 'analytics') {
        const res = await fetch(`${apiBase}/admin/stats`, { headers })
        if (res.ok) setStats(await res.json())
      }
    } catch (err) {
      console.error('Failed to fetch data:', err)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchData(activeTab)
  }, [activeTab])

  const handleTabClick = (tab: TabKey) => {
    setActiveTab(tab)
  }

  const handleLogout = () => {
    useAuthStore.getState().logout()
    navigate('/login')
  }

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      'active': 'bg-success-teal/10 text-success-teal border border-success-teal/20',
      'verified': 'bg-success-teal/10 text-success-teal border border-success-teal/20',
      'pending_verification': 'bg-action-amber/10 text-action-amber border border-action-amber/20',
      'draft': 'bg-outline/10 text-outline border border-outline/20',
      'rejected': 'bg-error-red/10 text-error-red border border-error-red/20',
      'unverified': 'bg-outline/10 text-outline border border-outline/20',
    }
    return styles[status] || 'bg-outline/10 text-outline border border-outline/20'
  }

  const getRoleBadge = (role: string) => {
    const styles: Record<string, string> = {
      'admin': 'bg-error-red/10 text-error-red border border-error-red/20',
      'owner': 'bg-trust-navy/10 text-trust-navy border border-trust-navy/20',
      'tenant': 'bg-success-teal/10 text-success-teal border border-success-teal/20',
      'agent': 'bg-electric-blue/10 text-electric-blue border border-electric-blue/20',
    }
    return styles[role] || 'bg-outline/10 text-outline border border-outline/20'
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
    { key: 'verification', icon: 'admin_panel_settings', label: 'Verification Queue', section: 'MANAGEMENT' },
    { key: 'properties', icon: 'domain', label: 'All Properties' },
    { key: 'users', icon: 'group', label: 'User Management' },
    { key: 'analytics', icon: 'analytics', label: 'Analytics' },
    { key: 'settings', icon: 'settings', label: 'Settings', section: 'SYSTEM' },
  ]

  // ============ TAB CONTENT RENDERERS ============

  const renderVerificationQueue = () => (
    <div className="flex flex-col gap-lg">
      <div className="flex justify-between items-center border-b border-border-subtle pb-sm">
        <h2 className="font-title-md text-title-md text-trust-navy flex items-center gap-sm">
          <span className="material-symbols-outlined">verified_user</span>
          Verification Queue
        </h2>
        <span className="font-label-caps text-label-caps text-on-surface-variant">{pendingProperties.length} PENDING</span>
      </div>

      <div className="bg-surface-container-lowest border border-border-subtle rounded-xl overflow-hidden">
        <div className="bg-surface-gray border-b border-border-subtle px-lg py-md grid grid-cols-4 gap-md">
          <span className="font-label-caps text-label-caps text-on-surface-variant">PROPERTY</span>
          <span className="font-label-caps text-label-caps text-on-surface-variant">ADDRESS</span>
          <span className="font-label-caps text-label-caps text-on-surface-variant">SUBMITTED</span>
          <span className="font-label-caps text-label-caps text-on-surface-variant text-right">ACTION</span>
        </div>
        {pendingProperties.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-2xl text-center gap-sm">
            <span className="material-symbols-outlined text-[48px] text-outline">task_alt</span>
            <p className="font-body-md text-body-md text-on-surface-variant">No properties pending verification.</p>
            <p className="font-body-sm text-body-sm text-outline">All caught up! 🎉</p>
          </div>
        ) : (
          pendingProperties.map((prop) => (
            <div key={prop.ID} className="px-lg py-md grid grid-cols-4 gap-md border-b border-border-subtle last:border-b-0 items-center hover:bg-surface-gray/50 transition-colors">
              <div>
                <div className="font-body-md text-on-surface font-semibold">{prop.Title}</div>
                <div className="font-body-sm text-on-surface-variant">{formatPrice(prop.PricePerMonth)}/mo</div>
              </div>
              <div className="font-body-sm text-on-surface-variant truncate">{prop.Address}</div>
              <div className="font-body-sm text-on-surface-variant">{formatDate(prop.CreatedAt)}</div>
              <div className="flex justify-end gap-sm">
                <button
                  onClick={async () => {
                    await fetch(`${apiBase}/admin/properties/${prop.ID}/review`, {
                      method: 'PATCH', headers, body: JSON.stringify({ action: 'approve' })
                    })
                    fetchData('verification')
                  }}
                  className="px-md py-xs bg-success-teal text-on-primary rounded-lg font-body-sm font-bold hover:opacity-90 transition-opacity"
                >Approve</button>
                <button
                  onClick={async () => {
                    const reason = prompt('Alasan penolakan:')
                    if (reason) {
                      await fetch(`${apiBase}/admin/properties/${prop.ID}/review`, {
                        method: 'PATCH', headers, body: JSON.stringify({ action: 'reject', reason })
                      })
                      fetchData('verification')
                    }
                  }}
                  className="px-md py-xs bg-error-red text-on-primary rounded-lg font-body-sm font-bold hover:opacity-90 transition-opacity"
                >Reject</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )

  const renderAllProperties = () => (
    <div className="flex flex-col gap-lg">
      <div className="flex justify-between items-center border-b border-border-subtle pb-sm">
        <h2 className="font-title-md text-title-md text-trust-navy flex items-center gap-sm">
          <span className="material-symbols-outlined">domain</span>
          All Properties
        </h2>
        <span className="font-label-caps text-label-caps text-on-surface-variant">{allProperties.length} TOTAL</span>
      </div>

      <div className="bg-surface-container-lowest border border-border-subtle rounded-xl overflow-hidden">
        <div className="bg-surface-gray border-b border-border-subtle px-lg py-md grid grid-cols-6 gap-md">
          <span className="font-label-caps text-label-caps text-on-surface-variant col-span-2">PROPERTY</span>
          <span className="font-label-caps text-label-caps text-on-surface-variant">PRICE</span>
          <span className="font-label-caps text-label-caps text-on-surface-variant">AREA</span>
          <span className="font-label-caps text-label-caps text-on-surface-variant">LISTING</span>
          <span className="font-label-caps text-label-caps text-on-surface-variant">LEGALITY</span>
        </div>
        {allProperties.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-2xl text-center gap-sm">
            <span className="material-symbols-outlined text-[48px] text-outline">domain_disabled</span>
            <p className="font-body-md text-body-md text-on-surface-variant">No properties found.</p>
          </div>
        ) : (
          allProperties.map((prop) => (
            <div key={prop.ID} className="px-lg py-md grid grid-cols-6 gap-md border-b border-border-subtle last:border-b-0 items-center hover:bg-surface-gray/50 transition-colors">
              <div className="col-span-2">
                <div className="font-body-md text-on-surface font-semibold truncate">{prop.Title}</div>
                <div className="font-body-sm text-on-surface-variant truncate">{prop.Address}</div>
              </div>
              <div className="font-body-sm text-on-surface">{formatPrice(prop.PricePerMonth)}</div>
              <div className="font-body-sm text-on-surface">{prop.AreaSqm} m²</div>
              <div>
                <span className={`inline-block px-sm py-xs rounded-md font-label-caps text-label-caps ${getStatusBadge(prop.ListingStatus)}`}>
                  {prop.ListingStatus.replace('_', ' ')}
                </span>
              </div>
              <div>
                <span className={`inline-block px-sm py-xs rounded-md font-label-caps text-label-caps ${getStatusBadge(prop.LegalityStatus)}`}>
                  {prop.LegalityStatus}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )

  const renderUserManagement = () => (
    <div className="flex flex-col gap-lg">
      <div className="flex justify-between items-center border-b border-border-subtle pb-sm">
        <h2 className="font-title-md text-title-md text-trust-navy flex items-center gap-sm">
          <span className="material-symbols-outlined">group</span>
          User Management
        </h2>
        <span className="font-label-caps text-label-caps text-on-surface-variant">{users.length} USERS</span>
      </div>

      <div className="bg-surface-container-lowest border border-border-subtle rounded-xl overflow-hidden">
        <div className="bg-surface-gray border-b border-border-subtle px-lg py-md grid grid-cols-5 gap-md">
          <span className="font-label-caps text-label-caps text-on-surface-variant">NAME</span>
          <span className="font-label-caps text-label-caps text-on-surface-variant">EMAIL</span>
          <span className="font-label-caps text-label-caps text-on-surface-variant">PHONE</span>
          <span className="font-label-caps text-label-caps text-on-surface-variant">ROLE</span>
          <span className="font-label-caps text-label-caps text-on-surface-variant">JOINED</span>
        </div>
        {users.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-2xl text-center gap-sm">
            <span className="material-symbols-outlined text-[48px] text-outline">person_off</span>
            <p className="font-body-md text-body-md text-on-surface-variant">No users found.</p>
          </div>
        ) : (
          users.map((u) => (
            <div key={u.ID} className="px-lg py-md grid grid-cols-5 gap-md border-b border-border-subtle last:border-b-0 items-center hover:bg-surface-gray/50 transition-colors">
              <div className="flex items-center gap-sm">
                <div className="w-8 h-8 bg-trust-navy rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-on-primary font-bold text-[12px]">{u.FullName?.charAt(0)?.toUpperCase()}</span>
                </div>
                <span className="font-body-md text-on-surface font-semibold truncate">{u.FullName}</span>
              </div>
              <div className="font-body-sm text-on-surface-variant truncate">{u.Email}</div>
              <div className="font-body-sm text-on-surface-variant">{u.Phone || '-'}</div>
              <div>
                <span className={`inline-block px-sm py-xs rounded-md font-label-caps text-label-caps capitalize ${getRoleBadge(u.Role)}`}>
                  {u.Role}
                </span>
              </div>
              <div className="font-body-sm text-on-surface-variant">{formatDate(u.CreatedAt)}</div>
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
          Platform Analytics
        </h2>
      </div>

      {stats ? (
        <>
          {/* Property Stats */}
          <div>
            <h3 className="font-body-md text-on-surface-variant font-semibold mb-md flex items-center gap-sm">
              <span className="material-symbols-outlined text-[18px]">domain</span>
              Properties Overview
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-lg">
              <div className="bg-surface-container-lowest border border-border-subtle rounded-xl p-lg hover-elevate text-center">
                <div className="font-display-lg text-display-lg text-trust-navy">{stats.total_properties}</div>
                <div className="font-technical-data text-technical-data text-on-surface-variant mt-xs">Total Properties</div>
              </div>
              <div className="bg-surface-container-lowest border border-border-subtle rounded-xl p-lg hover-elevate text-center">
                <div className="font-display-lg text-display-lg text-success-teal">{stats.verified_count}</div>
                <div className="font-technical-data text-technical-data text-on-surface-variant mt-xs">Active / Verified</div>
              </div>
              <div className="bg-surface-container-lowest border border-border-subtle rounded-xl p-lg hover-elevate text-center">
                <div className="font-display-lg text-display-lg text-action-amber">{stats.pending_count}</div>
                <div className="font-technical-data text-technical-data text-on-surface-variant mt-xs">Pending</div>
              </div>
              <div className="bg-surface-container-lowest border border-border-subtle rounded-xl p-lg hover-elevate text-center">
                <div className="font-display-lg text-display-lg text-error-red">{stats.rejected_count}</div>
                <div className="font-technical-data text-technical-data text-on-surface-variant mt-xs">Rejected</div>
              </div>
            </div>
          </div>

          {/* User Stats */}
          <div>
            <h3 className="font-body-md text-on-surface-variant font-semibold mb-md flex items-center gap-sm">
              <span className="material-symbols-outlined text-[18px]">group</span>
              Users Overview
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-lg">
              <div className="bg-surface-container-lowest border border-border-subtle rounded-xl p-lg hover-elevate text-center">
                <div className="font-display-lg text-display-lg text-trust-navy">{stats.total_users}</div>
                <div className="font-technical-data text-technical-data text-on-surface-variant mt-xs">Total Users</div>
              </div>
              <div className="bg-surface-container-lowest border border-border-subtle rounded-xl p-lg hover-elevate text-center">
                <div className="font-display-lg text-display-lg text-success-teal">{stats.users_by_role.tenant}</div>
                <div className="font-technical-data text-technical-data text-on-surface-variant mt-xs">Tenants</div>
              </div>
              <div className="bg-surface-container-lowest border border-border-subtle rounded-xl p-lg hover-elevate text-center">
                <div className="font-display-lg text-display-lg text-trust-navy">{stats.users_by_role.owner}</div>
                <div className="font-technical-data text-technical-data text-on-surface-variant mt-xs">Owners</div>
              </div>
              <div className="bg-surface-container-lowest border border-border-subtle rounded-xl p-lg hover-elevate text-center">
                <div className="font-display-lg text-display-lg text-electric-blue">{stats.users_by_role.agent}</div>
                <div className="font-technical-data text-technical-data text-on-surface-variant mt-xs">Agents</div>
              </div>
              <div className="bg-surface-container-lowest border border-border-subtle rounded-xl p-lg hover-elevate text-center">
                <div className="font-display-lg text-display-lg text-error-red">{stats.users_by_role.admin}</div>
                <div className="font-technical-data text-technical-data text-on-surface-variant mt-xs">Admins</div>
              </div>
            </div>
          </div>

          {/* Summary Card */}
          <div className="bg-trust-navy rounded-xl p-xl text-on-primary relative overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at right, #ffffff 0%, transparent 70%)' }}></div>
            <div className="relative z-10">
              <h3 className="font-title-md text-title-md mb-md flex items-center gap-sm">
                <span className="material-symbols-outlined">insights</span>
                Platform Summary
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-lg">
                <div>
                  <div className="font-display-lg text-display-lg">{stats.total_properties}</div>
                  <div className="font-body-sm text-primary-fixed">Properties Listed</div>
                </div>
                <div>
                  <div className="font-display-lg text-display-lg">{stats.total_users}</div>
                  <div className="font-body-sm text-primary-fixed">Registered Users</div>
                </div>
                <div>
                  <div className="font-display-lg text-display-lg">
                    {stats.total_properties > 0 ? Math.round((stats.verified_count / stats.total_properties) * 100) : 0}%
                  </div>
                  <div className="font-body-sm text-primary-fixed">Verification Rate</div>
                </div>
                <div>
                  <div className="font-display-lg text-display-lg">{stats.pending_count}</div>
                  <div className="font-body-sm text-primary-fixed">Awaiting Review</div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center py-2xl">
          <span className="material-symbols-outlined animate-spin text-outline text-[32px]">progress_activity</span>
        </div>
      )}
    </div>
  )

  const renderSettings = () => (
    <div className="flex flex-col gap-xl">
      <div className="border-b border-border-subtle pb-sm">
        <h2 className="font-title-md text-title-md text-trust-navy flex items-center gap-sm">
          <span className="material-symbols-outlined">settings</span>
          Admin Settings
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

      {/* App Config */}
      <div className="bg-surface-container-lowest border border-border-subtle rounded-xl p-xl">
        <h3 className="font-body-md text-on-surface font-semibold mb-lg flex items-center gap-sm">
          <span className="material-symbols-outlined text-[20px] text-trust-navy">tune</span>
          Application Configuration
        </h3>
        <div className="flex flex-col gap-md">
          <div className="flex justify-between items-center py-sm border-b border-border-subtle">
            <div>
              <div className="font-body-md text-on-surface">API Base URL</div>
              <div className="font-body-sm text-on-surface-variant">{apiBase}</div>
            </div>
            <span className="material-symbols-outlined text-outline">link</span>
          </div>
          <div className="flex justify-between items-center py-sm border-b border-border-subtle">
            <div>
              <div className="font-body-md text-on-surface">App Version</div>
              <div className="font-body-sm text-on-surface-variant">RukoSpace v1.0.0</div>
            </div>
            <span className="material-symbols-outlined text-outline">info</span>
          </div>
          <div className="flex justify-between items-center py-sm">
            <div>
              <div className="font-body-md text-on-surface">Environment</div>
              <div className="font-body-sm text-on-surface-variant">Development</div>
            </div>
            <span className="bg-action-amber/10 text-action-amber border border-action-amber/20 px-sm py-xs rounded-md font-label-caps text-label-caps">DEV</span>
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
            <div className="font-body-md text-on-surface">Logout from all sessions</div>
            <div className="font-body-sm text-on-surface-variant">This will log you out of the current session.</div>
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
    verification: renderVerificationQueue,
    properties: renderAllProperties,
    users: renderUserManagement,
    analytics: renderAnalytics,
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
              onClick={() => handleTabClick(item.key)}
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
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-xl gap-md">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-trust-navy">Admin Dashboard</h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-xs">Manage platform properties, users, and verifications.</p>
          </div>
        </div>

        {/* Stats Cards — always visible */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-lg mb-2xl">
          <div className="bg-surface-container-lowest border border-border-subtle rounded-xl p-lg hover-elevate relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-md opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-[48px] text-trust-navy">pending_actions</span>
            </div>
            <div className="font-technical-data text-technical-data text-on-surface-variant flex items-center gap-xs">
              <span className="material-symbols-outlined text-[16px]">pending_actions</span> Pending Verification
            </div>
            <div className="font-display-lg text-display-lg text-action-amber mt-sm">{stats?.pending_count ?? 0}</div>
          </div>
          <div className="bg-surface-container-lowest border border-border-subtle rounded-xl p-lg hover-elevate relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-md opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-[48px] text-success-teal">verified</span>
            </div>
            <div className="font-technical-data text-technical-data text-on-surface-variant flex items-center gap-xs">
              <span className="material-symbols-outlined text-[16px]">verified</span> Verified Properties
            </div>
            <div className="font-display-lg text-display-lg text-success-teal mt-sm">{stats?.verified_count ?? 0}</div>
          </div>
          <div className="bg-surface-container-lowest border border-border-subtle rounded-xl p-lg hover-elevate relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-md opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-[48px] text-trust-navy">domain</span>
            </div>
            <div className="font-technical-data text-technical-data text-on-surface-variant flex items-center gap-xs">
              <span className="material-symbols-outlined text-[16px]">domain</span> Total Properties
            </div>
            <div className="font-display-lg text-display-lg text-trust-navy mt-sm">{stats?.total_properties ?? 0}</div>
          </div>
          <div className="bg-surface-container-lowest border border-border-subtle rounded-xl p-lg hover-elevate relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-md opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-[48px] text-electric-blue">group</span>
            </div>
            <div className="font-technical-data text-technical-data text-on-surface-variant flex items-center gap-xs">
              <span className="material-symbols-outlined text-[16px]">group</span> Total Users
            </div>
            <div className="font-display-lg text-display-lg text-electric-blue mt-sm">{stats?.total_users ?? 0}</div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-3xl">
            <span className="material-symbols-outlined animate-spin text-trust-navy text-[40px]">progress_activity</span>
          </div>
        ) : (
          /* Tab Content */
          tabContent[activeTab]()
        )}
      </main>
    </div>
  )
}
