import Layout from "./Layout";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Layout>
        <main className="pt-16">
          <section className="py-20 bg-blue-700 text-white">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Privacy Policy
              </h1>
            </div>
          </section>
          <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-2xl font-bold mb-6">Our Commitment to Your Privacy</h2>
              <p className="text-gray-700 mb-4">
                Global Shooting League (GSL), powered by SportsGiri Private Limited, is committed to protecting the privacy and personal data of all users interacting with our website and mobile platforms. We collect only the information necessary to provide a seamless and personalized user experience, including for purposes of registration, communication, service enhancement, and analytics.
              </p>
              <p className="text-gray-700 mb-4">
                All personal data is handled with the highest standards of confidentiality and stored securely in compliance with applicable data protection laws. We do not sell, rent, or disclose your information to third parties without your explicit consent, unless required by law or for essential service delivery by trusted partners operating under strict confidentiality agreements.
              </p>
              <p className="text-gray-700 mb-4">
                By accessing and using our platform, you consent to the terms outlined in this Privacy Policy. Should you have any questions or require further clarification, please contact us at <a href="mailto:admin@sportsgiri.com" className="text-blue-700 underline">admin@sportsgiri.com</a>.
              </p>
            </div>
          </section>
        </main>
      </Layout>
    </div>
  );
} 