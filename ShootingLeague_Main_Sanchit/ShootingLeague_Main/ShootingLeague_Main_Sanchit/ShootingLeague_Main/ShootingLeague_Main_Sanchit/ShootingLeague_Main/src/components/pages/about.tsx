import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/firebase/auth";
import InfiniteCarousel from "../dashboard/Infinitemoving";
import Layout from "./Layout";

export default function AboutPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Layout>
        <main className="pt-16">
          <section className="py-20 bg-blue-700 text-white">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About the Global Shooting League
              </h1>
            </div>
          </section>

          <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-10">
                Our Story
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
                <div>
                  <img
                    src="/siteimages/2.JPG"
                    alt="Founding of GSL"
                    className="rounded-lg shadow-md"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">The Beginning</h3>
                  <p className="text-gray-700 mb-4">
                    At the heart of every great shot lies a story—of focus, discipline, and the relentless pursuit of excellence. Our sports magazine is a tribute to that journey. We are a team of passionate storytellers, athletes, and creatives united by one mission: to celebrate the spirit of competitive shooting and the athletes who define it. 
                  </p>
                  <p className="text-gray-700">
                    Whether it's the slow breath before a final shot or the electric rush of hitting the bullseye, we aim to capture every pulse of the sport through powerful visuals, bold narratives, and cutting-edge insights.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
                <div className="order-2 md:order-1">
                  <h3 className="text-xl font-bold mb-4">Our Growth</h3>
                  <p className="text-gray-700 mb-4">
                    We believe that Olympic shooting is more than just a sport—it's a finely tuned art form, one where technology, mental strength, and sheer willpower converge. Through our carefully curated features, in-depth articles, and visually immersive content, we bring readers closer to the ever-evolving world of shooting sports. 
                  </p>
                  <p className="text-gray-700">
                    From covering tech innovations like AI-driven training and smart firearms to profiling the legends behind the trigger, we dive deep into what makes this sport one of the most demanding and awe-inspiring disciplines in the world of athletics.
                  </p>
                </div>
                <div className="order-1 md:order-2">
                  <img
                    src="/siteimages/4.jpg"
                    alt="GSL Growth"
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <img
                    src="/siteimages/3.JPG"
                    alt="GSL Today"
                    className="rounded-lg shadow-md"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">GSL Today</h3>
                  <p className="text-gray-700 mb-4">
                    Our platform is designed not just for seasoned enthusiasts, but for the next generation of sharpshooters and fans who want to learn, engage, and be inspired. With every issue, every article, and every image, we aim to fire up passion, spark curiosity, and drive conversations that elevate the sport.
                  </p>
                  <p className="text-gray-700">
                    We're not just telling stories—we're shaping the future of shooting, one perfectly placed word (and shot) at a time.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="px-6  md:px-16">
            {/* <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
            <div className="h-60 w-full overflow-hidden rounded-lg bg-gray-300 shadow-md md:h-80">
              <img
                src="/siteimages/GSL 1 (1).JPG"
                alt="Image"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="space-y-6 text-lg leading-relaxed">
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero
                dignissimos blanditiis, delectus soluta incidunt vel obcaecati
                eveniet quas deserunt quaerat praesentium, debitis cupiditate
                inventore vitae quia ad maiores impedit aperiam excepturi animi!
                Illum cum quos distinctio architecto aut modi inventore eligendi
                molestias atque, a autem accusamus consequatur animi libero
                nesciunt consectetur similique veniam saepe vitae suscipit
                necessitatibus velit id eos vel! Nemo excepturi voluptatibus
                alias possimus, aliquid voluptate, quos repellat dolores modi
                illo deleniti ut dolor consequuntur numquam porro neque cumque
                fugit. Repellendus eveniet voluptates ducimus non saepe, dolores
                officiis sequi iusto quas fuga delectus perferendis tenetur,
                iure, unde laboriosam.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                recusandae earum laudantium porro quo id sunt itaque cum commodi
                in nisi nemo quos eum, dolores possimus minima minus, nulla at
                ad, voluptatem ipsum hic dignissimos. Quos quia omnis placeat
                vitae, magnam ex explicabo? Ipsum vel repellat sint corporis
                eius suscipit laborum totam? Illo ratione consequatur ducimus
                aspernatur, ea voluptate veniam nihil vitae cupiditate, vel aut
                autem laboriosam dolores corporis harum excepturi nulla! Sint
                adipisci iusto corporis ab sequi sed dolorum!
              </p>
            </div>
          </div> */}
          </section>
          {/* Vision, Mission, Value Proposition */}
          <section className="bg-[#001f3f] px-6 py-16 text-white md:px-16">
            <div className="space-y-16 lg:grid lg:grid-cols-1 lg:gap-16 lg:space-y-0">
              {/* Vision */}
              <div className="lg:flex lg:justify-between lg:space-x-8">
                <h2 className="mb-6 text-xl font-bold uppercase lg:mb-0 lg:text-7xl">
                  Vision
                </h2>
                <div className="text-lg leading-relaxed lg:w-1/2 text-justify force-white-text">
                  <p className="mb-4">
                    At Global Shooting League, we envision a world where sports shooting is accessible, inclusive, and celebrated across every corner of the globe. Our goal is to democratize the sport through the infusion of advanced technology, innovation, and strategic collaborations—aiming to make shooting sports a mainstream pursuit by 2030. We believe in nurturing a global community that thrives on precision, discipline, and shared excellence.
                  </p>
                </div>
              </div>

              {/* Mission */}
              <div className="lg:flex lg:items-start lg:justify-between lg:space-x-8">
                <h2 className="mb-6 text-xl font-bold uppercase lg:mb-0 lg:text-7xl">
                  Mission
                </h2>
                <div className="text-lg leading-relaxed lg:w-1/2 text-justify force-white-text">
                  <p className="mb-4">
                    Our mission is to build a thriving ecosystem for sports shooting by bringing together all key stakeholders—shooters, coaches, range operators, manufacturers, media professionals, and fans—under one unified digital and physical platform. Through our cutting-edge website, mobile applications, and on-ground initiatives, we aim to:
                  </p>
                  <ul className="list-none space-y-4">
                    <li className="flex items-start">
                      <span className="text-blue-700 mr-2">●</span>
                      <span className="text-justify">Promote awareness and participation in shooting sports across India and the world.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-700 mr-2">●</span>
                      <span className="text-justify">Identify and nurture young talent while establishing world-class infrastructure and centers of excellence in every region.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-700 mr-2">●</span>
                      <span className="text-justify">Drive professional development through competitions, training, and data-driven talent management.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-700 mr-2">●</span>
                      <span className="text-justify">Facilitate the growth of indigenous manufacturing for top-tier shooting equipment, supporting the Make-in-India initiative.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">
                Our Core Values
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                  <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-blue-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-4">Safety</h3>
                  <p className="text-gray-700">
                    We prioritize safety above all else, implementing rigorous
                    protocols and standards at all our events and training
                    programs to ensure a secure environment for participants and
                    spectators alike.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                  <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-blue-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-4">Inclusivity</h3>
                  <p className="text-gray-700">
                    We believe that shooting sports should be accessible to all,
                    regardless of background, gender, or ability. Our programs
                    and competitions are designed to welcome and support diverse
                    participation.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                  <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-blue-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-4">Excellence</h3>
                  <p className="text-gray-700">
                    We strive for excellence in everything we do, from the
                    organization of our events to the development of our
                    athletes. We set high standards and continuously work to
                    exceed them.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                  <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-blue-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-4">Value Proposition</h3>
                  <p className="text-gray-700">
                    At Global Shooting League (GSL), we offer a unified platform that elevates every dimension of the shooting sports ecosystem—from grassroots talent to elite competition. By combining technology, community, and strategic storytelling, we provide a space where shooters, coaches, ranges, manufacturers, and fans can connect, collaborate, and grow.
