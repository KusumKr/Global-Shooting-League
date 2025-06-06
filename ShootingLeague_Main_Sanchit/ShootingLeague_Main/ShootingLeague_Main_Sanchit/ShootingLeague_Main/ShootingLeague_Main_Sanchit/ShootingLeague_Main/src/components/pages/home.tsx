import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronRight, Settings, User, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../firebase/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useState } from "react";
import HeroSection from "../dashboard/HeroSeciton";
import rangesData from "../../../public/ranges.json";
import Map from "../dashboard/Map";
import NewsForum from "../dashboard/News";
import Gallery from "../dashboard/Gallery";
import InfiniteCarousel from "../dashboard/Infinitemoving";
import TeamVictorySection from "../dashboard/Victory";
import RankingsSection from "../dashboard/RankingSection";
import Footer from "../dashboard/Footer";
import ExecutiveCommittee from "../dashboard/Team";
import MediaSection from "../dashboard/Fame";
import Layout from "./Layout";
import EventsSection from "../dashboard/Events";

export default function LandingPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [ranges, setRanges] = useState(rangesData);
  const [selectedRange, setSelectedRange] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const filteredRanges = ranges.filter(
    (range) =>
      range.name.toLowerCase().includes(search.toLowerCase()) ||
      range.address.toLowerCase().includes(search.toLowerCase())
  );

  // Sample data for rankings
  const mensRankings = [
    { rank: 1, name: "John Smith", country: "USA", score: 598 },
    { rank: 2, name: "Wei Zhang", country: "China", score: 596 },
    { rank: 3, name: "Alexei Petrov", country: "Russia", score: 595 },
    { rank: 4, name: "Rajiv Kumar", country: "India", score: 594 },
    { rank: 5, name: "Hans Mueller", country: "Germany", score: 593 },
  ];

  const womensRankings = [
    { rank: 1, name: "Maria Garcia", country: "Spain", score: 597 },
    { rank: 2, name: "Li Na", country: "China", score: 596 },
    { rank: 3, name: "Sarah Johnson", country: "USA", score: 595 },
    { rank: 4, name: "Aisha Patel", country: "India", score: 594 },
    { rank: 5, name: "Yuki Tanaka", country: "Japan", score: 592 },
  ];

  // Carousel slide data
  const carouselSlides = [
    {
      title: "FOCUS",
      subtitle: "Greatness begins in the mind. Focus not just with your eyes, but with unwavering intent.",
      image: "/GSL1.JPG",
      cta: "Learn the mental game",
      url: "https://docs.google.com/forms/d/1M0X1fogAsXitDTiH6eT2PzLTeH6TkARser65F774WYE/viewform?edit_requested=true",
      align: "left"
    },
    {
      title: "AIM",
      subtitle: "Hold steady. Tune out everything else. The path to the target begins with quiet determination.",
      image: "/GSL3.JPG",
      cta: "Improve your technique",
      url: "https://docs.google.com/forms/d/1M0X1fogAsXitDTiH6eT2PzLTeH6TkARser65F774WYE/viewform?edit_requested=true",
      align: "right"
    },
    {
      title: "BREATHE",
      subtitle: "Your breath is your anchor. Inhale clarity. Exhale fear. Find power in stillness.",
      image: "/GSL2.jpg",
      cta: "Master your breathing",
      url: "https://docs.google.com/forms/d/1M0X1fogAsXitDTiH6eT2PzLTeH6TkARser65F774WYE/viewform?edit_requested=true",
      align: "left"
    },
    {
      title: "SHOOT",
      subtitle: "When preparation meets the perfect second, shoot like there's no turning back.",
      image: "/GSL11.JPG",
      cta: "Perfect your form",
      url: "https://docs.google.com/forms/d/1M0X1fogAsXitDTiH6eT2PzLTeH6TkARser65F774WYE/viewform?edit_requested=true",
      align: "right"
    },
    {
      title: "REPEAT",
      subtitle: "Repeat the ritual. Repeat the mindset. Repeat the excellence—until it becomes who you are.",
      image: "/GSL7.JPG",
      cta: "Join our training program",
      url: "https://docs.google.com/forms/d/1M0X1fogAsXitDTiH6eT2PzLTeH6TkARser65F774WYE/viewform?edit_requested=true",
      align: "left"
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-white text-black">
        <main>
          {/* Hero Carousel */}
          <section className="relative">
            <Swiper
              modules={[Navigation, Autoplay]}
              slidesPerView={1}
              navigation
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              className="w-full"
            >
              {carouselSlides.map((slide, index) => (
                <SwiperSlide key={index}>
                  <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] w-full overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                      style={{
                        backgroundImage: `url(${slide.image})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'contain',
                        backgroundColor: 'rgb(18, 24, 40)',
                        backgroundRepeat: 'no-repeat',
                        width: '100%',
                        height: '100%',
                        transform: 'scale(1)',
                        transition: 'transform 0.3s ease-in-out'
                      }}
                    >
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#121828] via-[#12182880] to-transparent py-8">
                      <div className={`container mx-auto px-8 ${
                        slide.align === 'left' 
                          ? 'text-left' 
                          : 'text-right'
                      }`}>
                        <div className={`${
                          slide.align === 'left'
                            ? 'mr-auto'
                            : 'ml-auto'
                        } max-w-2xl p-6`}>
                          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-3 leading-tight text-white">
                            {slide.title}
                          </h2>
                          <p className="text-base sm:text-lg md:text-xl mb-6 leading-relaxed text-white/90">
                            {slide.subtitle}
                          </p>
                          <div className={`${slide.align === 'right' ? 'flex justify-end' : ''}`}>
                            <a
                              href={slide.url}
                              target="_blank"
                              className="inline-block bg-blue-700 hover:bg-blue-800 text-white rounded-full px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base transition-all duration-300 transform hover:scale-105"
                            >
                              {slide.cta}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
          {/* <HeroSection /> */}
          <EventsSection />
          {/* <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-10">
                Global Rankings
              </h2>

              <Tabs defaultValue="men" className="max-w-3xl mx-auto">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="men">Men's Rankings</TabsTrigger>
                  <TabsTrigger value="women">Women's Rankings</TabsTrigger>
                </TabsList>

                <TabsContent
                  value="men"
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-blue-700 text-white">
                        <tr>
                          <th className="py-3 px-4 text-left">Rank</th>
                          <th className="py-3 px-4 text-left">Name</th>
                          <th className="py-3 px-4 text-left">Country</th>
                          <th className="py-3 px-4 text-right">Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mensRankings.map((shooter) => (
                          <tr
                            key={shooter.rank}
                            className="border-b border-gray-200 hover:bg-gray-50"
                          >
                            <td className="py-3 px-4 font-medium">
                              {shooter.rank}
                            </td>
                            <td className="py-3 px-4">{shooter.name}</td>
                            <td className="py-3 px-4">{shooter.country}</td>
                            <td className="py-3 px-4 text-right font-medium">
                              {shooter.score}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="p-4 text-center">
                    <Link
                      to="/shooters"
                      className="text-blue-600 hover:underline font-medium inline-flex items-center"
                    >
                      View full rankings{" "}
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </TabsContent>

                <TabsContent
                  value="women"
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-blue-700 text-white">
                        <tr>
                          <th className="py-3 px-4 text-left">Rank</th>
                          <th className="py-3 px-4 text-left">Name</th>
                          <th className="py-3 px-4 text-left">Country</th>
                          <th className="py-3 px-4 text-right">Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {womensRankings.map((shooter) => (
                          <tr
                            key={shooter.rank}
                            className="border-b border-gray-200 hover:bg-gray-50"
                          >
                            <td className="py-3 px-4 font-medium">
                              {shooter.rank}
                            </td>
                            <td className="py-3 px-4">{shooter.name}</td>
                            <td className="py-3 px-4">{shooter.country}</td>
                            <td className="py-3 px-4 text-right font-medium">
                              {shooter.score}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="p-4 text-center">
                    <Link
                      to="/shooters"
                      className="text-blue-600 hover:underline font-medium inline-flex items-center"
                    >
                      View full rankings{" "}
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </section> */}
          <RankingsSection />
          <NewsForum />
          <div className="container mx-auto p-4 max-w-7xl">
            <h1 className="text-4xl font-bold text-center mb-6 text-blue-800">
              Shooting Ranges Finder
            </h1>

            <div className="mb-6">
              <input
                type="text"
                placeholder="Search by name or location..."
                className="border-2 border-blue-300 p-3 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Map section - larger and more prominent */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
              <h2 className="bg-blue-700 text-white p-3 text-xl font-semibold">
                Location Map
              </h2>
              <div className="h-96 w-full">
                <Map ranges={filteredRanges} selectedRange={selectedRange} />
              </div>
            </div>

            {/* Ranges section - now below the map */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <h2 className="bg-blue-700 text-white p-3 text-xl font-semibold">
                Available Ranges ({filteredRanges.length})
              </h2>

              <div className="p-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredRanges.slice(0, visibleCount).map((range) => (
                    <button
                      key={range.id}
                      onClick={() => setSelectedRange(range)}
                      className={`flex flex-col md:flex-row items-center gap-4 p-4 rounded-lg w-full text-left transition-all duration-200 hover:shadow-md ${
                        selectedRange?.id === range.id
                          ? "bg-blue-50 border-2 border-blue-500"
                          : "bg-gray-50 border border-gray-200"
                      }`}
                    >
                      <img
                        src={range.image}
                        alt={range.name}
                        className="w-full md:w-2/5 h-48 md:h-32 object-cover rounded-lg"
                      />
                      <div className="w-full md:w-3/5 mt-2 md:mt-0">
                        <h3 className="text-xl font-bold text-blue-800">
                          {range.name}
                        </h3>
                        <p className="text-gray-700 mt-1">{range.address}</p>
                        <div className="flex items-center mt-2">
                          <span
                            className={`inline-block w-3 h-3 rounded-full mr-2 ${
                              range.status === "Open"
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          ></span>
                          <span
                            className={
                              range.status === "Open"
                                ? "text-green-700"
                                : "text-red-700"
                            }
                          >
                            {range.status}
                          </span>
                          <span className="mx-2">•</span>
                          <span className="text-gray-600">
                            {range.openingHours}
                          </span>
                        </div>
                        <p className="text-green-600 font-semibold mt-2">
                          {range.price}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>

                {visibleCount < filteredRanges.length && (
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 3)}
                    className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-medium w-full transition-colors duration-200"
                  >
                    Load More Ranges
                  </button>
                )}
              </div>
            </div>
          </div>
          <ExecutiveCommittee />
          {/* <MediaSection /> */}
          <Gallery />
          {/* Watch Our Story Video Section */}
          <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-6">
                Watch Our Story
              </h2>
              <div className="flex justify-center">
                <div className="relative w-full max-w-2xl aspect-video rounded-lg overflow-hidden shadow-lg">
                  <a
                    href="https://www.youtube.com/watch?v=iLd34M-SboQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-full group"
                  >
                    <img
                      src="/featured-cover.png"
                      alt="Watch Our Story Video"
                      className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-red-600 bg-opacity-80 rounded-full w-16 h-16 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </section>
          {/* <TeamVictorySection /> */}
          <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto text-center px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-6">
                Our Mission
              </h2>
              <div className="text-lg md:text-2xl text-gray-700 leading-relaxed mb-8 text-justify max-w-4xl mx-auto">
                <p className="mb-6">
                  Our mission is to build a thriving ecosystem for sports shooting by bringing together all key stakeholders—shooters, coaches, range operators, manufacturers, media professionals, and fans—under one unified digital and physical platform. Through our cutting-edge website, mobile applications, and on-ground initiatives, we aim to:
                </p>
                <ul className="list-none space-y-4 text-left">
                  <li className="flex items-start">
                    <span className="text-blue-700 mr-2">●</span>
                    <span>Promote awareness and participation in shooting sports across India and the world.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-700 mr-2">●</span>
                    <span>Identify and nurture young talent while establishing world-class infrastructure and centers of excellence in every region.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-700 mr-2">●</span>
                    <span>Drive professional development through competitions, training, and data-driven talent management.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-700 mr-2">●</span>
                    <span>Facilitate the growth of indigenous manufacturing for top-tier shooting equipment, supporting the Make-in-India initiative.</span>
                  </li>
                </ul>
                <p className="mt-6">
                  With a strong foundation in research, technology, and community collaboration, GSL is committed to shaping the future of shooting sports with purpose, precision, and passion.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}
