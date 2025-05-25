import React, { useEffect, useState } from "react";
import { useAuth } from "../../../supabase/auth";
import { supabase } from "../../../supabase/supabase";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trophy, Target } from "lucide-react";

type ShootingSession = {
  id: string;
  session_name: string;
  total_score: number;
  inner_tens: number;
  session_date: string;
  user_id: string;
  user_email?: string;
  user_name?: string;
  rank?: number;
};

const ShootingLeaderboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userSessions, setUserSessions] = useState<ShootingSession[]>([]);
  const [globalLeaderboard, setGlobalLeaderboard] = useState<ShootingSession[]>(
    [],
  );
  const [userRank, setUserRank] = useState<number | null>(null);

  useEffect(() => {
    if (user) {
      fetchUserSessions();
      fetchGlobalLeaderboard();
    }
  }, [user]);

  const fetchUserSessions = async () => {
    try {
      const { data, error } = await supabase
        .from("shooting_sessions")
        .select("*")
        .eq("user_id", user?.id)
        .order("total_score", { ascending: false });

      if (error) throw error;

      setUserSessions(data || []);
    } catch (error) {
      console.error("Error fetching user sessions:", error);
    }
  };

  const fetchGlobalLeaderboard = async () => {
    try {
      setLoading(true);

      // Get top scores from all users
      const { data, error } = await supabase
        .from("shooting_sessions")
        .select(
          `
          id,
          session_name,
          total_score,
          inner_tens,
          session_date,
          user_id
        `,
        )
        .order("total_score", { ascending: false })
        .limit(50);

      if (error) throw error;

      // Get user information for each session
      const sessionsWithUserInfo = await Promise.all(
        (data || []).map(async (session, index) => {
          try {
            // Get user info from users table
            const { data: userData, error: userError } = await supabase
              .from("users")
              .select("email, full_name")
              .eq("user_id", session.user_id)
              .single();

            if (userError && userError.code !== "PGRST116") {
              console.error("Error fetching user info:", userError);
            }

            // Calculate rank (1-based index)
            const rank = index + 1;

            // If this is the current user, set their rank
            if (session.user_id === user?.id) {
              setUserRank(rank);
            }

            return {
              ...session,
              user_email: userData?.email || "Unknown",
              user_name: userData?.full_name || "Unknown",
              rank: rank,
            };
          } catch (error) {
            console.error("Error processing session:", error);
            return {
              ...session,
              user_email: "Unknown",
              user_name: "Unknown",
              rank: index + 1,
            };
          }
        }),
      );

      setGlobalLeaderboard(sessionsWithUserInfo);
    } catch (error) {
      console.error("Error fetching global leaderboard:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="w-full bg-white">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
            Global Leaderboard
          </CardTitle>
          <CardDescription>
            Top shooting scores from all shooters
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
                      className={`border-b hover:bg-gray-50 ${session.user_id === user?.id ? "bg-blue-50" : ""}`}
                    >
                      <td className="py-3 px-4 font-medium">{session.rank}</td>
                      <td className="py-3 px-4">{session.user_name}</td>
                      <td className="py-3 px-4">{session.session_name}</td>
                      <td className="py-3 px-4 font-medium">
                        {session.total_score}
                      </td>
                      <td className="py-3 px-4">{session.inner_tens}</td>
                      <td className="py-3 px-4">
                        {new Date(session.session_date).toLocaleDateString()}
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
          <CardDescription>Your recent shooting sessions</CardDescription>
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
                        {new Date(session.session_date).toLocaleDateString()}
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
