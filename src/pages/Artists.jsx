import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import {
  setFilter,
  setSearchQuery,
  approveArtist,
  rejectArtist,
  selectFilteredArtists,
} from '../features/artists/artistsSlice'
import PageHeader from '../components/common/PageHeader'
import StatCard from '../components/common/StatCard'
import SearchBar from '../components/common/SearchBar'
import FilterTabs from '../components/common/FilterTabs'
import StatusBadge from '../components/common/StatusBadge'

const filterTabs = [
  { label: 'All', value: 'all' },
  { label: 'Verified', value: 'verified' },
  { label: 'Pending', value: 'pending' },
  { label: 'Suspended', value: 'suspended' },
]

export default function Artists() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const allArtists = useSelector(s => s.artists.list)
  const filter = useSelector(s => s.artists.filter)
  const searchQuery = useSelector(s => s.artists.searchQuery)
  const filtered = useSelector(selectFilteredArtists)

  const verified = allArtists.filter(a => a.status === 'verified').length
  const pending = allArtists.filter(a => a.status === 'pending').length
  const suspended = allArtists.filter(a => a.status === 'suspended').length

  const handleApprove = (id, name) => {
    dispatch(approveArtist(id))
    toast.success(`${name} approved successfully`)
  }

  const handleReject = (id, name) => {
    dispatch(rejectArtist(id))
    toast.error(`${name} has been rejected`)
  }

  return (
    <div>
      <PageHeader
        title="Artists"
        subtitle={`Manage all ${allArtists.length} artists on the platform.`}
      />

      {/* Stats */}
      <div className="flex gap-4 mb-6">
        <StatCard label="Verified" value={verified} badge="Active" badgeColor="green" />
        <StatCard label="Pending" value={pending} badge="Waiting" badgeColor="orange" />
        <StatCard label="Suspended" value={suspended} badge="Active" badgeColor="red" />
        <StatCard label="Total" value={allArtists.length} badge="Active" badgeColor="green" />
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        {/* Filters */}
        <div className="flex items-center gap-4 p-4 border-b border-gray-100">
          <SearchBar
            value={searchQuery}
            onChange={v => dispatch(setSearchQuery(v))}
            placeholder="Search artist..."
          />
          <FilterTabs tabs={filterTabs} active={filter} onChange={v => dispatch(setFilter(v))} />
        </div>

        {/* Table */}
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="table-header text-left">Artist</th>
              <th className="table-header text-left">Category</th>
              <th className="table-header text-left">Location</th>
              <th className="table-header text-left">Bookings</th>
              <th className="table-header text-left">Rating</th>
              <th className="table-header text-left">Status</th>
              <th className="table-header text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-12 text-gray-400 text-sm">
                  No artists found.
                </td>
              </tr>
            ) : (
              filtered.map(artist => (
                <tr key={artist.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="table-cell">
                    <div className="flex items-center gap-3">
                      <img src={artist.avatar} alt="" className="w-9 h-9 rounded-full object-cover" />
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{artist.name}</p>
                        <p className="text-xs text-gray-400">{artist.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell text-gray-500">{artist.category}</td>
                  <td className="table-cell text-gray-500">{artist.location}</td>
                  <td className="table-cell text-gray-700">{artist.bookings}</td>
                  <td className="table-cell">
                    <span className="flex items-center gap-1">
                      <span className="text-yellow-400">★</span>
                      <span className="font-medium text-gray-700">{artist.rating}</span>
                    </span>
                  </td>
                  <td className="table-cell">
                    <StatusBadge status={artist.status} />
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/artists/${artist.id}`)}
                        className="btn-secondary text-xs px-3 py-1.5"
                      >
                        Expand
                      </button>
                      {artist.status !== 'suspended' && (
                        <button
                          onClick={() => handleReject(artist.id, artist.name)}
                          className="btn-danger text-xs px-3 py-1.5"
                        >
                          Reject
                        </button>
                      )}
                      {artist.status !== 'verified' && (
                        <button
                          onClick={() => handleApprove(artist.id, artist.name)}
                          className="btn-success text-xs px-3 py-1.5"
                        >
                          Approve
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {filtered.length > 0 && (
          <div className="px-4 py-3 text-xs text-gray-400">
            Showing {filtered.length} of {allArtists.length} artists
          </div>
        )}
      </div>
    </div>
  )
}
