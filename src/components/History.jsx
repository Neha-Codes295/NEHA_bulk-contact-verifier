import React from "react";

export default function History({ history }) {
  if (history.length === 0)
    return <p className="p-4 text-gray-500">No verification history available.</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Verification History</h2>
      <ul>
        {history.map((entry, idx) => (
          <li
            key={idx}
            className="mb-3 border rounded p-3 bg-gray-50 shadow-sm"
          >
            <p>
              <strong>Type:</strong> {entry.type}
            </p>
            <p>
              <strong>Time:</strong>{" "}
              {new Date(entry.timestamp).toLocaleString()}
            </p>
            <pre className="bg-white p-2 rounded mt-2 overflow-x-auto text-sm text-gray-700">
              {JSON.stringify(entry.data, null, 2)}
            </pre>
          </li>
        ))}
      </ul>
    </div>
  );
}
