"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const NewsForum = () => {
  const articles = [
    {
      title: "Article 2",
      description: "",
      image: "/mag1img.png",
      mag: "https://heyzine.com/flip-book/ecc71056ed.html",
    },
    {
      title: "Article 3",
      description: "",
      image: "/mag2img.png",
      mag: "https://heyzine.com/flip-book/d09a374aec.html",
    },
    {
      title: "Article 4",
      description: "",
      image: "/mag3img.png",
      mag: "https://heyzine.com/flip-book/1a14246600.html",
    },
    {
      title: "Article 5",
      description: "",
      image: "images/mag7img.png",
      mag: "https://heyzine.com/flip-book/d121dec505.html",
    },
  ];

  const openMagazine = (file) => {
    window.open(file, "_blank");
  };

  return (
    <div className="bg-gray-100 py-12 md:mx-10 lg:mx-16">
      {/* Title */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-red-600 md:text-6xl lg:text-8xl">
          MAGAZINES
        </h1>
      </div>

      {/* Swiper Carousel */}
      <Swiper
        modules={[Navigation, Autoplay]}
        slidesPerView={1}
        spaceBetween={20}
        navigation
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 3 },
        }}
        className="pb-8"
      >
        {articles.map((article, index) => (
          <SwiperSlide key={index}>
            <div
              className="mx-2 min-w-[250px]  max-w-[300px] md:mx-4 md:min-w-[400px]"
              onClick={() => openMagazine(article.mag)}
            >
              <img
                src={article.image}
                alt={article.title}
                className=" w-full rounded-lg object-cover shadow-md h-full"
              />
              <p className="mt-2 text-sm font-bold text-gray-900 md:text-base">
                {article.description}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NewsForum;
