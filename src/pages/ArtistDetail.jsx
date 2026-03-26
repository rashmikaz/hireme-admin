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
  AlertTriangle,
  Play,
  Music,
  Youtube,
} from "lucide-react";
import {
  approveArtist,
  rejectArtist,
  suspendArtist,
  unsuspendArtist,
} from "../features/artists/artistsSlice";
import StatusBadge from "../components/common/StatusBadge";

// ─── Social icons ─────────────────────────────────────────────────
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

// ─── Confirm modal ────────────────────────────────────────────────
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

// ─── Main component ───────────────────────────────────────────────
export default function ArtistDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const artist = useSelector((s) =>
    s.artists.list.find((a) => a.id === Number(id)),
  );

  const [modal, setModal] = useState(null);
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

  const handleAction = (type) => {
    switch (type) {
      case "approve":
        dispatch(approveArtist(artist.id));
        toast.success(`${artist.name} approved!`);
        break;
      case "reject":
        dispatch(rejectArtist(artist.id));
        toast.error(`${artist.name} rejected.`);
        break;
      case "suspend":
        dispatch(suspendArtist(artist.id));
        toast.error(`${artist.name} suspended.`);
        break;
      case "unsuspend":
        dispatch(unsuspendArtist(artist.id));
        toast.success(`${artist.name} reinstated!`);
        break;
    }
    setModal(null);
  };

  const modalConfig = {
    approve: {
      title: "Approve Artist",
      message: `Approve ${artist.name}? Their profile will go live immediately.`,
      confirmLabel: "Approve",
      confirmClass: "bg-green-500 text-white hover:bg-green-600",
    },
    reject: {
      title: "Reject Artist",
      message: `Reject ${artist.name}? This moves them to Suspended status.`,
      confirmLabel: "Reject",
      confirmClass: "bg-red-500 text-white hover:bg-red-600",
    },
    suspend: {
      title: "Suspend Artist",
      message: `Suspend ${artist.name}? They will lose platform access.`,
      confirmLabel: "Suspend",
      confirmClass: "bg-red-500 text-white hover:bg-red-600",
    },
    unsuspend: {
      title: "Reinstate Artist",
      message: `Reinstate ${artist.name}? Their profile becomes active again.`,
      confirmLabel: "Reinstate",
      confirmClass: "bg-green-500 text-white hover:bg-green-600",
    },
  };

  const vd = artist.verificationData;

  // ══════════════════════════════════════════════════════════════════
  //  PENDING — 3-step onboarding form read-only review
  // ══════════════════════════════════════════════════════════════════
  if (artist.status === "pending") {
    return (
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/artists")}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Artists
        </button>

        {/* Page title + status */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">
              {artist.name}
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
              {artist.category} · {artist.location}
            </p>
          </div>
          <span className="text-xs bg-yellow-100 text-yellow-700 font-semibold px-3 py-1.5 rounded-full">
            ⏳ Awaiting Review · {vd?.submittedDate}
          </span>
        </div>

        {/* Two columns: left = submitted data, right = sidebar */}
        <div className="flex flex-col lg:flex-row gap-7">
          {/* ── LEFT: submitted data only, no form chrome ── */}
          <div className="flex-1 space-y-5">
            {/* ── Section 1: Basic Info ── */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4">
                Basic Info
              </h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-0">
                {[
                  ["Full Name", vd?.profile.fullName],
                  ["Stage Name", artist.name],
                  ["Location", vd?.profile.location],
                  ["Phone", vd?.profile.phone],
                  ["Email", artist.email],
                  ["Category", vd?.profile.category || artist.category],
                  ["Date of Birth", vd?.profile.dateOfBirth],
                  ["Genres", vd?.profile.genres],
                ].map(([label, value], i) => (
                  <div
                    key={i}
                    className="border-b border-gray-50 py-3 last:border-0"
                  >
                    <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {value || "—"}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Section 2: Uploaded Documents ── */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4">
                Uploaded Documents
              </h3>
              {/* Only show documents that were actually uploaded */}
              <div className="flex flex-wrap gap-3">
                {vd?.documents
                  .filter((d) => d.uploaded)
                  .map((doc, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center gap-2 px-5 py-4 rounded-2xl border-2 border-primary bg-primary-light"
                    >
                      <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                        <svg
                          viewBox="0 0 24 24"
                          className="w-6 h-6 text-primary"
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
                      <span className="text-xs font-semibold text-gray-700 text-center">
                        {doc.label}
                      </span>
                      <span className="text-[10px] text-green-600 font-bold">
                        ✓ Uploaded
                      </span>
                    </div>
                  ))}
                {vd?.documents.filter((d) => d.uploaded).length === 0 && (
                  <p className="text-sm text-gray-400">
                    No documents uploaded.
                  </p>
                )}
              </div>
            </div>

            {/* ── Section 3: Portfolio & Video ── */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4">
                Portfolio & Videos
              </h3>
              {vd?.portfolio.images?.length > 0 || vd?.portfolio.video ? (
                <div className="grid grid-cols-4 gap-3">
                  {vd.portfolio.images.map((img, i) => (
                    <div
                      key={i}
                      className="relative rounded-2xl overflow-hidden cursor-pointer"
                      style={{ paddingBottom: "100%" }}
                      onClick={() => {
                        setActiveGalleryImg(i);
                        setGalleryOpen(true);
                      }}
                    >
                      <img
                        src={img}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  ))}
                  {vd.portfolio.video && (
                    <div
                      className="relative rounded-2xl overflow-hidden bg-gray-800"
                      style={{ paddingBottom: "100%" }}
                    >
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                        <Play size={20} className="text-white" />
                        <span className="text-white text-xs font-bold tracking-widest">
                          VIDEO
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm text-gray-400">No portfolio uploaded.</p>
              )}
            </div>

            {/* ── Section 4: Pricing ── */}
            {vd?.pricing && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4">
                  Pricing
                </h3>
                <div className="grid grid-cols-2 gap-x-8 gap-y-0">
                  {[
                    [
                      "Base Price",
                      `LKR ${vd.pricing.basePrice.toLocaleString()}`,
                    ],
                    [
                      "Per Hour",
                      `LKR ${vd.pricing.pricePerHour.toLocaleString()}`,
                    ],
                    ["Travel Radius", `${vd.travelRadius} km`],
                  ].map(([label, value], i) => (
                    <div
                      key={i}
                      className="border-b border-gray-50 py-3 last:border-0"
                    >
                      <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {value}
                      </p>
                    </div>
                  ))}
                  <div className="col-span-2 pt-3">
                    <p className="text-xs text-gray-400 mb-2">Add-ons</p>
                    <div className="flex flex-wrap gap-2">
                      {vd.pricing.addOns.map((a, i) => (
                        <span
                          key={i}
                          className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── Section 5: Social Links ── */}
            {vd?.socialLinks && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4">
                  Social Media Links
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      key: "instagram",
                      label: "Instagram",
                      icon: (
                        <svg
                          viewBox="0 0 24 24"
                          className="w-4 h-4"
                          fill="currentColor"
                        >
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      ),
                      color: "text-pink-500 bg-pink-50",
                    },
                    {
                      key: "facebook",
                      label: "Facebook",
                      icon: (
                        <svg
                          viewBox="0 0 24 24"
                          className="w-4 h-4"
                          fill="currentColor"
                        >
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      ),
                      color: "text-blue-600 bg-blue-50",
                    },
                    {
                      key: "youtube",
                      label: "YouTube",
                      icon: (
                        <svg
                          viewBox="0 0 24 24"
                          className="w-4 h-4"
                          fill="currentColor"
                        >
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                      ),
                      color: "text-red-500 bg-red-50",
                    },
                    {
                      key: "spotify",
                      label: "Spotify",
                      icon: (
                        <svg
                          viewBox="0 0 24 24"
                          className="w-4 h-4"
                          fill="currentColor"
                        >
                          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                        </svg>
                      ),
                      color: "text-green-600 bg-green-50",
                    },
                  ].map(({ key, label, icon, color }) => {
                    const url = vd.socialLinks[key];
                    return (
                      <div key={key} className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${url ? color : "text-gray-300 bg-gray-50"}`}
                        >
                          {icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-400 mb-0.5">
                            {label}
                          </p>
                          {url ? (
                            <a
                              href={url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-sm font-medium text-primary hover:underline truncate block"
                            >
                              {url.replace("https://", "")}
                            </a>
                          ) : (
                            <p className="text-sm text-gray-300">
                              Not provided
                            </p>
                          )}
                        </div>
                        {url && (
                          <span className="text-[10px] bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full shrink-0">
                            ✓
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          {/* end LEFT */}

          {/* ── RIGHT SIDEBAR ── */}
          <div className="w-full lg:w-60 shrink-0 space-y-4">
            {/* Applicant info */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4">
                Applicant
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={artist.avatar}
                  alt=""
                  className="w-10 h-10 rounded-full object-cover border-2 border-gray-100"
                />
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    {artist.name}
                  </p>
                  <p className="text-xs text-gray-400">{artist.category}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Mail size={11} className="text-gray-400 shrink-0" />
                  <span className="truncate">{artist.email}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Phone size={11} className="text-gray-400 shrink-0" />
                  {vd?.profile.phone}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <MapPin size={11} className="text-gray-400 shrink-0" />
                  {artist.location}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar size={11} className="text-gray-400 shrink-0" />
                  Applied {vd?.submittedDate}
                </div>
              </div>
            </div>

            {/* Documents checklist */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">
                Documents
              </h3>
              <div className="space-y-2.5">
                {vd?.documents.map((doc, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">{doc.label}</span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        doc.uploaded
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {doc.uploaded ? "✓ Uploaded" : "Missing"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing summary */}
            {vd?.pricing && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">
                  Pricing
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Base Price</span>
                    <span className="text-xs font-bold text-gray-900">
                      LKR {vd.pricing.basePrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Per Hour</span>
                    <span className="text-xs font-bold text-gray-900">
                      LKR {vd.pricing.pricePerHour.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Travel</span>
                    <span className="text-xs font-bold text-gray-900">
                      {vd.travelRadius} km
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Decision */}
            <div className="bg-gray-900 rounded-2xl p-5 space-y-3">
              <p className="text-xs font-bold text-white">Admin Decision</p>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Review all 3 steps above before approving.
              </p>
              <button
                onClick={() => setModal("approve")}
                className="w-full bg-green-500 text-white font-bold py-2.5 rounded-xl text-sm hover:bg-green-600 transition-colors"
              >
                ✓ Approve
              </button>
              <button
                onClick={() => setModal("reject")}
                className="w-full bg-red-500/20 text-red-400 border border-red-500/30 font-semibold py-2.5 rounded-xl text-sm hover:bg-red-500/30 transition-colors"
              >
                ✗ Reject
              </button>
            </div>
          </div>
          {/* end SIDEBAR */}
        </div>

        {/* Gallery lightbox */}
        {galleryOpen && vd?.portfolio.images && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={() => setGalleryOpen(false)}
          >
            <img
              src={vd.portfolio.images[activeGalleryImg]}
              alt=""
              className="max-h-[85vh] max-w-[85vw] rounded-xl object-contain"
            />
          </div>
        )}

        {modal && modalConfig[modal] && (
          <ConfirmModal
            open={true}
            {...modalConfig[modal]}
            onConfirm={() => handleAction(modal)}
            onCancel={() => setModal(null)}
          />
        )}
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════
  //  VERIFIED / SUSPENDED — full profile view
  // ══════════════════════════════════════════════════════════════════
  return (
    <div className="max-w-5xl mx-auto">
      <button
        onClick={() => navigate("/artists")}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-5 transition-colors"
      >
        <ArrowLeft size={16} /> Back to Artists
      </button>

      {artist.status === "suspended" && (
        <div className="flex items-start gap-3 border rounded-xl px-4 py-3 mb-5 bg-red-50 border-red-200">
          <AlertTriangle size={16} className="text-red-600 mt-0.5 shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-bold text-red-800">Account Suspended</p>
            {artist.suspendReason && (
              <p className="text-xs text-red-600 mt-0.5">
                {artist.suspendReason}
              </p>
            )}
          </div>
          <button
            onClick={() => setModal("unsuspend")}
            className="btn-success text-xs px-3 py-1.5 shrink-0"
          >
            Reinstate
          </button>
        </div>
      )}

      {/* Cover + Avatar hero — avatar sits ON TOP of cover, not hidden behind it */}
      <div className="relative mb-16">
        {/* Cover photo */}
        <div className="h-48 md:h-56 rounded-2xl overflow-hidden bg-gray-200">
          {artist.coverImage ? (
            <img
              src={artist.coverImage}
              alt="cover"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900" />
          )}
          {artist.status === "suspended" && (
            <div className="absolute inset-0 rounded-2xl bg-gray-900/60 flex items-center justify-center">
              <span className="text-white font-bold text-lg tracking-widest uppercase opacity-80">
                ⛔ Account Suspended
              </span>
            </div>
          )}
        </div>
        {/* Avatar — absolutely positioned over bottom of cover */}
        <div className="absolute -bottom-12 left-6">
          <img
            src={artist.avatar}
            alt={artist.name}
            className={`w-24 h-24 rounded-full object-cover border-4 border-white shadow-xl ${artist.status === "suspended" ? "grayscale opacity-70" : ""}`}
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* LEFT */}
        <div className="w-full lg:w-72 shrink-0 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 pt-5 pb-6">
            <div className="mb-3">
              <h1 className="text-2xl font-extrabold text-gray-900 mb-1">
                {artist.name}
              </h1>
              <div className="flex items-center gap-1 mb-3">
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
            {artist.tags?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {artist.tags.map((t, i) => (
                  <span
                    key={i}
                    className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
            <p className="text-xs text-gray-500 leading-relaxed mb-4">
              {artist.bio}
            </p>
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-2xl font-extrabold text-primary">
                  LKR {artist.basePrice.toLocaleString()}
                </span>
                <span className="text-xs text-gray-400">starting price</span>
              </div>
              <p className="text-xs text-gray-400">{artist.priceRange}</p>
            </div>
            <button className="w-full bg-primary text-white font-bold py-2.5 rounded-xl text-sm hover:bg-primary-dark transition-colors">
              Bookings ({artist.bookings})
            </button>
          </div>

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

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">
              Admin Controls
            </h3>
            <div className="space-y-2">
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

        {/* RIGHT */}
        <div className="flex-1 space-y-5">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Overview</h2>
            <div className="flex items-center gap-4 mb-5 text-sm text-gray-500">
              <span>👤 {artist.category}</span>
              <span className="text-gray-200">|</span>
              <span>📍 {artist.location}</span>
              <span className="text-gray-200">|</span>
              <span>🔞 {artist.ageLimit}</span>
            </div>
            <div className="space-y-3">
              {artist.overview.split("\n\n").map((p, i) => (
                <p key={i} className="text-sm text-gray-600 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
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

          {artist.gallery?.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Gallery</h2>
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
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                    {i === artist.gallery.length - 1 &&
                      artist.gallery.length >= 3 && (
                        <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-lg">
                          📷 Show all
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {artist.media?.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Audio &amp; Video
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
                    <p className="flex-1 text-sm text-gray-700">{item.title}</p>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${item.type === "youtube" ? "bg-red-100" : "bg-green-100"}`}
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
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${b.status === "confirmed" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}
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
        </div>
      </div>

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
                className={`w-2 h-2 rounded-full transition-colors ${i === activeGalleryImg ? "bg-white" : "bg-white/40"}`}
              />
            ))}
          </div>
        </div>
      )}

      {modal && modalConfig[modal] && (
        <ConfirmModal
          open={true}
          {...modalConfig[modal]}
          onConfirm={() => handleAction(modal)}
          onCancel={() => setModal(null)}
        />
      )}
    </div>
  );
}
