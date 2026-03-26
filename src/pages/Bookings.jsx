import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  setFilter,
  setSearchQuery,
  cancelBooking,
  selectFilteredBookings,
} from "../features/bookings/bookingsSlice";
import PageHeader from "../components/common/PageHeader";
import StatCard from "../components/common/StatCard";
import SearchBar from "../components/common/SearchBar";
import FilterTabs from "../components/common/FilterTabs";
import StatusBadge from "../components/common/StatusBadge";

const filterTabs = [
  { label: "All", value: "all" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
];

export default function Bookings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const all = useSelector((s) => s.bookings.list);
  const filter = useSelector((s) => s.bookings.filter);
  const searchQuery = useSelector((s) => s.bookings.searchQuery);
  const filtered = useSelector(selectFilteredBookings);

  const confirmed = all.filter((b) => b.status === "confirmed").length;
  const pending = all.filter((b) => b.status === "pending").length;
  const completed = all.filter((b) => b.status === "completed").length;
  const cancelled = all.filter((b) => b.status === "cancelled").length;

  return (
    <div>
      <PageHeader
        title="Bookings"
        subtitle="Track all bookings across the platform."
      />

      <div className="flex gap-4 mb-6">
        <StatCard label="Confirmed" value={confirmed} />
        <StatCard label="Pending" value={pending} />
        <StatCard label="Completed" value={completed} />
        <StatCard
          label="Cancelled"
          value={cancelled}
          badge={cancelled > 0 ? String(cancelled) : null}
          badgeColor="red"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 p-4 border-b border-gray-100">
          <SearchBar
            value={searchQuery}
            onChange={(v) => dispatch(setSearchQuery(v))}
            placeholder="Search booking..."
          />
          <FilterTabs
            tabs={filterTabs}
            active={filter}
            onChange={(v) => dispatch(setFilter(v))}
          />
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="table-header text-left">ID</th>
              <th className="table-header text-left">Customer</th>
              <th className="table-header text-left">Artist</th>
              <th className="table-header text-left">Event</th>
              <th className="table-header text-left">Date</th>
              <th className="table-header text-left">Amount</th>
              <th className="table-header text-left">Status</th>
              <th className="table-header text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="text-center py-12 text-gray-400 text-sm"
                >
                  No bookings found.
                </td>
              </tr>
            ) : (
              filtered.map((booking) => (
                <tr
                  key={booking.id}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <td className="table-cell font-mono text-xs text-gray-500">
                    {booking.id}
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      <img
                        src={booking.customer.avatar}
                        alt=""
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {booking.customer.name}
                      </span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      <img
                        src={booking.artist.avatar}
                        alt=""
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {booking.artist.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {booking.artist.category}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell text-xs text-gray-500">
                    {booking.eventType}
                  </td>
                  <td className="table-cell text-xs text-gray-500">
                    {booking.date}
                  </td>
                  <td className="table-cell font-semibold text-sm text-gray-900">
                    {booking.amount}
                  </td>
                  <td className="table-cell">
                    <StatusBadge status={booking.status} />
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          navigate(
                            `/bookings/${encodeURIComponent(booking.id)}`,
                          )
                        }
                        className="btn-secondary text-xs px-3 py-1.5"
                      >
                        View
                      </button>
                      {booking.status !== "cancelled" &&
                        booking.status !== "completed" && (
                          <button
                            onClick={() => {
                              dispatch(cancelBooking(booking.id));
                              toast.error(`Booking ${booking.id} cancelled`);
                            }}
                            className="btn-danger text-xs px-3 py-1.5"
                          >
                            Cancel
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
            Showing {filtered.length} of {all.length} bookings
          </div>
        )}
      </div>
    </div>
  );
}
