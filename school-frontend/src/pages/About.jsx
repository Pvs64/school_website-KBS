import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Target,
  HeartHandshake,
  Sparkles,
  Users,
  ShieldCheck,
  Shield,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  Star,
  Award,
  Globe,
  Lightbulb,
  TrendingUp,
} from "lucide-react";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

const slideInFromLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

const slideInFromRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

const coreValues = [
  {
    title: "Academic Excellence",
    description: "We strive for the highest standards in education, encouraging students to achieve their full potential through innovative teaching and a strong curriculum.",
    icon: <BookOpen size={24} />,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    stats: "95%",
    statsLabel: "Pass Rate"
  },
  {
    title: "Holistic Development",
    description: "We focus on intellectual, emotional, social, physical and spiritual growth to nurture well‑balanced individuals.",
    icon: <Users size={24} />,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    stats: "50+",
    statsLabel: "Activities"
  },
  {
    title: "Character Building",
    description: "We instill strong moral values, ethics and leadership qualities to shape responsible citizens and future leaders.",
    icon: <HeartHandshake size={24} />,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    stats: "100+",
    statsLabel: "Leaders"
  },
  {
    title: "Innovation & Creativity",
    description: "We encourage creative thinking, problem‑solving and innovative approaches to learning through modern practices.",
    icon: <Sparkles size={24} />,
    color: "from-amber-500 to-amber-600",
    bgColor: "bg-amber-50",
    stats: "5+",
    statsLabel: "Innovation Labs"
  },
];

const stats = [
  { value: "8000+", label: "Students Passed", icon: <Users className="w-5 h-5" /> },
  { value: "20+", label: "Faculty", icon: <Award className="w-5 h-5" /> },
  { value: "18+", label: "Years Experience", icon: <Star className="w-5 h-5" /> },
  { value: "50+", label: "Awards", icon: <TrendingUp className="w-5 h-5" /> },
];

const leadershipMessages = [
  {
    role: "Manager's Message",
    name: "Mr.Manish Vardhan Singh",
    photo: "/images/manager.jpg",
    align: "left",
    message: "At KBS Public School, our constant endeavor is to create an environment where every child feels valued, supported and inspired to excel. We believe in partnering with parents to ensure our students receive the best possible education and character formation.",
    qualifications: "Ph.D. in Education, 20+ Years Experience"
  },
  {
    role: "Chairperson's Message",
    name: "Name",
    photo: "/images/chairperson.jpg",
    align: "right",
    message: "Our vision is to build an institution that stands for integrity, excellence and compassion. We are committed to providing world‑class infrastructure, a safe environment and opportunities that prepare students for the challenges of tomorrow.",
    qualifications: "MBA, Education Visionary"
  },
  {
    role: "Principal's Message",
    name: "Ms. Saroj Singh",
    photo: "/images/principal.jpg",
    align: "left",
    message: "Education at KBS Public School goes beyond textbooks. We focus on life skills, values and holistic development so that every child who walks through our gates leaves as a confident, responsible and compassionate individual.",
    qualifications: "M.Ed., 15+ Years Leadership"
  },
];

