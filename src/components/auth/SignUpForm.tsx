import { useState } from "react";
import { useAuth } from "../../../supabase/auth";
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

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button type="submit">Create account</Button>
        </form>
      </div>
    </AuthLayout>
  );
}
