import { useState } from "react";
import { PlayCircle } from "lucide-react";

const mediaItems = [
  {
    title: "Our Latest Blog",
    type: "image",
    img: "/images/blog-thumbnail.jpg",
    link: "https://yourblog.com",
  },
  {
    title: "Claim To Fame Highlights",
    type: "video",
    img: "/images/hall-of-fame-thumbnail.jpg",
    link: "https://youtube.com/watch?v=yourvideoid",
  },
  {
    title: "Follow us on Instagram",
    type: "image",
    img: "/images/instagram-thumbnail.jpg",
    link: "https://instagram.com/yourprofile",
  },
  {
    title: "Latest Competition Recap",
    type: "video",
    img: "/images/competition-thumbnail.jpg",
    link: "https://youtube.com/watch?v=yourcompetitionvideo",
  },
];

export default function MediaSection() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Media Channels 🎥
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {mediaItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition"
              onMouseEnter={() => setHovered(item.title)}
              onMouseLeave={() => setHovered(null)}
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 group-hover:bg-opacity-50 transition">
                  <PlayCircle className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 transition" />
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4">
                <p className="text-white font-semibold">{item.title}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