GSL stands apart by delivering:<br></br>
●	Digital Empowerment: Seamless access to global rankings, athlete data, events, training resources, and eMagazine features—all in one interactive platform.<br></br>
●	Talent Discovery & Development: A spotlight for emerging shooters and a support system for career advancement through structured competitions and mentorship.<br></br>
●	Infrastructure Integration: Tools and technology that link ranges, coaching centres, and manufacturers into a scalable, accessible network.<br></br>
●	Media & Visibility: High-impact storytelling, real-time event coverage, and multimedia campaigns that boost visibility and credibility for all stakeholders.<br></br>
●	Community-Led Innovation: A future-forward approach to promoting shooting sports by engaging voices from across the spectrum and championing local-to-global collaboration.<br></br>
GSL is more than a league—it's a movement that transforms how the world sees, experiences, and supports shooting sports.

                  </p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                  <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-blue-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-4">Our Culture</h3>
                  <p className="text-gray-700">
                    At Global Shooting League (GSL), our culture is built on the foundation of precision, integrity, and innovation—reflecting the very essence of shooting sports. We are a purpose-driven organization with a deep commitment to excellence, collaboration, and inclusivity. Whether it's behind the range or behind the screen, we operate with a shared vision: to uplift the shooting community and redefine how the sport is experienced, perceived, and celebrated.
