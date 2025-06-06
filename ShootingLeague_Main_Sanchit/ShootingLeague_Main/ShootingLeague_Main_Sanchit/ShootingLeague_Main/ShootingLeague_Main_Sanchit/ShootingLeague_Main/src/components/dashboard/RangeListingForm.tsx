import { useState } from "react";
import { useAuth } from "@/firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface RangeFormData {
  name: string;
  address: string;
  description: string;
  facilities: string;
  openingHours: string;
  contactNumber: string;
  imageUrl: string;
}

export default function RangeListingForm() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<RangeFormData>({
    name: "",
    address: "",
    description: "",
    facilities: "",
    openingHours: "",
    contactNumber: "",
    imageUrl: ""
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Success",
      description: "Range listing updated locally (no DB)"
    });
    setFormData({
      name: "",
      address: "",
      description: "",
      facilities: "",
      openingHours: "",
      contactNumber: "",
      imageUrl: ""
    });
    setImageFile(null);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-8 bg-white rounded-2xl shadow-xl border border-blue-100 mt-8">
      <div className="flex flex-col items-center mb-6">
        <div className="h-24 w-24 rounded-xl bg-blue-100 flex items-center justify-center mb-2 overflow-hidden border-2 border-blue-200 shadow">
          {imageFile ? (
            <img src={URL.createObjectURL(imageFile)} alt="Range" className="object-cover h-full w-full" />
          ) : (
            <span className="text-blue-400 text-5xl">🏟️</span>
          )}
        </div>
        <h2 className="text-2xl font-bold text-blue-800 mb-1">Create Range Listing</h2>
        <p className="text-gray-500 text-sm">Share your range details with the community!</p>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
        <div className="col-span-1">
          <Label htmlFor="name" className="text-blue-700 font-semibold">Range Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="mt-1 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
          />
        </div>
        <div className="col-span-1">
          <Label htmlFor="address" className="text-blue-700 font-semibold">Address</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            required
            className="mt-1 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <Label htmlFor="description" className="text-blue-700 font-semibold">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            className="mt-1 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <Label htmlFor="facilities" className="text-blue-700 font-semibold">Facilities</Label>
          <Textarea
            id="facilities"
            value={formData.facilities}
            onChange={(e) => setFormData({ ...formData, facilities: e.target.value })}
            placeholder="List available facilities..."
            required
            className="mt-1 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
          />
        </div>
        <div className="col-span-1">
          <Label htmlFor="openingHours" className="text-blue-700 font-semibold">Opening Hours</Label>
          <Input
            id="openingHours"
            value={formData.openingHours}
            onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
            placeholder="e.g. Mon-Fri: 9AM-6PM"
            required
            className="mt-1 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
          />
        </div>
        <div className="col-span-1">
          <Label htmlFor="contactNumber" className="text-blue-700 font-semibold">Contact Number</Label>
          <Input
            id="contactNumber"
            value={formData.contactNumber}
            onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
            required
            className="mt-1 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <Label htmlFor="image" className="text-blue-700 font-semibold">Range Image</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1"
          />
        </div>
        <div className="col-span-1 md:col-span-2 flex justify-center mt-4 w-full">
          <Button type="submit" disabled={loading} className="w-full md:w-auto bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-lg text-lg font-bold shadow-lg transition-all">
            {loading ? "Creating..." : "Create Range Listing"}
          </Button>
        </div>
      </form>
    </div>
  );
}
