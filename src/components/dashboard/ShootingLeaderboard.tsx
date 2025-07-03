import React from "react";
import { Trophy, Target } from "lucide-react";

const leaderboardData = [
  { id: 1, rank: 1, player: "Player One", session: "Finals", stars: 5, score: 2980, date: "2024-06-01" },
  { id: 2, rank: 2, player: "Player Two", session: "Semi-Finals", stars: 4, score: 2721, date: "2024-05-28" },
  { id: 3, rank: 3, player: "Player Three", session: "Quarter Finals", stars: 4, score: 2579, date: "2024-05-20" },
  { id: 4, rank: 4, player: "Player Four", session: "Elimination", stars: 3, score: 1874, date: "2024-05-10" },
  { id: 5, rank: 5, player: "Player Five", session: "Prelims", stars: 3, score: 1756, date: "2024-05-01" },
];

const sessionData = [
  { id: 1, session: "Finals Practice", stars: 5, score: 2950, date: "2024-05-30" },
  { id: 2, session: "Range Day", stars: 4, score: 2700, date: "2024-05-15" },
  { id: 3, session: "Morning Drill", stars: 4, score: 2500, date: "2024-05-01" },
];

const rankIcon = (rank: number) => {
  if (rank === 1)
    return <span className="inline-block mr-1">🥇</span>;
  if (rank === 2)
    return <span className="inline-block mr-1">🥈</span>;
  if (rank === 3)
    return <span className="inline-block mr-1">🥉</span>;
  return rank;
};

const stars = (count: number) => (
  <span className="text-yellow-400 text-lg">
    {Array.from({ length: count }).map((_, i) => (
      <span key={i}>★</span>
    ))}
  </span>
);

const ShootingLeaderboard = () => {
  return (
    <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 gap-8 px-4">
      {/* Leaderboard Card */}
      <div className="rounded-2xl shadow-2xl bg-gradient-to-br from-pink-100 via-yellow-100 to-green-100 p-8 text-gray-800">
        <div className="flex items-center mb-2">
          <Trophy className="w-8 h-8 text-yellow-400 mr-2" />
          <span className="text-3xl font-extrabold tracking-tight">LEADERBOARD</span>
        </div>
        <div className="text-gray-500 mb-6 text-lg">Top shooting scores from all shooters</div>
        <div className="bg-pink-50 rounded-xl overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-pink-500 text-lg">
                <th className="py-4 px-4 font-semibold">#</th>
                <th className="py-4 px-4 font-semibold">Player</th>
                <th className="py-4 px-4 font-semibold">Session</th>
                <th className="py-4 px-4 font-semibold">Stars</th>
                <th className="py-4 px-4 font-semibold">Score</th>
                <th className="py-4 px-4 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((row) => (
                <tr key={row.id} className="border-b border-yellow-100 last:border-0 hover:bg-yellow-50 transition">
                  <td className="py-3 px-4 font-bold text-xl">{rankIcon(row.rank)}</td>
                  <td className="py-3 px-4 font-semibold">{row.player}</td>
                  <td className="py-3 px-4 font-semibold">{row.session}</td>
                  <td className="py-3 px-4">{stars(row.stars)}</td>
                  <td className="py-3 px-4 font-bold text-blue-500">{row.score}</td>
                  <td className="py-3 px-4 font-semibold">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Your Sessions Card */}
      <div className="rounded-2xl shadow-2xl bg-gradient-to-br from-red-100 via-pink-50 to-white p-8">
        <div className="flex items-center mb-2">
          <Target className="w-7 h-7 text-red-500 mr-2" />
          <span className="text-2xl font-bold text-red-700">Your Sessions</span>
        </div>
        <div className="text-red-400 mb-6 text-base">Your recent shooting sessions (local only, no DB)</div>
        <div className="bg-red-50 rounded-xl overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-red-400 text-lg">
                <th className="py-4 px-4 font-semibold">Session Name</th>
                <th className="py-4 px-4 font-semibold">Stars</th>
                <th className="py-4 px-4 font-semibold">Score</th>
                <th className="py-4 px-4 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {sessionData.map((row) => (
                <tr key={row.id} className="border-b border-red-200 last:border-0 hover:bg-red-100/60 transition">
                  <td className="py-3 px-4 font-semibold">{row.session}</td>
                  <td className="py-3 px-4">{stars(row.stars)}</td>
                  <td className="py-3 px-4 font-bold text-red-600">{row.score}</td>
                  <td className="py-3 px-4 font-semibold">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShootingLeaderboard;
