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
import { Users, Calendar, MapPin, BarChart, ArrowRightCircle, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import RangeListingForm from "./RangeListingForm";

const eventStatus = {
  Open: { color: "bg-green-100 text-green-800", icon: <CheckCircle className="inline w-4 h-4 mr-1" /> },
  "Almost Full": { color: "bg-yellow-100 text-yellow-800", icon: <AlertTriangle className="inline w-4 h-4 mr-1" /> },
  Full: { color: "bg-red-100 text-red-800", icon: <XCircle className="inline w-4 h-4 mr-1" /> },
};

const events = [
  {
    name: "Summer Championship",
    date: "July 10, 2024",
    location: "Main Range",
    registrations: 78,
    capacity: 100,
    status: "Open",
  },
  {
    name: "Junior Training Camp",
    date: "July 15-20, 2024",
    location: "Training Center",
    registrations: 24,
    capacity: 30,
    status: "Almost Full",
  },
  {
    name: "Regional Qualifier",
    date: "August 5, 2024",
    location: "Competition Range",
    registrations: 120,
    capacity: 120,
    status: "Full",
  },
];

const RangeOwnerDashboard = () => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <header className="bg-white/80 shadow-sm backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-1 flex items-center gap-2">
              <span>👋</span> Welcome, {(user?.displayName?.split('|')[0]) || user?.email || "Range Owner"}!
            </h1>
            <p className="text-sm text-gray-500 font-medium">Range Owner Dashboard</p>
          </div>
          <Button
            onClick={handleSignOut}
            variant="default"
            className="text-sm font-semibold px-5 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg hover:from-blue-500 hover:to-purple-500 transition"
          >
            Sign Out
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1 */}
          <Card className="bg-gradient-to-br from-blue-100 to-blue-300 shadow-xl hover:scale-105 transition-transform duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-blue-900">Total Members</CardTitle>
              <Users className="h-6 w-6 text-blue-700" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-extrabold text-blue-900">245</div>
              <p className="text-xs text-blue-800 font-medium mt-1">+12% from last month</p>
            </CardContent>
          </Card>
          {/* Card 2 */}
          <Card className="bg-gradient-to-br from-green-100 to-green-300 shadow-xl hover:scale-105 transition-transform duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-green-900">Upcoming Events</CardTitle>
              <Calendar className="h-6 w-6 text-green-700" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-extrabold text-green-900">5</div>
              <p className="text-xs text-green-800 font-medium mt-1">Next 30 days</p>
            </CardContent>
          </Card>
          {/* Card 3 */}
          <Card className="bg-gradient-to-br from-pink-100 to-pink-300 shadow-xl hover:scale-105 transition-transform duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-pink-900">Range Facilities</CardTitle>
              <MapPin className="h-6 w-6 text-pink-700" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-extrabold text-pink-900">3</div>
              <p className="text-xs text-pink-800 font-medium mt-1">Active locations</p>
            </CardContent>
          </Card>
          {/* Card 4 */}
          <Card className="bg-gradient-to-br from-purple-100 to-purple-300 shadow-xl hover:scale-105 transition-transform duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-purple-900">Revenue</CardTitle>
              <BarChart className="h-6 w-6 text-purple-700" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-extrabold text-purple-900">$12,450</div>
              <p className="text-xs text-purple-800 font-medium mt-1">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Scheduled Events Table */}
        <div className="mt-12">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Scheduled Events</CardTitle>
              <CardDescription className="text-gray-500">Upcoming events at your ranges</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">Event Name</th>
                      <th className="text-left py-3 px-4 font-semibold">Date</th>
                      <th className="text-left py-3 px-4 font-semibold">Location</th>
                      <th className="text-left py-3 px-4 font-semibold">Registrations</th>
                      <th className="text-left py-3 px-4 font-semibold">Status</th>
                      <th className="text-left py-3 px-4 font-semibold"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((event) => (
                      <tr key={event.name} className="border-b hover:bg-blue-50 transition">
                        <td className="py-3 px-4 font-medium">{event.name}</td>
                        <td className="py-3 px-4">{event.date}</td>
                        <td className="py-3 px-4">{event.location}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span>{event.registrations}/{event.capacity}</span>
                            <div className="w-24 bg-gray-200 rounded-full h-2.5">
                              <div
                                className="h-2.5 rounded-full bg-gradient-to-r from-blue-400 to-blue-600"
                                style={{ width: `${(event.registrations / event.capacity) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${eventStatus[event.status as keyof typeof eventStatus].color}`}>
                            {eventStatus[event.status as keyof typeof eventStatus].icon}
                            {event.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <Button size="sm" variant="ghost" className="text-blue-600 hover:bg-blue-100 flex items-center gap-1">
                            View Details <ArrowRightCircle className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Range Usage & Member Distribution */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Range Usage</CardTitle>
              <CardDescription>Last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-end justify-between">
                {[
                  { label: "Mon", value: 30 },
                  { label: "Tue", value: 45 },
                  { label: "Wed", value: 60 },
                  { label: "Thu", value: 75 },
                  { label: "Fri", value: 90 },
                  { label: "Sat", value: 80 },
                  { label: "Sun", value: 70 },
                ].map((day) => (
                  <div
                    key={day.label}
                    className={`w-8 rounded-t bg-gradient-to-t from-blue-300 to-blue-600 relative group transition-all duration-200`}
                    style={{ height: `${day.value}%` }}
                  >
                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {day.label}: {day.value}%
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Member Distribution</CardTitle>
              <CardDescription>By membership type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { label: "Standard", value: 65, color: "from-blue-400 to-blue-600" },
                  { label: "Premium", value: 25, color: "from-green-400 to-green-600" },
                  { label: "VIP", value: 10, color: "from-purple-400 to-purple-600" },
                ].map((type) => (
                  <div key={type.label} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{type.label}</span>
                      <span className="text-sm font-bold">{type.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full bg-gradient-to-r ${type.color}`}
                        style={{ width: `${type.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Range Listing Form */}
        <div className="mt-12">
          <RangeListingForm />
        </div>
      </main>
    </div>
  );
};

export default RangeOwnerDashboard;
