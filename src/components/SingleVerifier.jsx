import React, { useState } from "react";
import ModalResult from "./ModalResult";

export default function SingleVerifier({ credits, setCredits, addToHistory }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  function mockVerify() {
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      const statuses = ["Valid", "Invalid", "Unknown"];
      const status = statuses[Math.floor(Math.random() * statuses.length)];

      const verificationResult = { status, email };
      setResult(verificationResult);
      setLoading(false);

      if (status !== "Unknown") {
        setCredits({
          ...credits,
          remaining: credits.remaining - 1,
          used: credits.used + 1,
        });
      }

      // Add to history
      addToHistory({
        type: "single",
        timestamp: new Date().toISOString(),
        data: verificationResult,
      });
    }, 2000);
  }

  function downloadResult() {
    if (!result) return;
    const csvContent = `data:text/csv;charset=utf-8,Email,Status\n${result.email},${result.status}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = "single_verification_result.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <>
      <div className="bg-gray-50 p-4 rounded shadow max-w-md">
        <h3 className="font-semibold mb-4 text-lg">Single Contact Verifier</h3>

        <input
          type="text"
          placeholder="Name"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={mockVerify}
          disabled={loading || !email}
          className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:bg-gray-400`}
        >
          {loading ? "Verifying..." : "Verify Now"}
        </button>

        {result && (
          <>
            <button
              onClick={downloadResult}
              className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition"
            >
              Download Results
            </button>
          </>
        )}
      </div>

      {result && <ModalResult result={result} onClose={() => setResult(null)} />}
    </>
  );
}
