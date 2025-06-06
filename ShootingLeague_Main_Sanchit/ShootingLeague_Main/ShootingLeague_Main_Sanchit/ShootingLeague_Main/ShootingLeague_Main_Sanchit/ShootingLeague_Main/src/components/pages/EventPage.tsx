import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  Users,
  Award,
  Download,
  Share2,
} from "lucide-react";

// This is our mock database of all events across categories
const allEvents = {
  global: {
    "olympic-games": {
      title: "Olympic Games",
      subtitle: "Paris 2025",
      date: "July 24 - August 9, 2025",
      registrationDeadline:
        "National Olympic Committees determine qualification",
      location: "Paris, France",
      venue: "Chateauroux Shooting Centre",
      image: "/events/olympics-detail.png",
      description:
        "The Olympic shooting events will feature competitions in rifle, pistol, and shotgun disciplines. Athletes will compete for medals in individual and team events.",
      longDescription:
        "The Olympic Games represent the pinnacle of shooting sports competition, bringing together the world's elite athletes on the grandest stage. The Paris 2025 shooting events will feature 15 medal events across rifle, pistol, and shotgun disciplines. The competition will take place at the state-of-the-art Chateauroux Shooting Centre, located approximately 270 kilometers south of Paris. This venue has been specifically designed to host Olympic-level shooting competitions and provides world-class facilities for both athletes and spectators.",
      disciplines: [
        "Men's 10m Air Rifle",
        "Women's 10m Air Rifle",
        "Mixed Team 10m Air Rifle",
        "Men's 50m Rifle 3 Positions",
        "Women's 50m Rifle 3 Positions",
        "Men's 10m Air Pistol",
        "Women's 10m Air Pistol",
        "Mixed Team 10m Air Pistol",
        "Men's 25m Rapid Fire Pistol",
        "Women's 25m Pistol",
        "Men's Trap",
        "Women's Trap",
        "Mixed Team Trap",
        "Men's Skeet",
        "Women's Skeet",
      ],
      schedule: [
        {
          day: "Day 1 - July 27",
          events: [
            "Men's 10m Air Rifle Qualification",
            "Men's 10m Air Rifle Final",
            "Women's 10m Air Pistol Qualification",
            "Women's 10m Air Pistol Final",
          ],
        },
        {
          day: "Day 2 - July 28",
          events: [
            "Women's 10m Air Rifle Qualification",
            "Women's 10m Air Rifle Final",
            "Men's 10m Air Pistol Qualification",
            "Men's 10m Air Pistol Final",
          ],
        },
        {
          day: "Day 3 - July 29",
          events: [
            "Mixed Team 10m Air Pistol Qualification",
            "Mixed Team 10m Air Pistol Final",
            "Men's Trap Qualification (Day 1)",
          ],
        },
        {
          day: "Day 4 - July 30",
          events: [
            "Mixed Team 10m Air Rifle Qualification",
            "Mixed Team 10m Air Rifle Final",
            "Men's Trap Qualification (Day 2)",
            "Men's Trap Final",
          ],
        },
        {
          day: "Day 5 - July 31",
          events: [
            "Women's Trap Qualification (Day 1)",
            "Men's 50m Rifle 3 Positions Qualification",
          ],
        },
        {
          day: "Day 6 - August 1",
          events: [
            "Women's Trap Qualification (Day 2)",
            "Women's Trap Final",
            "Men's 50m Rifle 3 Positions Final",
          ],
        },
        {
          day: "Day 7 - August 2",
          events: [
            "Mixed Team Trap Qualification",
            "Mixed Team Trap Final",
            "Women's 25m Pistol Qualification (Precision)",
          ],
        },
      ],
      previousMedalists: [
        {
          event: "Men's 10m Air Rifle",
          gold: "William Shaner (USA)",
          silver: "Sheng Lihao (CHN)",
          bronze: "Yang Haoran (CHN)",
        },
        {
          event: "Women's 10m Air Rifle",
          gold: "Yang Qian (CHN)",
          silver: "Anastasiia Galashina (ROC)",
          bronze: "Nina Christen (SUI)",
        },
        {
          event: "Men's 10m Air Pistol",
          gold: "Javad Foroughi (IRI)",
          silver: "Damir Mikec (SRB)",
          bronze: "Wei Pang (CHN)",
        },
      ],
      relatedImages: [
        "/gallery/olympics1.png",
        "/gallery/olympics2.png",
        "/gallery/olympics3.png",
        "/gallery/olympics4.png",
      ],
      documents: [
        {
          name: "Olympic Shooting Rules & Regulations",
          type: "PDF",
          size: "2.4 MB",
          url: "#",
        },
        {
          name: "Venue Information - Chateauroux Shooting Centre",
          type: "PDF",
          size: "1.8 MB",
          url: "#",
        },
        {
          name: "Olympic Qualification System",
          type: "PDF",
          size: "3.1 MB",
          url: "#",
        },
      ],
    },
    "world-championship": {
      title: "ISSF World Championship",
      subtitle: "All Events 2025",
      date: "September 15-30, 2025",
      registrationDeadline: "July 15, 2025",
      location: "Munich, Germany",
      venue: "Munich Olympic Shooting Range",
      image: "/events/world-championship-detail.png",
      description:
        "Comprehensive world championships featuring all Olympic and non-Olympic shooting events across all disciplines.",
      longDescription:
        "The ISSF World Championship is the largest and most comprehensive shooting sport competition outside of the Olympic Games. Held every four years, this championship includes all Olympic events plus additional non-Olympic disciplines, providing a complete showcase of the sport. The 2025 edition in Munich will feature over 80 countries competing across rifle, pistol, shotgun, and running target events in junior and senior categories. As an Olympic qualifying event, the World Championship will also offer quota places for the 2028 Olympic Games.",
      disciplines: [
        "Men's 10m Air Rifle",
        "Women's 10m Air Rifle",
        "Men's 50m Rifle 3 Positions",
        "Women's 50m Rifle 3 Positions",
        "Men's 10m Air Pistol",
        "Women's 10m Air Pistol",
        "Men's 25m Rapid Fire Pistol",
        "Women's 25m Pistol",
        "Men's Trap",
        "Women's Trap",
        "Men's Skeet",
        "Women's Skeet",
        "Plus 20+ additional non-Olympic events",
      ],
      schedule: [
        {
          day: "Week 1",
          events: ["Rifle and Pistol Qualifications and Finals"],
        },
        { day: "Week 2", events: ["Shotgun Qualifications and Finals"] },
      ],
      previousMedalists: [
        {
          event: "2023 Overall Medal Table",
          gold: "China (15)",
          silver: "Korea (8)",
          bronze: "USA (7)",
        },
      ],
      relatedImages: [
        "/gallery/world-champ1.png",
        "/gallery/world-champ2.png",
        "/gallery/world-champ3.png",
      ],
      documents: [
        {
          name: "World Championship Technical Regulations",
          type: "PDF",
          size: "3.6 MB",
          url: "#",
        },
        {
          name: "Registration Documents",
          type: "ZIP",
          size: "5.2 MB",
          url: "#",
        },
      ],
    },
  },
  national: {
    "national-championship": {
      title: "National Shooting Championship",
      subtitle: "66th Edition",
      date: "September 10-25, 2025",
      registrationDeadline: "August 1, 2025",
      location: "New Delhi, India",
      venue: "Dr. Karni Singh Shooting Range",
      image: "/events/national-championship-detail.png",
      description:
        "India's most prestigious shooting competition featuring all Olympic and non-Olympic events across rifle, pistol and shotgun disciplines.",
      longDescription:
        "The National Shooting Championship is India's premier shooting competition, bringing together the country's finest marksmen and women from across all states and service units. The championship serves as the ultimate test of shooting excellence within India and plays a crucial role in talent identification and team selection for international competitions. The 66th edition will be held at the world-class Dr. Karni Singh Shooting Range in New Delhi, featuring both individual and team competitions across all ISSF disciplines in junior, youth, and senior categories.",
      disciplines: [
        "All Olympic Rifle Events",
        "All Olympic Pistol Events",
        "All Olympic Shotgun Events",
        "Plus additional non-Olympic events",
      ],
      schedule: [
        { day: "Week 1", events: ["Rifle Events"] },
        { day: "Week 2", events: ["Pistol Events"] },
        { day: "Week 3", events: ["Shotgun Events"] },
      ],
      previousMedalists: [
        {
          event: "65th National Championship Overall",
          gold: "Maharashtra (25)",
          silver: "Punjab (18)",
          bronze: "Haryana (16)",
        },
      ],
      relatedImages: [
        "/gallery/national1.png",
        "/gallery/national2.png",
        "/gallery/national3.png",
      ],
      documents: [
        {
          name: "National Championship Program",
          type: "PDF",
          size: "2.1 MB",
          url: "#",
        },
        { name: "Entry Forms", type: "PDF", size: "1.5 MB", url: "#" },
        {
          name: "Technical Regulations",
          type: "PDF",
          size: "3.2 MB",
          url: "#",
        },
      ],
    },
  },
  zonal: {
    "north-zone": {
      title: "North Zone Shooting Championship",
      subtitle: "Regional Qualifier",
      date: "October 5-10, 2025",
      registrationDeadline: "September 1, 2025",
      location: "Chandigarh, India",
      venue: "Chandigarh University Shooting Range",
      image: "/events/north-zone-detail.png",
      description:
        "Regional championship featuring shooters from northern Indian states competing across all disciplines.",
      longDescription:
        "The North Zone Shooting Championship brings together competitors from Jammu & Kashmir, Punjab, Haryana, Himachal Pradesh, Uttar Pradesh, Uttarakhand, Delhi, and Chandigarh. This zonal competition serves as a critical qualifier for the National Championship, with top performers earning direct entry. The championship provides valuable competitive experience for both established shooters and emerging talent from the northern region. The 2025 edition will be hosted at the newly upgraded Chandigarh University Shooting Range, which features electronic scoring systems and modern facilities.",
      disciplines: [
        "All Olympic Rifle Events",
        "All Olympic Pistol Events",
        "All Olympic Shotgun Events",
      ],
      schedule: [
        { day: "Day 1-2", events: ["Rifle Events"] },
        { day: "Day 3-4", events: ["Pistol Events"] },
        { day: "Day 5-6", events: ["Shotgun Events"] },
      ],
      previousMedalists: [
        {
          event: "2024 Team Rankings",
          gold: "Punjab",
          silver: "Haryana",
          bronze: "Delhi",
        },
      ],
      relatedImages: ["/gallery/north-zone1.png", "/gallery/north-zone2.png"],
      documents: [
        {
          name: "North Zone Championship Prospectus",
          type: "PDF",
          size: "1.8 MB",
          url: "#",
        },
        { name: "Registration Forms", type: "PDF", size: "1.2 MB", url: "#" },
      ],
    },
  },
  roadtoolympics: {
    "world-cup-delhi": {
      title: "ISSF World Cup",
      subtitle: "Olympic Qualification Series",
      date: "November 12-20, 2025",
      registrationDeadline: "September 30, 2025",
      location: "New Delhi, India",
      venue: "Dr. Karni Singh Shooting Range",
      image: "/events/world-cup-delhi-detail.png",
      description:
        "Olympic qualification event offering quota places for Paris 2028 across multiple shooting disciplines.",
      longDescription:
        "The ISSF World Cup in New Delhi is part of the Olympic qualification series, offering valuable quota places for the 2028 Olympic Games. This prestigious event will attract top shooters from around the world competing for both medals and Olympic qualification. India has a strong tradition of hosting successful World Cup events, and the Dr. Karni Singh Shooting Range in New Delhi is recognized as one of the premier shooting facilities in Asia. The competition will feature all Olympic events across rifle, pistol, and shotgun disciplines, with individual and mixed team formats.",
      disciplines: [
        "Men's 10m Air Rifle",
        "Women's 10m Air Rifle",
        "Mixed Team 10m Air Rifle",
        "Men's 50m Rifle 3 Positions",
        "Women's 50m Rifle 3 Positions",
        "Men's 10m Air Pistol",
        "Women's 10m Air Pistol",
        "Mixed Team 10m Air Pistol",
        "Men's 25m Rapid Fire Pistol",
        "Women's 25m Pistol",
        "Men's Trap",
        "Women's Trap",
        "Mixed Team Trap",
        "Men's Skeet",
        "Women's Skeet",
      ],
      schedule: [
        { day: "Day 1-3", events: ["Rifle Events"] },
        { day: "Day 4-6", events: ["Pistol Events"] },
        { day: "Day 7-9", events: ["Shotgun Events"] },
      ],
      previousMedalists: [
        {
          event: "2024 New Delhi World Cup - Medal Table",
          gold: "China (5)",
          silver: "India (4)",
          bronze: "USA (3)",
        },
      ],
      relatedImages: [
        "/gallery/world-cup1.png",
        "/gallery/world-cup2.png",
        "/gallery/world-cup3.png",
      ],
      documents: [
        {
          name: "World Cup Competition Program",
          type: "PDF",
          size: "2.3 MB",
          url: "#",
        },
        {
          name: "Olympic Qualification System",
          type: "PDF",
          size: "1.7 MB",
          url: "#",
        },
        {
          name: "Visa and Accommodation Information",
          type: "PDF",
          size: "1.5 MB",
          url: "#",
        },
      ],
    },
  },
};

