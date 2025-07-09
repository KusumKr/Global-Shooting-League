"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import React, { useState } from "react";
import Layout from "./Layout";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/firebase/auth";
import InfiniteCarousel from "../dashboard/Infinitemoving";

const ParallaxScrollPage: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Array of image details with description and path - unchanged
  const [images, setImages] = useState([
    {
      id: 1,
      path: "/news1.png",
    },
    {
      id: 2,
      path: "/siteimages/1.JPG",
    },
    {
      id: 3,
      path: "/news2.png",
    },
    {
      id: 4,
      path: "/news6.png",
    },
    {
      id: 5,
      path: "/siteimages/4.jpg",
    },
    {
      id: 6,
      path: "/siteimages/2.JPG",
    },
    {
      id: 7,
      path: "/siteimages/3.JPG",
    },
    {
      id: 8,
      path: "/siteimages/6.JPG",
    },
    {
      id: 9,
      path: "/siteimages/7.JPG",
    },
    {
      id: 10,
      path: "/siteimages/8.JPG",
    },
    {
      id: 11,
      path: "/news4.png",
    },
    {
      id: 12,
      path: "/news5.png",
    },
    {
      id: 13,
      path: "/news6.png",
    },
    {
      id: 14,
      path: "/news8.png",
    },
    {
      id: 15,
      path: "/news10.png",
    },
  ]);

  // Articles data - updated
  const articles = [
    {
      title: "Magazine 6",
      description: "",
      image: "/images/mag6-img.png", // Corrected image path
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

  // Sample YouTube videos using the same images as thumbnails
  const videos = [
    {
      id: 101,
      title: "Featured Video 1",
      thumbnailPath: "/news1.png",
      youtubeId: "dQw4w9WgXcQ", // Example YouTube ID
    },
    {
      id: 102,
      title: "Featured Video 2",
      thumbnailPath: "/news2.png",
      youtubeId: "rfscVS0vtbw", // Example YouTube ID
    },
    {
      id: 103,
      title: "Featured Video 3",
      thumbnailPath: "/news4.png",
      youtubeId: "8tYOo6IinCw", // Example YouTube ID
    },
  ];

  const openMagazine = (file) => {
    window.open(file, "_blank");
  };

  const openVideoModal = (youtubeId) => {
    setSelectedVideo(youtubeId);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  return (
    <Layout>
      <div className="min-h-screen mt-10 p-4 md:p-8">
        {/* Magazine Section with improved header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Featured Magazines
              </h2>
              <div className="h-1 w-24 bg-green-500 rounded-full"></div>
            </div>
            <button className="text-green-600 font-medium hover:text-green-800 transition-colors flex items-center">
              View All
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
            </button>
          </div>

          <Swiper
            modules={[Navigation, Autoplay]}
            slidesPerView={1}
            spaceBetween={20}
            navigation
            loop={true}
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
                  className="mx-2 min-w-[250px] max-w-[300px] md:mx-4 md:min-w-[400px] group cursor-pointer"
                  onClick={() => openMagazine(article.mag)}
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

        {/* YouTube Videos Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Featured Videos
              </h2>
              <div className="h-1 w-24 bg-red-500 rounded-full"></div>
            </div>
            <button className="text-red-600 font-medium hover:text-red-800 transition-colors flex items-center">
              View All
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
            </button>
          </div>

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
                  alt="Featured YouTube Video"
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

        {/* Gallery Section - improved with header */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Image Gallery
              </h2>
              <div className="h-1 w-24 bg-green-500 rounded-full"></div>
            </div>
            <button className="text-green-600 font-medium hover:text-green-800 transition-colors flex items-center">
              View All
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
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <div
                key={image.id}
                className="relative group overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                {/* Git-like commit branch */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500 group-hover:bg-green-400 transition-colors"></div>

                {/* Image */}
                <div
                  className="relative w-full aspect-video bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${image.path})`,
                    filter: "brightness(0.8) contrast(1.1)",
                  }}
                >
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                    <div className="flex items-center justify-end">
                      <button className="bg-white bg-opacity-80 p-2 rounded-full mr-2 hover:bg-opacity-100 transition-all">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-900"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <button className="bg-white bg-opacity-80 p-2 rounded-full hover:bg-opacity-100 transition-all">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-900"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path
                            fillRule="evenodd"
                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* YouTube Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={closeVideoModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div
              className="relative pb-9/16 h-0"
              style={{ paddingBottom: "56.25%" }}
            >
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-2xl"
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ParallaxScrollPage;
