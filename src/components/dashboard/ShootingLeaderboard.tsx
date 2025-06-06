import React, { useState } from "react";
import { useAuth } from "@/firebase/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trophy, Target } from "lucide-react";

const ShootingLeaderboard = () => {
  const { user } = useAuth();
  // Local dummy state for demonstration
  const [userSessions] = useState<any[]>([]);
  const [globalLeaderboard] = useState<any[]>([]);
  const [userRank] = useState<number | null>(null);
  const [loading] = useState(false);

  return (
    <div className="space-y-6">
      <Card className="w-full bg-white">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
            Global Leaderboard
          </CardTitle>
          <CardDescription>
            Top shooting scores from all shooters (local only, no DB)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-4">Loading leaderboard...</div>
          ) : globalLeaderboard.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Rank</th>
                    <th className="text-left py-3 px-4 font-medium">Shooter</th>
                    <th className="text-left py-3 px-4 font-medium">Session</th>
                    <th className="text-left py-3 px-4 font-medium">Score</th>
                    <th className="text-left py-3 px-4 font-medium">
                      Inner Tens
                    </th>
                    <th className="text-left py-3 px-4 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {globalLeaderboard.map((session) => (
                    <tr
                      key={session.id}
                      className={`border-b hover:bg-gray-50 ${session.user_id === user?.uid ? "bg-blue-50" : ""}`}
                    >
                      <td className="py-3 px-4 font-medium">{session.rank}</td>
                      <td className="py-3 px-4">{session.user_name}</td>
                      <td className="py-3 px-4">{session.session_name}</td>
                      <td className="py-3 px-4 font-medium">
                        {session.total_score}
                      </td>
                      <td className="py-3 px-4">{session.inner_tens}</td>
                      <td className="py-3 px-4">
                        {session.session_date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-4">
              No leaderboard data available yet.
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="w-full bg-white">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="mr-2 h-5 w-5 text-red-500" />
            Your Sessions
          </CardTitle>
          <CardDescription>Your recent shooting sessions (local only, no DB)</CardDescription>
        </CardHeader>
        <CardContent>
          {userSessions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">
                      Session Name
                    </th>
                    <th className="text-left py-3 px-4 font-medium">Score</th>
                    <th className="text-left py-3 px-4 font-medium">
                      Inner Tens
                    </th>
                    <th className="text-left py-3 px-4 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {userSessions.map((session) => (
                    <tr key={session.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{session.session_name}</td>
                      <td className="py-3 px-4 font-medium">
                        {session.total_score}
                      </td>
                      <td className="py-3 px-4">{session.inner_tens}</td>
                      <td className="py-3 px-4">
                        {session.session_date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-4">
              You haven't uploaded any sessions yet. Upload your first session
              to see your scores here.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ShootingLeaderboard;
