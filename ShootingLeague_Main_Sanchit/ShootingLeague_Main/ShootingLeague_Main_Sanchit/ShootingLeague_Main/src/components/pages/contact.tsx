import React from "react";
import Layout from "./Layout";

// SVG icons for contact methods
const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

const LocationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const DigitalIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const BankIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 6l9-4 9 4v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6z"
    />
  </svg>
);

// Contact data for SportsGiri
const contactData = {
  headquarters: {
    name: "SportsGiri Private Limited",
    address:
      "F. No. 302/B, IDA Cross Road Mall, Indore, Madhya Pradesh, India, Pin- 452010",
    cin: "U92410MP2021PTC058310",
    pan: "ABHCS2471A",
    tin: "BPLS25930C",
  },
  contacts: [
    {
      name: "TheGSLTV WhatsApp",
      icon: <WhatsAppIcon />,
      value: "+91 84483 31007",
      link: "https://wa.me/918448331007",
      type: "whatsapp",
    },
    {
      name: "Corporate Telephone",
      icon: <PhoneIcon />,
      value: "+91 74098 83594",
      link: "tel:+917409883594",
      type: "phone",
    },
    {
      name: "Membership",
      icon: <DigitalIcon />,
      value: "+91 96384 13900",
      link: "tel:+919638413900",
      type: "digital",
    },
    {
      name: "Email",
      icon: <MailIcon />,
      value: "admin@sportsgiri.com",
      link: "mailto:admin@sportsgiri.com",
      type: "email",
    },
  ],
  bankDetails: {
    accountName: "Sportsgiri Private Limited",
    // Add more bank details if provided
  },
  googleMapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14725.432661541994!2d75.86562003067783!3d22.719513421949723!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd0b7a0ac7e7%3A0x96d528b1c7e3a3d1!2sIDA%20Scheme%20No.140%2C%20Indore%2C%20Madhya%20Pradesh%20452010!5e0!3m2!1sen!2sin!4v1711858035134!5m2!1sen!2sin",
};

const ContactUs: React.FC = () => {
  return (
    <Layout>
      {" "}
      <div className="bg-gray-50 min-h-screen">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {/* Headquarters Section */}
            <section className="mb-12 bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Headquarters
                </h2>
                <div className="flex items-start space-x-3 mb-4">
                  <LocationIcon />
                  <div>
                    <p className="font-semibold">
                      {contactData.headquarters.name}
                    </p>
                    <p className="text-gray-600">
                      {contactData.headquarters.address}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-gray-700">
                      <span className="font-semibold">CIN: </span>
                      {contactData.headquarters.cin}
                    </p>
                  </div>
                  {/* <div className="bg-gray-50 p-3 rounded">
                    <p className="text-gray-700">
                      <span className="font-semibold">PAN: </span>
                      {contactData.headquarters.pan}
                    </p>
                  </div> */}
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-gray-700">
                      <span className="font-semibold">TIN: </span>
                      {contactData.headquarters.tin}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section className="mb-12 bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {contactData.contacts.map((contact, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <span
                        className={`p-2 rounded-full ${
                          contact.type === "whatsapp"
                            ? "bg-green-100 text-green-600"
                            : contact.type === "phone"
                            ? "bg-blue-100 text-blue-600"
                            : contact.type === "digital"
                            ? "bg-purple-100 text-purple-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {contact.icon}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          {contact.name}
                        </p>
                        <a
                          href={contact.link}
                          className={`text-lg font-semibold ${
                            contact.type === "whatsapp"
                              ? "text-green-600"
                              : contact.type === "phone"
                              ? "text-blue-600"
                              : contact.type === "digital"
                              ? "text-purple-600"
                              : "text-red-600"
                          } hover:underline`}
                          target={
                            contact.type === "email" ||
                            contact.type === "whatsapp"
                              ? "_blank"
                              : ""
                          }
                          rel="noopener noreferrer"
                        >
                          {contact.value}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Bank Details */}
            {/* <section className="mb-12 bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Bank Details
                </h2>
                <div className="flex items-start space-x-3">
                  <BankIcon />
                  <div>
                    <p className="text-gray-700">
                      <span className="font-semibold">Account Name: </span>
                      {contactData.bankDetails.accountName}
                    </p>
                  </div>
                </div>
              </div>
            </section> */}

            {/* Google Map */}
            <section className="mb-12 bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Find Us
                </h2>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={contactData.googleMapEmbed}
                    className="w-full h-96 border-0"
                    allowFullScreen={true}
                    loading="lazy"
                    title="Google Maps Location"
                  ></iframe>
                </div>
              </div>
            </section>
          </div>
        </main>

        {/* Footer */}
      </div>
    </Layout>
  );
};

export default ContactUs;
