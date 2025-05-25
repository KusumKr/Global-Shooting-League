import React, { useEffect, useState } from "react";
import { useAuth } from "../../../supabase/auth";
import { supabase } from "../../../supabase/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Save } from "lucide-react";

type ShooterProfileData = {
  height: string;
  weight: string;
  age: string;
  eye_sight_left: string;
  eye_sight_right: string;
  dominant_hand: string;
  favorite_gun: string;
  favorite_ammunition: string;
  favorite_stance: string;
  additional_equipment: string;
};

const ShooterProfile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "success" | "error"
  >("idle");
  const [profileData, setProfileData] = useState<ShooterProfileData>({
    height: "",
    weight: "",
    age: "",
    eye_sight_left: "",
    eye_sight_right: "",
    dominant_hand: "",
    favorite_gun: "",
    favorite_ammunition: "",
    favorite_stance: "",
    additional_equipment: "",
  });

  useEffect(() => {
    if (user) {
      fetchProfileData();
    }
  }, [user]);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
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
        setProfileData({
          height: data.height?.toString() || "",
          weight: data.weight?.toString() || "",
          age: data.age?.toString() || "",
          eye_sight_left: data.eye_sight_left?.toString() || "",
          eye_sight_right: data.eye_sight_right?.toString() || "",
          dominant_hand: data.dominant_hand || "",
          favorite_gun: data.favorite_gun || "",
          favorite_ammunition: data.favorite_ammunition || "",
          favorite_stance: data.favorite_stance || "",
          additional_equipment: data.additional_equipment || "",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setSaveStatus("saving");

      // Convert string values to appropriate types
      const dataToSave = {
        user_id: user.id,
        height: profileData.height ? parseFloat(profileData.height) : null,
        weight: profileData.weight ? parseFloat(profileData.weight) : null,
        age: profileData.age ? parseInt(profileData.age) : null,
        eye_sight_left: profileData.eye_sight_left
          ? parseFloat(profileData.eye_sight_left)
          : null,
        eye_sight_right: profileData.eye_sight_right
          ? parseFloat(profileData.eye_sight_right)
          : null,
        dominant_hand: profileData.dominant_hand,
        favorite_gun: profileData.favorite_gun,
        favorite_ammunition: profileData.favorite_ammunition,
        favorite_stance: profileData.favorite_stance,
        additional_equipment: profileData.additional_equipment,
        updated_at: new Date(),
      };

      // Check if profile exists
      const { data: existingProfile } = await supabase
        .from("shooter_profiles")
        .select("id")
        .eq("user_id", user.id)
        .single();

      let error;
      if (existingProfile) {
        // Update existing profile
        const { error: updateError } = await supabase
          .from("shooter_profiles")
          .update(dataToSave)
          .eq("user_id", user.id);
        error = updateError;
      } else {
        // Insert new profile
        const { error: insertError } = await supabase
          .from("shooter_profiles")
          .insert([dataToSave]);
        error = insertError;
      }

      if (error) {
        console.error("Error saving profile:", error);
        setSaveStatus("error");
        return;
      }

      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (error) {
      console.error("Error:", error);
      setSaveStatus("error");
    }
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle>Shooter Profile</CardTitle>
        <CardDescription>
          Enter your physical details and equipment preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Physical Details</h3>
              <div className="space-y-2">
                <div>
                  <label
                    htmlFor="height"
                    className="text-sm font-medium block mb-1"
                  >
                    Height (cm)
                  </label>
                  <Input
                    id="height"
                    name="height"
                    type="number"
                    step="0.1"
                    placeholder="Height in cm"
                    value={profileData.height}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="weight"
                    className="text-sm font-medium block mb-1"
                  >
                    Weight (kg)
                  </label>
                  <Input
                    id="weight"
                    name="weight"
                    type="number"
                    step="0.1"
                    placeholder="Weight in kg"
                    value={profileData.weight}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="age"
                    className="text-sm font-medium block mb-1"
                  >
                    Age
                  </label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    placeholder="Your age"
                    value={profileData.age}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="eye_sight_left"
                    className="text-sm font-medium block mb-1"
                  >
                    Left Eye Sight
                  </label>
                  <Input
                    id="eye_sight_left"
                    name="eye_sight_left"
                    type="number"
                    step="0.01"
                    placeholder="Left eye sight (e.g. 6/6 or 20/20 = 1.0)"
                    value={profileData.eye_sight_left}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="eye_sight_right"
                    className="text-sm font-medium block mb-1"
                  >
                    Right Eye Sight
                  </label>
                  <Input
                    id="eye_sight_right"
                    name="eye_sight_right"
                    type="number"
                    step="0.01"
                    placeholder="Right eye sight (e.g. 6/6 or 20/20 = 1.0)"
                    value={profileData.eye_sight_right}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="dominant_hand"
                    className="text-sm font-medium block mb-1"
                  >
                    Dominant Hand
                  </label>
                  <Input
                    id="dominant_hand"
                    name="dominant_hand"
                    placeholder="Right, Left, or Ambidextrous"
                    value={profileData.dominant_hand}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Equipment Preferences</h3>
              <div className="space-y-2">
                <div>
                  <label
                    htmlFor="favorite_gun"
                    className="text-sm font-medium block mb-1"
                  >
                    Favorite Gun
                  </label>
                  <Input
                    id="favorite_gun"
                    name="favorite_gun"
                    placeholder="Make and model"
                    value={profileData.favorite_gun}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="favorite_ammunition"
                    className="text-sm font-medium block mb-1"
                  >
                    Favorite Ammunition
                  </label>
                  <Input
                    id="favorite_ammunition"
                    name="favorite_ammunition"
                    placeholder="Brand and type"
                    value={profileData.favorite_ammunition}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="favorite_stance"
                    className="text-sm font-medium block mb-1"
                  >
                    Favorite Stance
                  </label>
                  <Input
                    id="favorite_stance"
                    name="favorite_stance"
                    placeholder="Your preferred shooting stance"
                    value={profileData.favorite_stance}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="additional_equipment"
                    className="text-sm font-medium block mb-1"
                  >
                    Additional Equipment
                  </label>
                  <Input
                    id="additional_equipment"
                    name="additional_equipment"
                    placeholder="Other equipment you use (gloves, glasses, etc.)"
                    value={profileData.additional_equipment}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <CardFooter className="px-0 pt-4">
            <Button
              type="submit"
              className="w-full md:w-auto"
              disabled={saveStatus === "saving"}
            >
              {saveStatus === "saving" ? (
                "Saving..."
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Profile
                </>
              )}
            </Button>
            {saveStatus === "success" && (
              <span className="ml-4 text-sm text-green-600">
                Profile saved successfully!
              </span>
            )}
            {saveStatus === "error" && (
              <span className="ml-4 text-sm text-red-600">
                Error saving profile. Please try again.
              </span>
            )}
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default ShooterProfile;
