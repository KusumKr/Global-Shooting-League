"use client";
import { useEffect, useState, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { createRoot } from "react-dom/client";
const Map = ({ ranges, selectedRange }) => {
  const mapRef = useRef(null); // Reference to store the map instance

  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map("map").setView([20.5937, 78.9629], 5); // Default India view
      mapRef.current = map;

      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);
    }
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;

      // Remove previous markers
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });

      // Add new markers with React Icon
      ranges.forEach((range) => {
        if (range.latitude && range.longitude) {
          const iconElement = document.createElement("div");
          const root = createRoot(iconElement);
          root.render(
            <FaMapMarkerAlt style={{ color: "red", fontSize: "24px" }} />
          );

          const customIcon = L.divIcon({
            html: iconElement,
            className: "custom-marker",
            iconSize: [24, 24],
            iconAnchor: [12, 24],
          });

          const marker = L.marker([range.latitude, range.longitude], {
            icon: customIcon,
          })
            .addTo(map)
            .bindPopup(`<b>${range.name}</b><br>${range.address}`);

          marker.on("click", () => {
            map.setView([range.latitude, range.longitude], 12); // Zoom in on marker click
          });
        }
      });
    }
  }, [ranges]);

  // Zoom to selected range when clicked from the list
  useEffect(() => {
    if (mapRef.current && selectedRange) {
      mapRef.current.setView(
        [selectedRange.latitude, selectedRange.longitude],
        12
      );
    }
  }, [selectedRange]);

  return <div id="map" className="w-full h-96 rounded-lg shadow-lg"></div>;
};

export default Map;
