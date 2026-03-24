import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

const navItems = [
  { label: 'Dashboard', path: '/' },
  { label: 'Artists', path: '/artists', countKey: 'artists' },
  { label: 'Verification', path: '/verification', countKey: 'verification', urgent: true },
  { label: 'Customers', path: '/customers' },
  { label: 'Bookings', path: '/bookings', countKey: 'bookings' },
  { label: 'Settings', path: '/settings' },
]

export default function Sidebar() {
  const admin = useSelector(s => s.auth.admin)
  const artistCount = useSelector(s => s.artists.list.length)
  const verificationCount = useSelector(s => s.verification.list.length)
  const bookingsCount = useSelector(s => s.bookings.list.length)

  const getCounts = (key) => {
    if (key === 'artists') return artistCount
    if (key === 'verification') return verificationCount
    if (key === 'bookings') return bookingsCount
    return null
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-[280px] bg-white border-r border-gray-100 flex flex-col z-20">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
          <span className="text-white font-bold text-lg">H</span>
        </div>
        <span className="text-xl font-bold text-gray-900">HireMe</span>
        <span className="ml-1 bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-full">Admin</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map(item => {
          const count = item.countKey ? getCounts(item.countKey) : null
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3 rounded-2xl text-base font-semibold transition-all ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-50'
                }`
              }
            >
              <span>{item.label}</span>
              {count !== null && (
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  item.urgent
                    ? 'bg-primary text-white'
                    : 'bg-gray-800 text-white'
                }`}>
                  {count}
                </span>
              )}
            </NavLink>
          )
        })}
      </nav>

      {/* Admin profile */}
      <div className="px-6 py-5 border-t border-gray-100 flex items-center gap-3">
        <img
          src={admin?.avatar || 'https://i.pravatar.cc/40?img=33'}
          alt="Admin"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-bold text-gray-900">{admin?.name || 'Admin'}</p>
          <p className="text-xs text-gray-400">{admin?.role || 'Super Administrator'}</p>
        </div>
      </div>
    </aside>
  )
}
