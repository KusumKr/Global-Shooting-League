import { useState } from "react";
import { useAuth } from "../../firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { useToast } from "@/components/ui/use-toast";

type UserRole =
  | "shooter"
  | "range_owner"
  | "technical_coach"
  | "dietician"
  | "mental_trainer"
  | "franchise_owner";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<UserRole>("shooter");
  const [error, setError] = useState("");
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminCode, setAdminCode] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    try {
      await signUp(email, password, fullName, role);
      toast({
        title: "Account created successfully",
        description: "Please check your email to verify your account.",
        duration: 5000,
      });
      navigate("/login");
    } catch (error: any) {
      console.error("Signup error:", error);
      setError(error.message || "Error creating account. Please try again.");
    }
  };

  return (
    <AuthLayout>
      <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>I am a</Label>
            <div className="flex flex-wrap gap-4">
              <label>
                <input
                  type="radio"
                  value="shooter"
                  checked={role === "shooter"}
                  onChange={() => setRole("shooter")}
                />{" "}
                Shooter
              </label>
              <label>
                <input
                  type="radio"
                  value="range_owner"
                  checked={role === "range_owner"}
                  onChange={() => setRole("range_owner")}
                />{" "}
                Range Owner
              </label>
              <label>
                <input
                  type="radio"
                  value="technical_coach"
                  checked={role === "technical_coach"}
                  onChange={() => setRole("technical_coach")}
                />{" "}
                Technical Coach
              </label>
              <label>
                <input
                  type="radio"
                  value="dietician"
                  checked={role === "dietician"}
                  onChange={() => setRole("dietician")}
                />{" "}
                Dietician
              </label>
              <label>
                <input
                  type="radio"
                  value="mental_trainer"
                  checked={role === "mental_trainer"}
                  onChange={() => setRole("mental_trainer")}
                />{" "}
                Mental Trainer
              </label>
              <label>
                <input
                  type="radio"
                  value="franchise_owner"
                  checked={role === "franchise_owner"}
                  onChange={() => setRole("franchise_owner")}
                />{" "}
                Franchise Owner
              </label>
            </div>
          </div>

          {/* Sign up as Admin option */}
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="isAdmin"
              checked={isAdmin}
              onChange={() => setIsAdmin(!isAdmin)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="isAdmin" className="ml-2 text-sm text-gray-700">
              Sign up as Admin
            </label>
          </div>
          {isAdmin && (
            <div className="space-y-2 mt-4">
              <Label htmlFor="adminCode" className="text-sm font-medium text-gray-700">
                Admin Code
              </Label>
              <Input
                id="adminCode"
                type="password"
                placeholder="Enter admin code"
                value={adminCode}
                onChange={(e) => setAdminCode(e.target.value)}
                required={isAdmin}
                className="h-12 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )}

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button type="submit">Create account</Button>

          <div className="text-sm text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
