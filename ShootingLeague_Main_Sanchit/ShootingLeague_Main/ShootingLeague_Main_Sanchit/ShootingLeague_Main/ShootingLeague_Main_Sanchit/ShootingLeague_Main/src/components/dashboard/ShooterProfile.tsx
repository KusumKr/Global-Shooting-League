import { useState, useEffect } from "react";
import { useAuth } from "@/firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ShooterProfile {
  fullName: string;
  age: number;
  experience: string;
  achievements: string;
  preferredDisciplines: string[];
  equipment: string;
}

export default function ShooterProfile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<ShooterProfile>({
    fullName: "",
    age: 0,
    experience: "",
    achievements: "",
    preferredDisciplines: [],
    equipment: ""
  });
  const [loading, setLoading] = useState(false);

  // No Firestore fetching or saving
  // Only UI and local state logic

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Success",
      description: "Profile updated locally (no DB)"
    });
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-xl border border-blue-100">
      <div className="flex flex-col items-center mb-6">
        <Avatar className="h-20 w-20 mb-2 shadow border-2 border-blue-200">
          <AvatarImage src={user?.photoURL || undefined} alt={user?.email || 'User'} />
          <AvatarFallback>{user?.email?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
        </Avatar>
        <h2 className="text-2xl font-bold text-blue-800 mb-1">Shooter Profile</h2>
        <p className="text-gray-500 text-sm">Let us know more about you as a shooter!</p>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-1">
          <Label htmlFor="fullName" className="text-blue-700 font-semibold">Full Name</Label>
          <Input
            id="fullName"
            value={profile.fullName}
            onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
            required
            className="mt-1 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
          />
        </div>
        <div className="col-span-1">
          <Label htmlFor="age" className="text-blue-700 font-semibold">Age</Label>
          <Input
            id="age"
            type="number"
            value={profile.age}
            onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) })}
            required
            className="mt-1 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <Label htmlFor="experience" className="text-blue-700 font-semibold">Experience</Label>
          <Input
            id="experience"
            value={profile.experience}
            onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
            required
            className="mt-1 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <Label htmlFor="achievements" className="text-blue-700 font-semibold">Achievements</Label>
          <Input
            id="achievements"
            value={profile.achievements}
            onChange={(e) => setProfile({ ...profile, achievements: e.target.value })}
            className="mt-1 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <Label htmlFor="equipment" className="text-blue-700 font-semibold">Equipment</Label>
          <Input
            id="equipment"
            value={profile.equipment}
            onChange={(e) => setProfile({ ...profile, equipment: e.target.value })}
            className="mt-1 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
          />
        </div>
        <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
          <Button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-lg text-lg font-bold shadow-lg transition-all">Save Profile</Button>
        </div>
      </form>
    </div>
  );
}
