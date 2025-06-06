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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <header className="bg-gradient-to-r from-blue-700 to-green-500 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-white drop-shadow mb-1">Shooter Dashboard</h1>
            <p className="text-lg text-blue-100 font-medium drop-shadow">Welcome to your personalized shooting journey!</p>
          </div>
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12 border-2 border-white shadow-lg">
              <AvatarImage src={user?.photoURL || undefined} alt={user?.email || "User"} />
              <AvatarFallback>{user?.email?.[0]?.toUpperCase() || "U"}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-end">
              <span className="text-base text-white font-semibold">{user?.email}</span>
              <Button
                onClick={handleSignOut}
                variant="outline"
                className="text-sm mt-2 bg-white/80 hover:bg-white text-blue-700 border-none shadow"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="transition-transform duration-200 hover:scale-105 shadow-xl bg-gradient-to-br from-blue-100 to-blue-50 border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-semibold text-blue-900">Your Ranking</CardTitle>
              <span className="bg-blue-600 p-2 rounded-full shadow"><Trophy className="h-5 w-5 text-white" /></span>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-blue-800 animate-pulse">{userRank ? `#${userRank}` : "Not Ranked"}</div>
              <p className="text-xs text-blue-600 font-medium">Global Ranking</p>
            </CardContent>
          </Card>

          <Card className="transition-transform duration-200 hover:scale-105 shadow-xl bg-gradient-to-br from-red-100 to-pink-50 border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-semibold text-red-900">Recent Score</CardTitle>
              <span className="bg-red-600 p-2 rounded-full shadow"><Target className="h-5 w-5 text-white" /></span>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-red-800 animate-pulse">{recentScore ? `${recentScore}/600` : "No Scores"}</div>
              <p className="text-xs text-red-600 font-medium">Last Session</p>
            </CardContent>
          </Card>

          <Card className="transition-transform duration-200 hover:scale-105 shadow-xl bg-gradient-to-br from-green-100 to-green-50 border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-semibold text-green-900">Upcoming Events</CardTitle>
              <span className="bg-green-600 p-2 rounded-full shadow"><Calendar className="h-5 w-5 text-white" /></span>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-green-800 animate-pulse">3</div>
              <p className="text-xs text-green-600 font-medium">Next 30 days</p>
            </CardContent>
          </Card>

          <Card className="transition-transform duration-200 hover:scale-105 shadow-xl bg-gradient-to-br from-purple-100 to-purple-50 border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-semibold text-purple-900">Profile Completion</CardTitle>
              <span className="bg-purple-600 p-2 rounded-full shadow"><User className="h-5 w-5 text-white" /></span>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-purple-800 animate-pulse">{profileCompletion}%</div>
              <div className="w-full bg-purple-200 rounded-full h-2 mt-2">
                <div className="bg-purple-600 h-2 rounded-full transition-all duration-500" style={{ width: `${profileCompletion}%` }}></div>
              </div>
              <p className="text-xs text-purple-600 font-medium mt-1">Complete your profile</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 space-y-12">
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
