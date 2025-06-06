import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Tab } from "@headlessui/react";
import {
  Calendar,
  MapPin,
  Award,
  Clock,
  ExternalLink,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "./Layout";

// Event category data with all details
const eventData = {
  global: {
    title: "Global Events",
    subtitle: "Olympics & World Championships",
    description:
      "The pinnacle of shooting sports where the world's best athletes compete for gold and glory on the international stage. These prestigious competitions showcase exceptional marksmanship and represent the highest level of achievement in the sport.",
    upcoming: [
      {
        id: "olympic-games",
        title: "Olympic Games",
        date: "July 24 - August 9, 2025",
        location: "Paris, France",
        image: "/events/olympics.png",
        description:
          "The Olympic shooting events will feature competitions in rifle, pistol, and shotgun disciplines. Athletes will compete for medals in individual and team events.",
      },
      {
        id: "world-championship",
        title: "ISSF World Championship",
        date: "September 15-30, 2025",
        location: "Munich, Germany",
        image: "/events/world-championship.png",
        description:
          "Comprehensive world championships featuring all Olympic and non-Olympic shooting events across all disciplines.",
      },
      {
        id: "world-cup-final",
        title: "ISSF World Cup Final",
        date: "October 10-18, 2025",
        location: "Cairo, Egypt",
        image: "/events/world-cup.png",
        description:
          "Season-ending competition featuring the year's top performers from the World Cup series.",
      },
    ],
    past: [
      {
        title: "Olympic Games Tokyo",
        year: "2021",
        winner: "Various medalists across disciplines",
        location: "Tokyo, Japan",
        result: "China topped the medal table with 11 medals (4 gold)",
      },
      {
        title: "ISSF World Championship",
        year: "2023",
        winner: "Various champions across disciplines",
        location: "Baku, Azerbaijan",
        result:
          "Over 60 nations participated with China, USA, and India among top medal winners",
      },
    ],
    blogs: [
      {
        title: "Olympic Shooting: A History of Excellence",
        excerpt:
          "Exploring the rich history of shooting sports in the Olympic Games from 1896 to present day...",
        author: "Mark Thompson",
        date: "January 15, 2025",
        image: "/blogs/olympic-history.png",
      },
      {
        title: "Technique Analysis: Olympic Champions",
        excerpt:
          "Breaking down the techniques that separate Olympic gold medalists from the competition...",
        author: "Sarah Chen",
        date: "February 20, 2025",
        image: "/blogs/technique-analysis.png",
      },
    ],
    externalLinks: [
      {
        name: "International Shooting Sport Federation",
        url: "https://www.issf-sports.org/",
      },
      { name: "Olympic Games Official Website", url: "https://olympics.com/" },
      {
        name: "World Shooting Para Sport",
        url: "https://www.paralympic.org/shooting",
      },
    ],
  },
  national: {
    title: "National Events",
    subtitle: "Indian Championships",
    description:
      "India's premier shooting competitions where the country's top marksmen and women compete for national honors. These events identify India's shooting talent and serve as selection trials for international competitions.",
    upcoming: [
      {
        id: "national-championship",
        title: "National Shooting Championship",
        date: "September 10-25, 2025",
        location: "New Delhi, India",
        image: "/events/national-championship.png",
        description:
          "India's most prestigious shooting competition featuring all Olympic and non-Olympic events across rifle, pistol and shotgun disciplines.",
      },
      {
        id: "kumar-surendra-singh",
        title: "Kumar Surendra Singh Memorial Tournament",
        date: "October 5-12, 2025",
        location: "Bhopal, India",
        image: "/events/kumar-surendra.png",
        description:
          "One of India's most important national shooting competitions honoring the memory of an Indian shooting legend.",
      },
      {
        id: "selection-trials",
        title: "National Selection Trials",
        date: "November 1-8, 2025",
        location: "Pune, India",
        image: "/events/selection-trials.png",
        description:
          "Critical selection trials to determine India's teams for upcoming international competitions.",
      },
    ],
    past: [
      {
        title: "National Shooting Championship",
        year: "2023",
        winner: "Multiple winners across categories",
        location: "New Delhi, India",
        result:
          "Maharashtra topped the medal table followed by Punjab and Haryana",
      },
      {
        title: "All India G.V. Mavlankar Championship",
        year: "2024",
        winner: "Various champions across disciplines",
        location: "Chennai, India",
        result: "Several new national records were established",
      },
    ],
    blogs: [
      {
        title: "Rise of Indian Shooting: A National Phenomenon",
        excerpt:
          "How shooting sport has transformed from niche to mainstream in India over the past decade...",
        author: "Rajiv Mehta",
        date: "March 8, 2025",
        image: "/blogs/indian-shooting.png",
      },
      {
        title: "Youth Development: India's Secret to Shooting Success",
        excerpt:
          "Inside look at India's systematic approach to developing young shooting talent...",
        author: "Priya Singh",
        date: "April 12, 2025",
        image: "/blogs/youth-development.png",
      },
    ],
    externalLinks: [
      {
        name: "National Rifle Association of India",
        url: "https://www.thenrai.in/",
      },
      {
        name: "Sports Authority of India",
        url: "https://sportsauthorityofindia.gov.in/",
      },
      {
        name: "Ministry of Youth Affairs & Sports",
        url: "https://yas.gov.in/",
      },
    ],
  },
  zonal: {
    title: "Zonal Events",
    subtitle: "Regional Competitions",
    description:
      "Zone-wise shooting competitions organized across different regions of India, providing crucial competitive opportunities for shooters at all levels. These events build grassroots talent and serve as qualifying events for national championships.",
    upcoming: [
      {
        id: "north-zone",
        title: "North Zone Shooting Championship",
        date: "October 5-10, 2025",
        location: "Chandigarh, India",
        image: "/events/north-zone.png",
        description:
          "Regional championship featuring shooters from northern Indian states competing across all disciplines.",
      },
      {
        id: "south-zone",
        title: "South Zone Shooting Championship",
        date: "October 15-20, 2025",
        location: "Bengaluru, India",
        image: "/events/south-zone.png",
        description:
          "Southern India's premier shooting competition with participation from Tamil Nadu, Karnataka, Kerala, Andhra Pradesh, and Telangana.",
      },
      {
        id: "east-zone",
        title: "East Zone Shooting Championship",
        date: "November 1-6, 2025",
        location: "Kolkata, India",
        image: "/events/east-zone.png",
        description:
          "Eastern regional championship showcasing talent from West Bengal, Assam, Odisha and neighboring states.",
      },
    ],
    past: [
      {
        title: "West Zone Shooting Championship",
        year: "2024",
        winner: "Multiple winners from Maharashtra and Gujarat",
        location: "Mumbai, India",
        result: "Maharashtra dominated with 25 gold medals",
      },
      {
        title: "North East Zone Championship",
        year: "2024",
        winner: "Various champions from Assam and Manipur",
        location: "Guwahati, India",
        result: "Strong showing from emerging talent in northeast India",
      },
    ],
    blogs: [
      {
        title: "Zonal Competitions: The Breeding Ground for Champions",
        excerpt:
          "How regional tournaments have become critical in India's shooting talent development pipeline...",
        author: "Vikram Sharma",
        date: "May 5, 2025",
        image: "/blogs/zonal-importance.png",
      },
      {
        title: "State Support for Shooting: A Regional Analysis",
        excerpt:
          "Comparing how different states support shooting sports and the impact on results...",
        author: "Ananya Gupta",
        date: "June 18, 2025",
        image: "/blogs/state-support.png",
      },
    ],
    externalLinks: [
      {
        name: "National Rifle Association of India",
        url: "https://www.thenrai.in/",
      },
      {
        name: "Sports Authority of India",
        url: "https://sportsauthorityofindia.gov.in/",
      },
      { name: "Various State Shooting Associations", url: "#" },
    ],
  },
  roadtoolympics: {
    title: "Road to Olympics",
    subtitle: "Qualification Events",
    description:
      "Critical qualification tournaments that determine which athletes will represent their nations at the Olympic Games. These events feature intense competition as shooters vie for limited Olympic quota places.",
    upcoming: [
      {
        id: "world-cup-delhi",
        title: "ISSF World Cup",
        date: "November 12-20, 2025",
        location: "New Delhi, India",
        image: "/events/world-cup-delhi.png",
        description:
          "Olympic qualification event offering quota places for Paris 2028 across multiple shooting disciplines.",
      },
      {
        id: "asian-championship",
        title: "Asian Shooting Championship",
        date: "December 1-10, 2025",
        location: "Doha, Qatar",
        image: "/events/asian-championship.png",
        description:
          "Continental championship serving as an Olympic qualifier for Asian nations.",
      },
      {
        id: "last-chance-qualifier",
        title: "Final Olympic Qualifier",
        date: "January 15-20, 2026",
        location: "Rio de Janeiro, Brazil",
        image: "/events/last-chance.png",
        description:
          "Last opportunity for shooters to secure qualification for the Olympic Games.",
      },
    ],
    past: [
      {
        title: "ISSF World Cup",
        year: "2024",
        winner: "Various quota winners across nations",
        location: "Cairo, Egypt",
        result: "India secured 3 Olympic quotas, China 5, and USA 4",
      },
      {
        title: "Asian Shooting Championship",
        year: "2023",
        winner: "Multiple quota winners from Asian nations",
        location: "Jakarta, Indonesia",
        result: "South Korea and China dominated the medal table",
      },
    ],
    blogs: [
      {
        title: "Olympic Qualification System Explained",
        excerpt:
          "Breaking down the complex qualification process for Olympic shooting events...",
        author: "David Chen",
        date: "July 10, 2025",
        image: "/blogs/qualification-system.png",
      },
      {
        title: "Mental Preparation for Olympic Qualifiers",
        excerpt:
          "Sports psychologists share insights on handling pressure during crucial qualification events...",
        author: "Dr. Lisa Wong",
        date: "August 5, 2025",
        image: "/blogs/mental-prep.png",
      },
    ],
    externalLinks: [
      {
        name: "ISSF Olympic Qualification",
        url: "https://www.issf-sports.org/",
      },
      {
        name: "Olympic Games Qualification System",
        url: "https://olympics.com/",
      },
      {
        name: "World Shooting Para Sport Qualification",
        url: "https://www.paralympic.org/shooting",
      },
    ],
  },
};

const EventDetailPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: keyof typeof eventData }>();
  const category = eventData[categoryId || "global"];

  return (
    <Layout>
      {" "}
      <div className="bg-white">
        {/* Hero Section */}
        <div className="bg-blue-700 text-white py-16">
          <div className="max-w-6xl mx-auto px-4">
            <Link
              to="/"
              className="inline-flex items-center text-white/80 hover:text-white mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Events
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              {category.title}
            </h1>
            <p className="text-xl text-blue-100">{category.subtitle}</p>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed">
              {category.description}
            </p>
          </div>

          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-blue-50 p-1 mb-8">
              <Tab
                className={({ selected }) =>
                  `w-full rounded-lg py-3 text-sm font-medium leading-5
            ${
              selected
                ? "bg-white shadow text-blue-700"
                : "text-blue-600 hover:bg-white/[0.5]"
            }`
                }
              >
                Upcoming Events
              </Tab>
              <Tab
                className={({ selected }) =>
                  `w-full rounded-lg py-3 text-sm font-medium leading-5
            ${
              selected
                ? "bg-white shadow text-blue-700"
                : "text-blue-600 hover:bg-white/[0.5]"
            }`
                }
              >
                Past Results
              </Tab>
              <Tab
                className={({ selected }) =>
                  `w-full rounded-lg py-3 text-sm font-medium leading-5
            ${
              selected
                ? "bg-white shadow text-blue-700"
                : "text-blue-600 hover:bg-white/[0.5]"
            }`
                }
              >
                Blogs & Articles
              </Tab>
              <Tab
                className={({ selected }) =>
                  `w-full rounded-lg py-3 text-sm font-medium leading-5
            ${
              selected
                ? "bg-white shadow text-blue-700"
                : "text-blue-600 hover:bg-white/[0.5]"
            }`
                }
              >
                Resources & Links
              </Tab>
            </Tab.List>

            <Tab.Panels>
              {/* Upcoming Events Panel */}
              <Tab.Panel>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.upcoming.map((event) => (
                    <div
                      key={event.id}
                      className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="h-48 bg-gray-200">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">
                          {event.title}
                        </h3>
                        <div className="flex items-center text-gray-600 mb-2">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center text-gray-600 mb-4">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{event.location}</span>
                        </div>
                        <p className="text-gray-700 mb-4">
                          {event.description}
                        </p>
                        <Link
                          to={`/events/${categoryId}/${event.id}`}
                          className="text-blue-600 hover:underline font-medium"
                        >
                          View details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </Tab.Panel>

              {/* Past Results Panel */}
              <Tab.Panel>
                <div className="space-y-6">
                  {category.past.map((result, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-50 rounded-lg p-6 shadow-sm"
                    >
                      <div className="flex flex-wrap justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold">{result.title}</h3>
                          <div className="flex items-center text-gray-600 mt-2">
                            <Clock className="h-4 w-4 mr-2" />
                            <span>{result.year}</span>
                          </div>
                          <div className="flex items-center text-gray-600 mt-2">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span>{result.location}</span>
                          </div>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg mt-2 md:mt-0">
                          <div className="text-sm text-gray-500 mb-1">
                            Winner
                          </div>
                          <div className="flex items-center text-blue-700">
                            <Award className="h-4 w-4 mr-2" />
                            <span className="font-medium">{result.winner}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700">{result.result}</p>
                    </div>
                  ))}
                </div>
              </Tab.Panel>

              {/* Blogs Panel */}
              <Tab.Panel>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {category.blogs.map((blog, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="h-48 bg-gray-200">
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-3">{blog.title}</h3>
                        <p className="text-gray-700 mb-4">{blog.excerpt}</p>
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-500">
                            By {blog.author} • {blog.date}
                          </div>
                          <Link
                            to={`/blog/${idx}`}
                            className="text-blue-600 hover:underline font-medium"
                          >
                            Read more
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Tab.Panel>

              {/* Resources Panel */}
              <Tab.Panel>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-6">
                    Official Resources & External Links
                  </h3>
                  <div className="space-y-4">
                    {category.externalLinks.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">
                            {link.name}
                          </h4>
                          <p className="text-sm text-gray-500 truncate">
                            {link.url}
                          </p>
                        </div>
                        <ExternalLink className="h-5 w-5 text-blue-600" />
                      </a>
                    ))}
                  </div>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </Layout>
  );
};

export default EventDetailPage;