We are not just administrators or content creators—we are enthusiasts, athletes, strategists, and visionaries working together to bring value to every stakeholder. From shooters and coaches to industry leaders and sport developers, our culture embraces diversity in thought, background, and expertise. We celebrate focus and discipline, encourage bold ideas, and believe in empowering individuals to take ownership of the mission.

                  </p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                  <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-blue-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-4">Governance Policy</h3>
                  <p className="text-gray-700">
                    GSL upholds the highest standards of transparency, ethics, and accountability. Our governance framework is designed to ensure fair decision-making, inclusive representation, and responsible leadership. We are guided by a structured code of conduct, conflict-of-interest protocols, and a clear operational charter that aligns with our values and long-term vision.
Our policies support data privacy, athlete welfare, and equal opportunity across all programs and partnerships. We actively engage with advisors, legal experts, and sport authorities to ensure our systems and practices are compliant, ethical, and future-ready.

                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Leadership Team */}
          <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">
                Our Leadership Team
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="mb-4 relative">
                    <img
                      src="/images/Col. Prem.jpg"
                      alt="Col. Prem Rajpurohit"
                      className="w-40 h-40 rounded-full mx-auto"
                    />
                  </div>
                  <h3 className="text-xl font-bold">Col. Prem Rajpurohit</h3>
                  <p className="text-blue-700 mb-2"></p>
                  <p className="text-gray-600 text-sm text-justify">
                    With over three decades of distinguished service in the Indian Army, I've lived a life defined by discipline, endurance, and an unwavering love for sport. From the rugged terrains of the Himalayas to bustling cantonments across the country, I've remained a lifelong sportsman at heart. Whether it's hockey, football, golf, shooting, swimming, cycling, mountaineering, or running—you'll find me not just supporting the game but playing it with passion. Fitness isn't a routine; it's a way of life, and I don't end a day without a workout.
