import React from "react";

export default function Topbar({ user }) {
  return (
    <header className="flex justify-between items-center bg-white shadow px-6 py-4">
      <div className="text-lg font-semibold">Welcome back, {user.name}</div>
      <div className="flex items-center gap-4">
        <button
          aria-label="Notifications"
          className="text-gray-500 hover:text-gray-700"
          title="Notifications"
        >
          🔔
        </button>
        <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white font-semibold">
          {user.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()}
        </div>
      </div>
    </header>
  );
}
