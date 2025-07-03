import { useState, useRef } from "react";
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
  favoriteGun: string;
  favoriteAmmunition: string;
  favoriteStance: string;
  additionalEquipment: string;
  height: string;
  weight: string;
  leftEyeSight: string;
  rightEyeSight: string;
  dominantHand: string;
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
    favoriteGun: "",
    favoriteAmmunition: "",
    favoriteStance: "",
    additionalEquipment: "",
    height: "",
    weight: "",
    leftEyeSight: "",
    rightEyeSight: "",
    dominantHand: "Right"
  });
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 10 * 1024 * 1024) { // 10MB
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select an image up to 10MB.");
    }
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
        {/* Image Upload Section */}
        <div className="flex flex-col items-center mb-6">
          {image ? (
            <img src={image} alt="Shooter" className="w-32 h-32 rounded-full object-cover border-4 border-blue-200 shadow-md mb-2" />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 mb-2">
              No Image
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
            onClick={() => fileInputRef.current?.click()}
          >
            {image ? "Change Image" : "Upload Image"}
          </button>
          <span className="text-xs text-gray-500 mt-1">Max size: 10MB</span>
        </div>
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
          <Label htmlFor="favoriteGun" className="flex items-center gap-2 text-pink-700 font-semibold">
            <Star className="w-5 h-5 text-pink-400" /> Favorite Gun
          </Label>
          <select
            id="favoriteGun"
            name="favoriteGun"
            value={profile.favoriteGun}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-pink-200 focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition shadow-sm"
          >
            <option value="">Select gun</option>
            <option value="Glock 17">Glock 17</option>
            <option value="Beretta M9 (92FS)">Beretta M9 (92FS)</option>
            <option value="SIG Sauer P320">SIG Sauer P320</option>
            <option value="Colt M1911">Colt M1911</option>
            <option value="Smith & Wesson Model 686">Smith & Wesson Model 686</option>
            <option value="Other">Other (enter below)</option>
          </select>
          {profile.favoriteGun === "Other" && (
            <Input
              name="favoriteGun"
              placeholder="Enter your favorite gun"
              value={profile.favoriteGun === "Other" ? "" : profile.favoriteGun}
              onChange={e => setProfile({ ...profile, favoriteGun: e.target.value })}
              className="mt-2 w-full rounded-lg border border-pink-200 focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition shadow-sm"
            />
          )}
        </div>
        <div>
          <Label htmlFor="favoriteAmmunition" className="flex items-center gap-2 text-pink-700 font-semibold">
            <Star className="w-5 h-5 text-pink-400" /> Favorite Ammunition
          </Label>
          <select
            id="favoriteAmmunition"
            name="favoriteAmmunition"
            value={profile.favoriteAmmunition}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-pink-200 focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition shadow-sm"
          >
            <option value="">Select ammunition</option>
            <option value="9mm Parabellum">9mm Parabellum</option>
            <option value=".45 ACP">.45 ACP</option>
            <option value="5.56x45mm NATO">5.56x45mm NATO</option>
            <option value="7.62x39mm">7.62x39mm</option>
            <option value=".22 Long Rifle (.22 LR)">.22 Long Rifle (.22 LR)</option>
            <option value="Other">Other (enter below)</option>
          </select>
          {profile.favoriteAmmunition === "Other" && (
            <Input
              name="favoriteAmmunition"
              placeholder="Enter your favorite ammunition"
              value={profile.favoriteAmmunition === "Other" ? "" : profile.favoriteAmmunition}
              onChange={e => setProfile({ ...profile, favoriteAmmunition: e.target.value })}
              className="mt-2 w-full rounded-lg border border-pink-200 focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition shadow-sm"
            />
          )}
        </div>
        <div>
          <Label htmlFor="favoriteStance" className="flex items-center gap-2 text-pink-700 font-semibold">
            <Star className="w-5 h-5 text-pink-400" /> Favorite Stance
          </Label>
          <select
            id="favoriteStance"
            name="favoriteStance"
            value={profile.favoriteStance}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-pink-200 focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition shadow-sm"
          >
            <option value="">Select stance</option>
            <option value="Standing">Standing</option>
            <option value="Prone">Prone</option>
            <option value="Kneeling">Kneeling</option>
            <option value="Other">Other (enter below)</option>
          </select>
          {profile.favoriteStance === "Other" && (
            <Input
              name="favoriteStance"
              placeholder="Enter your favorite stance"
              value={profile.favoriteStance === "Other" ? "" : profile.favoriteStance}
              onChange={e => setProfile({ ...profile, favoriteStance: e.target.value })}
              className="mt-2 w-full rounded-lg border border-pink-200 focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition shadow-sm"
            />
          )}
        </div>
        <div>
          <Label htmlFor="additionalEquipment" className="flex items-center gap-2 text-pink-700 font-semibold">
            <Star className="w-5 h-5 text-pink-400" /> Additional Equipment
          </Label>
          <Input
            id="additionalEquipment"
            name="additionalEquipment"
            placeholder="Other equipment you use (gloves, glasses, etc.)"
            value={profile.additionalEquipment}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-pink-200 focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition shadow-sm"
          />
        </div>
        {/* Physical Details Section */}
        <div className="mb-8 p-6 rounded-2xl shadow-lg bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 border border-blue-100">
          <h3 className="text-xl font-extrabold mb-4 text-blue-700 flex items-center gap-2">
            <User className="w-6 h-6 text-blue-400" /> Physical Details
          </h3>
          <div className="mb-4">
            <Label htmlFor="height" className="font-semibold text-green-700">
              Height (cm)
            </Label>
            <Input
              id="height"
              name="height"
              value={profile.height}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-green-200 focus:ring-2 focus:ring-green-300 focus:border-green-400 transition shadow-sm"
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="weight" className="font-semibold text-purple-700">
              Weight (kg)
            </Label>
            <Input
              id="weight"
              name="weight"
              value={profile.weight}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition shadow-sm"
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="age" className="font-semibold text-yellow-700">
              Age
            </Label>
            <Input
              id="age"
              name="age"
              value={profile.age}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-yellow-200 focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 transition shadow-sm"
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="leftEyeSight" className="font-semibold text-blue-700">
              Left Eye Sight
            </Label>
            <Input
              id="leftEyeSight"
              name="leftEyeSight"
              value={profile.leftEyeSight}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition shadow-sm"
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="rightEyeSight" className="font-semibold text-blue-700">
              Right Eye Sight
            </Label>
            <Input
              id="rightEyeSight"
              name="rightEyeSight"
              value={profile.rightEyeSight}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition shadow-sm"
            />
          </div>
          <div className="mb-2">
            <Label htmlFor="dominantHand" className="font-semibold text-pink-700">
              Dominant Hand
            </Label>
            <Input
              id="dominantHand"
              name="dominantHand"
              value={profile.dominantHand}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-pink-200 focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition shadow-sm"
            />
          </div>
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
