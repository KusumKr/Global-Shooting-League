import { useState } from "react";
import { useAuth } from "../../../supabase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent multiple submissions
    e.currentTarget.setAttribute("disabled", "true");

    try {
      setError("");
      console.group("Login Attempt");
      console.log("Attempting login", {
        email,
        isAdmin,
        timestamp: new Date().toISOString(),
      });

      try {
        console.log("Initiating sign-in process");
        await signIn(email, password);
        console.log("Sign-in successful");
        navigate("/dashboard");
      } catch (signInError) {
        console.error("Sign-in process error:", {
          error: signInError,
          errorMessage:
            signInError instanceof Error
              ? signInError.message
              : "Unknown error",
        });

        // More specific error handling
        if (signInError instanceof Error) {
          switch (signInError.message) {
            case "Invalid login credentials":
              setError("Incorrect email or password");
              break;
            case "Email not confirmed":
              setError("Please confirm your email first");
              break;
            default:
              setError(
                signInError.message || "Login failed. Please try again."
              );
          }
        } else {
          setError("An unexpected error occurred");
        }
      }

      console.groupEnd();
    } catch (error) {
      console.error("Unexpected error during login:", error);
      setError("An unexpected error occurred");
    } finally {
      document.getElementById("login-button")?.removeAttribute("disabled");
    }
  };
  return (
    <AuthLayout>
      <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </Label>
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="isAdmin"
              checked={isAdmin}
              onChange={() => setIsAdmin(!isAdmin)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="isAdmin" className="ml-2 text-sm text-gray-700">
              Sign in as Admin
            </label>
          </div>

          {isAdmin && (
            <div className="space-y-2 mt-4">
              <Label
                htmlFor="adminCode"
                className="text-sm font-medium text-gray-700"
              >
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
          <Button
            type="submit"
            className="w-full h-12 rounded-full bg-black text-white hover:bg-gray-800 text-sm font-medium"
          >
            Sign in
          </Button>

          <div className="text-sm text-center text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 hover:underline font-medium"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
