import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  MapPin,
  Star,
  Phone,
  Mail,
  Calendar,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertTriangle,
  Play,
  Music,
  Youtube,
  Image,
  DollarSign,
} from "lucide-react";
import {
  approveArtist,
  rejectArtist,
  suspendArtist,
  unsuspendArtist,
} from "../features/artists/artistsSlice";
import StatusBadge from "../components/common/StatusBadge";

// Social icons as simple SVG components
const AppleMusicIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M23.994 6.124a9.23 9.23 0 0 0-.24-2.19c-.317-1.31-1.064-2.31-2.18-3.043a5.022 5.022 0 0 0-1.877-.726 10.496 10.496 0 0 0-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026C4.786.143 4.043.17 3.34.443 2.69.698 2.109 1.1 1.637 1.625a4.975 4.975 0 0 0-1.09 2.022 9.278 9.278 0 0 0-.34 2.553v11.596c.006.34.01.682.027 1.022.06 1.168.36 2.07 1.018 2.912.24.305.533.572.855.795 1.026.72 2.168.973 3.396 1.005.33.008.66.012.992.012h11.592c.34 0 .678-.004 1.017-.012 1.13-.028 2.202-.29 3.176-.918.78-.51 1.396-1.2 1.796-2.09.27-.6.404-1.232.456-1.886.014-.183.021-.365.027-.547V6.124zm-7.27 12.38a2.03 2.03 0 0 1-1.19.628 2.041 2.041 0 0 1-.298.022 2.044 2.044 0 0 1-2.044-2.044 2.044 2.044 0 0 1 2.044-2.044c.1 0 .2.007.298.022V9.47l-5.114 1.1v5.668a2.044 2.044 0 0 1-2.044 2.044 2.044 2.044 0 0 1-2.044-2.044 2.044 2.044 0 0 1 2.044-2.044c.1 0 .2.007.298.022V8.17l7.05-1.516v8.85z" />
  </svg>
);
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);
const SpotifyIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
);

// Status banner config
const statusConfig = {
  verified: {
    banner: null,
  },
  pending: {
    banner: {
      bg: "bg-yellow-50 border-yellow-200",
      icon: <Clock size={16} className="text-yellow-600" />,
      text: "text-yellow-800",
      label: "Pending Verification",
    },
  },
  suspended: {
    banner: {
      bg: "bg-red-50 border-red-200",
      icon: <AlertTriangle size={16} className="text-red-600" />,
      text: "text-red-800",
      label: "Account Suspended",
    },
  },
};

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

