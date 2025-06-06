const TeamVictorySection = () => {
  return (
    <section className=" mt-10 py-12 px-4 md:px-16 text-center">
      {/* Title & Description */}
      <h2 className="text-2xl md:text-4xl font-bold text-blue-700">
        TEAM DELHI&apos;S HISTORIC WIN!
      </h2>
      <p className="mt-4 text-sm md:text-lg max-w-3xl mx-auto text-black">
        In a historic comeback, Delhi&apos;s shooting squad has qualified for
        the National Shooting League Final after 20 years! As hosts of the
        Shooting League (North Zone) Group A at Dr. Karni Singh Shooting Range,
        New Delhi, Team Delhi delivered a stellar performance, edging past tough
        contenders to claim their spot in the grand finale.
      </p>

      {/* Images Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <img
          src="/news1.png"
          alt="Championship Poster"
          className="w-full h-56 md:h-72 object-cover rounded-lg shadow-lg"
        />
        <img
          src="/news2.png"
          alt="Winning Team"
          className="w-full h-56 md:h-72 object-cover rounded-lg shadow-lg"
        />
        <img
          src="/news3.png"
          alt="Shooter Aiming"
          className="w-full h-56 md:h-72 object-cover rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
};

export default TeamVictorySection;
