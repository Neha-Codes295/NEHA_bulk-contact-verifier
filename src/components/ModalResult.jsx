import React from "react";

const statusColors = {
  Valid: "bg-green-500",
  Invalid: "bg-red-500",
  Unknown: "bg-yellow-400",
};

export default function ModalResult({ result, onClose }) {
  if (!result) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-lg p-6 max-w-xs w-full text-center"
      >
        <div
          className={`text-white font-bold text-xl py-3 rounded-t ${statusColors[result.status]}`}
        >
          {result.status}
        </div>
        <div className="p-4 text-gray-700">{result.email}</div>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
