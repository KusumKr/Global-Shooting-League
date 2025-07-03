import { useState, useRef } from "react";
import { useAuth } from "@/firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { MapPin, Info, List, Clock, Phone, Image as ImageIcon, Type } from "lucide-react";

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
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [logo, setLogo] = useState<string | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const [rangeImages, setRangeImages] = useState<string[]>([]);
  const [showChargeMsg, setShowChargeMsg] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && ["image/png", "image/jpeg", "image/svg+xml"].includes(file.type) && file.size <= 2 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a PNG, JPG, or SVG image up to 2MB.");
    }
  };

  const handleRemoveLogo = () => setLogo(null);

  const handleRangeImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    const validFiles = files.filter(file => file.type.startsWith('image/'));
    const readers = validFiles.map(file => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    });
    Promise.all(readers).then(images => {
      const allImages = [...rangeImages, ...images];
      setRangeImages(allImages.slice(0, 10));
      setShowChargeMsg(allImages.length > 5);
    });
  };

  const handleRemoveRangeImage = (idx: number) => {
    const newImages = rangeImages.filter((_, i) => i !== idx);
    setRangeImages(newImages);
    setShowChargeMsg(newImages.length > 5);
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
    setImagePreview(null);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="rounded-2xl shadow-2xl bg-gradient-to-br from-white via-blue-50 to-purple-50 p-8 border border-blue-100">
        <h2 className="text-3xl font-extrabold mb-8 text-center flex items-center justify-center gap-2">
          <List className="w-7 h-7 text-blue-500" /> Create Range Listing
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center mb-6">
            {logo ? (
              <img src={logo} alt="Range Logo" className="w-24 h-24 rounded-full object-cover border-4 border-blue-200 shadow mb-2" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 mb-2">
                No Logo
              </div>
            )}
            <input
              type="file"
              accept="image/png, image/jpeg, image/svg+xml"
              ref={logoInputRef}
              onChange={handleLogoChange}
              className="hidden"
            />
            <div className="flex gap-2">
              <button
                type="button"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                onClick={() => logoInputRef.current?.click()}
              >
                {logo ? "Change Logo" : "Upload Logo"}
              </button>
              {logo && (
                <button
                  type="button"
                  className="px-3 py-2 bg-red-400 text-white rounded-lg shadow hover:bg-red-500 transition"
                  onClick={handleRemoveLogo}
                >
                  Remove
                </button>
              )}
            </div>
            <span className="text-xs text-gray-500 mt-1">Max size: 2MB | PNG, JPG, or SVG recommended</span>
          </div>
          <div>
            <Label htmlFor="name" className="flex items-center gap-2 font-semibold">
              <Type className="w-4 h-4 text-blue-400" /> Range Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="mt-1 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition"
            />
          </div>

          <div>
            <Label htmlFor="address" className="flex items-center gap-2 font-semibold">
              <MapPin className="w-4 h-4 text-green-400" /> Address
            </Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
              className="mt-1 focus:ring-2 focus:ring-green-300 focus:border-green-400 transition"
            />
          </div>

          <div>
            <Label htmlFor="description" className="flex items-center gap-2 font-semibold">
              <Info className="w-4 h-4 text-purple-400" /> Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              className="mt-1 focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition"
            />
          </div>

          <div>
            <Label htmlFor="facilities" className="flex items-center gap-2 font-semibold">
              <List className="w-4 h-4 text-pink-400" /> Facilities
            </Label>
            <Textarea
              id="facilities"
              value={formData.facilities}
              onChange={(e) => setFormData({ ...formData, facilities: e.target.value })}
              placeholder="List available facilities..."
              required
              className="mt-1 focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition"
            />
          </div>

          <div>
            <Label htmlFor="openingHours" className="flex items-center gap-2 font-semibold">
              <Clock className="w-4 h-4 text-yellow-400" /> Opening Hours
            </Label>
            <Input
              id="openingHours"
              value={formData.openingHours}
              onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
              placeholder="e.g. Mon-Fri: 9AM-6PM"
              required
              className="mt-1 focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 transition"
            />
          </div>

          <div>
            <Label htmlFor="contactNumber" className="flex items-center gap-2 font-semibold">
              <Phone className="w-4 h-4 text-indigo-400" /> Contact Number
            </Label>
            <Input
              id="contactNumber"
              value={formData.contactNumber}
              onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
              required
              className="mt-1 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
            />
          </div>

          <div>
            <Label htmlFor="rangeImages" className="flex items-center gap-2 font-semibold">
              <ImageIcon className="w-4 h-4 text-orange-400" /> Range Images
            </Label>
            <Input
              id="rangeImages"
              type="file"
              accept="image/*"
              multiple
              onChange={handleRangeImagesChange}
              className="mt-1 focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition"
            />
            {rangeImages.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-3">
                {rangeImages.map((img, idx) => (
                  <div key={idx} className="relative">
                    <img
                      src={img}
                      alt={`Range ${idx + 1}`}
                      className="w-24 h-20 object-cover rounded-lg border border-gray-200 shadow"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                      onClick={() => handleRemoveRangeImage(idx)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            {showChargeMsg && (
              <div className="mt-2 text-sm text-red-500 font-semibold">
                Uploading more than 5 images will be charged.
              </div>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:from-purple-500 hover:to-blue-500 transition"
          >
            {loading ? "Creating..." : "Create Range Listing"}
          </Button>
        </form>
      </div>
    </div>
  );
}
