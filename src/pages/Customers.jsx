import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  setFilter,
  setSearchQuery,
  banCustomer,
  unbanCustomer,
  selectFilteredCustomers,
} from "../features/customers/customersSlice";
import PageHeader from "../components/common/PageHeader";
import StatCard from "../components/common/StatCard";
import SearchBar from "../components/common/SearchBar";
import FilterTabs from "../components/common/FilterTabs";
import StatusBadge from "../components/common/StatusBadge";

const filterTabs = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Banned", value: "banned" },
];

export default function Customers() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const all = useSelector((s) => s.customers.list);
  const filter = useSelector((s) => s.customers.filter);
  const searchQuery = useSelector((s) => s.customers.searchQuery);
  const filtered = useSelector(selectFilteredCustomers);

  const active = all.filter((c) => c.status === "active").length;
  const newThisMonth = all.filter((c) => c.joined.includes("2026")).length;
  const banned = all.filter((c) => c.status === "banned").length;

  const handleBan = (id, name) => {
    dispatch(banCustomer(id));
    toast.error(`${name} has been banned`);
  };

  const handleUnban = (id, name) => {
    dispatch(unbanCustomer(id));
    toast.success(`${name} has been unbanned`);
  };

  return (
    <div>
      <PageHeader
        title="Users"
        subtitle={`${all.length.toLocaleString()} registered users.`}
      />

      {/* Stats */}
      <div className="flex gap-4 mb-6">
        <StatCard
          label="Total"
          value={all.length.toLocaleString()}
          badge="Active"
          badgeColor="green"
        />
        <StatCard
          label="Active this month"
          value={active}
          badge="Waiting"
          badgeColor="orange"
        />
        <StatCard
          label="New this month"
          value={newThisMonth}
          badge="Active"
          badgeColor="green"
        />
        <StatCard
          label="Banned"
          value={banned}
          badge="Active"
          badgeColor="red"
        />
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        {/* Filters */}
        <div className="flex items-center gap-4 p-4 border-b border-gray-100">
          <SearchBar
            value={searchQuery}
            onChange={(v) => dispatch(setSearchQuery(v))}
            placeholder="Search user..."
          />
          <FilterTabs
            tabs={filterTabs}
            active={filter}
            onChange={(v) => dispatch(setFilter(v))}
          />
        </div>

        {/* Table */}
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="table-header text-left">User</th>
              <th className="table-header text-left">Joined</th>
              <th className="table-header text-left">Bookings</th>
              <th className="table-header text-left">Total Spent</th>
              <th className="table-header text-left">Last Active</th>
              <th className="table-header text-left">Status</th>
              <th className="table-header text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-12 text-gray-400 text-sm"
                >
                  No users found.
                </td>
              </tr>
            ) : (
              filtered.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <td className="table-cell">
                    <div className="flex items-center gap-3">
                      <img
                        src={customer.avatar}
                        alt=""
                        className="w-9 h-9 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">
                          {customer.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {customer.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell text-gray-500">
                    {customer.joined}
                  </td>
                  <td className="table-cell text-gray-700">
                    {customer.bookings}
                  </td>
                  <td className="table-cell font-semibold text-gray-900">
                    {customer.totalSpent}
                  </td>
                  <td className="table-cell text-gray-500">
                    {customer.lastActive}
                  </td>
                  <td className="table-cell">
                    <StatusBadge status={customer.status} />
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/customers/${customer.id}`)}
                        className="btn-secondary text-xs px-3 py-1.5"
                      >
                        View
                      </button>
                      {customer.status === "active" ? (
                        <button
                          onClick={() => handleBan(customer.id, customer.name)}
                          className="bg-gray-800 text-white px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-gray-900 transition-colors"
                        >
                          BAN
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            handleUnban(customer.id, customer.name)
                          }
                          className="btn-success text-xs px-3 py-1.5"
                        >
                          Unban
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
            Showing {filtered.length} of {all.length} users
          </div>
        )}
      </div>
    </div>
  );
}
