import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import { getTeachers } from "../services/api";
import {
  Search,
  Filter,
  User,
  Award,
  BookOpen,
  Clock,
  GraduationCap,
  Star,
  X,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  Sparkles,
  Users,
  Brain,
  Heart,
  ChevronRight,
} from "lucide-react";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

const cardHover = {
  rest: { scale: 1, opacity: 1 },
  hover: { scale: 1.02, opacity: 1, transition: { duration: 0.2 } },
};

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSection, setSelectedSection] = useState("All");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [expandedCard, setExpandedCard] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState("name"); // 'name', 'experience', 'section'
  const [showFilters, setShowFilters] = useState(false);
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    avgExperience: 0,
    highestQualification: "",
  });

  const searchInputRef = useRef(null);

  // Hero parallax / in-view hooks
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.95]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.85]);

  useEffect(() => {
    fetchTeachers();
  }, []);

  useEffect(() => {
    filterAndSortTeachers();
  }, [teachers, searchTerm, selectedSection, selectedSubject, sortBy]);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const response = await getTeachers();
      const teachersData = response.data?.data || [];
      setTeachers(teachersData);
      setFilteredTeachers(teachersData);

      // Extract unique sections and subjects
      const uniqueSections = [
        ...new Set(teachersData.map((t) => t.section).filter(Boolean)),
      ];
      const allSubjects = teachersData.flatMap((t) => t.subjects || []);
      const uniqueSubjects = [...new Set(allSubjects)];

      setSections(["All", ...uniqueSections]);
      setSubjects(["All", ...uniqueSubjects]);

      // Calculate stats
      const totalExp = teachersData.reduce(
        (sum, t) => sum + (parseInt(t.experience) || 0),
        0
      );
      const qualifications = teachersData
        .map((t) => t.qualification)
        .filter(Boolean);
      const highestQual =
        qualifications.length > 0
          ? qualifications.reduce((a, b) => (a.length > b.length ? a : b))
          : "N/A";

      setStats({
        total: teachersData.length,
        avgExperience:
          teachersData.length > 0
            ? (totalExp / teachersData.length).toFixed(1)
            : 0,
        highestQualification: highestQual,
      });
    } catch (error) {
      console.error("Error fetching teachers:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortTeachers = () => {
    let filtered = [...teachers];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (teacher) =>
          teacher.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          teacher.qualification
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          teacher.subjects?.some((subject) =>
            subject.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Apply section filter
    if (selectedSection !== "All") {
      filtered = filtered.filter(
        (teacher) => teacher.section === selectedSection
      );
    }

    // Apply subject filter
    if (selectedSubject !== "All") {
      filtered = filtered.filter((teacher) =>
        teacher.subjects?.includes(selectedSubject)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "experience":
          return (b.experience || 0) - (a.experience || 0);
        case "section":
          return (a.section || "").localeCompare(b.section || "");
        case "name":
        default:
          return (a.name || "").localeCompare(b.name || "");
      }
    });

    setFilteredTeachers(filtered);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedSection("All");
    setSelectedSubject("All");
    setSortBy("name");
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const getExperienceColor = (years) => {
    if (years >= 15) return "text-red-500";
    if (years >= 10) return "text-orange-500";
    if (years >= 5) return "text-yellow-500";
    return "text-green-500";
  };

  const getInitials = (name) => {
    return (
      name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase() || "?"
    );
  };

  const LoadingSkeleton = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
        >
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
              <div className="ml-4 space-y-2 flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
            <div className="space-y-3">
              {[...Array(4)].map((_, j) => (
                <div key={j} className="h-3 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-500" />
      </div>

      {/* Hero Section with Parallax */}
      <motion.section
        ref={heroRef}
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="relative overflow-hidden bg-gradient-to-r from-blue-800 via-blue-700 to-purple-800 text-white py-16 md:py-24"
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
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
                Our Teaching Team
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight"
              >
                Meet Our{" "}
                <span className="bg-gradient-to-r from-yellow-300 to-amber-400 bg-clip-text text-transparent">
                  Exceptional Faculty
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
                className="text-base md:text-lg text-blue-100 max-w-2xl mb-8"
              >
                Dedicated educators committed to nurturing young minds with
                expertise, passion, and innovation.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href="#teachers"
                  className="group inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 text-sm font-semibold hover:from-yellow-500 hover:to-amber-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
                >
                  Browse Teachers
                  <ChevronDown className="ml-2 group-hover:translate-y-1 transition-transform" size={18} />
                </a>
                <a
                  href="/contact"
                  className="group inline-flex items-center px-6 py-3 rounded-xl border-2 border-white/30 text-white text-sm font-semibold hover:border-white/60 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Contact School
                  <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </a>
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
                    <Brain size={20} className="text-white" />
                  </div>
                  <p className="text-sm uppercase tracking-[0.2em] text-blue-100">
                    Quick Facts
                  </p>
                </div>
                <ul className="space-y-3 text-sm text-blue-50">
                  <li className="flex items-center">
                    <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-3">
                      <Users size={14} />
                    </span>
                    <span className="font-bold text-lg mr-2">
                      {stats.total}
                    </span>
                    <span>Faculty Members</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-3">
                      <Clock size={14} />
                    </span>
                    <span className="font-bold text-lg mr-2">
                      {stats.avgExperience}
                    </span>
                    <span>Years Average Experience</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-3">
                      <GraduationCap size={14} />
                    </span>
                    <span className="font-bold text-sm mr-2">
                      {stats.highestQualification}
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>


      {/* Filters and Search */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="container mx-auto px-4 mb-8"
      >
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search teachers by name, qualification, or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all"
            >
              <Filter size={20} className="mr-2" />
              Filters
              {showFilters ? (
                <ChevronUp size={20} className="ml-2" />
              ) : (
                <ChevronDown size={20} className="ml-2" />
              )}
            </button>
          </div>

          {/* Expanded Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 pt-6 border-t border-gray-100"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Section Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <GraduationCap size={16} className="inline mr-2" />
                      Section
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {sections.map((section) => (
                        <button
                          key={section}
                          onClick={() => setSelectedSection(section)}
                          className={`px-4 py-2 rounded-lg transition-all ${
                            selectedSection === section
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {section}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Subject Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <BookOpen size={16} className="inline mr-2" />
                      Subject
                    </label>
                    <select
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {subjects.map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Sort Options */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Sparkles size={16} className="inline mr-2" />
                      Sort By
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="name">Name (A-Z)</option>
                      <option value="experience">
                        Experience (High to Low)
                      </option>
                      <option value="section">Section</option>
                    </select>
                  </div>
                </div>

                {/* Clear Filters Button */}
                <div className="mt-6 text-center">
                  <button
                    onClick={handleClearFilters}
                    className="inline-flex items-center px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                  >
                    <X size={16} className="mr-2" />
                    Clear All Filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* View Toggle and Results Count */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-gray-600">
            Showing{" "}
            <span className="font-bold text-blue-600">
              {filteredTeachers.length}
            </span>{" "}
            of <span className="font-bold">{teachers.length}</span> teachers
            {(searchTerm ||
              selectedSection !== "All" ||
              selectedSubject !== "All") && (
              <span className="ml-2 text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                Filtered
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg ${
                viewMode === "grid"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100 text-gray-500 hover:text-gray-700"
              }`}
            >
              <div className="grid grid-cols-2 gap-1 w-6 h-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-current rounded-sm" />
                ))}
              </div>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg ${
                viewMode === "list"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100 text-gray-500 hover:text-gray-700"
              }`}
            >
              <div className="space-y-1 w-6 h-6">
                <div className="bg-current h-1.5 rounded-full" />
                <div className="bg-current h-1.5 rounded-full" />
                <div className="bg-current h-1.5 rounded-full" />
              </div>
            </button>
          </div>
        </div>
      </motion.section>

      {/* Teachers Grid/List */}
      <section
        id="teachers"
        className="container mx-auto px-4 pb-12 scroll-mt-24"
      >
        {loading ? (
          <LoadingSkeleton />
        ) : filteredTeachers.length > 0 ? (
          viewMode === "grid" ? (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredTeachers.map((teacher) => (
                <motion.div key={teacher._id} variants={scaleIn}>
                  <motion.div
                    variants={cardHover}
                    initial="rest"
                    animate="rest"
                    whileHover="hover"
                    className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="p-6">
                      {/* Teacher Header */}
                      <div className="flex items-start mb-6">
                        <div className="relative">
                          <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                            {getInitials(teacher.name)}
                          </div>
                          {teacher.experience >= 10 && (
                            <div className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                              <Star size={10} className="mr-1" />
                              Expert
                            </div>
                          )}
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="text-xl font-bold text-gray-800">
                            {teacher.name || "No Name"}
                          </h3>
                          <p className="text-blue-600 font-semibold">
                            {teacher.designation || "No Designation"}
                          </p>
                          <div className="flex items-center mt-2">
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                              {teacher.section || "Not specified"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Quick Info */}
                      <div className="space-y-4">
                        <div className="flex items-center text-gray-600">
                          <Award size={16} className="mr-3 text-blue-500" />
                          <span className="text-sm">
                            {teacher.qualification || "N/A"}
                          </span>
                        </div>

                        <div className="flex items-center text-gray-600">
                          <Clock size={16} className="mr-3 text-green-500" />
                          <span
                            className={`text-sm font-semibold ${getExperienceColor(
                              teacher.experience || 0
                            )}`}
                          >
                            {teacher.experience || 0} years experience
                          </span>
                        </div>

                        {teacher.subjects && teacher.subjects.length > 0 ? (
                          <div>
                            <div className="flex items-center text-gray-600 mb-2">
                              <BookOpen
                                size={16}
                                className="mr-3 text-purple-500"
                              />
                              <span className="text-sm font-semibold">
                                Subjects:
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {teacher.subjects.slice(0, 3).map((subject, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition"
                                >
                                  {subject}
                                </span>
                              ))}
                              {teacher.subjects.length > 3 && (
                                <span className="px-3 py-1 bg-gray-100 text-gray-500 text-sm rounded-full">
                                  +{teacher.subjects.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="text-gray-500 text-sm">
                            No subjects listed
                          </div>
                        )}
                      </div>

                      {/* Expand Button */}
                      <button
                        onClick={() =>
                          setExpandedCard(
                            expandedCard === teacher._id ? null : teacher._id
                          )
                        }
                        className="mt-6 w-full py-2 text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center justify-center"
                      >
                        {expandedCard === teacher._id
                          ? "Show Less"
                          : "View Details"}
                        {expandedCard === teacher._id ? (
                          <ChevronUp size={16} className="ml-2" />
                        ) : (
                          <ChevronDown size={16} className="ml-2" />
                        )}
                      </button>

                      {/* Expanded Content */}
                      <AnimatePresence>
                        {expandedCard === teacher._id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 pt-4 border-t border-gray-100"
                          >
                            <div className="space-y-3">
                              <div className="flex items-center">
                                <Mail
                                  size={14}
                                  className="mr-3 text-gray-400"
                                />
                                <span className="text-sm text-gray-600">
                                  {teacher.email || "Email not provided"}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <Phone
                                  size={14}
                                  className="mr-3 text-gray-400"
                                />
                                <span className="text-sm text-gray-600">
                                  {teacher.phone || "Phone not provided"}
                                </span>
                              </div>
                              {teacher.achievements && (
                                <div>
                                  <div className="flex items-center mb-2">
                                    <Star
                                      size={14}
                                      className="mr-2 text-yellow-500"
                                    />
                                    <span className="text-sm font-semibold">
                                      Achievements:
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-600">
                                    {teacher.achievements}
                                  </p>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            // List View
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {filteredTeachers.map((teacher) => (
                <motion.div
                  key={teacher._id}
                  variants={fadeInUp}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-center">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
                        {getInitials(teacher.name)}
                      </div>
                      <div className="ml-6 flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-gray-800">
                              {teacher.name}
                            </h3>
                            <p className="text-blue-600 font-semibold">
                              {teacher.designation}
                            </p>
                          </div>
                          <div className="mt-2 md:mt-0 flex items-center space-x-4">
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                              {teacher.section}
                            </span>
                            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                              {teacher.experience || 0} yrs exp
                            </span>
                          </div>
                        </div>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center">
                            <GraduationCap
                              size={16}
                              className="mr-3 text-gray-400"
                            />
                            <span className="text-sm text-gray-600">
                              {teacher.qualification}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <BookOpen
                              size={16}
                              className="mr-3 text-gray-400"
                            />
                            <span className="text-sm text-gray-600">
                              {teacher.subjects?.join(", ") || "No subjects"}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Award
                              size={16}
                              className="mr-3 text-gray-400"
                            />
                            <span className="text-sm text-gray-600">
                              Specialized Educator
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-12 rounded-2xl shadow-xl max-w-2xl mx-auto text-center"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <Users size={48} className="text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              No Teachers Found
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {searchTerm ||
              selectedSection !== "All" ||
              selectedSubject !== "All"
                ? "No teachers match your current filters. Try adjusting your search criteria."
                : "The teachers database is currently empty or unable to load."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleClearFilters}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all"
              >
                Clear Filters
              </button>
              <button
                onClick={fetchTeachers}
                className="px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all"
              >
                Refresh Data
              </button>
            </div>
          </motion.div>
        )}
      </section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 py-12"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Join Our Faculty Team
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Passionate about teaching? We&apos;re always looking for dedicated
            educators to join our team and help shape the future.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all transform hover:-translate-y-1"
          >
            Contact us
            <ChevronRight className="ml-2" size={20} />
          </a>
        </div>
      </motion.section>
    </div>
  );
};

export default Teachers;