Shooting, in particular, has always held a special place for me. As a qualified armament instructor and coach, I bring a deep, hands-on understanding of the sport's ecosystem—both from a technical and strategic perspective. My experience has given me insights into the broader dynamics of sports shooting, and I firmly believe that with the right vision and collaboration, the sport is poised for transformative growth at the global level.
My vision for shooting goes beyond medals and podiums. I aim to democratize access to the sport by integrating affordable technology that reduces barriers to entry and makes shooting more inclusive for enthusiasts across the country. As a serial entrepreneur and a firm believer in purposeful innovation, I'm committed to building systems that empower athletes, coaches, and communities alike.
My journey—from soldier to sportsman to strategist—speaks for itself. And if there's one thing I know, it's that sport, much like service, is a calling. And mine is far from over.

                  </p>
                </div>

                <div className="text-center">
                  <div className="mb-4">
                    <img
                      src="/images/AvnishPandey.jpg"
                      alt="Mr Anvesh Pandey "
                      className="w-40 h-40 rounded-full mx-auto"
                    />
                  </div>
                  <h3 className="text-xl font-bold">Mr Anvesh Pandey</h3>
                  <p className="text-blue-700 mb-2"></p>
                  <p className="text-gray-600 text-sm text-justify">
                    Driven by a deep passion for sports and a growing admiration for shooting, I've found meaning in capturing impactful moments—both on the range and beyond. My journey with platforms like the Global Shooting League (GSL) and Shooters' Scope Magazine revolves around blending action with insight, where storytelling, stats, and strategic thinking spotlight a sport grounded in precision and discipline.

With a background in business development and digital content, I've focused on creating narratives that do more than inform—they inspire and elevate. From highlighting emerging athletes and showcasing local ranges to developing campaigns that cross borders, my goal is to make shooting more visible, engaging, and globally appreciated—especially through compelling short-form and multimedia content.

In a sport that values stillness, timing, and sharp execution, I believe our stories should reflect the same clarity and impact. From reels to rankings, my mission is to produce content with purpose—and help this sport reach new audiences, one powerful frame at a time.

Alongside my work in sports, I bring over 17 years of leadership experience in the banking and investment industry. I am a SEBI-registered Investment Advisor, certified by CIEL (Centre for Investment Education & Learning), with additional certifications from NISMand AMFI. Currently pursuing a Ph.D. in Cloud Funding, I'm passionate about merging financial strategy with sports innovation—empowering grassroots ranges, emerging talent, and tech-driven ventures through sustainable, well-structured funding ecosystems.

                  </p>
                </div>

                <div className="text-center">
                  <div className="mb-4">
                    <img
                      src="/images/Pravashsir.png"
                      alt="James Wilson"
                      className="w-40 h-40 rounded-full mx-auto"
                    />
                  </div>
                  <h3 className="text-xl font-bold">Mr. Pravash Dey</h3>
                  <p className="text-blue-700 mb-2"></p>
                  <p className="text-gray-600 text-sm text-justify">
                    Fuelled by a deep love for sports and an ever-growing respect for shooting, I've found purpose in capturing the sharpest moments, both in competition and behind the scenes. My journey with platforms like the Global Shooting League (GSL) and Shooters' Scope Magazine has been all about blending performance with perspective—where short stories, stats, and strategy come together to spotlight a sport defined by focus and finesse.
With a background in business development and digital content, I've worked on building narratives that don't just inform—they inspire. Whether it's promoting up-and-coming athletes, driving visibility for local ranges, or shaping campaigns that resonate across borders, my aim is simple: make shooting more accessible, exciting, and relatable to a global audience—especially through formats that are fast, visual, and story-driven.
In a sport that values every breath, every pause, and every trigger pull, I believe the same precision should reflect in the way we tell its stories. From reels to rankings, I'm here to shoot content with purpose—and help the sport reach new targets, one short at a time.
I'm also committed to building a SportsTech platform from Bharat for the world—one that blends Technology, Transparency, Talent, and Trust. With a vision to Inspire, Invest, and Impact, I believe in using innovation to amplify the voices of our sports community and shape a future where stories, athletes, and opportunities travel far beyond borders

                  </p>
                </div>

                <div className="text-center">
                  <div className="mb-4">
                    <img
                      src="/images/ZoyaKhan.jpg"
                      alt="Aisha Rahman"
                      className="w-40 h-40 rounded-full mx-auto"
                    />
                  </div>
                  <h3 className="text-xl font-bold">Ms. Zoya Khan</h3>
                  <p className="text-blue-700 mb-2"></p>
                  <p className="text-gray-600 text-sm text-justify">
                    As a dedicated sports enthusiast with a strong inclination towards shooting sports, I've always believed in the power of sport to inspire, unite, and transform lives. My journey in the sports ecosystem has been driven by a passion to create meaningful impact—both on and off the field. Currently contributing to initiatives like the Global Shooting League (GSL) and Shooters' Scope Magazine, I work at the intersection of sport, storytelling, and strategy.

