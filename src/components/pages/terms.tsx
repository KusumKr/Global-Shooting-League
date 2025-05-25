import Layout from "./Layout";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Layout>
        <main className="pt-16">
          <section className="py-20 bg-blue-700 text-white">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Terms & Conditions
              </h1>
            </div>
          </section>
          <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-2xl font-bold mb-6">Terms and Conditions</h2>
              <div className="text-gray-700 mb-4 text-justify">
                <p className="mb-4">
                  By accessing and using the Global Shooting League (GSL) website and mobile applications, you agree to comply with the following terms and conditions. Please read them carefully before proceeding.
                </p>
                <ul className="list-disc pl-6 space-y-4">
                  <li className="text-justify">
                    <strong>Acceptance of Terms:</strong> Your use of the GSL platform constitutes your agreement to all applicable terms, policies, and notices outlined here.
                  </li>
                  <li className="text-justify">
                    <strong>Use of Content:</strong> All content, including text, images, videos, graphics, and data on this website, is the intellectual property of SportsGiri Pvt. Ltd. Unauthorized use, reproduction, or distribution is prohibited.
                  </li>
                  <li className="text-justify">
                    <strong>User Conduct:</strong> Users must refrain from any activity that disrupts or interferes with the website's functionality, violates applicable laws, or infringes on the rights of others.
                  </li>
                  <li className="text-justify">
                    <strong>Privacy Policy:</strong> All user data is handled in accordance with our Privacy Policy. By using the site, you consent to the collection and use of information as described therein.
                  </li>
                  <li className="text-justify">
                    <strong>Third-Party Links:</strong> The GSL website may contain links to external sites. We are not responsible for the content or policies of these third-party platforms.
                  </li>
                  <li className="text-justify">
                    <strong>Membership and Accounts:</strong> Registered users must provide accurate information. GSL reserves the right to suspend or terminate accounts that violate these terms or engage in misuse.
                  </li>
                  <li className="text-justify">
                    <strong>Limitation of Liability:</strong> GSL and SportsGiri Pvt. Ltd. shall not be liable for any direct, indirect, or incidental damages resulting from the use or inability to use this website.
                  </li>
                  <li className="text-justify">
                    <strong>Changes to Terms:</strong> We reserve the right to update or modify these Terms & Conditions at any time without prior notice. Continued use of the platform signifies acceptance of any changes.
                  </li>
                </ul>
              </div>
              <p className="text-gray-700 mb-4">
                For questions or concerns regarding our Terms & Conditions, please contact us at: <a href="mailto:admin@sportsgiri.com" className="text-blue-700 underline">admin@sportsgiri.com</a>
              </p>
            </div>
          </section>
        </main>
      </Layout>
    </div>
  );
} 