const EventPage: React.FC = () => {
  const { categoryId, eventId } = useParams<{
    categoryId: string;
    eventId: string;
  }>();

  // Type assertion to help TypeScript understand the structure
  const categories = allEvents as Record<string, Record<string, any>>;

  // Get the event data using the categoryId and eventId from the URL
  const event =
    categoryId && eventId ? categories[categoryId]?.[eventId] : null;

  // If event doesn't exist, show error message
  if (!event) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Event not found
        </h2>
        <p className="mb-8">
          The event you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/events">
          <button className="bg-blue-700 hover:bg-blue-800 text-white">
            Return to Events
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero Section with Event Image */}
      <div className="relative h-96 bg-gray-900">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-6xl mx-auto">
            <Link
              to={`/events/${categoryId}`}
              className="inline-flex items-center text-white/80 hover:text-white mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to{" "}
              {categoryId?.charAt(0).toUpperCase() + categoryId?.slice(1)}{" "}
              Events
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              {event.title}
            </h1>
            <p className="text-xl text-white/80">{event.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Event Details Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="prose max-w-none">
              <h2>About the Event</h2>
              <p className="text-lg">{event.longDescription}</p>

              <h3>Disciplines</h3>
              <ul>
                {event.disciplines.map((discipline: string, idx: number) => (
                  <li key={idx}>{discipline}</li>
                ))}
              </ul>

              <h3>Schedule</h3>
              {event.schedule.map(
                (day: { day: string; events: string[] }, idx: number) => (
                  <div key={idx} className="mb-4">
                    <h4 className="font-bold">{day.day}</h4>
                    <ul className="pl-5">
                      {day.events.map((e: string, i: number) => (
                        <li key={i}>{e}</li>
                      ))}
                    </ul>
                  </div>
                )
              )}

              <h3>Previous Results</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 bg-blue-50 text-left">Event</th>
                      <th className="py-2 px-4 bg-blue-50 text-left">Gold</th>
                      <th className="py-2 px-4 bg-blue-50 text-left">Silver</th>
                      <th className="py-2 px-4 bg-blue-50 text-left">Bronze</th>
                    </tr>
                  </thead>
                  <tbody>
                    {event.previousMedalists.map((medal: any, idx: number) => (
                      <tr key={idx} className="border-b">
                        <td className="py-2 px-4 font-medium">{medal.event}</td>
                        <td className="py-2 px-4">{medal.gold}</td>
                        <td className="py-2 px-4">{medal.silver}</td>
                        <td className="py-2 px-4">{medal.bronze}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Photo Gallery */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Photo Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {event.relatedImages.map((img: string, idx: number) => (
                  <div
                    key={idx}
                    className="aspect-square bg-gray-100 rounded-lg overflow-hidden"
                  >
                    <img
                      src={img}
                      alt={`Event photo ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
              <h3 className="text-xl font-bold mb-6">Event Information</h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-blue-700 mt-0.5 mr-3" />
                  <div>
                    <p className="font-medium">Date</p>
                    <p className="text-gray-600">{event.date}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-blue-700 mt-0.5 mr-3" />
                  <div>
                    <p className="font-medium">Registration Deadline</p>
                    <p className="text-gray-600">
                      {event.registrationDeadline}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-blue-700 mt-0.5 mr-3" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-gray-600">{event.location}</p>
                    <p className="text-gray-600">{event.venue}</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Documents</h4>
                  <div className="space-y-2">
                    {event.documents.map((doc: any, idx: number) => (
                      <a
                        key={idx}
                        href={doc.url}
                        className="flex items-center p-3 bg-white rounded border border-gray-200 hover:border-blue-300 hover:shadow-sm"
                      >
                        <Download className="h-4 w-4 text-blue-600 mr-3" />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{doc.name}</p>
                          <p className="text-xs text-gray-500">
                            {doc.type} • {doc.size}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <button className="w-full bg-blue-700 hover:bg-blue-800 text-white mb-3">
                    Register for Event
                  </button>

                  <button className="w-full border-blue-700 text-blue-700 flex items-center justify-center">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
