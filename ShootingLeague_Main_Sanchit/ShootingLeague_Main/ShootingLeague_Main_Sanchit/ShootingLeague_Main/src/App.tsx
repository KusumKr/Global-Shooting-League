import { Suspense } from "react";
import { Navigate, Route, Routes, useRoutes } from "react-router-dom";
import routes from "tempo-routes";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import DashboardRouter from "./components/dashboard/DashboardRouter";
import Success from "./components/pages/success";
import Home from "./components/pages/home";
import About from "./components/pages/about";
import { useEffect } from "react";
import Pricing from "./components/pages/pricing";
import { AuthProvider, useAuth } from "./firebase/auth";
import { Toaster } from "./components/ui/toaster";
import { LoadingScreen, LoadingSpinner } from "./components/ui/loading-spinner";
import { useLocation } from "react-router-dom";
import ShootingRanges from "./components/pages/ranges";
import Athletes from "./components/pages/shooters";
import ParallaxScrollPage from "./components/pages/media";
import ContactUs from "./components/pages/contact";
import EventsSection from "./components/dashboard/Events";
import EventDetailPage from "./components/pages/EventDetail";
import EventPage from "./components/pages/EventPage";
import TermsPage from "./components/pages/terms";
import PrivacyPage from "./components/pages/privacy";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingScreen text="Authenticating..." />;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
          <Route path="/success" element={<Success />} />
          <Route path="/pricing" element={<Pricing />} />
        <Route path="/ranges" element={<ShootingRanges />} />
        <Route path="/shooters" element={<Athletes />} />
          <Route path="/media" element={<ParallaxScrollPage />} />
        <Route path="/contact" element={<ContactUs />} />
          <Route path="/events" element={<EventPage />} />
          <Route path="/events/:id" element={<EventDetailPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute>
              <DashboardRouter />
            </PrivateRoute>
          }
        />
      </Routes>
      </Suspense>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
