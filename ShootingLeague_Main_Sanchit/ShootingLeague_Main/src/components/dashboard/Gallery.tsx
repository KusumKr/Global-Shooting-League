"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const images = [
  "/siteimages/1.JPG",
  "/siteimages/2.JPG",
  "/siteimages/3.JPG",
  "/siteimages/4.jpg",
  "/siteimages/5.jpg",
  "/siteimages/6.JPG",
  "/siteimages/7.JPG",
  "/siteimages/8.JPG",
  "/news2.png",
  "/news3.png",
  "/news4.png",
  "/news5.png",
  "/news6.png",
  "/news7.png",
  "/news8.png",
  "/news9.png",
];

const Gallery = () => {
  return (
    <div className="bg-gray-100 py-8 px-4 md:px-10 lg:px-16">
      {/* Title */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-blue-600 md:text-5xl lg:text-6xl">
          CLAIM TO FAME
        </h1>
      </div>

      {/* Two-Row Carousel */}
      <div className="space-y-6">
        {[0, 1].map((row) => (
          <Swiper
            key={row}
            modules={[Autoplay, Navigation]}
            spaceBetween={10}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop={true}
            navigation
            breakpoints={{
              320: { slidesPerView: 1 },
              480: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            className="pb-4"
          >
            {images.slice(row * 5, row * 5 + 5).map((src, index) => (
              <SwiperSlide key={index}>
                <div className="rounded-lg overflow-hidden shadow-md">
                  <img
                    src={src}
                    alt={`Gallery Image ${index + 1}`}
                    className="w-full h-32 sm:h-40 md:h-48 lg:h-56 object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
