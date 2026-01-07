"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminHeader() {
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showOnboardModal, setShowOnboardModal] = useState(false);
  const [inviteCode, setInviteCode] = useState("");

  const confirmLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  const generateInvite = () => {
    setInviteCode(
      "ACCESS-" +
        Math.random().toString(36).substring(7).toUpperCase()
    );
    setShowOnboardModal(true);
  };

  return (
    <>
      {/* HEADER ACTIONS */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <button
          onClick={generateInvite}
          className="btn-primary bg-blue-100 text-blue-700 text-xs md:text-base w-full sm:w-auto"
        >
          ➕ Create Administrator
        </button>

        <button
          onClick={() => setShowLogoutModal(true)}
          className="btn-primary bg-rose-100 text-rose-700 text-xs md:text-base w-full sm:w-auto border border-rose-200"
        >
          Exit Dashboard
        </button>
      </div>

      {/* LOGOUT MODAL */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="panel-card max-w-md w-full mx-3">
            <h3 className="text-xl font-extrabold mb-2">
              Sign Out
            </h3>

            <p className="text-sm text-[var(--color-muted)] mb-5">
              Do you really want to leave the Control Dashboard?
            </p>

            <div className="flex flex-row justify-end gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="input-box text-xs md:text-base"
              >
                Stay
              </button>

              <button
                onClick={confirmLogout}
                className="btn-primary bg-red-500 text-white text-xs md:text-base"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INVITE MODAL */}
      {showOnboardModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="panel-card max-w-lg w-full mx-3 text-center">
            <div className="flex items-center justify-center mx-auto mb-3 text-3xl">
              🔑
            </div>

            <h3 className="text-xl font-extrabold mb-1">
              Access Code Ready
            </h3>

            <p className="text-xs md:text-base text-[var(--color-muted)] mb-3">
              Share this code with new administrator
            </p>

            <div className="panel-card font-mono text-lg md:text-2xl mb-4">
              {inviteCode}
            </div>

            <button
              onClick={() => setShowOnboardModal(false)}
              className="btn-primary bg-black text-white w-full text-xs md:text-base"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
