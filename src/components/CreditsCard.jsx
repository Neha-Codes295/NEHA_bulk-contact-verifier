import React from "react";

export default function CreditsCard({ credits, setCredits }) {
  function handleBuyMore() {
    const purchased = 5000; // Simulated purchase
    const updated = {
      remaining: credits.remaining + purchased,
      used: credits.used,
    };
    setCredits(updated);
    alert(`Successfully purchased ${purchased} credits!`);
  }

  return (
    <div className="bg-white rounded shadow p-4">
      <h4 className="text-lg font-semibold mb-2">Credit Summary</h4>
      <p>
        <span className="font-medium">Remaining:</span> {credits.remaining}
      </p>
      <p>
        <span className="font-medium">Used:</span> {credits.used}
      </p>

      <button
        onClick={handleBuyMore}
        className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
      >
        Buy More Credits
      </button>
    </div>
  );
}
