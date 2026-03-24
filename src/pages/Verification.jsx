import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { FileText, PlayCircle } from 'lucide-react'
import {
  setFilter,
  toggleExpand,
  approveApplication,
  rejectApplication,
  selectFilteredVerifications,
} from '../features/verification/verificationSlice'
import PageHeader from '../components/common/PageHeader'
import FilterTabs from '../components/common/FilterTabs'

const filterTabs = [
  { label: 'All(5)', value: 'all' },
  { label: 'Today(2)', value: 'today' },
  { label: 'Re-Submitted', value: 'resubmitted' },
]

const docIcons = {
  'National ID': '🪪',
  'Passport': '📘',
  'Bank Statement': '🏦',
  'Driving License': '🚗',
}

const portfolioColors = ['bg-purple-200', 'bg-green-300', 'bg-pink-200']

function VerificationCard({ app }) {
  const dispatch = useDispatch()
  const expandedId = useSelector(s => s.verification.expandedId)
  const isExpanded = expandedId === app.id

  const handleApprove = () => {
    dispatch(approveApplication(app.id))
    toast.success(`${app.name} approved!`)
  }

  const handleReject = () => {
    dispatch(rejectApplication(app.id))
    toast.error(`${app.name} rejected.`)
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-3">
      {/* Header row */}
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <img src={app.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
          <div>
            <p className="font-bold text-gray-900 text-sm">{app.name}</p>
            <p className="text-xs text-gray-400">
              {app.category} · {app.location} — submitted {app.submittedDate}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!isExpanded && (
            <button
              onClick={() => dispatch(toggleExpand(app.id))}
              className="btn-secondary text-xs px-4 py-2"
            >
              Expand
            </button>
          )}
          <button onClick={handleReject} className="btn-danger text-xs px-4 py-2">Reject</button>
          <button onClick={handleApprove} className="btn-success text-xs px-4 py-2">Approve</button>
        </div>
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <div className="px-5 pb-5 border-t border-gray-100">
          <div className="flex gap-10 mt-4">
            {/* Profile Info */}
            <div className="flex-1">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                Profile Information
              </p>
              {[
                ['Full Name', app.profile.fullName],
                ['NIC', app.profile.nic],
                ['Phone', app.profile.phone],
                ['Category', app.profile.category],
                ['Full Name', app.profile.fullName],
                ['NIC', app.profile.nic],
                ['Phone', app.profile.phone],
              ].map(([label, value], i) => (
                <div key={i} className="flex justify-between border-b border-gray-100 py-2.5">
                  <span className="text-sm text-gray-400">{label}</span>
                  <span className="text-sm font-semibold text-gray-800">{value}</span>
                </div>
              ))}
            </div>

            {/* Documents & Portfolio */}
            <div className="flex-1">
              {/* Documents */}
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                Documents
              </p>
              <div className="grid grid-cols-4 gap-2 mb-6">
                {app.documents.map((doc, i) => (
                  <button
                    key={i}
                    className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary hover:bg-primary-light transition-colors"
                  >
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <FileText size={18} className="text-primary" />
                    </div>
                    <span className="text-xs text-gray-600 text-center leading-tight">{doc}</span>
                  </button>
                ))}
              </div>

              {/* Portfolio */}
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                Portfolio
              </p>
              <div className="grid grid-cols-4 gap-2">
                {app.portfolio.map((item, i) => (
                  <div
                    key={i}
                    className={`h-16 rounded-xl flex items-center justify-center cursor-pointer ${
                      item === 'video'
                        ? 'bg-gray-700'
                        : portfolioColors[i % portfolioColors.length]
                    }`}
                  >
                    {item === 'video' && (
                      <div className="flex flex-col items-center gap-1">
                        <PlayCircle size={20} className="text-white" />
                        <span className="text-white text-xs font-bold">VIDEO</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Collapse button */}
          <button
            onClick={() => dispatch(toggleExpand(app.id))}
            className="mt-4 text-xs text-gray-400 hover:text-gray-700 underline"
          >
            Collapse
          </button>
        </div>
      )}
    </div>
  )
}

export default function Verification() {
  const dispatch = useDispatch()
  const filter = useSelector(s => s.verification.filter)
  const filtered = useSelector(selectFilteredVerifications)
  const total = useSelector(s => s.verification.list.length)

  return (
    <div>
      <PageHeader
        title="Verification"
        subtitle={`${total} application${total !== 1 ? 's' : ''} awaiting review.`}
      />

      <FilterTabs tabs={filterTabs} active={filter} onChange={v => dispatch(setFilter(v))} />

      <div className="mt-5">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center text-gray-400 text-sm border border-gray-100 shadow-sm">
            No applications to review.
          </div>
        ) : (
          filtered.map(app => <VerificationCard key={app.id} app={app} />)
        )}
      </div>
    </div>
  )
}
