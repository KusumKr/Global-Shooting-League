import React, { useEffect, useState } from "react";
import { useAuth } from "../../../supabase/auth";
import { supabase } from "../../../supabase/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Save, MapPin, Clock, DollarSign, Building } from "lucide-react";

type RangeData = {
  id?: string;
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  latitude: string;
  longitude: string;
  hourly_rate: string;
  available_lanes: string;
  opening_hours: string;
  closing_hours: string;
  available_days: string;
  facilities: string[];
  equipment_provided: boolean;
  coaching_available: boolean;
  image_url: string;
  contact_phone: string;
  contact_email: string;
  website: string;
};

const facilityOptions = [
  "Air Conditioning",
  "Restrooms",
  "Parking",
  "Cafeteria",
  "Pro Shop",
  "Locker Room",
  "Spectator Area",
  "Wheelchair Accessible",
  "Electronic Targets",
  "Target Retrieval System",
];

const RangeListingForm = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "success" | "error"
  >("idle");
  const [rangeData, setRangeData] = useState<RangeData>({
    name: "",
    description: "",
    address: "",
    city: "",
    state: "",
    postal_code: "",
    country: "India",
    latitude: "",
    longitude: "",
    hourly_rate: "",
    available_lanes: "",
    opening_hours: "",
    closing_hours: "",
    available_days: "",
    facilities: [],
    equipment_provided: false,
    coaching_available: false,
    image_url: "",
    contact_phone: "",
    contact_email: "",
    website: "",
  });

  useEffect(() => {
    if (user) {
      fetchRangeData();
    }
  }, [user]);

  const fetchRangeData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("shooting_ranges")
        .select("*")
        .eq("user_id", user?.id)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error fetching range data:", error);
        return;
      }

      if (data) {
        setRangeData({
          id: data.id,
          name: data.name || "",
          description: data.description || "",
          address: data.address || "",
          city: data.city || "",
          state: data.state || "",
          postal_code: data.postal_code || "",
          country: data.country || "India",
          latitude: data.latitude?.toString() || "",
          longitude: data.longitude?.toString() || "",
          hourly_rate: data.hourly_rate?.toString() || "",
          available_lanes: data.available_lanes?.toString() || "",
          opening_hours: data.opening_hours || "",
          closing_hours: data.closing_hours || "",
          available_days: data.available_days || "",
          facilities: data.facilities || [],
          equipment_provided: data.equipment_provided || false,
          coaching_available: data.coaching_available || false,
          image_url: data.image_url || "",
          contact_phone: data.contact_phone || "",
          contact_email: data.contact_email || "",
          website: data.website || "",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setRangeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setRangeData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleFacilityChange = (facility: string, checked: boolean) => {
    setRangeData((prev) => {
      if (checked) {
        return {
          ...prev,
          facilities: [...prev.facilities, facility],
        };
      } else {
        return {
          ...prev,
          facilities: prev.facilities.filter((f) => f !== facility),
        };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setSaveStatus("saving");
      console.log("Saving range data...");

      // Convert string values to appropriate types
      const dataToSave = {
        user_id: user.id,
        name: rangeData.name,
        description: rangeData.description,
        address: rangeData.address,
        city: rangeData.city,
        state: rangeData.state,
        postal_code: rangeData.postal_code,
        country: rangeData.country,
        latitude: rangeData.latitude ? parseFloat(rangeData.latitude) : null,
        longitude: rangeData.longitude ? parseFloat(rangeData.longitude) : null,
        hourly_rate: rangeData.hourly_rate
          ? parseFloat(rangeData.hourly_rate)
          : null,
        available_lanes: rangeData.available_lanes
          ? parseInt(rangeData.available_lanes)
          : null,
        opening_hours: rangeData.opening_hours,
        closing_hours: rangeData.closing_hours,
        available_days: rangeData.available_days,
        facilities: rangeData.facilities,
        equipment_provided: rangeData.equipment_provided,
        coaching_available: rangeData.coaching_available,
        image_url: rangeData.image_url,
        contact_phone: rangeData.contact_phone,
        contact_email: rangeData.contact_email,
        website: rangeData.website,
        updated_at: new Date(),
      };

      console.log("Data to save:", dataToSave);

      let error;
      if (rangeData.id) {
        // Update existing range
        console.log("Updating existing range with ID:", rangeData.id);
        const { error: updateError } = await supabase
          .from("shooting_ranges")
          .update(dataToSave)
          .eq("id", rangeData.id);
        error = updateError;
      } else {
        // Insert new range
        console.log("Creating new range listing");
        const { error: insertError } = await supabase
          .from("shooting_ranges")
          .insert([dataToSave]);
        error = insertError;
      }

      if (error) {
        console.error("Error saving range:", error);
        setSaveStatus("error");
        return;
      }

      console.log("Range data saved successfully");
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
        <CardTitle className="flex items-center">
          <Building className="mr-2 h-5 w-5 text-blue-600" />
          Shooting Range Listing
        </CardTitle>
        <CardDescription>
          List your shooting range to attract shooters
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-medium block mb-1"
                >
                  Range Name *
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter range name"
                  value={rangeData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="image_url"
                  className="text-sm font-medium block mb-1"
                >
                  Image URL
                </label>
                <Input
                  id="image_url"
                  name="image_url"
                  placeholder="URL to range image"
                  value={rangeData.image_url}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="text-sm font-medium block mb-1"
              >
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your shooting range"
                value={rangeData.description}
                onChange={handleInputChange}
                className="min-h-[100px]"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center">
              <MapPin className="mr-2 h-4 w-4 text-red-500" />
              Location Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="address"
                  className="text-sm font-medium block mb-1"
                >
                  Address *
                </label>
                <Input
                  id="address"
                  name="address"
                  placeholder="Street address"
                  value={rangeData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="text-sm font-medium block mb-1"
                >
                  City *
                </label>
                <Input
                  id="city"
                  name="city"
                  placeholder="City"
                  value={rangeData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="state"
                  className="text-sm font-medium block mb-1"
                >
                  State *
                </label>
                <Input
                  id="state"
                  name="state"
                  placeholder="State"
                  value={rangeData.state}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="postal_code"
                  className="text-sm font-medium block mb-1"
                >
                  Postal Code
                </label>
                <Input
                  id="postal_code"
                  name="postal_code"
                  placeholder="Postal code"
                  value={rangeData.postal_code}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="country"
                  className="text-sm font-medium block mb-1"
                >
                  Country
                </label>
                <Input
                  id="country"
                  name="country"
                  placeholder="Country"
                  value={rangeData.country}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="latitude"
                  className="text-sm font-medium block mb-1"
                >
                  Latitude
                </label>
                <Input
                  id="latitude"
                  name="latitude"
                  type="number"
                  step="0.000001"
                  placeholder="Latitude coordinates"
                  value={rangeData.latitude}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="longitude"
                  className="text-sm font-medium block mb-1"
                >
                  Longitude
                </label>
                <Input
                  id="longitude"
                  name="longitude"
                  type="number"
                  step="0.000001"
                  placeholder="Longitude coordinates"
                  value={rangeData.longitude}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center">
              <Clock className="mr-2 h-4 w-4 text-green-500" />
              Operating Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="opening_hours"
                  className="text-sm font-medium block mb-1"
                >
                  Opening Hours
                </label>
                <Input
                  id="opening_hours"
                  name="opening_hours"
                  placeholder="e.g., 9:00 AM"
                  value={rangeData.opening_hours}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="closing_hours"
                  className="text-sm font-medium block mb-1"
                >
                  Closing Hours
                </label>
                <Input
                  id="closing_hours"
                  name="closing_hours"
                  placeholder="e.g., 6:00 PM"
                  value={rangeData.closing_hours}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="available_days"
                  className="text-sm font-medium block mb-1"
                >
                  Available Days
                </label>
                <Input
                  id="available_days"
                  name="available_days"
                  placeholder="e.g., Monday-Saturday"
                  value={rangeData.available_days}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="available_lanes"
                  className="text-sm font-medium block mb-1"
                >
                  Number of Lanes
                </label>
                <Input
                  id="available_lanes"
                  name="available_lanes"
                  type="number"
                  placeholder="Number of shooting lanes"
                  value={rangeData.available_lanes}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="hourly_rate"
                  className="text-sm font-medium block mb-1"
                >
                  <DollarSign className="inline h-4 w-4 text-yellow-500 mr-1" />
                  Hourly Rate (₹)
                </label>
                <Input
                  id="hourly_rate"
                  name="hourly_rate"
                  type="number"
                  placeholder="Hourly rate in rupees"
                  value={rangeData.hourly_rate}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Facilities & Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium block mb-1">
                  Available Facilities
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {facilityOptions.map((facility) => (
                    <div key={facility} className="flex items-center space-x-2">
                      <Checkbox
                        id={`facility-${facility}`}
                        checked={rangeData.facilities.includes(facility)}
                        onCheckedChange={(checked) =>
                          handleFacilityChange(facility, checked === true)
                        }
                      />
                      <label
                        htmlFor={`facility-${facility}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {facility}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="equipment_provided"
                    checked={rangeData.equipment_provided}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(
                        "equipment_provided",
                        checked === true,
                      )
                    }
                  />
                  <label
                    htmlFor="equipment_provided"
                    className="text-sm font-medium leading-none"
                  >
                    Equipment Provided
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="coaching_available"
                    checked={rangeData.coaching_available}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(
                        "coaching_available",
                        checked === true,
                      )
                    }
                  />
                  <label
                    htmlFor="coaching_available"
                    className="text-sm font-medium leading-none"
                  >
                    Coaching Available
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="contact_phone"
                  className="text-sm font-medium block mb-1"
                >
                  Contact Phone
                </label>
                <Input
                  id="contact_phone"
                  name="contact_phone"
                  placeholder="Phone number"
                  value={rangeData.contact_phone}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="contact_email"
                  className="text-sm font-medium block mb-1"
                >
                  Contact Email
                </label>
                <Input
                  id="contact_email"
                  name="contact_email"
                  type="email"
                  placeholder="Email address"
                  value={rangeData.contact_email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="website"
                  className="text-sm font-medium block mb-1"
                >
                  Website
                </label>
                <Input
                  id="website"
                  name="website"
                  placeholder="Website URL"
                  value={rangeData.website}
                  onChange={handleInputChange}
                />
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
                  {rangeData.id
                    ? "Update Range Listing"
                    : "Create Range Listing"}
                </>
              )}
            </Button>
            {saveStatus === "success" && (
              <span className="ml-4 text-sm text-green-600">
                Range listing saved successfully!
              </span>
            )}
            {saveStatus === "error" && (
              <span className="ml-4 text-sm text-red-600">
                Error saving range listing. Please try again.
              </span>
            )}
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default RangeListingForm;
