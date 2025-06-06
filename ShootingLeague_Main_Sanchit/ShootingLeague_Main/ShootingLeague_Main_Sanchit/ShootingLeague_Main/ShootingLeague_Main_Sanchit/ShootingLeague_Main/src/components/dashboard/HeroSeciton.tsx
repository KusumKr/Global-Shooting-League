"use client";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const heroNews = [
  {
    title: "Global Shooting League 2025",
    description:
      "Witness history as the best marksmen from around the world battle for glory in the Global Shooting League 2025! Precision, skill, and determination.",
    image: "/hero1.png", // Ensure correct path
  },
  {
    title: "New Shooting Stars Emerge",
    description:
      "Young marksmen dominate the championship, setting new records and raising the competition bar.",
    image: "/hero2.png",
  },
];

const newsItems = [
  {
    title: "Shooting Trials: Saurabh Chaudhary returns...",
    category: "ISSF CHAMPIONSHIP, 2024",
    image: "/news1.png",
  },
  {
    title: "Rahi Sarnobat puts behind serious health scare",
    category: "ISSF CHAMPIONSHIP, 2024",
    image: "/news2.png",
  },
  {
    title: "Saurabh Chaudhary sets National Record, eyes...",
    category: "ISSF CHAMPIONSHIP, 2024",
    image: "/news3.png",
  },
  {
    title: "Rs 182-cr world-class shooting range in...",
    category: "ISSF CHAMPIONSHIP, 2024",
    image: "/news4.png",
  },
];

const HeroSection = () => {
  const heroSliderRef = useRef(null);

  return (
    <section className="relative">
      {/* News Scrolling Section */}
      <div className="bg-blue-900 py-6 px-4">
        <Swiper
          modules={[Autoplay]}
          loop={true}
          spaceBetween={15}
          slidesPerView={3}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          speed={1000}
          allowTouchMove={false}
          className="overflow-hidden"
        >
          {newsItems.map((news, index) => (
            <SwiperSlide
              key={index}
              className="w-[250px] md:w-[280px] lg:w-[300px]"
            >
              <div className=" rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-all">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-3">
                  <p className="text-xs text-white">{news.category}</p>
                  <p className="text-sm text-white font-semibold">
                    {news.title}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default HeroSection;
