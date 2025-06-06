"use client";
import { useEffect, useState } from "react";
import rangesData from "../../../public/ranges.json";
import Map from "../dashboard/Map";
import { Link } from "react-router-dom";
import { useAuth } from "@/firebase/auth";
import Layout from "./Layout";

export default function ShootingRanges() {
  const [search, setSearch] = useState("");
  const [ranges, setRanges] = useState(rangesData);
  const [selectedRange, setSelectedRange] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3);

  const filteredRanges = ranges.filter(
    (range) =>
      range.name.toLowerCase().includes(search.toLowerCase()) ||
      range.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
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
    </Layout>
  );
}
