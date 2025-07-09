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

  // Add after NewsForum and before Gallery
  const homeMagazines = [
    {
      title: "Magazine 6",
      description: "",
      image: "/images/mag6-img.png",
      mag: "https://heyzine.com/flip-book/485b972e41.html",
    },
    {
      title: "Magazine 5",
      description: "",
      image: "/images/mag5img.png",
      mag: "https://heyzine.com/flip-book/d121dec505.html",
    },
    {
      title: "Magazine 4",
      description: "",
      image: "/images/mag4img.png",
      mag: "https://heyzine.com/flip-book/a1865cff61.html",
    },
    {
      title: "Magazine 3",
      description: "",
      image: "/mag3img.png",
      mag: "https://heyzine.com/flip-book/1a14246600.html",
    },
    {
      title: "Magazine 2",
      description: "",
      image: "/mag2img.png",
      mag: "https://heyzine.com/flip-book/d09a374aec.html",
    },
    {
      title: "Magazine 1",
      description: "",
      image: "/mag1img.png",
      mag: "https://heyzine.com/flip-book/ecc71056ed.html",
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
          <div className="text-center mt-8 mb-4">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-700">GLOBAL RANKINGS</h2>
          </div>
          <RankingsSection />
          <NewsForum />
          <div className="container mx-auto p-4 max-w-7xl">
            <h2 className="text-4xl font-extrabold text-center mb-6 text-red-600">MAGAZINES</h2>
            <Swiper
              modules={[Navigation, Autoplay]}
              slidesPerView={1}
              spaceBetween={20}
              navigation={true}
              loop={false}
              autoplay={false}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 3 },
              }}
              className="pb-8"
            >
              {homeMagazines.map((article, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="mx-2 min-w-[250px] max-w-[300px] md:mx-4 md:min-w-[400px] group cursor-pointer"
                    onClick={() => window.open(article.mag, "_blank")}
                  >
                    <div className="overflow-hidden rounded-lg shadow-md">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full rounded-lg object-cover h-full transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                      <p className="font-bold text-gray-900 md:text-base truncate flex-1">
                        {article.title}
                      </p>
                      <span className="text-green-600 text-sm flex items-center">
                        Read
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <Gallery />
          {/* Watch Our Story Video Section */}
          <section className="py-6 bg-white px-4">
            <div className="max-w-6xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-2">
                FOUNDER'S DESK
              </h2>
              <div className="flex justify-center">
                <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
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
