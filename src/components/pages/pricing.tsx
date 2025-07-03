import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useAuth } from "@/firebase/auth";
import Layout from "./Layout";
import { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function PricingPage() {
  const { user } = useAuth();
  const [showPopup, setShowPopup] = useState(false);

  // PayPal configuration
  const initialOptions = {
    clientId: "YOUR_PAYPAL_CLIENT_ID", // Replace with your PayPal client ID
    currency: "USD",
    intent: "capture",
  };

  // Bank details from the previous component
  const bankDetails = {
    accountName: "Sportsgiri Private Limited",
    // You can add more bank details here if needed
  };

  // Company details from the previous component
  const companyDetails = {
    name: "SportsGiri Private Limited",
    address:
      "F. No. 302/B, IDA Cross Road Mall, Indore, Madhya Pradesh, India, Pin- 452010",
    cin: "U92410MP2021PTC058310",
    pan: "ABHCS2471A",
    tin: "BPLS25930C",
    contacts: [
      { label: "TheGSLTV WhatsApp", value: "+91 84483 31007" },
      { label: "Corporate Telephone", value: "+91 74098 83594" },
      { label: "Membership", value: "+91 96384 13900" },
      { label: "Email", value: "admin@sportsgiri.com" },
    ],
  };

  const handleCardClick = () => {
    setShowPopup(true);
  };

  const createOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "99.00", // Replace with your membership price
          },
        },
      ],
    });
  };

  const onApprove = async (data: any, actions: any) => {
    const order = await actions.order.capture();
    console.log("Payment successful!", order);
    // Handle successful payment here
    // You can update user's membership status in your database
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <div className="min-h-screen bg-white text-black">
        <Layout>
          <main className="pt-16">
            {/* Hero section */}
            <section className="py-20 bg-blue-700 text-white">
              <div className="max-w-6xl mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Membership Plans
                </h1>
                <div className="text-xl max-w-3xl mx-auto text-justify">
                  <p className="mb-4">
                    Join the Global Shooting League and take your shooting skills to the next level with our comprehensive membership options.
                  </p>
                </div>
              </div>
            </section>

            {/* Pricing Plans */}
            <>
              <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Basic Plan */}
                    <div className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="p-8 bg-gray-50 text-center">
                        <h3 className="text-2xl font-bold mb-2">
                          Basic 
                        </h3>
                        <div className="text-blue-700 mb-4">
                          <span className="text-2xl font-bold">
                            Get Recognised, 
                            <br />Get Started (Personal Token)
                          </span>
                        </div>
                        <p className="text-gray-600 mb-6">
                          Perfect for individual shooters and range owners taking their first step into the digital ecosystem. This entry-level membership helps you build visibility, showcase your profile, and start engaging with the wider shooting community.
                        </p>
                        <div className="mt-4">
                          <PayPalButtons
                            style={{ layout: "vertical" }}
                            createOrder={createOrder}
                            onApprove={onApprove}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Pro+ Plan */}
                    <div className="border-2 border-blue-700 rounded-2xl overflow-hidden shadow-lg relative">
                      <div className="absolute top-0 right-0 bg-blue-700 text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
                        Most Popular
                      </div>
                      <div className="p-8 bg-blue-50 text-center">
                        <h3 className="text-2xl font-bold mb-2">
                          Pro+  
                        </h3>
                        <div className="text-blue-700 mb-4">
                          <span className="text-2xl font-bold">
                            Expand Your Reach Community Token
                          </span>
                        </div>
                        <p className="text-gray-600 mb-6">
                          Ideal for those ready to grow their presence and influence. Pro+ connects you with a broader network of athletes, coaches, and partners, unlocking community-based features, insights, and local collaboration opportunities.
                        </p>
                        <div className="mt-4">
                          <PayPalButtons
                            style={{ layout: "vertical" }}
                            createOrder={createOrder}
                            onApprove={onApprove}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="p-8 bg-gray-50 text-center">
                        <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                        <div className="text-blue-700 mb-4">
                          <span className="text-2xl font-bold">
                            Go Digital
                            (Multi-City / Currency Wallet Token)
                          </span>
                        </div>
                        <p className="text-gray-600 mb-6">
                          Designed for ranges, academies, and professionals operating across multiple locations. This package offers advanced digital tools, cross-city integration, and multi-currency wallet support to manage operations at scale.
                        </p>
                        <div className="mt-4">
                          <PayPalButtons
                            style={{ layout: "vertical" }}
                            createOrder={createOrder}
                            onApprove={onApprove}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Corporate Plan */}
                    <div className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="p-8 bg-gray-50 text-center">
                        <h3 className="text-2xl font-bold mb-2">Corporate</h3>
                        <div className="text-blue-700 mb-4">
                          <span className="text-2xl font-bold">
                            Scale Your Business
                            (Enterprise Token)
                          </span>
                        </div>
                        <p className="text-gray-600 mb-6">
                          For organizations looking to establish a comprehensive digital presence. This plan includes advanced analytics, multi-location management, and priority support to help you scale your shooting business effectively.
                        </p>
                        <div className="mt-4">
                          <PayPalButtons
                            style={{ layout: "vertical" }}
                            createOrder={createOrder}
                            onApprove={onApprove}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Popup Modal */}
              {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="p-6">
                      <div className="flex justify-between items-center border-b pb-4 mb-4">
                        <h3 className="text-2xl font-bold text-gray-900">
                          Payment Information
                        </h3>
                        <button
                          onClick={() => setShowPopup(false)}
                          className="text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                          <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* Bank Details */}
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold mb-3 text-blue-700">
                          Bank Account Details
                        </h4>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="mb-2">
                            <span className="font-semibold">Account Name:</span>{" "}
                            {bankDetails.accountName}
                          </p>
                          {/* Add additional bank details here */}
                        </div>
                      </div>

                      {/* Company Information */}
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold mb-3 text-blue-700">
                          Company Information
                        </h4>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="font-semibold mb-1">
                            {companyDetails.name}
                          </p>
                          <p className="text-gray-600 mb-3">
                            {companyDetails.address}
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
                            <p>
                              <span className="font-semibold">CIN:</span>{" "}
                              {companyDetails.cin}
                            </p>
                            <p>
                              <span className="font-semibold">PAN:</span>{" "}
                              {companyDetails.pan}
                            </p>
                            <p>
                              <span className="font-semibold">TIN:</span>{" "}
                              {companyDetails.tin}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Contact Information */}
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold mb-3 text-blue-700">
                          Contact Us
                        </h4>
                        <div className="bg-gray-50 p-4 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-3">
                          {companyDetails.contacts.map((contact, index) => (
                            <p key={index}>
                              <span className="font-semibold">
                                {contact.label}:
                              </span>{" "}
                              {contact.value}
                            </p>
                          ))}
                        </div>
                      </div>

                      {/* Payment Instructions */}
                      <div className="mt-6">
                        <h4 className="text-lg font-semibold mb-3 text-blue-700">
                          Payment Instructions
                        </h4>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <ol className="list-decimal pl-5 space-y-2">
                            <li>
                              Transfer the payment to the bank account mentioned
                              above
                            </li>
                            <li>
                              Include your name and selected token type in the
                              payment reference
                            </li>
                            <li>
                              After payment, please email the transaction details
                              to admin@sportsgiri.com
                            </li>
                            <li>
                              Our team will process your token within 24-48
                              business hours
                            </li>
                          </ol>
                        </div>
                      </div>

                      <div className="mt-6 text-center">
                        <button
                          onClick={() => setShowPopup(false)}
                          className="px-5 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>

            {/* Membership Benefits */}
            <section className="py-16 bg-gray-50">
              <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">
                  Membership Benefits
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <div className="bg-white p-8 rounded-lg shadow-sm">
                    <h3 className="text-xl font-bold mb-4 text-blue-700">
                      Competition Access
                    </h3>
                    <p className="text-gray-700 mb-4">
                      GSL members gain access to our network of sanctioned
                      competitions around the world, from local matches to
                      international championships.
                    </p>
                    <p className="text-gray-700">
                      Your membership level determines the priority and scope of
                      competitions you can enter, with Elite members receiving VIP
                      treatment at all events.
                    </p>
                  </div>

                  <div className="bg-white p-8 rounded-lg shadow-sm">
                    <h3 className="text-xl font-bold mb-4 text-blue-700">
                      Training Resources
                    </h3>
                    <p className="text-gray-700 mb-4 text-justify">
                      Access our extensive library of training materials,
                      including video tutorials, technique guides, and mental
                      preparation resources.
                    </p>
                    <p className="text-gray-700 text-justify">
                      Premium and Elite members receive additional personalized
                      coaching and advanced training opportunities to accelerate
                      their development.
                    </p>
                  </div>

                  <div className="bg-white p-8 rounded-lg shadow-sm">
                    <h3 className="text-xl font-bold mb-4 text-blue-700">
                      Community & Networking
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Connect with fellow shooting enthusiasts, coaches, and
                      professionals through our online forums, social events, and
                      competitions.
                    </p>
                    <p className="text-gray-700">
                      Build relationships that can help advance your shooting
                      career and open doors to new opportunities in the sport.
                    </p>
                  </div>

                  <div className="bg-white p-8 rounded-lg shadow-sm">
                    <h3 className="text-xl font-bold mb-4 text-blue-700">
                      Equipment Discounts
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Enjoy exclusive discounts on shooting equipment,
                      accessories, and apparel from our network of partner
                      manufacturers and retailers.
                    </p>
                    <p className="text-gray-700">
                      Premium and Elite members receive higher discount
                      percentages and early access to new product releases.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQs */}
            <section className="py-16 bg-white">
              <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">
                  Frequently Asked Questions
                </h2>

                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-xl font-bold mb-2">
                      How do I upgrade my membership?
                    </h3>
                    <p className="text-gray-700">
                      To upgrade your membership, please{" "}
                      <a
                        href="/contact"
                        className="text-blue-600 hover:underline"
                      >
                        contact us
                      </a>
                      . Our team will assist you in selecting the best plan for
                      your needs.
                    </p>
                  </div>

                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-xl font-bold mb-2">
                      Are there age restrictions for membership?
                    </h3>
                    <p className="text-gray-700">
                      We offer junior memberships for shooters under 18 years of
                      age. To learn more, please{" "}
                      <a
                        href="/contact"
                        className="text-blue-600 hover:underline"
                      >
                        reach out to us
                      </a>
                      .
                    </p>
                  </div>

                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-xl font-bold mb-2">
                      Do you offer team or club memberships?
                    </h3>
                    <p className="text-gray-700">
                      Yes, we have special rates for clubs and teams. Please{" "}
                      <a
                        href="/contact"
                        className="text-blue-600 hover:underline"
                      >
                        contact our membership department
                      </a>{" "}
                      for more details.
                    </p>
                  </div>

                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-xl font-bold mb-2">
                      What is your refund policy?
                    </h3>
                    <p className="text-gray-700">
                      Memberships can be canceled within 30 days for a full
                      refund. After that, no refunds are provided. For assistance,
                      please{" "}
                      <a
                        href="/contact"
                        className="text-blue-600 hover:underline"
                      >
                        contact support
                      </a>
                      .
                    </p>
                  </div>

                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-xl font-bold mb-2">
                      How do I register for competitions?
                    </h3>
                    <p className="text-gray-700">
                      You can register through your account dashboard. If you need
                      help, please{" "}
                      <a
                        href="/contact"
                        className="text-blue-600 hover:underline"
                      >
                        contact us
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-blue-700 text-white">
              <div className="max-w-4xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-6">
                  Ready to Join the Global Shooting League?
                </h2>
                <p className="text-xl mb-8">
                  Take the first step toward improving your shooting skills and
                  joining our worldwide community of enthusiasts.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link to="/signup">
                    <button className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-3 rounded-full font-bold text-lg">
                      Sign Up Today
                    </button>
                  </Link>
                  <Link to="/contact">
                    <button className="bg-transparent border-2 border-white hover:bg-blue-800 px-8 py-3 rounded-full font-bold text-lg">
                      Contact Us
                    </button>
                  </Link>
                </div>
              </div>
            </section>
          </main>
        </Layout>
      </div>
    </PayPalScriptProvider>
  );
}
