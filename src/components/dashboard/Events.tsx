import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const EventsSection: React.FC = () => {
  const eventCategories = [
    {
      id: "global",
      title: "Global Events",
      subtitle: "Olympics & World Championships",
      description:
        "Prestigious international competitions featuring the world's elite shooting athletes.",
      image: "/events/upcoming1.png",
      date: "Jul 24 - Aug 9",
      location: "Paris, France",
    },
    {
      id: "national",
      title: "National Events",
      subtitle: "Indian Championships",
      description:
        "Premier shooting competitions across India featuring the country's top talent.",
      image: "/events/upcoming2.png",
      date: "Sep 10 - 15",
      location: "New Delhi, India",
    },
    {
      id: "zonal",
      title: "Zonal Events",
      subtitle: "Regional Competitions",
      description:
        "Zone-wise shooting tournaments across different regions of India.",
      image: "/events/upcoming3.png",
      date: "Oct 5 - 8",
      location: "Mumbai, India",
    },
    {
      id: "roadtoolympics",
      title: "Road to Olympics",
      subtitle: "Qualification Events",
      description:
        "Crucial qualification events for athletes looking to secure Olympic berths.",
      image: "/news8.png",
      date: "Nov 12 - 18",
      location: "Multiple Venues",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-10">
          Shooting Events
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {eventCategories.map((category) => (
            <div
              key={category.id}
              className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-48 bg-gray-200 relative">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-blue-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {category.date}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{category.title}</h3>
                <p className="text-blue-600 text-sm font-medium mb-2">
                  {category.subtitle}
                </p>
                <p className="text-gray-600 mb-2">{category.location}</p>
                <p className="text-gray-700 mb-4">{category.description}</p>
                <Link
                  to={`/events/${category.id}`}
                  className="text-blue-600 hover:underline font-medium inline-flex items-center"
                >
                  Explore events <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button className="bg-blue-700 hover:bg-blue-800 text-white rounded-full px-6" onClick={() => {}}>
            View All Events
          </button>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
