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

  return (
    <div>
      <PageHeader
        title="Users"
        subtitle={`${all.length.toLocaleString()} registered users.`}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-5">
        <StatCard
          label="Total"
          value={all.length.toLocaleString()}
          badge="Active"
          badgeColor="green"
        />
        <StatCard
          label="Active"
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

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 border-b border-gray-100">
          <SearchBar
            value={searchQuery}
            onChange={(v) => dispatch(setSearchQuery(v))}
            placeholder="Search user..."
          />
          <div className="overflow-x-auto w-full sm:w-auto">
            <FilterTabs
              tabs={filterTabs}
              active={filter}
              onChange={(v) => dispatch(setFilter(v))}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="table-header text-left">User</th>
                <th className="table-header text-left hidden sm:table-cell">
                  Joined
                </th>
                <th className="table-header text-left">Bookings</th>
                <th className="table-header text-left hidden md:table-cell">
                  Total Spent
                </th>
                <th className="table-header text-left hidden lg:table-cell">
                  Last Active
                </th>
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
                      <div className="flex items-center gap-2 md:gap-3">
                        <img
                          src={customer.avatar}
                          alt=""
                          className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 text-sm truncate">
                            {customer.name}
                          </p>
                          <p className="text-xs text-gray-400 truncate hidden sm:block">
                            {customer.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell text-gray-500 text-sm hidden sm:table-cell">
                      {customer.joined}
                    </td>
                    <td className="table-cell text-gray-700">
                      {customer.bookings}
                    </td>
                    <td className="table-cell font-semibold text-gray-900 text-sm hidden md:table-cell">
                      {customer.totalSpent}
                    </td>
                    <td className="table-cell text-gray-500 text-sm hidden lg:table-cell">
                      {customer.lastActive}
                    </td>
                    <td className="table-cell">
                      <StatusBadge status={customer.status} />
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center gap-1 md:gap-2">
                        <button
                          onClick={() => navigate(`/customers/${customer.id}`)}
                          className="btn-secondary text-xs px-2 md:px-3 py-1.5"
                        >
                          View
                        </button>
                        {customer.status === "active" ? (
                          <button
                            onClick={() => {
                              dispatch(banCustomer(customer.id));
                              toast.error(`${customer.name} banned`);
                            }}
                            className="bg-gray-800 text-white px-2 md:px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-gray-900 transition-colors"
                          >
                            BAN
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              dispatch(unbanCustomer(customer.id));
                              toast.success(`${customer.name} unbanned`);
                            }}
                            className="btn-success text-xs px-2 md:px-3 py-1.5"
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
        </div>

        {filtered.length > 0 && (
          <div className="px-4 py-3 text-xs text-gray-400">
            Showing {filtered.length} of {all.length} users
          </div>
        )}
      </div>
    </div>
  );
}
