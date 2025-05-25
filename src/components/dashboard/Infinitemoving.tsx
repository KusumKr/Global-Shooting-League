import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

const InfiniteCarousel = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const items = [
    {
      text: "RSVP now",
      link: "https://docs.google.com/forms/d/1M0X1fogAsXitDTiH6eT2PzLTeH6TkARser65F774WYE/viewform?edit_requested=true",
      textColor: "#ff3366",
    },
    {
      text: "RSVP now",
      link: "https://docs.google.com/forms/d/1M0X1fogAsXitDTiH6eT2PzLTeH6TkARser65F774WYE/viewform?edit_requested=true",
      textColor: "#3399ff",
    },
    {
      text: "RSVP now",
      link: "https://docs.google.com/forms/d/1M0X1fogAsXitDTiH6eT2PzLTeH6TkARser65F774WYE/viewform?edit_requested=true",
      textColor: "#33cc99",
    },
    {
      text: "RSVP now",
      link: "https://docs.google.com/forms/d/1M0X1fogAsXitDTiH6eT2PzLTeH6TkARser65F774WYE/viewform?edit_requested=true",
      textColor: "#cc33ff",
    },
    {
      text: "RSVP now",
      link: "https://docs.google.com/forms/d/1M0X1fogAsXitDTiH6eT2PzLTeH6TkARser65F774WYE/viewform?edit_requested=true",
      textColor: "#cc33ff",
    },
  ];

  return (
    <div className="w-full overflow-hidden bg-white py-2">
      <Carousel className="w-full">
        <CarouselContent className="flex flex-nowrap gap-4 animate-marquee">
          {[...items, ...items].map((item, index) => (
            <CarouselItem key={index} className="w-auto flex-shrink-0 px-2">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium whitespace-nowrap"
                style={{ color: item.textColor }}
              >
                {item.text}
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default InfiniteCarousel;
