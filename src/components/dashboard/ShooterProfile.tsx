import { useState } from "react";
import { useAuth } from "@/firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { User, Calendar, Award, Star, Briefcase } from "lucide-react";

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

  const handleChange = (e: any) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
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
    <div className="w-full max-w-lg mx-auto bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 rounded-2xl shadow-xl p-6">
      <h2 className="text-2xl font-extrabold text-blue-700 mb-4 flex items-center gap-2 justify-center">
        <User className="w-7 h-7 text-blue-400" /> Shooter Profile
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <div>
          <Label htmlFor="fullName" className="flex items-center gap-2 text-blue-700 font-semibold">
            <User className="w-5 h-5 text-blue-400" /> Full Name
          </Label>
          <Input
            id="fullName"
            name="fullName"
            value={profile.fullName}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition shadow-sm"
          />
        </div>
        <div>
          <Label htmlFor="age" className="flex items-center gap-2 text-green-700 font-semibold">
            <Calendar className="w-5 h-5 text-green-400" /> Age
          </Label>
          <Input
            id="age"
            name="age"
            type="number"
            value={profile.age}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-green-200 focus:ring-2 focus:ring-green-300 focus:border-green-400 transition shadow-sm"
          />
        </div>
        <div>
          <Label htmlFor="experience" className="flex items-center gap-2 text-purple-700 font-semibold">
            <Briefcase className="w-5 h-5 text-purple-400" /> Experience
          </Label>
          <Input
            id="experience"
            name="experience"
            value={profile.experience}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition shadow-sm"
          />
        </div>
        <div>
          <Label htmlFor="achievements" className="flex items-center gap-2 text-yellow-700 font-semibold">
            <Award className="w-5 h-5 text-yellow-400" /> Achievements
          </Label>
          <Input
            id="achievements"
            name="achievements"
            value={profile.achievements}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-yellow-200 focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 transition shadow-sm"
          />
        </div>
        <div>
          <Label htmlFor="equipment" className="flex items-center gap-2 text-pink-700 font-semibold">
            <Star className="w-5 h-5 text-pink-400" /> Equipment
          </Label>
          <Input
            id="equipment"
            name="equipment"
            value={profile.equipment}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-pink-200 focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition shadow-sm"
          />
        </div>
        <Button
          type="submit"
          className="w-full py-3 text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:from-purple-500 hover:to-blue-500 transition rounded-lg mt-4"
        >
          Save Profile
        </Button>
      </form>
    </div>
  );
}
