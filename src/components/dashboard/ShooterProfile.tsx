import { useState, useEffect } from "react";
import { useAuth } from "@/firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

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
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Shooter Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={profile.fullName}
            onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            value={profile.age}
            onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) })}
            required
          />
        </div>

        <div>
          <Label htmlFor="experience">Experience</Label>
          <Input
            id="experience"
            value={profile.experience}
            onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="achievements">Achievements</Label>
          <Input
            id="achievements"
            value={profile.achievements}
            onChange={(e) => setProfile({ ...profile, achievements: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="equipment">Equipment</Label>
          <Input
            id="equipment"
            value={profile.equipment}
            onChange={(e) => setProfile({ ...profile, equipment: e.target.value })}
          />
        </div>

        <Button type="submit">Save Profile</Button>
      </form>
    </div>
  );
}
