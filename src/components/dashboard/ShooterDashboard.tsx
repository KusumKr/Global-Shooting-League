import React, { useState } from "react";
import { useAuth } from "@/firebase/auth";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trophy, Target, Calendar, User } from "lucide-react";
import ShooterProfile from "./ShooterProfile";
import ShootingSessionUpload from "./ShootingSessionUpload";
import ShootingLeaderboard from "./ShootingLeaderboard";


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
  if (rank === 1) return <span className="inline-block mr-1">🥇</span>;
  if (rank === 2) return <span className="inline-block mr-1">🥈</span>;
  if (rank === 3) return <span className="inline-block mr-1">🥉</span>;
  return rank;
};
const stars = (count: number) => (
  <span className="text-yellow-400 text-lg">{Array.from({ length: count }).map((_, i) => (<span key={i}>★</span>))}</span>
);

const ShooterDashboard = () => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const [profileCompletion] = useState(0);
  const [recentScore] = useState<number | null>(null);
  const [userRank] = useState<number | null>(null);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-white">
      {/* Gradient Header */}
      <header className="w-full bg-gradient-to-r from-blue-700 via-blue-500 to-green-400 py-8 px-4 flex flex-col md:flex-row md:items-center md:justify-between shadow-lg">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">Shooter Dashboard</h1>
          <p className="text-lg text-blue-100 font-medium">Welcome to your personalized shooting journey!</p>
        </div>
        <div className="flex items-center gap-4 mt-6 md:mt-0">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-xl font-bold text-blue-700 border-2 border-blue-200">
              {user?.displayName ? user.displayName.split('|')[0][0].toUpperCase() : user?.email ? user.email[0].toUpperCase() : "S"}
            </div>
            <span className="text-white font-semibold text-lg hidden md:block">{user?.displayName ? user.displayName.split('|')[0] : user?.email || "Shooter"}</span>
          </div>
          <Button
            onClick={handleSignOut}
            className="bg-white text-blue-700 font-bold px-6 py-2 rounded-lg shadow hover:bg-blue-100 transition"
          >
            Sign Out
          </Button>
        </div>
      </header>

      {/* Stat Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 px-4">
        {/* Ranking Card */}
        <div className="rounded-2xl shadow-xl bg-blue-100 p-6 flex flex-col justify-between relative">
          <span className="absolute top-4 right-4 text-blue-700"><Trophy className="w-6 h-6" /></span>
          <div className="text-lg font-semibold text-blue-800 mb-2">Your Ranking</div>
          <div className="text-3xl md:text-4xl font-extrabold text-blue-800 mb-1">{userRank ? `#${userRank}` : "Not Ranked"}</div>
          <div className="text-blue-600 font-medium">Global Ranking</div>
        </div>
        {/* Recent Score Card */}
        <div className="rounded-2xl shadow-xl bg-red-100 p-6 flex flex-col justify-between relative">
          <span className="absolute top-4 right-4 text-red-700"><Target className="w-6 h-6" /></span>
          <div className="text-lg font-semibold text-red-800 mb-2">Recent Score</div>
          <div className="text-3xl md:text-4xl font-extrabold text-red-800 mb-1">{recentScore ? `${recentScore}/600` : "No Scores"}</div>
          <div className="text-red-600 font-medium">Last Session</div>
        </div>
        {/* Upcoming Events Card */}
        <div className="rounded-2xl shadow-xl bg-green-100 p-6 flex flex-col justify-between relative">
          <span className="absolute top-4 right-4 text-green-700"><Calendar className="w-6 h-6" /></span>
          <div className="text-lg font-semibold text-green-800 mb-2">Upcoming Events</div>
          <div className="text-3xl md:text-4xl font-extrabold text-green-800 mb-1">3</div>
          <div className="text-green-600 font-medium">Next 30 days</div>
        </div>
        {/* Profile Completion Card */}
        <div className="rounded-2xl shadow-xl bg-purple-100 p-6 flex flex-col justify-between relative">
          <span className="absolute top-4 right-4 text-purple-700"><User className="w-6 h-6" /></span>
          <div className="text-lg font-semibold text-purple-800 mb-2">Profile Completion</div>
          <div className="text-3xl md:text-4xl font-extrabold text-purple-800 mb-1">{profileCompletion}%</div>
          <div className="w-full h-2 bg-purple-200 rounded-full mt-2 mb-1">
            <div className="h-2 bg-purple-500 rounded-full" style={{ width: `${profileCompletion}%` }}></div>
          </div>
          <div className="text-purple-600 font-medium text-sm">Complete your profile</div>
        </div>
      </div>

      {/* Session Section */}
      <div className="max-w-3xl mx-auto mt-12 px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-10 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-6 text-blue-700">Session</h2>
          <ShooterProfile />
          <div className="mt-8 w-full">
            <ShootingSessionUpload />
          </div>
        </div>
      </div>

      {/* Global Leaderboard Section */}
      <div className="max-w-6xl mx-auto mt-12 px-4">
        <div className="rounded-2xl shadow-2xl bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 p-8 text-white">
          <div className="flex items-center mb-2">
            <Trophy className="w-8 h-8 text-yellow-400 mr-2" />
            <span className="text-3xl font-extrabold tracking-tight">LEADERBOARD</span>
          </div>
          <div className="text-blue-100 mb-6 text-lg">Top shooting scores from all shooters</div>
          <div className="bg-blue-800/40 rounded-xl overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-blue-200 text-lg">
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
                  <tr key={row.id} className="border-b border-blue-700 last:border-0 hover:bg-blue-900/30 transition">
                    <td className="py-3 px-4 font-bold text-xl">{rankIcon(row.rank)}</td>
                    <td className="py-3 px-4 font-semibold">{row.player}</td>
                    <td className="py-3 px-4 font-semibold">{row.session}</td>
                    <td className="py-3 px-4">{stars(row.stars)}</td>
                    <td className="py-3 px-4 font-bold text-cyan-200">{row.score}</td>
                    <td className="py-3 px-4 font-semibold">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Your Sessions Section */}
      <div className="max-w-6xl mx-auto mt-12 px-4 mb-16">
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
    </div>
  );
};

export default ShooterDashboard;
