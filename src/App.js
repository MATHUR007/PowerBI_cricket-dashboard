import { useState } from "react";
import Card from "./components/ui/Card"; 
import Select from "./components/ui/Select";

import data from "./data.json";

const teams = [...new Set(data.map(player => player.Team))];

export default function PlayerComparison() {
  const [selectedTeam, setSelectedTeam] = useState(teams[0]);
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  const [showComparison, setShowComparison] = useState(false);

  const players = data.filter(p => p.Team === selectedTeam);

  const getComparisonRow = (label, stat1, stat2) => (
    <div className="grid grid-cols-3 gap-4 text-center items-center py-2 border-b border-gray-200">
      <div className="font-bold text-blue-600">{stat1 || "-"}</div>
      <div className="font-bold text-gray-500">{label}</div>
      <div className="font-bold text-blue-600">{stat2 || "-"}</div>
    </div>
  );

  return (
    <div className="p-6 space-y-6 bg-yellow-100 min-h-screen text-center">
      <div className="text-center mb-4">
        <Select
          label="Select Team"
          options={teams}
          value={selectedTeam}
          onChange={(e) => {
            setSelectedTeam(e.target.value);
            setPlayer1(null);
            setPlayer2(null);
            setShowComparison(false);
          }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 text-center">
        <Select
          label="Select Player 1"
          options={players.map((p) => p.Name_Of_Player)}
          value={player1?.Name_Of_Player || ""}
          onChange={(e) => setPlayer1(players.find(p => p.Name_Of_Player === e.target.value))}
        />

        <Select
          label="Select Player 2"
          options={players.map((p) => p.Name_Of_Player)}
          value={player2?.Name_Of_Player || ""}
          onChange={(e) => setPlayer2(players.find(p => p.Name_Of_Player === e.target.value))}
        />
      </div>

      {player1 && player2 && (
        <div className="text-center mt-4">
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
            onClick={() => setShowComparison(!showComparison)}
          >
            {showComparison ? "Hide Comparison" : "Show Comparison"}
          </button>
        </div>
      )}

      {showComparison && player1 && player2 && (
        <div className="mt-6 grid grid-cols-3 gap-4 items-center text-center">
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h3 className="text-lg font-bold text-center text-blue-600 mb-4">Player 1 Data</h3>
            <div className="space-y-2">
              {Object.entries(player1).map(([key, value]) => (
                <div key={key} className="text-center">
                  <strong>{key}:</strong> {value}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-4">
            <h3 className="text-lg font-bold text-center text-gray-500 mb-4">Kind of Data</h3>
            <div className="space-y-2">
              {Object.keys(player1).map((key) => (
                <div key={key} className="text-center">
                  <strong>{key}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-4">
            <h3 className="text-lg font-bold text-center text-blue-600 mb-4">Player 2 Data</h3>
            <div className="space-y-2">
              {Object.entries(player2).map(([key, value]) => (
                <div key={key} className="text-center">
                  <strong>{key}:</strong> {value}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

