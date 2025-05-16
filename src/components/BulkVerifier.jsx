import React, { useState, useEffect, useRef } from "react";
import DonutChart from "./DonutChart";

export default function BulkVerifier({ credits, setCredits, addToHistory }) {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState(null);
  const timerRef = useRef(null);

  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    if (!["text/csv", "text/plain"].includes(selectedFile.type)) {
      alert("Only CSV or TXT files are supported");
      return;
    }
    setFile(selectedFile);
    setProgress(0);
    setResults(null);
  }

  function removeFile() {
    setFile(null);
    setProgress(0);
    setResults(null);
    clearInterval(timerRef.current);
  }

  useEffect(() => {
    if (!file) return;

    setProgress(0);
    let pct = 0;

    timerRef.current = setInterval(() => {
      pct += Math.floor(Math.random() * 10) + 5; // Increment progress randomly 5-15%
      if (pct >= 100) {
        pct = 100;
        clearInterval(timerRef.current);

        // Mock verification results after completion
        const mockResults = {
          Valid: Math.floor(Math.random() * 60) + 20,
          Invalid: Math.floor(Math.random() * 20) + 10,
          Unknown: Math.floor(Math.random() * 10) + 5,
        };
        setResults(mockResults);

        const usedCount = mockResults.Valid + mockResults.Invalid;

        setCredits({
          remaining: Math.max(0, credits.remaining - usedCount),
          used: credits.used + usedCount,
        });

        // Add to history
        addToHistory({
          type: "bulk",
          timestamp: new Date().toISOString(),
          data: mockResults,
        });
      }
      setProgress(pct);
    }, 300);

    return () => clearInterval(timerRef.current);
  }, [file]);

  function downloadResults() {
    if (!results) return;
    const csvHeader = "Result,Count\n";
    const csvRows = Object.entries(results)
      .map(([key, val]) => `${key},${val}`)
      .join("\n");
    const csvContent = `data:text/csv;charset=utf-8,${csvHeader}${csvRows}`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = "bulk_verification_results.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="bg-gray-50 p-4 rounded shadow max-w-xl">
      <h3 className="font-semibold mb-4 text-lg">Bulk Contact Verifier</h3>

      {!file ? (
        <label className="inline-flex items-center cursor-pointer border border-dashed border-gray-400 px-4 py-3 rounded hover:bg-gray-100 transition">
          <input
            type="file"
            accept=".csv,.txt"
            className="hidden"
            onChange={handleFileChange}
          />
          Upload CSV or TXT
        </label>
      ) : (
        <div className="flex flex-col gap-3">
          <div>
            <span className="font-medium">File:</span> {file.name}
          </div>

          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-blue-600 h-4 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {progress === 100 && results && (
            <>
              <div className="mt-4">
                <DonutChart data={results} />
              </div>

              <button
                onClick={downloadResults}
                className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition"
              >
                Download Results
              </button>
            </>
          )}

          <button
            onClick={removeFile}
            className="mt-3 self-start bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
          >
            Remove File
          </button>
        </div>
      )}
    </div>
  );
}
