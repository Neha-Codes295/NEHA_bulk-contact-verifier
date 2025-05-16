import React, { useState } from "react"; // Removed useEffect from here
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import SingleVerifier from "../components/SingleVerifier";
import BulkVerifier from "../components/BulkVerifier";
import CreditsCard from "../components/CreditsCard";
import dayjs from "dayjs";

export default function Dashboard({ user, onLogout }) {
  const [activePage, setActivePage] = useState("Contact Verifier");
  const [credits, setCredits] = useState({ remaining: 12500, used: 7500 });

  const [history, setHistory] = useState(() => {
    // Load history from localStorage on app start
    const saved = localStorage.getItem("verificationHistory");
    return saved ? JSON.parse(saved) : [];
  });

  function addToHistory(entry) {
    const newHistory = [entry, ...history];
    setHistory(newHistory);
    localStorage.setItem("verificationHistory", JSON.stringify(newHistory));
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar active={activePage} onChange={setActivePage} onLogout={onLogout} />

      <div className="flex-1 flex flex-col">
        <Topbar user={user} />

        <main className="p-6 flex flex-col md:flex-row gap-6 overflow-auto">
          <section className="flex-1 bg-white rounded shadow p-6 min-w-0">
            <h2 className="text-xl font-semibold mb-4">
              Welcome back, {user.name}
            </h2>

            {activePage === "Contact Verifier" && (
              <>
                <SingleVerifier credits={credits} setCredits={setCredits} addToHistory={addToHistory} />
                <div className="mt-6">
                  <BulkVerifier credits={credits} setCredits={setCredits} addToHistory={addToHistory} />
                </div>
              </>
            )}

            {activePage === "Dashboard" && (
              <p className="text-gray-600">Dashboard overview content here.</p>
            )}

            {activePage === "History" && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Verification History</h3>
                {history.length === 0 ? (
                  <p className="text-gray-600">No verification history yet.</p>
                ) : (
                  <ul className="space-y-4 max-h-[400px] overflow-auto">
                    {history.map((entry, idx) => (
                      <li
                        key={idx}
                        className="border rounded p-3 bg-gray-50 shadow-sm"
                      >
                        <div className="flex justify-between text-sm text-gray-700 mb-1">
                          <span>Type: {entry.type}</span>
                          <span>{dayjs(entry.timestamp).format("MMM D, YYYY HH:mm")}</span>
                        </div>
                        <div className="text-gray-800">
                          {entry.type === "single" ? (
                            <>
                              Email: <b>{entry.data.email}</b> — Status:{" "}
                              <b>{entry.data.status}</b>
                            </>
                          ) : (
                            <>
                              Valid: {entry.data.Valid}, Invalid: {entry.data.Invalid}, Unknown: {entry.data.Unknown}
                            </>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {activePage === "Credits" && (
              <CreditsCard credits={credits} setCredits={setCredits} />
            )}
          </section>

          {/* Sidebar Credits Cards on bigger screens */}
          <aside className="hidden md:flex flex-col gap-6 w-80">
            <CreditsCard credits={credits} setCredits={setCredits} />
            <CreditsCard credits={credits} setCredits={setCredits} />
          </aside>
        </main>
      </div>
    </div>
  );
}
