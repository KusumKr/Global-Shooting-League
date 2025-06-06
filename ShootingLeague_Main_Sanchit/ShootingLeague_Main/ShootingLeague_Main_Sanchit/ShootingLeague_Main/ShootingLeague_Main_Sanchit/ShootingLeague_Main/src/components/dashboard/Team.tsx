import { Users, Award } from "lucide-react";
import { Link } from "react-router-dom";

const ExecutiveCommittee = () => {
  const members = [
    { name: "Col. Prem Rajpurohit", position: "", img: "/images/Col. Prem.jpg" },
    {
      name: "Mr Anvesh Pandey ",
      position: "",
      img: "/images/AvnishPandey.jpg",
    },
    {
      name: "Mr. Pravash Dey",
      position: "",
      img: "/images/Pravashsir.png",
    },
    {
      name: "Ms. Zoya Khan",
      position: "",
      img: "/images/ZoyaKhan.jpg",
    },
    {
      name: "Ms. Astha Bisht",
      position: "",
      img: "/images/AsthaBisht.jpg",
    },
    {
      name: "Ms. Esha Jamwal",
      position: "",
      img: "/images/EshaJamwal.jpg",
    },
    // {
    //   name: "Alex Turner",
    //   position: "Secretary",
    //   img: "/images/pravashsir.png",
    // },
    // {
    //   name: "Olivia Martinez",
    //   position: "Strategic Advisor",
    //   img: "/images/pravashsir.png",
    // },
  ];

  return (
    <section className="bg-gradient-to-br from-blue-900 to-blue-700 py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <Users className="w-10 h-10 text-white mr-3" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              LEADERSHIP TEAM
            </h2>
          </div>
          <p className="text-blue-100 max-w-2xl mx-auto text-lg">
            Our leadership team brings together experienced professionals
            dedicated to driving innovation, strategic vision, and excellence in
            our organization.
          </p>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {members.map((member, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden 
                         shadow-2xl border border-white/20 transition-all duration-300 
                         hover:scale-105 hover:shadow-3xl group"
            >
              <div className="relative">
                <Link to="/about#leadership-team">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-[280px] sm:h-[320px] md:h-[360px] lg:h-[400px] object-contain 
                             transition-transform duration-300 
                             group-hover:scale-105 bg-white/5 p-2"
                    style={{ imageRendering: 'auto' }}
                  />
                </Link>
                <div
                  className="absolute inset-0 bg-blue-900/40 opacity-0 
                             group-hover:opacity-100 transition-opacity 
                             flex items-center justify-center"
                >
                  <Award
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white opacity-0 
                              group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>

              <div className="p-4 sm:p-5 text-center">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-200 text-sm sm:text-base uppercase tracking-wider">
                  {member.position}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExecutiveCommittee;
