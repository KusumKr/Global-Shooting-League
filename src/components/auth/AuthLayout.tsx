import { ReactNode } from "react";
import { Link } from "react-router-dom";
import Layout from "../pages/Layout";

export default function AuthLayout({ children, title }: { children: ReactNode, title: string }) {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="relative flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[600px]">
          {/* Left Section - Image/Illustration */}
          <div className="relative w-full md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-10 text-white text-center">
            <div className="absolute inset-0 bg-pattern opacity-10"></div> {/* Optional: subtle pattern overlay */}
            <div className="z-10">
              <h2 className="text-4xl font-extrabold mb-4 leading-tight text- drop-shadow-lg">New here?</h2>
              <p className="text-lg font-bold mb-8 text-white opacity-100 drop-shadow-md">
                Join our community to connect with other shooting enthusiasts.
              </p>
              <Link
                to="/signup"
                className="inline-block px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-lg"
              >
                SIGN UP
              </Link>
              {/* Placeholder for illustration */}
              <div className="mt-8">
                <img src="/GSL2.jpg" alt="Illustration" className="max-w-full h-auto mx-auto" /> {/* Replace with actual illustration path */}
              </div>
            </div>
          </div>

          {/* Right Section - Auth Form */}
          <div className="w-full md:w-1/2 flex items-center justify-center p-8">
            <div className="w-full max-w-md">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                  {title}
                </h2>
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
