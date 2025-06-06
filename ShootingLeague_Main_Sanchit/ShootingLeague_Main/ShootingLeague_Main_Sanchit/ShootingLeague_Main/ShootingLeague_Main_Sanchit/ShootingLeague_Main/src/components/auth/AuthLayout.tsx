import { ReactNode } from "react";
import { Link } from "react-router-dom";
import Layout from "../pages/Layout";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <Layout>
        <div className="min-h-screen flex items-center justify-center pt-16">
          <div className="max-w-md w-full px-4">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-semibold tracking-tight text-blue-700">
                Global Shooting League
              </h2>
              <p className="text-xl font-medium text-gray-600 mt-2">
                Sign in to access your account
              </p>
            </div>
            {children}
          </div>
        </div>
      </Layout>

      {/* Footer with company details */}
    </div>
  );
}
