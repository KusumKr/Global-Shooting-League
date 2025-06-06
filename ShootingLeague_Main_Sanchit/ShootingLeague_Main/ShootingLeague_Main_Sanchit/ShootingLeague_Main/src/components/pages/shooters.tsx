import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Layout from "./Layout";

const Athletes = () => {
  const [athletes, setAthletes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAthletes, setFilteredAthletes] = useState([]);

  useEffect(() => {
    // Fetching athletes from JSON file
    fetch("/athletes.json")
      .then((res) => res.json())
      .then((data) => {
        setAthletes(data);
        setFilteredAthletes(data);
      });
  }, []);

  // Update filtered athletes on search
  useEffect(() => {
    const filtered = athletes.filter((athlete) =>
      athlete.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAthletes(filtered);
  }, [searchTerm, athletes]);

  return (
    <Layout>
      <div className=" min-h-screen py-16 px-4 sm:px-12">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-extrabold   text-blue-700 mb-4">
            ELITE SHOOTERS
          </h1>
          <p className="text-blue-700 max-w-2xl mx-auto">
            Discover the incredible athletes who define excellence in shooting
            sports
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-12"
        >
          <input
            type="text"
            placeholder="Search athletes..."
            className="w-full max-w-md px-4 py-3  text-black rounded-full border-2 border-transparent focus:border-red-500 focus:outline-none transition-all duration-300 ease-in-out"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </motion.div>

        {/* Athletes Grid */}
        {filteredAthletes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-400 mt-12"
          >
            <p className="text-2xl">No athletes found</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {filteredAthletes.map((athlete) => (
              <motion.div
                key={athlete.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-300 hover:shadow-red-500/50"
              >
                <div className="relative">
                  <img
                    src={athlete.image}
                    alt={athlete.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>
                <div className="p-6 text-white">
                  <h2 className="text-2xl font-bold mb-2">{athlete.name}</h2>
                  <div className="flex justify-between items-center text-gray-400">
                    <span>{athlete.gender}</span>
                    <span>Born: {athlete.birthday}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default Athletes;
