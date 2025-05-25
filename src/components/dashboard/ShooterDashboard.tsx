import React, { useEffect, useState } from "react";
import { useAuth } from "../../../supabase/auth";
import { supabase } from "../../../supabase/supabase";
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

const ShooterDashboard = () => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [recentScore, setRecentScore] = useState<number | null>(null);
  const [userRank, setUserRank] = useState<number | null>(null);

  useEffect(() => {
    if (user) {
      fetchProfileCompletion();
      fetchRecentScore();
      fetchUserRank();
    }
  }, [user]);

  const fetchProfileCompletion = async () => {
    try {
      const { data, error } = await supabase
        .from("shooter_profiles")
        .select("*")
        .eq("user_id", user?.id)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error fetching profile:", error);
        return;
      }

      if (data) {
        // Calculate profile completion percentage
        const fields = [
          "height",
          "weight",
          "age",
          "eye_sight_left",
          "eye_sight_right",
          "dominant_hand",
          "favorite_gun",
          "favorite_ammunition",
          "favorite_stance",
          "additional_equipment",
        ];

        const filledFields = fields.filter(
          (field) => data[field] !== null && data[field] !== "",
        );
        const completionPercentage = Math.round(
          (filledFields.length / fields.length) * 100,
        );
        setProfileCompletion(completionPercentage);
      } else {
        setProfileCompletion(0);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchRecentScore = async () => {
    try {
      const { data, error } = await supabase
        .from("shooting_sessions")
        .select("total_score")
        .eq("user_id", user?.id)
        .order("session_date", { ascending: false })
        .limit(1);

      if (error) {
        console.error("Error fetching recent score:", error);
        return;
      }

      if (data && data.length > 0) {
        setRecentScore(data[0].total_score);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchUserRank = async () => {
    try {
      // Get all sessions ordered by score
      const { data, error } = await supabase
        .from("shooting_sessions")
        .select("id, user_id, total_score")
        .order("total_score", { ascending: false });

      if (error) {
        console.error("Error fetching rankings:", error);
        return;
      }

      if (data) {
        // Find the highest ranked session for the current user
        const userSessions = data.filter(
          (session) => session.user_id === user?.id,
        );
        if (userSessions.length > 0) {
          // Find the index of the user's highest score in the overall ranking
          const highestUserSession = userSessions[0];
          const rankIndex = data.findIndex(
            (session) => session.id === highestUserSession.id,
          );
          setUserRank(rankIndex + 1); // +1 because array indices are 0-based
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Shooter Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">{user?.email}</span>
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="text-sm"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Your Ranking
              </CardTitle>
              <Trophy className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {userRank ? `#${userRank}` : "Not Ranked"}
              </div>
              <p className="text-xs text-gray-500">Global Ranking</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Recent Score
              </CardTitle>
              <Target className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {recentScore ? `${recentScore}/600` : "No Scores"}
              </div>
              <p className="text-xs text-gray-500">Last Session</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Upcoming Events
              </CardTitle>
              <Calendar className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-gray-500">Next 30 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Profile Completion
              </CardTitle>
              <User className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{profileCompletion}%</div>
              <p className="text-xs text-gray-500">Complete your profile</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-8">
          {/* Shooter Profile Form */}
          <ShooterProfile />

          {/* CSV Upload Section */}
          <ShootingSessionUpload />

          {/* Leaderboard Section */}
          <ShootingLeaderboard />
        </div>
      </main>
    </div>
  );
};

export default ShooterDashboard;
