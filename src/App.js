import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import Card from "@/components/ui/Card";
import Select from "@/components/ui/Select";

import data from "./data.json";

const teams = [...new Set(data.map(player => player.Team))];

export default function PlayerComparison() {
  const [selectedTeam, setSelectedTeam] = useState(teams[0]);
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);

  const players = data.filter(p => p.Team === selectedTeam);

  const getStatsCard = (player) => (
    <Card className="w-full max-w-md">
      <CardContent className="p-4">
        <h2 className="text-xl font-bold mb-2">{player.Name_Of_Player}</h2>
        <p className="text-sm text-gray-500 mb-1">{player.Role} | {player.Style}</p>
        <div className="grid grid-cols-2 gap-2 text-sm mt-2">
          <div><strong>Matches:</strong> {player.Matches}</div>
          <div><strong>Runs:</strong> {player.Runs_Scored}</div>
          <div><strong>100s:</strong> {player["100s"]}</div>
          <div><strong>50s:</strong> {player["50s"]}</div>
          <div><strong>Bat Avg:</strong> {player.Bat_Avg}</div>
          <div><strong>Bat SR:</strong> {player.Bat_SR}</div>
          <div><strong>Wickets:</strong> {player.Wickets}</div>
          <div><strong>Eco:</strong> {player.Eco}</div>
          <div><strong>Bowl Avg:</strong> {player.Bowl_Avg}</div>
          <div><strong>Ball SR:</strong> {player.Ball_SR}</div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <Select onValueChange={value => {
          setSelectedTeam(value);
          setPlayer1(null);
          setPlayer2(null);
        }}>
          <SelectTrigger>
            <SelectValue placeholder="Select Team" defaultValue={selectedTeam} />
          </SelectTrigger>
          <SelectContent>
            {teams.map(team => (
              <SelectItem key={team} value={team}>{team}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={value => setPlayer1(players.find(p => p.Name_Of_Player === value))}>
          <SelectTrigger>
            <SelectValue placeholder="Select Player 1" />
          </SelectTrigger>
          <SelectContent>
            {players.map(player => (
              <SelectItem key={player.Name_Of_Player} value={player.Name_Of_Player}>{player.Name_Of_Player}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={value => setPlayer2(players.find(p => p.Name_Of_Player === value))}>
          <SelectTrigger>
            <SelectValue placeholder="Select Player 2" />
          </SelectTrigger>
          <SelectContent>
            {players.map(player => (
              <SelectItem key={player.Name_Of_Player} value={player.Name_Of_Player}>{player.Name_Of_Player}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {player1 && getStatsCard(player1)}
        {player2 && getStatsCard(player2)}
      </div>
    </div>
  );
}

