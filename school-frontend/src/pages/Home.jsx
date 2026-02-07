import { useState, useEffect, useRef } from "react";
import { getAnnouncements } from "../services/api";
import {
  CalendarDays,
  Users,
  Award,
  BookOpen,
  Globe,
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Sparkles,
  Flag,
} from "lucide-react";
import img101 from "../assets/images/image101.png";
import img102 from "../assets/images/image102.png";
import img103 from "../assets/images/image103.jpg";
import img104 from "../assets/images/image104.jpg";
import img105 from "../assets/images/your-image-2.jpg";
import img1 from "../assets/images/your-image-1.jpg";
import img10 from "../assets/images/image5.jpg";
import { Link, useNavigate } from "react-router-dom";

// NEW: framer-motion imports
import { motion, useInView } from "framer-motion";

const Home = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef(null);

  // NEW: refs for sections to trigger animations
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });

  const heroImages = [img101, img1, img103, img104, img105, img10];

  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Auto play functionality for hero carousel
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroImages.length);
      }, 10000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, heroImages.length]);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAnnouncements();

      if (response.data && response.data.data) {
        setAnnouncements(response.data.data);
      } else if (response.data && Array.isArray(response.data)) {
        setAnnouncements(response.data);
      } else {
        setAnnouncements([]);
      }
    } catch (err) {
      console.error("Error fetching announcements:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    if (isAutoPlaying) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroImages.length);
      }, 10000);
    }
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    if (isAutoPlaying) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroImages.length);
      }, 10000);
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    if (isAutoPlaying) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroImages.length);
      }, 10000);
    }
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  // Stats data
  const stats = [
    { icon: <Users size={32} />, value: "8000+", label: "Students Passed" },
    { icon: <Award size={32} />, value: "20+", label: "Faculty Members" },
    { icon: <GraduationCap size={32} />, value: "98%", label: "Pass Rate" },
    { icon: <Globe size={32} />, value: "18", label: "Years of Excellence" },
  ];

  // Quick links
  const quickLinks = [
    { title: "Admissions", description: "Join our community", link: "/admissions", color: "bg-blue-100 text-blue-800" },
    { title: "Academics", description: "Curriculum & Programs", link: "/academics", color: "bg-green-100 text-green-800" },
    { title: "Events Calendar", description: "Upcoming activities", link: "/events", color: "bg-purple-100 text-purple-800" },
    { title: "Teachers", description: "List of all teachers", link: "/teachers", color: "bg-orange-100 text-orange-800" },
  ];

  // Features
  const features = [
    {
      title: "Holistic Education",
      description: "Balancing academics with co-curricular activities",
      icon: <BookOpen size={24} />,
    },
    {
      title: "Modern Infrastructure",
      description: "State-of-the-art labs and digital classrooms",
      icon: <Award size={24} />,
    },
    {
      title: "Inclusive Environment",
      description: "A safe space where every student thrives.",
      icon: <Globe size={24} />,
    },
    {
      title: "Sports Excellence",
      description: "Professional coaching in 15+ sports disciplines",
      icon: <GraduationCap size={24} />,
    },
  ];

  // Amenities
  const amenities = [
    {
      title: "Sports",
      description: "Spacious grounds and facilities for multiple indoor & outdoor sports.",
      iconBg: "bg-green-500/15 text-green-400",
      accent: "from-green-500/20 via-emerald-500/15 to-cyan-500/20",
    },
    {
      title: "Sick Bay",
      description: "On-campus medical room for first aid and basic emergencies.",
      iconBg: "bg-rose-500/15 text-rose-400",
      accent: "from-rose-500/20 via-red-500/15 to-orange-500/20",
    },
    {
      title: "Transportation",
      description: "Safe and reliable school buses and vans covering key routes for students.",
      iconBg: "bg-sky-500/15 text-sky-400",
      accent: "from-sky-500/20 via-cyan-500/15 to-blue-500/20",
    },
    {
      title: "Security",
      description: "24/7 campus surveillance and controlled entry for student safety.",
      iconBg: "bg-indigo-500/15 text-indigo-400",
      accent: "from-indigo-500/20 via-blue-500/15 to-slate-500/20",
    },
    {
      title: "Canteen",
      description: "Hygienic canteen serving healthy, nutritious meals and snacks.",
      iconBg: "bg-amber-500/15 text-amber-400",
      accent: "from-amber-500/20 via-yellow-500/15 to-lime-500/20",
    },
    {
      title: "Generator",
      description: "Whole time light, fans and watercooler working.",
      iconBg: "bg-emerald-500/15 text-emerald-400",
      accent: "from-emerald-500/20 via-teal-500/15 to-green-500/20",
    },
  ];

  // COMMON VARIANTS

  const sectionFade = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.12, duration: 0.4 },
    },
  };

  const cardFadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Carousel */}
      <section ref={heroRef} className="relative h-[75vh] md:h-[85vh] overflow-hidden">
        {/* Background Images Carousel */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
                index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
            >
              <img
                src={image}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-900/50" />
              <div className="absolute top-10 left-6 md:left-10 w-24 h-24 md:w-32 md:h-32 bg-blue-500/10 rounded-full blur-2xl animate-pulse" />
              <div className="absolute bottom-8 right-6 md:bottom-10 md:right-10 w-32 h-32 md:w-40 md:h-40 bg-purple-500/10 rounded-full blur-2xl animate-pulse delay-1000" />
              <div className="absolute top-1/2 left-1/4 md:left-1/3 w-16 h-16 md:w-20 md:h-20 bg-yellow-500/10 rounded-full blur-xl animate-pulse delay-500" />
            </div>
          ))}
        </div>

        {/* Content Overlay with Framer Motion */}
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute top-4">
              <span className="block font-semibold text-yellow-300 animate-pulse-slow text-xs sm:text-sm md:text-base lg:text-lg">
                UDISE Code : 9281002502
              </span>
            </div>

            {/* Slide Indicator */}
            <motion.div
              className="mb-6 flex items-center space-x-2"
              initial={{ opacity: 0, y: 10 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-700 ${
                    index === currentSlide
                      ? "bg-yellow-400 w-8"
                      : "bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white/90 leading-tight"
            >
              Shaping Future
              <span className="block text-yellow-400 mt-2 animate-pulse-slow">
                Leaders Since 2007
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl leading-relaxed"
            >
              Enter a realm of inspired learning at KBS Public School, where education goes beyond
              classrooms to nurture a thriving community of learners, dreamers, and achievers.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/admissions"
                onClick={(e) => {
                  e.preventDefault();
                  goTo("/admissions");
                }}
                className="bg-gradient-to-r from-yellow-500 to-amber-500 text-gray-900 px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold hover:from-yellow-600 hover:to-amber-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/30 flex items-center group"
              >
                Start Your Journey
                <ArrowRight
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </Link>

              <Link
                to="/about"
                onClick={(e) => {
                  e.preventDefault();
                  goTo("/about");
                }}
                className="bg-transparent border-2 border-white/80 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 hover:scale-105"
              >
                Virtual Tour
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-20"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-20"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>

        {/* Auto Play Toggle */}
        <button
          onClick={toggleAutoPlay}
          className="absolute bottom-8 right-8 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-20"
          aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isAutoPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>

        {/* Slide Counter */}
        <div className="absolute bottom-8 left-8 text-white/80 text-sm bg-black/30 px-3 py-1 rounded-full z-20">
          {currentSlide + 1} / {heroImages.length}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      <motion.section
        className="py-12 md:py-16 bg-gradient-to-b from-slate-50 via-white to-slate-100"
        variants={sectionFade}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-500">
                Updates
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-1">
                Latest Announcements
              </h2>
              <p className="text-slate-600 mt-2 text-sm md:text-base">
                Stay updated with school news, events, and important notices.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-2 border-blue-200 border-t-blue-600" />
              <p className="mt-4 text-slate-600 text-sm md:text-base">
                Loading announcements...
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="bg-red-50 text-red-700 p-5 md:p-6 rounded-xl max-w-md mx-auto border border-red-100 shadow-sm">
                <p className="font-semibold">Error loading announcements</p>
                <p className="text-sm mt-2 break-words">{error}</p>
                <button
                  onClick={fetchAnnouncements}
                  className="mt-4 inline-flex items-center bg-red-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : announcements.length > 0 ? (
            <>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {announcements.slice(0, 3).map((announcement) => (
                  <motion.div
                    key={announcement._id || announcement.id}
                    variants={cardFadeUp}
                    className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white/90 shadow-[0_18px_35px_rgba(15,23,42,0.06)] hover:shadow-[0_22px_45px_rgba(37,99,235,0.18)] transition-all duration-300 hover:-translate-y-1.5"
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-sky-400 to-purple-500 opacity-70" />
                    <div className="p-5 md:p-6">
                      <div className="flex items-center mb-4 gap-2">
                        <span
                          className={`text-[10px] md:text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${
                            announcement.type === "news"
                              ? "bg-blue-100 text-blue-800"
                              : announcement.type === "event"
                              ? "bg-green-100 text-green-800"
                              : announcement.type === "holiday"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-slate-100 text-slate-800"
                          }`}
                        >
                          {announcement.type || "general"}
                        </span>
                        <span className="ml-auto text-slate-500 text-[11px] md:text-xs flex items-center">
                          <CalendarDays size={12} className="mr-1" />
                          {new Date(
                            announcement.publishedAt || announcement.createdAt
                          ).toLocaleDateString()}
                        </span>
                      </div>

                      <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-slate-900 line-clamp-2 group-hover:text-blue-700 transition-colors">
                        {announcement.title || "No Title"}
                      </h3>

                      <p className="text-slate-600 mb-3 md:mb-4 text-sm md:text-[15px] leading-relaxed line-clamp-3">
                        {announcement.body || "No content"}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {announcements.length > 3 && (
                <div className="text-center">
                  <Link
                    to="/announcements"
                    className="inline-flex items-center px-5 md:px-6 py-2.5 md:py-3 rounded-xl bg-slate-900 text-white text-sm md:text-base font-semibold shadow-md hover:shadow-lg hover:bg-slate-800 transition-all"
                  >
                    View all announcements ({announcements.length})
                  </Link>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <div className="bg-slate-50 p-6 md:p-8 rounded-2xl max-w-md mx-auto border border-slate-100">
                <CalendarDays className="mx-auto text-slate-400 mb-4" size={40} />
                <p className="text-slate-700 font-medium">
                  No announcements at the moment.
                </p>
                <p className="text-sm text-slate-500 mt-2">
                  Check back later for new updates and events.
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-12 md:py-16 bg-gradient-to-b from-white to-blue-50"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-gray-800"
            variants={cardFadeUp}
          >
            Why Parents choose KBS Public School?
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={cardFadeUp}
                className="text-center p-5 md:p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="bg-gradient-to-br from-blue-100 to-blue-50 text-blue-600 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Amenities Section */}
      <motion.section
        className="py-12 md:py-16 bg-slate-900"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-2xl mx-auto text-center mb-10"
            variants={cardFadeUp}
          >
            <p className="text-s font-semibold tracking-[0.2em] uppercase text-sky-400">
              Our Amenities
            </p>
            <h2 className="mt-2 text-2xl md:text-3xl font-bold text-white">
              Comprehensive facilities designed for student success
            </h2>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {amenities.map((item, index) => (
              <motion.div
                key={index}
                variants={cardFadeUp}
                className="group relative overflow-hidden rounded-2xl bg-slate-800/80 border border-slate-700 hover:border-sky-500/60 transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br ${item.accent} transition-opacity duration-300`}
                />
                <div className="relative p-5 md:p-6">
                  <div
                    className={`inline-flex items-center justify-center rounded-xl w-11 h-11 md:w-12 md:h-12 mb-4 ${item.iconBg}`}
                  >
                    {index === 0 && <MapPin size={22} />}
                    {index === 1 && <Users size={22} />}
                    {index === 2 && <Sparkles size={22} />}
                    {index === 3 && <Clock size={22} />}
                    {index === 4 && <Flag size={22} />}
                    {index === 5 && <Award size={22} />}
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-slate-300">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        className="py-14 bg-gradient-to-b from-slate-50 via-white to-slate-100"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-2xl mx-auto text-center mb-10"
            variants={cardFadeUp}
          >
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-500">
              Our Impact in Numbers
            </p>
            <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-slate-900">
              A thriving, growing school community
            </h2>
          </motion.div>

          <div className="relative">
            <div className="pointer-events-none absolute -top-10 -left-6 w-40 h-40 bg-blue-200/40 rounded-full blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 right-0 w-48 h-48 bg-purple-200/50 rounded-full blur-3xl" />

            <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {stats.map((stat, index) => (
                <motion.div key={index} variants={cardFadeUp} className="group relative">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/30 via-sky-400/20 to-purple-500/30 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300" />
                  <div className="relative text-center p-4 md:p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-100 shadow-[0_18px_35px_rgba(15,23,42,0.07)] group-hover:-translate-y-1.5 group-hover:shadow-[0_22px_45px_rgba(37,99,235,0.18)] transition-all duration-300">
                    <div className="mb-3 md:mb-4 flex justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/40 to-purple-500/40 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative z-10 p-3 md:p-3.5 rounded-full bg-blue-50 text-blue-600">
                          {stat.icon}
                        </div>
                      </div>
                    </div>
                    <div className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-1 md:mb-2 tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-xs md:text-sm font-medium uppercase tracking-wide text-slate-500">
                      {stat.label}
                    </div>
                    <div className="mt-3 h-0.5 w-8 mx-auto rounded-full bg-gradient-to-r from-blue-500/60 to-purple-500/60 origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Quick Links */}
      <motion.section
        className="py-12 md:py-16 bg-gray-50"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-gray-800"
            variants={cardFadeUp}
          >
            Quick Access
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {quickLinks.map((link, index) => (
              <motion.div key={index} variants={cardFadeUp}>
                <Link
                  to={link.link}
                  onClick={(e) => {
                    e.preventDefault();
                    goTo(link.link);
                  }}
                  className="group bg-white p-5 md:p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div
                    className={`inline-block p-3 rounded-lg mb-4 ${link.color} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <CalendarDays size={20} className="md:hidden" />
                    <CalendarDays size={24} className="hidden md:block" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm md:text-base">
                    {link.description}
                  </p>
                  <span className="text-blue-600 font-semibold text-sm md:text-base flex items-center">
                    Explore
                    <ArrowRight
                      className="ml-2 group-hover:translate-x-1 transition-transform"
                      size={16}
                    />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-12 md:py-20 text-white bg-gradient-to-r from-blue-800 to-purple-800"
        variants={sectionFade}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">
            Ready to Join Our Community?
          </h2>
          <p className="text-lg md:text-xl mb-6 md:mb-8 text-blue-100 max-w-2xl mx-auto">
            Schedule a campus visit or apply online today. Our admissions team is ready to assist you.
          </p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            <Link
              to="/contact"
              className="bg-gradient-to-r from-yellow-500 to-amber-500 text-gray-900 px-6 md:px-8 py-3 rounded-lg font-bold hover:from-yellow-600 hover:to-amber-600 transition-all duration-300 hover:scale-105"
            >
              Schedule a Visit
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border-2 border-white/80 text-white px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 hover:scale-105"
            >
              Contact Admissions
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Custom CSS for your original keyframe animations (you can keep or remove) */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        .animate-fade-in { animation: fade-in 1s ease-out; }
        .animate-slide-up { animation: slide-up 1s ease-out 0.3s both; }
        .animate-slide-up-delay { animation: slide-up 1s ease-out 0.6s both; }
        .animate-pulse-slow { animation: pulse-slow 2s ease-in-out infinite; }
        @media (max-width: 768px) {
          .hero-content { text-align: center; }
        }
      `}</style>
    </div>
  );
};

export default Home;
