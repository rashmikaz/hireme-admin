import { useSelector } from 'react-redux'
import PageHeader from '../components/common/PageHeader'
import StatCard from '../components/common/StatCard'

export default function Dashboard() {
  const artists = useSelector(s => s.artists.list)
  const bookings = useSelector(s => s.bookings.list)
  const customers = useSelector(s => s.customers.list)

  const verifiedArtists = artists.filter(a => a.status === 'verified').length
  const activeBookings = bookings.filter(b => b.status === 'confirmed' || b.status === 'pending').length

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Here's what's happening on HireMe today."
      />

      {/* Stats Grid */}
      <div className="flex gap-4 mb-8">
        <StatCard
          label="Revenue this month"
          value="LKR 847K"
          badge="↑ 18%"
          badgeColor="green"
        />
        <StatCard
          label="Active Bookings"
          value={activeBookings}
          badge="↑ 18%"
          badgeColor="green"
        />
        <StatCard
          label="Verified Artists"
          value={verifiedArtists}
          badge="↑ 18%"
          badgeColor="green"
        />
        <StatCard
          label="Total Customers"
          value={customers.length.toLocaleString()}
          badge="↑ 18%"
          badgeColor="green"
        />
      </div>

      {/* Recent Bookings Preview */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-base font-bold text-gray-900 mb-4">Recent Bookings</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="table-header text-left">ID</th>
              <th className="table-header text-left">Customer</th>
              <th className="table-header text-left">Artist</th>
              <th className="table-header text-left">Amount</th>
              <th className="table-header text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {useSelector(s => s.bookings.list).slice(0, 5).map(b => (
              <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="table-cell font-mono text-xs text-gray-500">{b.id}</td>
                <td className="table-cell font-medium">{b.customer}</td>
                <td className="table-cell">
                  <div className="flex items-center gap-2">
                    <img src={b.artist.avatar} alt="" className="w-7 h-7 rounded-full" />
                    <span>{b.artist.name}</span>
                  </div>
                </td>
                <td className="table-cell font-semibold text-gray-900">{b.amount}</td>
                <td className="table-cell">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    b.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                    b.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    b.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Quick stats row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-400 mb-1">Pending Verifications</p>
          <p className="text-2xl font-extrabold text-gray-900">
            {useSelector(s => s.verification.list.length)}
          </p>
          <p className="text-xs text-orange-500 mt-1 font-medium">Needs attention</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-400 mb-1">Total Artists</p>
          <p className="text-2xl font-extrabold text-gray-900">{artists.length}</p>
          <p className="text-xs text-green-600 mt-1 font-medium">↑ Growing</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-400 mb-1">Commission Rate</p>
          <p className="text-2xl font-extrabold text-gray-900">
            {useSelector(s => s.settings.commissionRate)}%
          </p>
          <p className="text-xs text-gray-400 mt-1 font-medium">Per booking</p>
        </div>
      </div>
    </div>
  )
}
