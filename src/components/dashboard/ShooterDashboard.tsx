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
