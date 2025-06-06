import React from "react";
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
import { Users, Calendar, MapPin, BarChart } from "lucide-react";
import RangeListingForm from "./RangeListingForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const RangeOwnerDashboard = () => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <header className="bg-gradient-to-r from-blue-700 to-green-500 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div>
            <h1 className="text-4xl font-extrabold text-white drop-shadow mb-1">Range Owner Dashboard</h1>
            <p className="text-lg text-blue-100 font-medium drop-shadow">Welcome to your range management center!</p>
          </div>
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12 border-2 border-white shadow-lg">
              <AvatarImage src={user?.photoURL || undefined} alt={user?.email || 'User'} />
              <AvatarFallback>{user?.email?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
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

      <main className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-6 md:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          <Card className="transition-transform duration-200 hover:scale-105 shadow-xl bg-gradient-to-br from-blue-100 to-blue-50 border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-semibold text-blue-900">Total Members</CardTitle>
              <span className="bg-blue-600 p-2 rounded-full shadow"><Users className="h-5 w-5 text-white" /></span>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-blue-800 animate-pulse">245</div>
              <p className="text-xs text-blue-600 font-medium">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="transition-transform duration-200 hover:scale-105 shadow-xl bg-gradient-to-br from-green-100 to-green-50 border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-semibold text-green-900">Upcoming Events</CardTitle>
              <span className="bg-green-600 p-2 rounded-full shadow"><Calendar className="h-5 w-5 text-white" /></span>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-green-800 animate-pulse">5</div>
              <p className="text-xs text-green-600 font-medium">Next 30 days</p>
            </CardContent>
          </Card>

          <Card className="transition-transform duration-200 hover:scale-105 shadow-xl bg-gradient-to-br from-red-100 to-red-50 border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-semibold text-red-900">Range Facilities</CardTitle>
              <span className="bg-red-600 p-2 rounded-full shadow"><MapPin className="h-5 w-5 text-white" /></span>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-red-800 animate-pulse">3</div>
              <p className="text-xs text-red-600 font-medium">Active locations</p>
            </CardContent>
          </Card>

          <Card className="transition-transform duration-200 hover:scale-105 shadow-xl bg-gradient-to-br from-purple-100 to-purple-50 border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-semibold text-purple-900">Revenue</CardTitle>
              <span className="bg-purple-600 p-2 rounded-full shadow"><BarChart className="h-5 w-5 text-white" /></span>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-purple-800 animate-pulse">$12,450</div>
              <p className="text-xs text-purple-600 font-medium">This month</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Events</CardTitle>
              <CardDescription>Upcoming events at your ranges</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm md:text-base rounded-xl overflow-hidden">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">
                        Event Name
                      </th>
                      <th className="text-left py-3 px-4 font-medium">Date</th>
                      <th className="text-left py-3 px-4 font-medium">
                        Location
                      </th>
                      <th className="text-left py-3 px-4 font-medium">
                        Registrations
                      </th>
                      <th className="text-left py-3 px-4 font-medium">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">Summer Championship</td>
                      <td className="py-3 px-4">July 10, 2024</td>
                      <td className="py-3 px-4">Main Range</td>
                      <td className="py-3 px-4">78/100</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                          Open
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">Junior Training Camp</td>
                      <td className="py-3 px-4">July 15-20, 2024</td>
                      <td className="py-3 px-4">Training Center</td>
                      <td className="py-3 px-4">24/30</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                          Almost Full
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4">Regional Qualifier</td>
                      <td className="py-3 px-4">August 5, 2024</td>
                      <td className="py-3 px-4">Competition Range</td>
                      <td className="py-3 px-4">120/120</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                          Full
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Range Usage</CardTitle>
              <CardDescription>Last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-end justify-between">
                <div className="w-8 bg-blue-200 rounded-t h-[30%] relative group">
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Mon: 30%
                  </div>
                </div>
                <div className="w-8 bg-blue-300 rounded-t h-[45%] relative group">
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Tue: 45%
                  </div>
                </div>
                <div className="w-8 bg-blue-400 rounded-t h-[60%] relative group">
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Wed: 60%
                  </div>
                </div>
                <div className="w-8 bg-blue-500 rounded-t h-[75%] relative group">
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Thu: 75%
                  </div>
                </div>
                <div className="w-8 bg-blue-600 rounded-t h-[90%] relative group">
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Fri: 90%
                  </div>
                </div>
                <div className="w-8 bg-blue-700 rounded-t h-[80%] relative group">
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Sat: 80%
                  </div>
                </div>
                <div className="w-8 bg-blue-800 rounded-t h-[70%] relative group">
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Sun: 70%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Member Distribution</CardTitle>
              <CardDescription>By membership type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Standard</span>
                    <span className="text-sm font-medium">65%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Premium</span>
                    <span className="text-sm font-medium">25%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-green-600 h-2.5 rounded-full"
                      style={{ width: "25%" }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">VIP</span>
                    <span className="text-sm font-medium">10%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-purple-600 h-2.5 rounded-full"
                      style={{ width: "10%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          {/* Range Listing Form */}
          <RangeListingForm />
        </div>
      </main>
    </div>
  );
};

export default RangeOwnerDashboard;
