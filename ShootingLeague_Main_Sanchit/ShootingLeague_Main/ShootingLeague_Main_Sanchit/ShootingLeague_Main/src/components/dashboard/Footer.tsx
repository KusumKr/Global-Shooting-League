import React, { useState } from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MessageCircle,
  Mail,
  MapPin,
  Phone,
  LinkedinIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { LinkedInLogoIcon } from "@radix-ui/react-icons";
import { FaTelegram } from "react-icons/fa";

const Footer = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const socialLinks = [
    {
      icon: <Instagram className="w-6 h-6" />,
      href: "https://instagram.com/thegsltv",
      name: "Instagram",
    },
    {
      icon: <Youtube className="w-6 h-6" />,
      href: "https://youtube.com/@theglobalshootingleague",
      name: "YouTube",
    },
    {
      icon: <LinkedinIcon className="w-6 h-6" />,
      href: "https://www.linkedin.com/company/thegsltv/",
      name: "LinkedIn",
    },
    {
      icon: <FaTelegram className="w-6 h-6" />,
      href: "https://t.me/thegsltv",
      name: "Telegram",
    },
  ];

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <footer className="bg-gray-900 text-white py-12 relative">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About GSL */}
          <div>
            <h4 className="font-bold text-lg mb-4">Global Shooting League</h4>
            <p className="text-gray-400 text-sm">
              Promoting excellence in shooting sports worldwide. Connecting
              athletes, fans, and enthusiasts through innovative digital
              platforms.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/squad" className="text-gray-400 hover:text-white">
                  Squad
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-400 hover:text-white">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-400 hover:text-white">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/media" className="text-gray-400 hover:text-white">
                  Media
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact Information</h4>
            <address className="text-gray-400 text-sm not-italic space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-red-500" />
                <span>SportsGiri Pvt Ltd, Indore, MP, India</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-red-500" />
                <span>+91 74098 83594</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-red-500" />
                <span>admin@sportsgiri.com</span>
              </div>
            </address>
          </div>
        </div>

        {/* Social Media and Copyright */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} SportsGiri Pvt Ltd. All Rights
            Reserved.
          </p>

          {/* Social Media Links */}
          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Chatbot Icon */}
      <div
        className="fixed bottom-6 right-6 z-50 bg-red-500 text-white rounded-full p-3 shadow-lg cursor-pointer hover:bg-red-600 transition"
        onClick={toggleChatbot}
      >
        <MessageCircle className="w-8 h-8" />
      </div>

      {/* Chatbot Modal (Placeholder) */}
      {isChatbotOpen && (
        <div className="fixed bottom-24 right-6 w-80 bg-white text-black rounded-lg shadow-2xl p-4 z-50">
          <div className="font-bold mb-2">Welcome to SportsGiri!</div>
          <p className="text-sm text-gray-600">
            How can I help you today? Feel free to ask any questions about our
            league, events, or services.
          </p>
          <button
            className="mt-4 w-full bg-red-500 text-white py-2 rounded"
            onClick={toggleChatbot}
          >
            Start Chat
          </button>
        </div>
      )}
    </footer>
  );
};

export default Footer;
