import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  Mail,
  Calendar,
  ShoppingBag,
  Star,
  AlertTriangle,
  Flag,
} from "lucide-react";
import {
  banCustomer,
  unbanCustomer,
} from "../features/customers/customersSlice";

function ConfirmModal({
  open,
  title,
  message,
  confirmLabel,
  confirmClass,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl p-7 w-full max-w-sm mx-4">
        <h3 className="text-base font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="btn-secondary px-5 py-2 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`${confirmClass} px-5 py-2 text-sm rounded-full font-semibold`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={13}
          className={
            i <= rating
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-200 fill-gray-200"
          }
        />
      ))}
    </div>
  );
}

export default function CustomerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const customer = useSelector((s) =>
    s.customers.list.find((c) => c.id === Number(id)),
  );
  const [modal, setModal] = useState(null);
  const [activeTab, setActiveTab] = useState("bookings"); // bookings | reviews

  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-gray-400 text-sm">Customer not found.</p>
        <button onClick={() => navigate("/customers")} className="btn-primary">
          Back to Customers
        </button>
      </div>
    );
  }

  const handleBan = () => {
    dispatch(banCustomer(customer.id));
    toast.error(`${customer.name} has been banned.`);
    setModal(null);
  };
  const handleUnban = () => {
    dispatch(unbanCustomer(customer.id));
    toast.success(`${customer.name} has been unbanned.`);
    setModal(null);
  };

  const avgRating = customer.reviews?.length
    ? (
        customer.reviews.reduce((s, r) => s + r.rating, 0) /
        customer.reviews.length
      ).toFixed(1)
    : null;

  const statusColor = {
    confirmed: "bg-green-100 text-green-700",
    completed: "bg-blue-100 text-blue-700",
    pending: "bg-yellow-100 text-yellow-700",
    cancelled: "bg-red-100 text-red-600",
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back */}
      <button
        onClick={() => navigate("/customers")}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-4 transition-colors"
      >
        <ArrowLeft size={16} /> Back to Customers
      </button>

      {/* Ban banner */}
      {customer.status === "banned" && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5">
          <AlertTriangle size={16} className="text-red-500 mt-0.5 shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-bold text-red-800">Account Banned</p>
            {customer.banReason && (
              <p className="text-xs text-red-600 mt-0.5">
                {customer.banReason}
              </p>
            )}
          </div>
          <button
            onClick={() => setModal("unban")}
            className="btn-success text-xs px-3 py-1.5 shrink-0"
          >
            Unban
          </button>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* ── LEFT SIDEBAR ── */}
        <div className="w-full lg:w-64 shrink-0 space-y-4">
          {/* Profile card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center text-center">
            <img
              src={customer.avatar}
              alt={customer.name}
              className={`w-20 h-20 rounded-full object-cover border-4 border-white shadow-md mb-3 ${customer.status === "banned" ? "grayscale opacity-60" : ""}`}
            />
            <h1 className="text-lg font-extrabold text-gray-900">
              {customer.name}
            </h1>
            <p className="text-xs text-gray-400 mt-0.5 mb-3">
              {customer.email}
            </p>

            {/* Status badge */}
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full mb-4 ${
                customer.status === "active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {customer.status === "active" ? "● Active" : "⛔ Banned"}
            </span>

            {/* Quick stats */}
            <div className="w-full space-y-2.5 border-t border-gray-100 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Member since</span>
                <span className="text-xs font-semibold text-gray-800">
                  {customer.joined}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Last active</span>
                <span className="text-xs font-semibold text-gray-800">
                  {customer.lastActive}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Total bookings</span>
                <span className="text-xs font-bold text-gray-900">
                  {customer.bookings}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Total spent</span>
                <span className="text-xs font-bold text-primary">
                  {customer.totalSpent}
                </span>
              </div>
              {avgRating && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    Avg. rating given
                  </span>
                  <div className="flex items-center gap-1">
                    <Star
                      size={11}
                      className="text-yellow-400 fill-yellow-400"
                    />
                    <span className="text-xs font-bold text-gray-900">
                      {avgRating}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Account info — only email since that's all we collect */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide">
              Account Info
            </h3>
            <div className="flex items-start gap-2.5">
              <Mail size={13} className="text-gray-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-gray-400">Email</p>
                <p className="text-sm font-semibold text-gray-800">
                  {customer.email}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Calendar size={13} className="text-gray-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-gray-400">Registered</p>
                <p className="text-sm font-semibold text-gray-800">
                  {customer.joined}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <ShoppingBag
                size={13}
                className="text-gray-400 shrink-0 mt-0.5"
              />
              <div>
                <p className="text-xs text-gray-400">Total bookings</p>
                <p className="text-sm font-semibold text-gray-800">
                  {customer.bookings}
                </p>
              </div>
            </div>
            <p className="text-[10px] text-gray-300 pt-1 border-t border-gray-50">
              Only email is collected at registration. Phone and other details
              are not required.
            </p>
          </div>

          {/* Admin controls */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">
              Admin Controls
            </h3>
            <div className="space-y-2">
              {customer.status === "active" ? (
                <button
                  onClick={() => setModal("ban")}
                  className="w-full bg-gray-900 text-white text-sm py-2.5 rounded-xl font-semibold hover:bg-black transition-colors"
                >
                  ⛔ Ban Customer
                </button>
              ) : (
                <button
                  onClick={() => setModal("unban")}
                  className="w-full btn-success text-sm py-2.5 rounded-xl"
                >
                  ✓ Unban Customer
                </button>
              )}
              <button className="w-full bg-gray-100 text-gray-600 text-sm py-2.5 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                ✉ Send Email
              </button>
            </div>
          </div>
        </div>
        {/* end LEFT */}

        {/* ── RIGHT MAIN AREA ── */}
        <div className="flex-1 space-y-5">
          {/* Summary stat cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <p className="text-xs text-gray-400 mb-1">Total Bookings</p>
              <p className="text-2xl font-extrabold text-gray-900">
                {customer.bookings}
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <p className="text-xs text-gray-400 mb-1">Total Spent</p>
              <p className="text-2xl font-extrabold text-primary">
                {customer.totalSpent}
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <p className="text-xs text-gray-400 mb-1">Reviews Written</p>
              <p className="text-2xl font-extrabold text-gray-900">
                {customer.reviews?.length ?? 0}
              </p>
            </div>
          </div>

          {/* Tab switcher */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex border-b border-gray-100">
              <button
                onClick={() => setActiveTab("bookings")}
                className={`flex-1 py-3.5 text-sm font-semibold transition-colors ${
                  activeTab === "bookings"
                    ? "text-gray-900 border-b-2 border-primary"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                Bookings ({customer.bookingHistory?.length ?? 0})
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`flex-1 py-3.5 text-sm font-semibold transition-colors ${
                  activeTab === "reviews"
                    ? "text-gray-900 border-b-2 border-primary"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                Reviews ({customer.reviews?.length ?? 0})
              </button>
            </div>

            {/* ── Bookings tab ── */}
            {activeTab === "bookings" && (
              <div>
                {customer.bookingHistory?.length > 0 ? (
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="table-header text-left">Booking ID</th>
                        <th className="table-header text-left">Artist</th>
                        <th className="table-header text-left">Date</th>
                        <th className="table-header text-left">Location</th>
                        <th className="table-header text-left">Amount</th>
                        <th className="table-header text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customer.bookingHistory.map((b, i) => (
                        <tr
                          key={i}
                          className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                        >
                          <td className="table-cell font-mono text-xs text-gray-500">
                            {b.id}
                          </td>
                          <td className="table-cell">
                            <div className="flex items-center gap-2.5">
                              <img
                                src={b.artistAvatar}
                                alt=""
                                className="w-8 h-8 rounded-full object-cover"
                              />
                              <div>
                                <p className="text-sm font-semibold text-gray-900 leading-tight">
                                  {b.artist}
                                </p>
                                <p className="text-xs text-gray-400">
                                  {b.category}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="table-cell text-xs text-gray-500">
                            {b.date}
                          </td>
                          <td className="table-cell text-xs text-gray-500">
                            {b.location}
                          </td>
                          <td className="table-cell font-semibold text-sm text-gray-900">
                            {b.amount}
                          </td>
                          <td className="table-cell">
                            <span
                              className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusColor[b.status] || "bg-gray-100 text-gray-500"}`}
                            >
                              {b.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="py-16 text-center">
                    <ShoppingBag
                      size={32}
                      className="text-gray-200 mx-auto mb-3"
                    />
                    <p className="text-sm text-gray-400">No bookings yet.</p>
                  </div>
                )}
              </div>
            )}

            {/* ── Reviews tab ── */}
            {activeTab === "reviews" && (
              <div>
                {customer.reviews?.length > 0 ? (
                  <div className="divide-y divide-gray-50">
                    {customer.reviews.map((r) => (
                      <div
                        key={r.id}
                        className={`p-5 ${r.flagged ? "bg-red-50" : ""}`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={r.artistAvatar}
                              alt=""
                              className="w-9 h-9 rounded-full object-cover"
                            />
                            <div>
                              <p className="text-sm font-bold text-gray-900">
                                {r.artist}
                              </p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <StarRating rating={r.rating} />
                                <span className="text-xs text-gray-400">
                                  {r.date}
                                </span>
                              </div>
                            </div>
                          </div>
                          {r.flagged && (
                            <span className="flex items-center gap-1 text-[10px] font-bold text-red-500 bg-red-100 px-2 py-1 rounded-full shrink-0">
                              <Flag size={10} /> Flagged
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed mt-3 ml-12">
                          "{r.comment}"
                        </p>
                        {r.flagged && (
                          <div className="ml-12 mt-3 flex gap-2">
                            <button className="text-xs bg-red-500 text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-red-600 transition-colors">
                              Remove Review
                            </button>
                            <button className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                              Keep Review
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-16 text-center">
                    <Star size={32} className="text-gray-200 mx-auto mb-3" />
                    <p className="text-sm text-gray-400">
                      No reviews written yet.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        {/* end RIGHT */}
      </div>

      {/* Confirm modals */}
      {modal === "ban" && (
        <ConfirmModal
          open={true}
          title="Ban Customer"
          message={`Ban ${customer.name}? They will lose access to the platform immediately.`}
          confirmLabel="Ban"
          confirmClass="bg-gray-900 text-white hover:bg-black"
          onConfirm={handleBan}
          onCancel={() => setModal(null)}
        />
      )}
      {modal === "unban" && (
        <ConfirmModal
          open={true}
          title="Unban Customer"
          message={`Unban ${customer.name}? They will regain full platform access.`}
          confirmLabel="Unban"
          confirmClass="bg-green-500 text-white hover:bg-green-600"
          onConfirm={handleUnban}
          onCancel={() => setModal(null)}
        />
      )}
    </div>
  );
}
