import React, { useState } from "react";
import { useAuth } from "@/firebase/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trophy, Target, Star } from "lucide-react";

const ShootingLeaderboard = () => {
  const { user } = useAuth();
  // Local dummy state for demonstration
  const [userSessions] = useState<any[]>([]);
  const [globalLeaderboard] = useState<any[]>([]);
  const [userRank] = useState<number | null>(null);
  const [loading] = useState(false);

  // Sample leaderboard data for display
  const sampleLeaderboard = [
    {
      id: 1,
      rank: 1,
      user_name: "Player One",
      session_name: "Finals",
      total_score: 2980,
      inner_tens: 55,
      session_date: "2024-06-01",
      avatar: "/avatar1.png",
      stars: 5,
    },
    {
      id: 2,
      rank: 2,
      user_name: "Player Two",
      session_name: "Semi-Finals",
      total_score: 2721,
      inner_tens: 48,
      session_date: "2024-05-28",
      avatar: "/avatar2.png",
      stars: 4,
    },
    {
      id: 3,
      rank: 3,
      user_name: "Player Three",
      session_name: "Quarter Finals",
      total_score: 2579,
      inner_tens: 44,
      session_date: "2024-05-20",
      avatar: "/avatar3.png",
      stars: 4,
    },
    {
      id: 4,
      rank: 4,
      user_name: "Player Four",
      session_name: "Elimination",
      total_score: 1874,
      inner_tens: 30,
      session_date: "2024-05-10",
      avatar: "/avatar4.png",
      stars: 3,
    },
    {
      id: 5,
      rank: 5,
      user_name: "Player Five",
      session_name: "Prelims",
      total_score: 1756,
      inner_tens: 28,
      session_date: "2024-05-01",
      avatar: "/avatar5.png",
      stars: 3,
    },
  ];

  // Sample session data for 'Your Sessions' section
  const sampleSessions = [
    {
      id: 1,
      session_name: "Finals Practice",
      total_score: 2950,
      inner_tens: 50,
      session_date: "2024-05-30",
      stars: 5,
    },
    {
      id: 2,
      session_name: "Range Day",
      total_score: 2700,
      inner_tens: 40,
      session_date: "2024-05-15",
      stars: 4,
    },
    {
      id: 3,
      session_name: "Morning Drill",
      total_score: 2500,
      inner_tens: 35,
      session_date: "2024-05-01",
      stars: 4,
    },
  ];

  return (
    <div className="space-y-10">
      <Card className="w-full bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 shadow-2xl border-0 rounded-2xl text-white">
        <CardHeader>
          <CardTitle className="flex items-center text-cyan-200 text-3xl font-extrabold gap-2 tracking-wide drop-shadow-lg">
            <Trophy className="mr-2 h-8 w-8 text-yellow-400" />
            LEADERBOARD
          </CardTitle>
          <CardDescription className="text-blue-100 font-medium text-lg">
            Top shooting scores from all shooters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-lg rounded-xl overflow-hidden">
              <thead>
                <tr className="border-b border-blue-600 bg-blue-800">
                  <th className="py-4 px-4 font-bold text-cyan-200 text-xl text-left">#</th>
                  <th className="py-4 px-4 font-bold text-cyan-200 text-xl text-left">Player</th>
                  <th className="py-4 px-4 font-bold text-cyan-200 text-xl text-left">Session</th>
                  <th className="py-4 px-4 font-bold text-cyan-200 text-xl text-center">Stars</th>
                  <th className="py-4 px-4 font-bold text-cyan-200 text-xl text-center">Score</th>
                  <th className="py-4 px-4 font-bold text-cyan-200 text-xl text-center">Date</th>
                </tr>
              </thead>
              <tbody>
                {(globalLeaderboard.length > 0 ? globalLeaderboard : sampleLeaderboard).map((session, idx) => (
                  <tr
                    key={session.id}
                    className={`border-b border-blue-700 hover:bg-blue-800 transition ${session.rank <= 3 ? "font-bold" : ""}`}
                  >
                    <td className="py-3 px-4 text-2xl text-left">
                      {session.rank === 1 && <span title="Gold" className="inline-block align-middle">🥇</span>}
                      {session.rank === 2 && <span title="Silver" className="inline-block align-middle">🥈</span>}
                      {session.rank === 3 && <span title="Bronze" className="inline-block align-middle">🥉</span>}
                      {session.rank > 3 && <span>{session.rank}</span>}
                    </td>
                    <td className="py-3 px-4 text-left">
                      <span className="text-white font-semibold">{session.user_name}</span>
                    </td>
                    <td className="py-3 px-4 text-left">{session.session_name}</td>
                    <td className="py-3 px-4 text-center">
                      {[...Array(session.stars || 3)].map((_, i) => (
                        <Star key={i} className="inline-block h-5 w-5 text-yellow-400" fill="currentColor" />
                      ))}
                    </td>
                    <td className="py-3 px-4 text-cyan-200 font-bold text-center">{session.total_score}</td>
                    <td className="py-3 px-4 text-center">{session.session_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full bg-gradient-to-br from-red-50 to-white shadow-xl border-0 rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center text-red-700 text-2xl font-extrabold gap-2">
            <Target className="mr-2 h-7 w-7 text-red-500" />
            Your Sessions
          </CardTitle>
          <CardDescription className="text-red-800 font-medium">Your recent shooting sessions (local only, no DB)</CardDescription>
        </CardHeader>
        <CardContent>
          {(userSessions.length > 0 ? userSessions : sampleSessions).length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-base rounded-xl overflow-hidden">
                <thead>
                  <tr className="border-b bg-red-100">
                    <th className="text-left py-3 px-4 font-bold">Session Name</th>
                    <th className="text-center py-3 px-4 font-bold">Stars</th>
                    <th className="text-center py-3 px-4 font-bold">Score</th>
                    <th className="text-center py-3 px-4 font-bold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {(userSessions.length > 0 ? userSessions : sampleSessions).map((session) => (
                    <tr key={session.id} className="border-b hover:bg-red-50 transition">
                      <td className="py-3 px-4 text-left font-semibold">{session.session_name}</td>
                      <td className="py-3 px-4 text-center">
                        {[...Array(session.stars || 3)].map((_, i) => (
                          <Star key={i} className="inline-block h-5 w-5 text-yellow-400" fill="currentColor" />
                        ))}
                      </td>
                      <td className="py-3 px-4 text-center font-bold text-red-700">{session.total_score}</td>
                      <td className="py-3 px-4 text-center">{session.session_date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center py-10 text-red-700">
              <Target className="h-12 w-12 mb-2 text-red-400 animate-bounce" />
              <div className="text-lg font-semibold">You haven't uploaded any sessions yet.</div>
              <div className="text-sm text-red-600">Upload your first session to see your scores here.</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ShootingLeaderboard;