With a background in business development and marketing, I focus on promoting shooting as a sport that combines mental strength, precision, and discipline. I've been involved in creating platforms that spotlight emerging talent, enhance visibility for shooting ranges, and foster global collaborations. My goal is to bridge the gap between grassroots and elite-level shooting by building strong networks, celebrating athlete journeys, and driving engagement through powerful narratives.

Whether it's curating content, connecting with stakeholders, or helping shape the future of shooting sports, I'm committed to being part of a community that values focus, resilience, and excellence.

                  </p>
                </div>


                              <div className="text-center">
  <div className="mb-4">
    <img
      src="/images/AsthaBisht.jpg"
      alt="Ms. Astha Bisht"
      className="w-40 h-40 rounded-full mx-auto"
    />
  </div>
  <h3 className="text-xl font-bold">Ms. Astha Bisht</h3>
  <p className="text-blue-700 mb-2"></p>
  <p className="text-gray-600 text-sm text-justify">
    Fuelled by a passion for sports and a keen eye for detail, I've found my calling at the intersection of research, data, and the dynamic world of shooting sports. My journey with the Global Shooting League (GSL) and Shooters' Scope Magazine has been rooted in a mission to go beyond the surface—gathering insights, understanding trends, and bringing athlete stories to life through evidence-based narratives.
    With a strong interest in sports data analytics and performance metrics, I focus on collecting and analysing information that helps spotlight emerging talent, assess infrastructure gaps, and shape more informed conversations around shooting sports. From interviewing shooters and documenting training routines, to tracking rankings and selection processes, my work helps build a foundation of credibility and clarity in a sport that thrives on precision.
    For me, shooting isn't just about pulling the trigger—it's about what goes on behind the scenes: the preparation, the psychology, the stats, and the silent resilience. Through strategic storytelling and research-backed features, I aim to contribute to a platform that not only informs, but inspires the entire shooting community to grow together, grounded in data and driven by purpose.
  </p>
</div>

<div className="text-center">
  <div className="mb-4">
    <img
      src="/images/EshaJamwal.jpg"
      alt="Ms. Esha Jamwal"
      className="w-40 h-40 rounded-full mx-auto"
    />
  </div>
  <h3 className="text-xl font-bold">Ms. Esha Jamwal</h3>
  <p className="text-blue-700 mb-2"></p>
  <p className="text-gray-600 text-sm text-justify">
    My journey into the world of shooting sports has been a creative adventure shaped by instinct, storytelling, and a deep respect for the athletes who live and breathe precision. With a background in content strategy and visual communication, I've found my space at the intersection of sport and storytelling—where every image, every word, and every moment has the power to connect and inspire.
    At the Global Shooting League (GSL) and Shooters' Scope Magazine, I lead projects that go beyond traditional coverage. Whether it's building athlete-focused campaigns, developing visual narratives, or curating stories that highlight the unseen side of the sport, I strive to bring authenticity and impact to everything I do. I love crafting experiences that aren't just informative—they're memorable.
    For me, shooting is more than just competition; it's a world full of silent discipline, personal triumphs, and untold stories waiting to be shared. My goal is to spotlight that world through a creative lens—celebrating the people, the process, and the passion that define this sport in its purest form.
  </p>
</div>



              </div>
              
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-blue-700 text-white">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-6">
                Join the Global Shooting League Community
              </h2>
              <p className="text-xl mb-8">
                Whether you're an experienced shooter or just getting started,
                there's a place for you in our global community.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/signup">
                  <button className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-3 rounded-full font-bold text-lg">
                    Sign Up Today
                  </button>
                </Link>
              </div>
            </div>
          </section>
        </main>
      </Layout>
    </div>
  );
}