const committees = [
  {
    name: "Disciplinary Committee",
    icon: <ShieldCheck size={22} />,
    purpose: "Maintaining discipline and fostering a positive school environment.",
    teachers: ["Mrs. Anjali Mehta", "Mr. Rajesh Kumar"],
    responsibilities: [
      "Maintenance of discipline in the school environment.",
      "Ensuring students obey rules and regulations.",
      "Maintaining order, harmony and peaceful learning atmosphere.",
      "Facilitating personality and leadership development.",
      "Promoting and encouraging good behavior.",
    ],
    features: [
      "Rule enforcement and compliance monitoring.",
      "Character building and leadership programmes.",
      "Conflict resolution and mediation.",
      "Behavioral improvement initiatives.",
    ],
    scope: "All students, staff and school community members.",
    color: "border-blue-200 hover:border-blue-400"
  },
  {
    name: "POCSO Committee",
    icon: <Shield size={22} />,
    purpose: "Protecting children from sexual offences in compliance with POCSO Act 2012.",
    teachers: ["Ms. Neha Singh", "Dr. Arjun Patel"],
    responsibilities: [
      "Ensuring education in a safe and protective environment.",
      "Creating awareness about gender sensitivity and abuse prevention.",
      "Building synergy among parents, teachers and administration.",
      "Ensuring compliance with POCSO Act 2012.",
      "Taking appropriate action on reported cases.",
    ],
    features: [
      "Sexual abuse prevention and awareness.",
      "Safe environment creation.",
      "Immediate response protocols.",
      "Parent and teacher education programs.",
    ],
    scope: "All children irrespective of gender, caste or creed.",
    color: "border-purple-200 hover:border-purple-400"
  },
  {
    name: "Child Protection Committee",
    icon: <AlertTriangle size={22} />,
    purpose: "Dealing sensitively with cases related to child protection and abuse.",
    teachers: ["Mrs. Sunita Reddy", "Mr. Vikram Joshi"],
    responsibilities: [
      "Handling cases of child sexual abuse with confidentiality.",
      "Ensuring policies apply to teaching and non‑teaching staff.",
      "Including drivers, aayas, conductors and housekeeping staff.",
      "Processing parent complaints through proper channels.",
      "Ensuring comprehensive child protection protocols.",
    ],
    features: [
      "Confidential complaint handling.",
      "Comprehensive staff coverage.",
      "Clear parent communication channels.",
      "Professional investigation procedures.",
    ],
    scope: "All staff members and school community.",
    color: "border-amber-200 hover:border-amber-400"
  },
  {
    name: "Safety Action Committee",
    icon: <CheckCircle size={22} />,
    purpose: "Ensuring safety, emergency preparedness and risk management across campus.",
    teachers: ["Mr. Amit Sharma", "Mrs. Priya Nair"],
    responsibilities: [
      "Ensuring a safe and protective educational environment.",
      "Creating conditions for overall child development.",
      "Building awareness about safety challenges and prevention.",
      "Coordinating emergency response and safety drills.",
      "Conducting regular safety audits and improvements.",
    ],
    features: [
      "Emergency response planning.",
      "Safety audit and compliance.",
      "Risk assessment and mitigation.",
      "Safety training and awareness programmes.",
    ],
    scope: "Entire school premises and all activities.",
    color: "border-green-200 hover:border-green-400"
  },
];

