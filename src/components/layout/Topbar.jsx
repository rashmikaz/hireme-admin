import { useLocation } from 'react-router-dom'
import { Bell, Search } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useState } from 'react'

const pageTitles = {
  '/': 'Dashboard',
  '/artists': 'Artists',
  '/verification': 'Verification',
  '/customers': 'Users',
  '/bookings': 'Bookings',
  '/settings': 'Settings',
}

export default function Topbar() {
  const location = useLocation()
  const title = pageTitles[location.pathname] || 'Dashboard'
  const verificationCount = useSelector(s => s.verification.list.length)
  const [search, setSearch] = useState('')

  return (
    <header className="fixed top-0 left-[280px] right-0 h-[68px] bg-white border-b border-gray-100 flex items-center justify-between px-8 z-10">
      <h2 className="text-base font-semibold text-gray-900">{title}</h2>
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 gap-2 w-72">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent text-sm outline-none text-gray-700 placeholder-gray-400 w-full"
          />
        </div>

        {/* Bell */}
        <button className="relative w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
          <Bell size={18} className="text-gray-600" />
          {verificationCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary rounded-full text-white text-[10px] font-bold flex items-center justify-center">
              {verificationCount}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
