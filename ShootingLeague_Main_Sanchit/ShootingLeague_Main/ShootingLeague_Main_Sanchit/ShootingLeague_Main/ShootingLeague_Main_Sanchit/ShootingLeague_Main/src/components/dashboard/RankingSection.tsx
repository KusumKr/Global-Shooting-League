"use client";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const RankingsSection = () => {
  const [athletes, setAthletes] = useState({
    men: [],
    women: [],
  });
  const [menSearchTerm, setMenSearchTerm] = useState("");
  const [womenSearchTerm, setWomenSearchTerm] = useState("");

  // Separate sort options for men and women
  const [menSortOption, setMenSortOption] = useState("name");
  const [womenSortOption, setWomenSortOption] = useState("name");

  const [filteredMen, setFilteredMen] = useState([]);
  const [filteredWomen, setFilteredWomen] = useState([]);

  useEffect(() => {
    // Fetch athlete data from JSON file in public folder
    fetch("/athletes.json")
      .then((response) => response.json())
      .then((data) => {
        const men = data
          .filter((athlete) => athlete.gender === "Male")
          .map((athlete) => ({
            name: athlete.name,
            event: athlete.achievements[0]?.event || "Not specified",
            img: athlete.image || "/images/default.jpg",
            country: athlete.country || "Not specified",
            age: athlete.age || 0,
            medals: calculateTotalMedals(athlete.medals) || 0,
          }));

        const women = data
          .filter((athlete) => athlete.gender === "Female")
          .map((athlete) => ({
            name: athlete.name,
            event: athlete.achievements[0]?.event || "Not specified",
            img: athlete.image || "/images/default.jpg",
            country: athlete.country || "Not specified",
            age: athlete.age || 0,
            medals: calculateTotalMedals(athlete.medals) || 0,
          }));

        setAthletes({ men, women });
        setFilteredMen(men);
        setFilteredWomen(women);
      })
      .catch((error) => console.error("Error fetching athlete data:", error));
  }, []);

  // Calculate total medals for sorting purposes
  const calculateTotalMedals = (medals) => {
    if (!medals) return 0;

    let total = 0;
    Object.values(medals).forEach((category) => {
      if (category) {
        total +=
          ((category as { gold?: number; silver?: number; bronze?: number })
            .gold || 0) +
          ((category as { gold?: number; silver?: number; bronze?: number })
            .silver || 0) +
          ((category as { gold?: number; silver?: number; bronze?: number })
            .bronze || 0);
      }
    });

    return total;
  };

  // Filter and sort men athletes
  useEffect(() => {
    if (athletes.men.length === 0) return;

    const filtered = athletes.men.filter(
      (athlete) =>
        athlete.name.toLowerCase().includes(menSearchTerm.toLowerCase()) ||
        athlete.event.toLowerCase().includes(menSearchTerm.toLowerCase()) ||
        athlete.country.toLowerCase().includes(menSearchTerm.toLowerCase())
    );

    const sorted = [...filtered].sort((a, b) => {
      switch (menSortOption) {
        case "name":
          return a.name.localeCompare(b.name);
        case "event":
          return a.event.localeCompare(b.event);
        case "country":
          return a.country.localeCompare(b.country);
        case "age-asc":
          return a.age - b.age;
        case "age-desc":
          return b.age - a.age;
        case "medals":
          return b.medals - a.medals;
        default:
          return 0;
      }
    });

    setFilteredMen(sorted);
  }, [menSearchTerm, menSortOption, athletes.men]);

  // Filter and sort women athletes
  useEffect(() => {
    if (athletes.women.length === 0) return;

    const filtered = athletes.women.filter(
      (athlete) =>
        athlete.name.toLowerCase().includes(womenSearchTerm.toLowerCase()) ||
        athlete.event.toLowerCase().includes(womenSearchTerm.toLowerCase()) ||
        athlete.country.toLowerCase().includes(womenSearchTerm.toLowerCase())
    );

    const sorted = [...filtered].sort((a, b) => {
      switch (womenSortOption) {
        case "name":
          return a.name.localeCompare(b.name);
        case "event":
          return a.event.localeCompare(b.event);
        case "country":
          return a.country.localeCompare(b.country);
        case "age-asc":
          return a.age - b.age;
        case "age-desc":
          return b.age - a.age;
        case "medals":
          return b.medals - a.medals;
        default:
          return 0;
      }
    });

    setFilteredWomen(sorted);
  }, [womenSearchTerm, womenSortOption, athletes.women]);
  console.log(filteredMen);
  return (
    <section className="py-12 max-w-7xl mx-auto bg-white px-4 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Men's Rankings */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg text-black md:text-2xl font-bold">
              MEN&apos;S RANKINGS
            </h2>
            <Link to="/shooters" className="text-blue-500 text-sm">
              SEE ALL
            </Link>
          </div>

          {/* Men's search and sort */}
          <div className="flex flex-col mb-4 space-y-2">
            <input
              type="text"
              placeholder="Search men by name, event, or country"
              className="px-3 py-2 border rounded-md"
              value={menSearchTerm}
              onChange={(e) => setMenSearchTerm(e.target.value)}
            />
            <select
              className="px-3 py-2 border rounded-md"
              value={menSortOption}
              onChange={(e) => setMenSortOption(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="event">Sort by Event</option>
              <option value="country">Sort by Country</option>
              <option value="age-asc">Sort by Age (Youngest First)</option>
              <option value="age-desc">Sort by Age (Oldest First)</option>
              <option value="medals">Sort by Total Medals</option>
            </select>
          </div>

          <div className="mt-4 space-y-4">
            {filteredMen.length > 0 ? (
              filteredMen.slice(0, 4).map((athlete, id) => (
                <div
                  key={id}
                  className="flex items-center justify-between bg-gray-200 rounded-lg shadow-md overflow-hidden"
                >
                  <div className="p-4">
                    <p className="text-xs text-gray-600">{athlete.event}</p>
                    <h3 className="text-md font-semibold">{athlete.name}</h3>
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <span>{athlete.country}</span>
                      <span className="mx-2">•</span>
                      <span>Age: {athlete.age}</span>
                    </div>
                  </div>
                  <img
                    src={athlete.img}
                    alt={athlete.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                </div>
              ))
            ) : (
              <p className="text-center py-4">
                No athletes found matching your search.
              </p>
            )}
          </div>
        </div>

        {/* Women's Rankings */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg text-black md:text-2xl font-bold">
              WOMEN&apos;S RANKINGS
            </h2>
            <Link to="/shooters" className="text-blue-500 text-sm">
              SEE ALL
            </Link>
          </div>

          {/* Women's search and sort */}
          <div className="flex flex-col mb-4 space-y-2">
            <input
              type="text"
              placeholder="Search women by name, event, or country"
              className="px-3 py-2 border rounded-md"
              value={womenSearchTerm}
              onChange={(e) => setWomenSearchTerm(e.target.value)}
            />
            <select
              className="px-3 py-2 border rounded-md"
              value={womenSortOption}
              onChange={(e) => setWomenSortOption(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="event">Sort by Event</option>
              <option value="country">Sort by Country</option>
              <option value="age-asc">Sort by Age (Youngest First)</option>
              <option value="age-desc">Sort by Age (Oldest First)</option>
              <option value="medals">Sort by Total Medals</option>
            </select>
          </div>

          <div className="mt-4 space-y-4">
            {filteredWomen.length > 0 ? (
              filteredWomen.slice(0, 4).map((athlete, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-200 rounded-lg shadow-md overflow-hidden"
                >
                  <div className="p-4">
                    <p className="text-xs text-gray-600">{athlete.event}</p>
                    <h3 className="text-md font-semibold">{athlete.name}</h3>
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <span>{athlete.country}</span>
                      <span className="mx-2">•</span>
                      <span>Age: {athlete.age}</span>
                    </div>
                  </div>
                  <img
                    src={athlete.img}
                    alt={athlete.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                </div>
              ))
            ) : (
              <p className="text-center py-4">
                No athletes found matching your search.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RankingsSection;