export default function ArtistDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const artist = useSelector((s) =>
    s.artists.list.find((a) => a.id === Number(id)),
  );

  const [modal, setModal] = useState(null); // { type: 'approve'|'reject'|'suspend'|'unsuspend' }
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activeGalleryImg, setActiveGalleryImg] = useState(0);

  if (!artist) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-gray-400 text-sm">Artist not found.</p>
        <button onClick={() => navigate("/artists")} className="btn-primary">
          Back to Artists
        </button>
      </div>
    );
  }

  const cfg = statusConfig[artist.status];

  const handleAction = (type) => {
    switch (type) {
      case "approve":
        dispatch(approveArtist(artist.id));
        toast.success(`${artist.name} has been approved!`);
        break;
      case "reject":
        dispatch(rejectArtist(artist.id));
        toast.error(`${artist.name} has been rejected.`);
        break;
      case "suspend":
        dispatch(suspendArtist(artist.id));
        toast.error(`${artist.name} has been suspended.`);
        break;
      case "unsuspend":
        dispatch(unsuspendArtist(artist.id));
        toast.success(`${artist.name} has been reinstated.`);
        break;
    }
    setModal(null);
  };

  const modalConfig = {
    approve: {
      title: "Approve Artist",
      message: `Are you sure you want to approve ${artist.name}? Their profile will go live immediately.`,
      confirmLabel: "Approve",
      confirmClass: "bg-green-500 text-white hover:bg-green-600",
    },
    reject: {
      title: "Reject Artist",
      message: `Are you sure you want to reject ${artist.name}? This will move them to Suspended status.`,
      confirmLabel: "Reject",
      confirmClass: "bg-red-500 text-white hover:bg-red-600",
    },
    suspend: {
      title: "Suspend Artist",
      message: `Are you sure you want to suspend ${artist.name}? They will lose access to the platform.`,
      confirmLabel: "Suspend",
      confirmClass: "bg-red-500 text-white hover:bg-red-600",
    },
    unsuspend: {
      title: "Reinstate Artist",
      message: `Are you sure you want to reinstate ${artist.name}? Their profile will become active again.`,
      confirmLabel: "Reinstate",
      confirmClass: "bg-green-500 text-white hover:bg-green-600",
    },
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate("/artists")}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-5 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Artists
      </button>

      {/* Status banner — shown for pending & suspended only */}
      {cfg.banner && (
        <div
          className={`flex items-start gap-3 border rounded-xl px-4 py-3 mb-5 ${cfg.banner.bg}`}
        >
          {cfg.banner.icon}
          <div className="flex-1">
            <p className={`text-sm font-bold ${cfg.banner.text}`}>
              {cfg.banner.label}
            </p>
            {artist.status === "suspended" && artist.suspendReason && (
              <p className="text-xs text-red-600 mt-0.5">
                {artist.suspendReason}
              </p>
            )}
            {artist.status === "pending" && artist.pendingNote && (
              <p className="text-xs text-yellow-700 mt-0.5">
                {artist.pendingNote}
              </p>
            )}
          </div>
          {/* Quick action from banner */}
          {artist.status === "pending" && (
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => setModal("reject")}
                className="btn-danger text-xs px-3 py-1.5"
              >
                Reject
              </button>
              <button
                onClick={() => setModal("approve")}
                className="btn-success text-xs px-3 py-1.5"
              >
                Approve
              </button>
            </div>
          )}
          {artist.status === "suspended" && (
            <button
              onClick={() => setModal("unsuspend")}
              className="btn-success text-xs px-3 py-1.5 shrink-0"
            >
              Reinstate
            </button>
          )}
        </div>
      )}

      {/* Cover photo */}
      <div className="relative h-56 rounded-2xl overflow-hidden mb-0 bg-gray-200">
        {artist.coverImage ? (
          <img
            src={artist.coverImage}
            alt="cover"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900" />
        )}
        {/* Suspended overlay */}
        {artist.status === "suspended" && (
          <div className="absolute inset-0 bg-gray-900/60 flex items-center justify-center">
            <span className="text-white font-bold text-lg tracking-widest uppercase opacity-80">
              ⛔ Account Suspended
            </span>
          </div>
        )}
      </div>

      {/* Two column layout */}
      <div className="flex gap-6 mt-0">
        {/* LEFT COLUMN */}
        <div className="w-72 shrink-0 space-y-4">
          {/* Profile card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 pt-0 pb-6 -mt-8 relative">
            {/* Avatar */}
            <div className="flex justify-center -mt-10 mb-3">
              <img
                src={artist.avatar}
                alt={artist.name}
                className={`w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg ${
                  artist.status === "suspended" ? "grayscale opacity-70" : ""
                }`}
              />
            </div>

            {/* Name & rating */}
            <div className="text-center mb-3">
              <div className="flex items-center justify-center gap-2 mb-0.5">
                <h1 className="text-2xl font-extrabold text-gray-900">
                  {artist.name}
                </h1>
              </div>
              <div className="flex items-center justify-center gap-1 mb-3">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                <span className="font-bold text-gray-700 text-sm">
                  {artist.rating}
                </span>
                <span className="text-gray-400 text-xs">
                  ({artist.reviewCount} reviews)
                </span>
              </div>
              <StatusBadge status={artist.status} />
            </div>

            {/* Tags */}
            {artist.tags?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 justify-center mb-4">
                {artist.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Bio */}
            <p className="text-xs text-gray-500 text-center leading-relaxed mb-4">
              {artist.bio}
            </p>

            {/* Price */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-2xl font-extrabold text-primary">
                  LKR {artist.basePrice.toLocaleString()}
                </span>
                <span className="text-xs text-gray-400 font-medium">
                  starting price
                </span>
              </div>
              <p className="text-xs text-gray-400">{artist.priceRange}</p>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <button className="flex-1 bg-primary text-white font-bold py-2.5 rounded-xl text-sm hover:bg-primary-dark transition-colors">
                Bookings ({artist.bookings})
              </button>
              <button className="flex-1 border-2 border-gray-200 text-gray-700 font-bold py-2.5 rounded-xl text-sm hover:bg-gray-50 transition-colors">
                Edit Profile
              </button>
            </div>
          </div>

          {/* Contact info */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide">
              Contact
            </h3>
            <div className="flex items-center gap-3">
              <Mail size={14} className="text-gray-400 shrink-0" />
              <span className="text-sm text-gray-700 truncate">
                {artist.email}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={14} className="text-gray-400 shrink-0" />
              <span className="text-sm text-gray-700">{artist.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={14} className="text-gray-400 shrink-0" />
              <span className="text-sm text-gray-700">{artist.location}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar size={14} className="text-gray-400 shrink-0" />
              <span className="text-sm text-gray-700">
                Joined {artist.joinedDate}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide">
              Platform Stats
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Total Bookings</span>
              <span className="text-sm font-bold text-gray-900">
                {artist.bookings}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Total Earnings</span>
              <span className="text-sm font-bold text-gray-900">
                {artist.totalEarnings}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Completion Rate</span>
              <div className="flex items-center gap-1.5">
                <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${artist.completionRate}%` }}
                  />
                </div>
                <span className="text-sm font-bold text-gray-900">
                  {artist.completionRate}%
                </span>
              </div>
            </div>
          </div>

          {/* Social & Web */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-sm font-bold text-gray-700 text-center mb-4">
              Social & Web
            </h3>
            <div className="flex justify-center gap-4">
              {artist.socials?.apple && (
                <a
                  href={artist.socials.apple}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
                >
                  <AppleMusicIcon />
                </a>
              )}
              {artist.socials?.facebook && (
                <a
                  href={artist.socials.facebook}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
                >
                  <FacebookIcon />
                </a>
              )}
              {artist.socials?.instagram && (
                <a
                  href={artist.socials.instagram}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
                >
                  <InstagramIcon />
                </a>
              )}
              {artist.socials?.spotify && (
                <a
                  href={artist.socials.spotify}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
                >
                  <SpotifyIcon />
                </a>
              )}
            </div>
          </div>

          {/* Admin controls */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">
              Admin Controls
            </h3>
            <div className="space-y-2">
              {artist.status === "pending" && (
                <>
                  <button
                    onClick={() => setModal("approve")}
                    className="w-full btn-success text-sm py-2.5 rounded-xl"
                  >
                    ✓ Approve Artist
                  </button>
                  <button
                    onClick={() => setModal("reject")}
                    className="w-full btn-danger text-sm py-2.5 rounded-xl"
                  >
                    ✗ Reject Application
                  </button>
                </>
              )}
              {artist.status === "verified" && (
                <button
                  onClick={() => setModal("suspend")}
                  className="w-full bg-red-500 text-white text-sm py-2.5 rounded-xl font-semibold hover:bg-red-600 transition-colors"
                >
                  ⛔ Suspend Artist
                </button>
              )}
              {artist.status === "suspended" && (
                <button
                  onClick={() => setModal("unsuspend")}
                  className="w-full btn-success text-sm py-2.5 rounded-xl"
                >
                  ✓ Reinstate Artist
                </button>
              )}
              <button className="w-full bg-gray-100 text-gray-600 text-sm py-2.5 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                ✉ Send Message
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex-1 space-y-5 -mt-8 pt-12">
          {/* ── PENDING: show verification submission ── */}
          {artist.status === "pending" && artist.verificationData ? (
            <>
              {/* Submission header */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-1">
                  <Clock size={15} className="text-yellow-600" />
                  <span className="text-sm font-bold text-yellow-800">
                    Verification Application
                  </span>
                </div>
                <p className="text-xs text-yellow-700">
                  Submitted on {artist.verificationData.submittedDate} —
                  awaiting admin review.
                </p>
              </div>

              {/* Profile Information + Documents side by side */}
              <div className="flex gap-4">
                {/* Profile info */}
                <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-4">
                    Profile Information
                  </h2>
                  <div className="space-y-0">
                    {Object.entries(artist.verificationData.profile).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between border-b border-gray-50 py-3 last:border-0"
                        >
                          <span className="text-sm text-gray-400 capitalize">
                            {key.replace(/([A-Z])/g, " $1")}
                          </span>
                          <span className="text-sm font-semibold text-gray-800">
                            {value}
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                {/* Documents */}
                <div className="w-56 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-4">
                    Documents
                  </h2>
                  <div className="grid grid-cols-2 gap-2">
                    {artist.verificationData.documents.map((doc, i) => (
                      <button
                        key={i}
                        disabled={!doc.uploaded}
                        className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-colors ${
                          doc.uploaded
                            ? "border-gray-200 bg-gray-50 hover:border-primary hover:bg-primary-light cursor-pointer"
                            : "border-dashed border-gray-200 bg-gray-50 opacity-40 cursor-not-allowed"
                        }`}
                      >
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                            doc.uploaded ? "bg-purple-100" : "bg-gray-100"
                          }`}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            className={`w-5 h-5 ${doc.uploaded ? "text-primary" : "text-gray-400"}`}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                            />
                          </svg>
                        </div>
                        <span className="text-xs text-gray-600 text-center leading-tight">
                          {doc.label}
                        </span>
                        {!doc.uploaded && (
                          <span className="text-[10px] text-gray-400">
                            Not uploaded
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Portfolio */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-4">
                  Portfolio
                </h2>
                <div className="grid grid-cols-4 gap-3">
                  {artist.verificationData.portfolio.images.map((img, i) => (
                    <div
                      key={i}
                      className="relative rounded-xl overflow-hidden cursor-pointer"
                      style={{ paddingBottom: "75%" }}
                      onClick={() => {
                        setActiveGalleryImg(i);
                        setGalleryOpen(true);
                      }}
                    >
                      <img
                        src={img}
                        alt={`Portfolio ${i + 1}`}
                        className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  ))}
                  {artist.verificationData.portfolio.video && (
                    <div
                      className="relative rounded-xl overflow-hidden bg-gray-800 cursor-pointer flex flex-col items-center justify-center gap-1"
                      style={{ paddingBottom: "75%" }}
                    >
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                        <Play size={22} className="text-white" />
                        <span className="text-white text-xs font-bold tracking-widest">
                          VIDEO
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Pricing & Travel */}
              <div className="flex gap-4">
                {/* Pricing */}
                <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-4">
                    Pricing Setup
                  </h2>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b border-gray-50 pb-3">
                      <span className="text-sm text-gray-400">Base Price</span>
                      <span className="text-sm font-bold text-gray-900">
                        LKR{" "}
                        {artist.verificationData.pricing.basePrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-gray-50 pb-3">
                      <span className="text-sm text-gray-400">
                        Price per Hour
                      </span>
                      <span className="text-sm font-bold text-gray-900">
                        LKR{" "}
                        {artist.verificationData.pricing.pricePerHour.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-2">Add-ons</p>
                      <div className="space-y-1.5">
                        {artist.verificationData.pricing.addOns.map(
                          (addon, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                              <span className="text-sm text-gray-700">
                                {addon}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Travel radius */}
                <div className="w-52 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center justify-center">
                  <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-4 text-center">
                    Travel Radius
                  </h2>
                  <div className="relative w-28 h-28 flex items-center justify-center">
                    <svg viewBox="0 0 36 36" className="w-28 h-28 -rotate-90">
                      <circle
                        cx="18"
                        cy="18"
                        r="15.9"
                        fill="none"
                        stroke="#f3f4f6"
                        strokeWidth="3"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="15.9"
                        fill="none"
                        stroke="#E3232C"
                        strokeWidth="3"
                        strokeDasharray={`${(artist.verificationData.travelRadius / 200) * 100} 100`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-extrabold text-gray-900">
                        {artist.verificationData.travelRadius}
                      </span>
                      <span className="text-xs text-gray-400">km</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-3 text-center">
                    Willing to travel up to{" "}
                    {artist.verificationData.travelRadius}km from{" "}
                    {artist.location}
                  </p>
                </div>
              </div>

              {/* Final decision bar */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    Ready to make a decision?
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Approving will make {artist.name}'s profile live
                    immediately.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setModal("reject")}
                    className="btn-danger px-6 py-2.5 text-sm rounded-xl"
                  >
                    ✗ Reject
                  </button>
                  <button
                    onClick={() => setModal("approve")}
                    className="bg-green-500 text-white font-semibold px-6 py-2.5 text-sm rounded-xl hover:bg-green-600 transition-colors"
                  >
                    ✓ Approve
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* ── VERIFIED / SUSPENDED: normal profile view ── */
            <>
              {/* Overview */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Overview</h2>
                </div>

                {/* Meta pills */}
                <div className="flex items-center gap-4 mb-5 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <span className="text-gray-400">👤</span> {artist.category}
                  </span>
                  <span className="text-gray-200">|</span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-gray-400">☀</span> {artist.location}
                  </span>
                  <span className="text-gray-200">|</span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-gray-400">☀</span> {artist.ageLimit}
                  </span>
                </div>

                {/* Overview text */}
                <div className="space-y-3">
                  {artist.overview.split("\n\n").map((para, i) => (
                    <p
                      key={i}
                      className="text-sm text-gray-600 leading-relaxed"
                    >
                      {para}
                    </p>
                  ))}
                </div>

                {/* Genres */}
                {artist.genres?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {artist.genres.map((g, i) => (
                      <span
                        key={i}
                        className="text-xs bg-primary-light text-primary px-3 py-1 rounded-full font-medium"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Gallery */}
              {artist.gallery?.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">
                    Gallery
                  </h2>
                  <div className="grid grid-cols-3 gap-2">
                    {artist.gallery.map((img, i) => (
                      <div
                        key={i}
                        className="relative rounded-xl overflow-hidden cursor-pointer"
                        style={{ paddingBottom: "66%" }}
                        onClick={() => {
                          setActiveGalleryImg(i);
                          setGalleryOpen(true);
                        }}
                      >
                        <img
                          src={img}
                          alt={`Gallery ${i + 1}`}
                          className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                        {i === artist.gallery.length - 1 &&
                          artist.gallery.length >= 3 && (
                            <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-lg font-medium">
                              📷 Show all {artist.gallery.length} photos
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Audio & Video */}
              {artist.media?.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">
                    Audio & Video
                  </h2>
                  <div className="space-y-3">
                    {artist.media.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer"
                      >
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                          {item.type === "youtube" ? (
                            <Play size={16} className="text-gray-500" />
                          ) : (
                            <Music size={16} className="text-gray-500" />
                          )}
                        </div>
                        <p className="flex-1 text-sm text-gray-700 leading-snug">
                          {item.title}
                        </p>
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                            item.type === "youtube"
                              ? "bg-red-100"
                              : "bg-green-100"
                          }`}
                        >
                          {item.type === "youtube" ? (
                            <Youtube size={14} className="text-red-600" />
                          ) : (
                            <SpotifyIcon />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Booking history preview */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">
                    Recent Bookings
                  </h2>
                  <span className="text-xs text-primary font-semibold cursor-pointer hover:underline">
                    View all →
                  </span>
                </div>
                {artist.bookings > 0 ? (
                  <div className="space-y-3">
                    {[
                      {
                        customer: "Alex Jean",
                        date: "Mar 28, 2026",
                        amount: "LKR 12,000",
                        status: "confirmed",
                      },
                      {
                        customer: "Samantha Lee",
                        date: "Mar 20, 2026",
                        amount: "LKR 8,500",
                        status: "completed",
                      },
                      {
                        customer: "Tom Wilson",
                        date: "Mar 14, 2026",
                        amount: "LKR 15,000",
                        status: "completed",
                      },
                    ].map((b, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {b.customer}
                          </p>
                          <p className="text-xs text-gray-400">{b.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-gray-900">
                            {b.amount}
                          </p>
                          <span
                            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                              b.status === "confirmed"
                                ? "bg-green-100 text-green-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {b.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 text-center py-6">
                    No bookings yet.
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Gallery lightbox */}
      {galleryOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setGalleryOpen(false)}
        >
          <img
            src={artist.gallery[activeGalleryImg]}
            alt=""
            className="max-h-[85vh] max-w-[85vw] rounded-xl object-contain"
          />
          <div className="absolute bottom-8 flex gap-3">
            {artist.gallery.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveGalleryImg(i);
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === activeGalleryImg ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Confirm modals */}
      {modal && modalConfig[modal] && (
        <ConfirmModal
          open={true}
          title={modalConfig[modal].title}
          message={modalConfig[modal].message}
          confirmLabel={modalConfig[modal].confirmLabel}
          confirmClass={modalConfig[modal].confirmClass}
          onConfirm={() => handleAction(modal)}
          onCancel={() => setModal(null)}
        />
      )}
    </div>
  );
}
