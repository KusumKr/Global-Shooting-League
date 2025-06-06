"use client";
import { useEffect, useState } from "react";

const Athletes = () => {
  const [athletes, setAthletes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    // Fetching athletes from JSON file
    fetch("/athletes.json")
      .then((res) => res.json())
      .then((data) => setAthletes(data));
  }, []);

  // Filter athletes based on search
  const filteredAthletes = athletes.filter((athlete) =>
    athlete.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-8 px-6 md:px-16 min-h-screen">
      {/* Page Header */}
      <div className="text-center text-black">
        <h1 className="text-4xl  font-bold">ATHLETES</h1>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center my-6">
        <input
          type="text"
          placeholder="Search"
          className="p-2 w-80 border rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Athletes Grid */}
      <div className="grid grid-cols-1 bg-blue-500 p-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
        {filteredAthletes.map((athlete) => (
          <div
            key={athlete.id}
            className="bg-white rounded-lg shadow-md overflow-hidden p-4 text-center cursor-pointer"
          >
            <img
              src={athlete.image}
              alt={athlete.name}
              className="mx-auto  rounded-lg"
            />
            <h2 className="text-xl font-bold mt-2">{athlete.name}</h2>
            <div className="flex justify-center items-center gap-2 my-1">
              <span className="text-gray-600">{athlete.gender}</span>
            </div>
            <p className="text-gray-500">Birth Day: {athlete.birthday}</p>
          </div>
        ))}
      </div>
      {/* <PartnersSection/> */}
    </div>
  );
};

export default Athletes;
