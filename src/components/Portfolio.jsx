import React, { useState,useEffect } from 'react';
import axios from "axios";
import { GithubIcon, LinkedinIcon, MailIcon, PhoneIcon, ExternalLinkIcon, X, Menu } from 'lucide-react';

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  const [ipAddress, setIpAddress] = useState("");
  const [ipDetails, setIpDetails] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "6a42855a14594143d37319dab03d594b";

  const [visitCount, setVisitCount] = useState(0);
const [initialized, setInitialized] = useState(false); 

const fetchVisitCount = async () => {
  try {
    const response = await axios.get('https://visitcount-3yc4.onrender.com/api/visitCount');
    setVisitCount(response.data.visitCount);
    setInitialized(true); 
  } catch (error) {
    console.error('Error fetching visit count:', error);
  }
};

const incrementVisitCount = async () => {
  try {
    await axios.post('https://visitcount-3yc4.onrender.com/api/incrementVisit', { count: visitCount + 1 });
  } catch (error) {
    console.error('Error updating visit count:', error);
  }
};

useEffect(() => {
  fetchVisitCount();
}, []);

useEffect(() => {
  if (initialized) { 
    incrementVisitCount();
  }
}, [initialized, visitCount]);



  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const response = await axios.get("https://api.ipify.org?format=json");
        setIpAddress(response.data.ip);
      } catch (err) {
        setError("Error fetching IP address: " + err.message);
      }
    };

    fetchIpAddress();
  }, []);

  useEffect(() => {
    if (ipAddress) {

      const fetchIpDetails = async () => {
        try {
          const response = await axios.get(
            `http://api.ipstack.com/${ipAddress}?access_key=${API_KEY}`
          );
          setIpDetails(response.data);
        } catch (err) {
          setError("Error fetching IP details: " + err.message);
        }
      };

      fetchIpDetails();
    }
  }, [ipAddress, API_KEY]);

  console.log("details"+ ipDetails)

  


  const skills = {
    'Backend': ['JavaScript', 'NodeJs', 'ExpressJs', 'Object Oriented Programming', 'Distributed Systems'],
    'Frontend': ['React', 'Typescript', 'JavaScript', 'CSS', 'HTML', 'NextJs'],
    'Databases': ['MongoDb','Sql','DynamoDB'],
    'Cloud (AWS)': ['Docker','Terraform', 'Lambda', 'Ansible', 'CI/CD', 'Cloudwatch']
  };

  const projects = [
    {
      title: "Stayfidr - Room Booking Website",
      description: [
        "Developed a comprehensive room booking platform inspired by Booking.com using the MERN stack (MongoDB, Express.js, React.js, Node.js).",
        "Designed and implemented user-friendly features, including room search, filtering, booking confirmation, and real-time updates.",
        "Integrated Stripe API for seamless and secure payment processing.",
        "Optimized the application for performance, ensuring a smooth user experience across all devices.",
        "Built RESTful APIs for mood logging and retrieval operations with proper error handling and validation",
        "Deployed the platform on Render, ensuring scalability and reliability for production usage"
      ],
      technologies: ["React", "Node.js", "Express", "TypeScript", "MongoDB"],
      links: [
        { url: "https://github.com/Sumitrazz/StayFindr-Room_Booking_Website", label: "Repository", icon: "github" },
      ]
    },
    {
      title: "StudyApp - Naan Mudhalvan Project",
      description: [
        "Led a team of 4 to develop the backend of a comprehensive study application aimed at enhancing student learning and resource management.",
        "Designed and implemented features like course management, notes sharing, and interactive study resources.",
        "Ensured smooth integration between the frontend and backend to provide a seamless user experience",
        "Deployed the application and managed the backend infrastructure to ensure scalability and security"
      ],
      technologies: ["React", "Node.js", "Express", "JavaScript", "MongoDB"],
      links: [
        { url: "https://github.com/Sumitrazz/StayFindr-Room_Booking_Website", label: "Repository", icon: "github" },
      ]
    },
    {
      title: "CodePen",
      description: [
        "Built projects demonstrating responsive layouts, animations, and custom UI components using HTML, CSS, and JavaScript",
        "Run live code demos directly on the platform using JavaScript, as well as experimenting with Java, C, and Python for various coding challenges.",
        "Deployed selected projects using Docker and DockerHub for containerization and sharing across environments.",
        "Automated infrastructure and deployments to AWS using Terraform, ensuring scalable and reliable cloud infrastructure.",
      ],
      technologies: ["Docker","DockerHub", "Terraform", "AWS", "React", "S3"],
      links: [
        { url: "https://github.com/Sumitrazz/CodePen", label: "Repository", icon: "github" }
      ]
    },
    {
      title: "Zoom Clone - Video Conferencing Application",
      description: [
      "Built a video conferencing platform inspired by Zoom using Next.js, incorporating real-time video and chat features.",
      "Implemented user authentication, meeting scheduling, and dynamic room creation for seamless user experiences.",
      "Utilized WebRTC for real-time media streaming and Socket.IO for efficient communication between users.",
      "Deployed the application on a scalable cloud environment using Docker, DockerHub, and Terraform.",
      ],
      technologies: ["NextJs", "Node.js", "Express", "Socket.IO", "clerk", "TypeScript"],
      links: [
        { url: "https://github.com/Sumitrazz/Zoom_NextJs", label: "Frontend Repository", icon: "github" },
      ]
    }
  ];

  const ProjectLinks = ({ links }) => {
    return (
      <div className="flex gap-3 flex-wrap">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1 text-sm rounded-md bg-zinc-700 hover:bg-zinc-600 text-zinc-100 transition-colors"
          >
            {link.icon === 'github' ? (
              <GithubIcon size={16} />
            ) : (
              <ExternalLinkIcon size={16} />
            )}
            {link.label}
          </a>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-zinc-900 pb-16 relative">
      <header className="sticky top-0 z-50 bg-zinc-900 border-b border-zinc-800">
        <div className="max-w-5xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Sumit</h1>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <div className="flex gap-1 rounded-lg p-1">
                {['home', 'resume', 'projects', 'certification', 'contact',].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 px-4 rounded-md transition-colors capitalize ${activeTab === tab
                      ? 'bg-slate-700 text-white'
                      : 'text-zinc-400 hover:text-white'
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white hover:text-zinc-300"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 border-t border-zinc-800 pt-4">
              <div className="flex flex-col gap-2">
                {['home', 'resume', 'projects', 'contact', 'certification'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      setIsMenuOpen(false);
                    }}
                    className={`py-2 px-4 rounded-md transition-colors capitalize text-left ${activeTab === tab
                      ? 'bg-slate-700 text-white'
                      : 'text-zinc-400 hover:text-white'
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </nav>
          )}
        </div>
      </header>

      <main className="p-8">
        <div className="max-w-5xl mx-auto">

          {/* Home Tab Content */}
          {activeTab === 'home' && (
            <div className="max-w-3xl mx-auto space-y-8 py-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-48 h-48 rounded-full overflow-hidden bg-zinc-800 flex-shrink-0">
                  <img
                    src="https://github.com/sumitrazz.png"
                    alt="Sumit kumar"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="text-center md:text-left">
                  <h2 className="text-3xl font-bold text-white mb-2">Sumit kumar</h2>
                  <h3 className="text-xl text-gray-300 mb-4">Full Stack Developer</h3>
                  <div className="flex gap-4 justify-center md:justify-start">
                    <a href="mailto:s4sumit30@gmail.com" className="text-zinc-400 hover:text-sky-400">
                      <MailIcon size={20} />
                    </a>
                    <a href="https://www.linkedin.com/in/sumitrazz/" className="text-zinc-400 hover:text-sky-400">
                      <LinkedinIcon size={20} />
                    </a>
                    <a href="https://github.com/Sumitrazz" className="text-zinc-400 hover:text-sky-400">
                      <GithubIcon size={20} />
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
                <h3 className="text-xl font-bold text-white mb-4">About Me</h3>
                <p className="text-zinc-300 leading-relaxed">
                Motivated fresher and full-stack developer with expertise in MERN stack, Next.js, and SQL. Experienced in building scalable, user-friendly web applications like 'Stayfidr' and 'StudyApp.' Passionate about problem-solving and learning emerging technologies. Open to entry-level roles or internships to grow as a professional.
                </p>
                <div className="mt-6 space-y-2">
                  <p className="text-zinc-300">
                    <span className="text-zinc-200 font-bold">Location:</span> Chennai, India
                  </p>
                  <p className="text-zinc-300">
                    <span className="text-zinc-200 font-bold">Experience:</span> Fresher
                  </p>
                  <p className="text-zinc-300">
                    <span className="text-zinc-200 font-bold">Focus Areas:</span> Distributed Systems, Full Stack Development, Cloud Architecture
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Resume Tab Content */}
          {activeTab === 'resume' && (
            <div className="space-y-8 py-12">
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Skills</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(skills).map(([category, skillList]) => (
                    <div key={category} className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
                      <h3 className="text-xl font-bold text-white mb-4">{category}</h3>
                      <div className="flex flex-wrap gap-2">
                        {skillList.map((skill) => (
                          <span key={skill} className="px-3 py-1 bg-zinc-700 hover:bg-zinc-600 text-zinc-100 rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Experience</h2>

                {/* <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">Software Development Engineer II</h3>
                      <p className="text-gray-100">Amazon</p>
                    </div>
                    <p className="text-zinc-400">Oct 2021 - Present</p>
                  </div>
                  <ul className="list-disc list-inside text-zinc-200 space-y-2">
                    <li>Designed and implemented an Extract Transform Load system handling 100 million catalog items, reducing customer onboarding time from 7 days to 2 days.</li>
                    <li>Facilitated off-Amazon sellers’ utilization of Amazon Fulfillment services by designing and imple- menting orders, inventory and shipments module on SupplyChainPortal.
                    </li>
                    <li>Designed and implemented a framework for reducing registration failures in Amazon Multi-Channel Fulfillment business by 10% and improving seller registration time by 30%.</li>
                    <li>Developed Buy With Prime functionality for Amazon Merchants on Seller Central to reduce mer- chant friction and increase customer acquisition by 50%.</li>
                  </ul>
                </div> */}

                {/* <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">UI Intern</h3>
                      <p className="text-gray-100">Unicommerce</p>
                    </div>
                    <p className="text-zinc-400">Jan 2021 - Jun 2021</p>
                  </div>
                  <ul className="list-disc list-inside text-zinc-200 space-y-2">
                    <li>Migrated 5 crucial modules from Choona.js to React</li>
                    <li>Implemented Internationalization support and developed a PWA using Ionic</li>
                  </ul>
                </div> */}
              </section>



              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Education</h2>
                <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
                  <h3 className="text-xl font-bold text-white">Dhanalakshmi Srinivasan College of Engineering and Technology</h3>
                  <p className="text-gray-100">B.E in Computer science and Engineering</p>
                  <p className="text-zinc-400 mt-2">2021-2025</p>
                  <p className="text-zinc-300 mt-2">GPA: 7.8 / 10.00</p>
                </div>
              </section>
            </div>
          )}

          {/* Projects Tab Content */}
          {activeTab === 'projects' && (
            <div className="space-y-8 py-12">
              <h2 className="text-2xl font-bold text-white mb-6">Featured Projects</h2>
              {projects.map((project, index) => (
                <div key={index} className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                      <h3 className="text-xl font-bold text-white">{project.title}</h3>
                      <ProjectLinks links={project.links} />
                    </div>

                    <div className="text-zinc-300">
                      <ul className="list-disc list-inside text-zinc-200 space-y-2">
                        {project.description.map((description, idx) => (
                          <li key={idx}>{description}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-zinc-700 hover:bg-zinc-600 text-zinc-100 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Contact Tab Content */}
          {activeTab === 'contact' && (
            <div className="max-w-2xl mx-auto space-y-8 py-12">
              <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>

              <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
                <div className="space-y-6">
                  <a href="mailto:s4sumit30@gmail.com" className="flex items-center space-x-4 text-zinc-300 hover:text-sky-400 transition-colors">
                    <MailIcon size={24} />
                    <span>s4sumit30@gmail.com</span>
                  </a>

                  <a href="tel:9262758245" className="flex items-center space-x-4 text-zinc-300 hover:text-sky-400 transition-colors">
                    <PhoneIcon size={24} />
                    <span>+91 9262758245</span>
                  </a>

                  <a href="https://www.linkedin.com/in/sumitrazz/" className="flex items-center space-x-4 text-zinc-300 hover:text-sky-400 transition-colors">
                    <LinkedinIcon size={24} />
                    <span>LinkedIn</span>
                  </a>

                  <a href="https://github.com/sumitrazz" className="flex items-center space-x-4 text-zinc-300 hover:text-sky-400 transition-colors">
                    <GithubIcon size={24} />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'certification' && (
            <div className='text-zinc-100 font-bold flex justify-center items-center text-xl'>
              Coming Soon...
            </div>
          )}
        </div>
        <footer className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 z-50">
          <div className="max-w-5xl mx-auto px-8 py-4 flex justify-between items-center">
            <p className="text-zinc-400 text-sm">
              © {currentYear} Sumit kumar
            </p>
            <h1 className=' text-white'>Visit Count: {visitCount}</h1>
             {/* <p className=' text-white  hidden md:block'>IP Adreess: {ipAddress}</p> */}

            <div className="flex gap-4">
              <a href="mailto:s4sumit30@gmail.com" className="text-zinc-400 hover:text-sky-400 transition-colors">
                <MailIcon size={18} />
              </a>
              <a href="https://www.linkedin.com/in/sumitrazz/" className="text-zinc-400 hover:text-sky-400 transition-colors">
                <LinkedinIcon size={18} />
              </a>
              <a href="https://github.com/sumitrazz" className="text-zinc-400 hover:text-sky-400 transition-colors">
                <GithubIcon size={18} />
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Portfolio;