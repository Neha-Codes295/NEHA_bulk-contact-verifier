import React from "react";

const options = ["Dashboard", "Contact Verifier", "History", "Credits"];

export default function Sidebar({ active, onChange, onLogout }) {
  return (
    <nav className="w-64 bg-gray-900 text-white flex flex-col min-h-screen p-4">
      <div className="text-2xl font-bold mb-10">Bulk Contact Verifier</div>

      <ul className="flex-1 space-y-3">
        {options.map((opt) => (
          <li key={opt}>
            <button
              onClick={() => onChange(opt)}
              className={`w-full text-left px-4 py-2 rounded-md hover:bg-gray-700 transition ${
                active === opt ? "bg-gray-700 font-semibold" : ""
              }`}
            >
              {opt}
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={onLogout}
        className="mt-auto bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md font-semibold transition"
      >
        Logout
      </button>
    </nav>
  );
}