const About = () => {
  const heroRef = useRef(null);
  const missionRef = useRef(null);
  const valuesRef = useRef(null);
  const leadersRef = useRef(null);
  const committeesRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true });
  const isMissionInView = useInView(missionRef, { once: true });
  const isValuesInView = useInView(valuesRef, { once: true });
  const isLeadersInView = useInView(leadersRef, { once: true });
  const isCommitteesInView = useInView(committeesRef, { once: true });

  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  const [hoveredValue, setHoveredValue] = useState(null);
  const [activeCommittee, setActiveCommittee] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-500"></div>
      </div>

      {/* Hero Section with Parallax */}
      <motion.section 
        ref={heroRef}
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="relative overflow-hidden bg-gradient-to-r from-blue-800 via-blue-700 to-purple-800 text-white py-16 md:py-24"
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="container relative mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex flex-wrap items-center gap-8"
          >
            <div className="flex-1 min-w-[260px]">
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 }}
                className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-200 mb-2"
              >
                About KBS Public School
              </motion.p>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight"
              >
                Nurturing Futures with{" "}
                <span className="bg-gradient-to-r from-yellow-300 to-amber-400 bg-clip-text text-transparent">
                  Values & Excellence
                </span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
                className="text-base md:text-lg text-blue-100 max-w-2xl mb-8"
              >
                KBS Public School is dedicated to providing quality education that
                blends academic rigor with values, discipline and holistic growth
                in a safe and caring environment.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  to="/admissions"
                  className="group inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 text-sm font-semibold hover:from-yellow-500 hover:to-amber-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
                >
                  Explore Admissions
                  <ArrowLeft className="ml-2 rotate-180 group-hover:translate-x-1 transition-transform" size={18} />
                </Link>
                <Link
                  to="/contact"
                  className="group inline-flex items-center px-6 py-3 rounded-xl border-2 border-white/30 text-white text-sm font-semibold hover:border-white/60 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Contact Us
                  <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </Link>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
              className="flex-1 min-w-[260px]"
            >
              <div className="bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur-xl shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mr-3">
                    <Lightbulb size={20} className="text-white" />
                  </div>
                  <p className="text-sm uppercase tracking-[0.2em] text-blue-100">
                    Quick Facts
                  </p>
                </div>
                <ul className="space-y-3 text-sm text-blue-50">
                  {stats.map((stat, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="flex items-center"
                    >
                      <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-3">
                        {stat.icon}
                      </span>
                      <span className="font-bold text-lg mr-2">{stat.value}</span>
                      <span>{stat.label}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Mission & Vision with Enhanced Animation */}
      <section ref={missionRef} className="py-16 md:py-24 bg-gradient-to-b from-slate-50 via-white to-slate-100 relative">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isMissionInView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 gap-8 md:gap-12 items-start"
          >
            <motion.div variants={fadeInUp} className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition duration-500"></div>
              <div className="relative bg-white rounded-2xl shadow-xl border border-slate-100 p-8 md:p-10 transform hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <motion.span 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg mr-4"
                  >
                    <Target size={24} />
                  </motion.span>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Our Mission</h2>
                </div>
                <p className="text-slate-700 text-base md:text-lg leading-relaxed">
                  To provide quality education that nurtures intellectual curiosity,
                  develops critical thinking, and instills strong moral values. We are
                  committed to creating global citizens who are academically excellent,
                  socially responsible, and culturally rooted.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition duration-500"></div>
              <div className="relative bg-white rounded-2xl shadow-xl border border-slate-100 p-8 md:p-10 transform hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <motion.span 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg mr-4"
                  >
                    <Sparkles size={24} />
                  </motion.span>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Our Vision</h2>
                </div>
                <p className="text-slate-700 text-base md:text-lg leading-relaxed">
                  To be the most preferred educational institution that empowers students
                  to become confident, compassionate and capable individuals, ready to
                  face the challenges of the 21st century while contributing positively
                  to society and the nation.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Core Values with Interactive Cards */}
      <section ref={valuesRef} className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-blue-500 mb-3">
              Our Pillars of Education
            </p>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Core Values That Define Us
            </h2>
            <p className="text-base md:text-lg text-slate-600">
              The foundation upon which we build futures
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isValuesInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ scale: 1.05 }}
                onMouseEnter={() => setHoveredValue(index)}
                onMouseLeave={() => setHoveredValue(null)}
                className={`relative ${value.bgColor} rounded-2xl p-6 border border-slate-200 shadow-lg transform transition-all duration-300 ${hoveredValue === index ? 'shadow-xl' : ''}`}
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-10 transition duration-300`}></div>
                <div className="relative">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${value.color} text-white shadow-lg mb-6 transform ${hoveredValue === index ? 'rotate-12' : ''} transition duration-300`}>
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                  <p className="text-slate-600 mb-4 text-sm leading-relaxed">{value.description}</p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200">
                    <div className="text-left">
                      <div className="text-2xl font-bold text-slate-900">{value.stats}</div>
                      <div className="text-xs text-slate-500">{value.statsLabel}</div>
                    </div>
                    <motion.div
                      animate={hoveredValue === index ? { x: 5 } : { x: 0 }}
                      className="text-slate-400"
                    >
                      <ChevronRight size={20} />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Leadership Messages with Enhanced Styling */}
      <section ref={leadersRef} className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isLeadersInView ? { opacity: 1, y: 0 } : {}}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-blue-500">
              Leadership Insights
            </p>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-slate-900">
              Guiding Minds Behind The Institution
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Experience and vision that shapes our educational journey
            </p>
          </motion.div>

          <div className="space-y-8">
            {leadershipMessages.map((person, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: person.align === "right" ? 50 : -50 }}
                animate={isLeadersInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className={`relative group ${person.align === "right" ? "md:pr-8" : "md:pl-8"}`}
              >
                <div className={`bg-white rounded-2xl shadow-lg border border-slate-100 p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8 ${
                  person.align === "right" ? "md:flex-row-reverse" : ""
                } transform hover:-translate-y-1 transition-all duration-300`}>
                  {/* Photo with Glow Effect */}
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${person.align === "right" ? "from-purple-500 to-blue-500" : "from-blue-500 to-purple-500"} rounded-2xl blur-md opacity-0 group-hover:opacity-60 transition duration-500`}></div>
                    <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-slate-100 flex-shrink-0">
                      <img
                        src={person.photo}
                        alt={person.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face";
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <div className={`w-3 h-10 rounded-full ${person.align === "right" ? "bg-purple-500" : "bg-blue-500"} mr-3`}></div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        {person.role}
                      </p>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">
                      {person.name}
                    </h3>
                    <p className="text-sm text-blue-600 mb-4 font-medium">
                      {person.qualifications}
                    </p>
                    <p className="text-slate-600 leading-relaxed text-base">
                      {person.message}
                    </p>
                    <div className="mt-6 flex items-center text-sm text-slate-500">
                      <Globe size={16} className="mr-2" />
                      <span>Leading Education Since 1998</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Committees with Interactive Cards */}
      <section ref={committeesRef} className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isCommitteesInView ? { opacity: 1, y: 0 } : {}}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-blue-500">
              Our Committee Structure
            </p>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-slate-900">
              Ensuring Safety, Welfare & Academic Excellence
            </h2>
            <p className="mt-4 text-base text-slate-600 max-w-2xl mx-auto">
              Dedicated committees working together to maintain discipline, safety, and child protection across our campus
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isCommitteesInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {committees.map((c, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                onMouseEnter={() => setActiveCommittee(index)}
                onMouseLeave={() => setActiveCommittee(null)}
                className={`bg-white rounded-2xl shadow-lg border-2 ${c.color} p-6 transform transition-all duration-300 hover:shadow-xl`}
              >
                <div className="flex items-start mb-4">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${activeCommittee === index ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white' : 'bg-blue-50 text-blue-600'} shadow-md mr-4 transition-all duration-300`}>
                    {c.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-slate-900">
                      {c.name}
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">
                      <span className="font-semibold">Teacher In‑charge: </span>
                      <span className="text-blue-600">{c.teachers.join(", ")}</span>
                    </p>
                  </div>
                </div>

                <p className="text-sm text-slate-700 mb-4 leading-relaxed">
                  <span className="font-semibold">Purpose: </span>
                  {c.purpose}
                </p>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center mb-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                      <p className="text-xs font-semibold uppercase text-slate-500">
                        Key Responsibilities
                      </p>
                    </div>
                    <ul className="space-y-1.5 text-sm text-slate-600">
                      {c.responsibilities.map((r, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-blue-500 mr-2 mt-1">•</span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center mb-2">
                      <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                      <p className="text-xs font-semibold uppercase text-slate-500">
                        Key Features
                      </p>
                    </div>
                    <ul className="space-y-1.5 text-sm text-slate-600">
                      {c.features.map((f, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-purple-500 mr-2 mt-1">•</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <p className="text-xs md:text-sm text-slate-500 font-medium">
                    <span className="font-bold">Scope: </span>
                    {c.scope}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-16 md:py-24 bg-gradient-to-r from-blue-800 to-purple-800 text-white"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Our Community of Learners
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              Discover how KBS Public School can help shape your child's future
              with excellence, values, and holistic development.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/admissions"
                className="group inline-flex items-center px-8 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 font-semibold hover:from-yellow-500 hover:to-amber-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
              >
                Apply Now
                <ArrowLeft className="ml-2 rotate-180 group-hover:translate-x-2 transition-transform" size={20} />
              </Link>
              <Link
                to="/contact"
                className="group inline-flex items-center px-8 py-3 rounded-xl border-2 border-white/30 text-white font-semibold hover:border-white/60 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1"
              >
                Schedule a Visit
                <ChevronRight className="ml-2 group-hover:translate-x-2 transition-transform" size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;