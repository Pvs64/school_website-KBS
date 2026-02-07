import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  ArrowLeft,
  CalendarDays,
  FileText,
  ClipboardList,
  Users,
  BookOpen,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  IndianRupee,
  Bus,
  ShieldCheck,
  Info,
  Award,
  GraduationCap,
  Clock,
  Download,
  Sparkles,
  Globe,
  Building,
  Target,
  Star,
  Shield,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  FileCheck,
  UserCheck,
  BookMarked,
  DollarSign,
  TrendingUp,
  Home,
} from "lucide-react";
import { Link } from "react-router-dom";

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

// Hero stats
const heroStats = [
  { icon: <Users size={18} />, label: "Pre‑Nursery to Class VIII", value: "All Classes" },
  { icon: <CalendarDays size={18} />, label: "Academic Year", value: "2025‑26" },
  { icon: <Award size={18} />, label: "CBSE Affiliation", value: "UDISE Code : 9281002502" },
  { icon: <GraduationCap size={18} />, label: "Student Success", value: "98%" },
];

// Admission process steps
const admissionSteps = [
  {
    step: "01",
    title: "Inquiry & Registration",
    description: "Complete the inquiry form or contact the school. Prospectus sale and registration from 8:30 AM to 1:00 PM.",
    icon: <FileText size={24} />,
    color: "from-blue-500 to-blue-600",
    details: ["Online/Offline inquiry form", "Prospectus collection", "Initial registration"]
  },
  {
    step: "02",
    title: "Application Form",
    description: "Fill and submit one admission form per child with accurate details and class preference.",
    icon: <FileCheck size={24} />,
    color: "from-purple-500 to-purple-600",
    details: ["Complete application form", "Attach required documents", "Submit within deadline"]
  },
  {
    step: "03",
    title: "Document Verification",
    description: "Submit the filled prospectus within 3 working days along with all required documents.",
    icon: <ShieldCheck size={24} />,
    color: "from-green-500 to-green-600",
    details: ["Original document verification", "Photocopy submission", "Medical records check"]
  },
  {
    step: "04",
    title: "Assessment Process",
    description: "Assessment as per CBSE norms through interaction / observation / test (class‑wise).",
    icon: <BookMarked size={24} />,
    color: "from-amber-500 to-amber-600",
    details: ["Skill assessment", "Parent interaction", "Academic evaluation"]
  },
  {
    step: "05",
    title: "Selection & Admission",
    description: "Shortlisted candidates list displayed on school notice board. Complete admission formalities if selected.",
    icon: <UserCheck size={24} />,
    color: "from-red-500 to-red-600",
    details: ["Selection list publication", "Fee payment", "Document finalization"]
  },
  {
    step: "06",
    title: "Orientation & Joining",
    description: "Report on the joining date with ID card, complete uniform, books and stationery.",
    icon: <GraduationCap size={24} />,
    color: "from-indigo-500 to-indigo-600",
    details: ["Parent orientation", "Uniform collection", "School tour"]
  },
];

// Class groups
const classGroups = [
  {
    title: "Foundational Years",
    icon: <Home size={20} />,
    color: "bg-blue-50 border-blue-200",
    classes: [
      { name: "Pre‑Nursery", age: "2.5+ Years" },
      { name: "Nursery", age: "3+ Years" },
      { name: "Preparatory", age: "4+ Years" },
    ],
    features: ["Play-based learning", "Basic literacy", "Social skills"]
  },
  {
    title: "Primary (I–V)",
    icon: <BookOpen size={20} />,
    color: "bg-purple-50 border-purple-200",
    classes: [
      { name: "Class I", age: "5.5+ Years" },
      { name: "Class II", age: "6.5+ Years" },
      { name: "Class III", age: "7.5+ Years" },
      { name: "Class IV", age: "8.5+ Years" },
      { name: "Class V", age: "9.5+ Years" },
    ],
    features: ["Concept building", "Language skills", "Basic mathematics"]
  },
  {
    title: "Middle (VI–VIII)",
    icon: <Target size={20} />,
    color: "bg-green-50 border-green-200",
    classes: [
      { name: "Class VI", age: "10.5+ Years" },
      { name: "Class VII", age: "11.5+ Years" },
      { name: "Class VIII", age: "12.5+ Years" },
    ],
    features: ["Subject specialization", "Project work", "Skill development"]
  },
  
];

// Documents checklist
const documentSections = [
  {
    title: "Mandatory Documents",
    icon: <FileText size={20} />,
    color: "bg-blue-50 text-blue-600",
    items: [
      "Original Birth Certificate with certified photocopy (Municipal / Local body)",
      "Transfer Certificate for Class II upwards from previous school",
      "Previous academic records / report cards (where applicable)",
      "Recent passport size photographs of child and parents (4 each)",
      "Address proof (Aadhar Card, utility bill, rent agreement, etc.)",
      "Caste / Category certificate for reservation (if applicable)",
    ],
    priority: "Required at time of admission"
  },
  {
    title: "Medical Records",
    icon: <ShieldCheck size={20} />,
    color: "bg-green-50 text-green-600",
    items: [
      "Immunization record as per national schedule",
      "Blood group certificate",
      "Any medical reports relevant to child's health",
      "Disability certificate (if applicable)",
    ],
    priority: "For health and safety records"
  },
  {
    title: "Additional Documents",
    icon: <Info size={20} />,
    color: "bg-purple-50 text-purple-600",
    items: [
      "Income certificate (for scholarship)",
      "Disaster management certificate (if any)",
      "Previous school leaving certificate",
      "Extra-curricular achievement certificates",
    ],
    priority: "Optional but recommended"
  },
];

// Age criteria with enhanced data
const ageCriteria = [
  { class: "Nursery", dobFrom: "01/04/2021", dobTo: "31/03/2022", age: "3+ Years", status: "Open" },
  { class: "I.KG", dobFrom: "01/04/2020", dobTo: "31/03/2021", age: "4+ Years", status: "Open" },
  { class: "UKG", dobFrom: "01/04/2019", dobTo: "31/03/2020", age: "5+ Years", status: "Open" },
  { class: "Class I", dobFrom: "01/04/2018", dobTo: "31/03/2019", age: "6+ Years", status: "Open" },
  { class: "Class II", dobFrom: "01/04/2017", dobTo: "31/03/2018", age: "7+ Years", status: "Open" },
  { class: "Class III", dobFrom: "01/04/2016", dobTo: "31/03/2017", age: "8+ Years", status: "Open" },
  { class: "Class IV", dobFrom: "01/04/2015", dobTo: "31/03/2016", age: "9+ Years", status: "Limited" },
  { class: "Class V", dobFrom: "01/04/2014", dobTo: "31/03/2015", age: "10+ Years", status: "Limited" },
  { class: "Class VI", dobFrom: "01/04/2013", dobTo: "31/03/2014", age: "11+ Years", status: "Open" },
  { class: "Class VII", dobFrom: "01/04/2012", dobTo: "31/03/2013", age: "12+ Years", status: "Open" },
  { class: "Class VIII", dobFrom: "01/04/2011", dobTo: "31/03/2012", age: "13+ Years", status: "Open" },
];

// Fee structure with enhanced data
const feeCategories = [
  {
    category: "One-Time Fees",
    items: [
      { name: "Registration Fee", amount: "₹1,000", description: "Non-refundable" },
      { name: "Admission Fee", amount: "₹35,000", description: "One-time payment" },
      { name: "Security Deposit", amount: "₹10,000", description: "Refundable" },
    ],
    color: "bg-blue-50"
  },
  {
    category: "Annual Charges",
    items: [
      { name: "Annual Fee", amount: "₹25,000", description: "Per academic year" },
      { name: "Development Fee", amount: "₹15,000", description: "Infrastructure" },
      { name: "Lab Fee", amount: "₹5,000", description: "Science & Computer" },
    ],
    color: "bg-purple-50"
  },
  {
    category: "Quarterly Tuition",
    items: [
      { name: "Primary (I-V)", amount: "₹12,000", description: "Per quarter" },
      { name: "Middle (VI-VIII)", amount: "₹15,000", description: "Per quarter" },
      { name: "Secondary (IX-X)", amount: "₹18,000", description: "Per quarter" },
      { name: "Senior Secondary", amount: "₹22,000", description: "Per quarter" },
    ],
    color: "bg-green-50"
  },
  {
    category: "Additional Services",
    items: [
      { name: "Transport (0-5 km)", amount: "₹2,500", description: "Monthly" },
      { name: "Transport (6-20 km)", amount: "₹3,500", description: "Monthly" },
      { name: "Meal Plan", amount: "₹2,000", description: "Monthly" },
      { name: "Co-curricular", amount: "₹1,000", description: "Monthly" },
    ],
    color: "bg-amber-50"
  },
];

// Important dates
const importantDates = [
  { event: "Admission Process Starts", date: "December 1, 2024", status: "Upcoming" },
  { event: "Last Date for Applications", date: "February 28, 2025", status: "Open" },
  { event: "Entrance Tests", date: "March 15-20, 2025", status: "Scheduled" },
  { event: "Result Declaration", date: "March 25, 2025", status: "Pending" },
  { event: "Admission Confirmation", date: "April 10, 2025", status: "Pending" },
  { event: "Academic Session Begins", date: "April 15, 2025", status: "Pending" },
];

const Admissions = () => {
  const heroRef = useRef(null);
  const processRef = useRef(null);
  const classesRef = useRef(null);
  const documentsRef = useRef(null);
  const feesRef = useRef(null);
  const datesRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const isProcessInView = useInView(processRef, { once: true });
  const isClassesInView = useInView(classesRef, { once: true });
  const isDocumentsInView = useInView(documentsRef, { once: true });
  const isFeesInView = useInView(feesRef, { once: true });
  const isDatesInView = useInView(datesRef, { once: true });

  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  const [activeStep, setActiveStep] = useState(0);
  const [expandedSection, setExpandedSection] = useState(null);
  const [hoveredFee, setHoveredFee] = useState(null);

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

      {/* Hero Section */}
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
                Admissions 2025-26
              </motion.p>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight"
              >
                Begin Your Journey{" "}
                <span className="bg-gradient-to-r from-yellow-300 to-amber-400 bg-clip-text text-transparent">
                  With Excellence
                </span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
                className="text-base md:text-lg text-blue-100 max-w-2xl mb-8"
              >
                Join KBS Public School, where we nurture young minds with values, 
                academic excellence, and holistic development in a safe and caring environment.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href="#process"
                  className="group inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 text-sm font-semibold hover:from-yellow-500 hover:to-amber-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
                >
                  View Admission Process
                  <ChevronDown className="ml-2 group-hover:translate-y-1 transition-transform" size={18} />
                </a>
                <Link
                  to="/contact"
                  className="group inline-flex items-center px-6 py-3 rounded-xl border-2 border-white/30 text-white text-sm font-semibold hover:border-white/60 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Schedule a Visit
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
                    <ClipboardList size={20} className="text-white" />
                  </div>
                  <p className="text-sm uppercase tracking-[0.2em] text-blue-100">
                    Quick Highlights
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {heroStats.map((stat, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="bg-white/5 rounded-lg p-3 border border-white/10"
                    >
                      <div className="flex items-center mb-1">
                        <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-2">
                          {stat.icon}
                        </span>
                        <span className="text-xs text-blue-200">{stat.label}</span>
                      </div>
                      <div className="font-bold text-lg">{stat.value}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Admission Process Timeline */}
      <section ref={processRef} id="process" className="py-16 md:py-24 bg-gradient-to-b from-slate-50 via-white to-slate-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-blue-500">
              Our Admission Journey
            </p>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-slate-900">
              Simple 6‑Step Admission Process
            </h2>
            <p className="mt-4 text-base text-slate-600 max-w-2xl mx-auto">
              Follow our transparent, well-defined admission process designed for your convenience
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 md:w-1.5 bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500 transform md:-translate-x-1/2"></div>
            
            {/* Timeline Steps */}
            <div className="space-y-12">
              {admissionSteps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  initial="hidden"
                  animate={isProcessInView ? "visible" : "hidden"}
                  transition={{ delay: index * 0.2 }}
                  className={`relative flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-6`}
                >
                  {/* Step Circle */}
                  <div className="absolute left-0 md:left-1/2 w-10 h-10 transform -translate-x-1/2 z-10">
                    <div 
                      onMouseEnter={() => setActiveStep(index)}
                      onMouseLeave={() => setActiveStep(0)}
                      className={`w-full h-full rounded-full border-4 border-white shadow-xl transition-all duration-300 cursor-pointer ${
                        activeStep === index ? 'scale-110' : ''
                      }`}
                      style={{
                        background: activeStep === index 
                          ? `linear-gradient(135deg, ${step.color.split(' ')[1]}, ${step.color.split(' ')[3]})`
                          : '#ffffff'
                      }}
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        <div className={`${activeStep === index ? 'text-white' : 'text-gray-600'}`}>
                          {step.icon}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`bg-white rounded-2xl shadow-lg p-6 border border-slate-100 hover:shadow-xl transition-all duration-300 ${
                        activeStep === index ? 'ring-2 ring-blue-500' : ''
                      }`}
                    >
                      <div className="flex items-center mb-4">
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} text-white shadow-lg mr-4`}>
                          <span className="text-sm font-bold">{step.step}</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                      </div>
                      <p className="text-slate-600 mb-4">{step.description}</p>
                      <ul className="space-y-2 text-sm text-slate-500">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-center">
                            <CheckCircle size={14} className="mr-2 text-green-500" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>

                  {/* Empty space for alternating sides */}
                  <div className="hidden md:block md:w-5/12"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Classes & Age Criteria */}
      <section ref={classesRef} className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Classes Available */}
            <motion.div
              variants={slideInFromLeft}
              initial="hidden"
              animate={isClassesInView ? "visible" : "hidden"}
            >
              <div className="mb-8">
                <p className="text-sm font-semibold tracking-[0.2em] uppercase text-blue-500 mb-2">
                  Programs Offered
                </p>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                  Classes Available for Admission
                </h2>
                <p className="mt-4 text-slate-600">
                  We offer comprehensive education programs from foundational years to higher secondary
                </p>
              </div>

              <div className="space-y-4">
                {classGroups.map((group, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => setExpandedSection(expandedSection === index ? null : index)}
                    className={`border rounded-2xl p-5 cursor-pointer transition-all duration-300 ${group.color} ${
                      expandedSection === index ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-lg bg-white border flex items-center justify-center mr-3">
                          {group.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">{group.title}</h3>
                          <p className="text-sm text-slate-500">{group.classes.length} classes</p>
                        </div>
                      </div>
                      <ChevronDown className={`transition-transform ${expandedSection === index ? 'rotate-180' : ''}`} />
                    </div>
                    
                    <motion.div
                      initial={false}
                      animate={{ height: expandedSection === index ? 'auto' : 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 border-t border-slate-200">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          {group.classes.map((cls, idx) => (
                            <div key={idx} className="bg-white rounded-lg p-3 border">
                              <div className="font-semibold text-slate-900">{cls.name}</div>
                              <div className="text-xs text-slate-500 mt-1">{cls.age}</div>
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {group.features.map((feature, idx) => (
                            <span key={idx} className="px-3 py-1 bg-white text-sm rounded-full border">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Age Criteria Table */}
            <motion.div
              variants={slideInFromRight}
              initial="hidden"
              animate={isClassesInView ? "visible" : "hidden"}
            >
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mr-4">
                    <CalendarDays size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">Age Criteria 2025‑26</h3>
                    <p className="text-slate-600">As on 31st March 2025</p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Class</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Date of Birth</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Age</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ageCriteria.map((row, index) => (
                        <tr key={index} className="border-b border-slate-100 hover:bg-white/50 transition-colors">
                          <td className="py-3 px-4 font-medium text-slate-900">{row.class}</td>
                          <td className="py-3 px-4 text-slate-700">
                            {row.dobFrom} – {row.dobTo}
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-semibold text-blue-600">{row.age}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              row.status === 'Open' 
                                ? 'bg-green-100 text-green-800'
                                : row.status === 'Limited'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 p-4 bg-blue-100/50 rounded-lg">
                  <div className="flex items-start">
                    <Info size={18} className="text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-blue-800">
                      Age verification is based on original birth certificate issued by competent authority. 
                      All admission criteria follow CBSE regulations.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Documents Checklist */}
      <section ref={documentsRef} className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isDocumentsInView ? { opacity: 1, y: 0 } : {}}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-blue-500">
              Required Documents
            </p>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-slate-900">
              Document Checklist for Admission
            </h2>
            <p className="mt-4 text-base text-slate-600 max-w-2xl mx-auto">
              Ensure you have all necessary documents ready for a smooth admission process
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {documentSections.map((section, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                initial="hidden"
                animate={isDocumentsInView ? "visible" : "hidden"}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className={`p-4 ${section.color}`}>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center mr-3">
                      {section.icon}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{section.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                      {section.priority}
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle size={16} className="text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fee Structure */}
      <section ref={feesRef} className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isFeesInView ? { opacity: 1, y: 0 } : {}}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-100 to-blue-100 mb-4">
              <IndianRupee size={32} className="text-green-600" />
            </div>
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-blue-500">
              Transparent Fee Structure
            </p>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-slate-900">
              Academic Fee Structure 2025‑26
            </h2>
            <p className="mt-4 text-base text-slate-600 max-w-2xl mx-auto">
              Clear breakdown of all fees and charges for complete transparency
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {feeCategories.map((category, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                initial="hidden"
                animate={isFeesInView ? "visible" : "hidden"}
                transition={{ delay: index * 0.1 }}
                className={`rounded-2xl border ${category.color} p-6 hover:shadow-lg transition-all duration-300`}
              >
                <h3 className="text-xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
                  {category.category}
                </h3>
                <div className="space-y-4">
                  {category.items.map((item, idx) => (
                    <div
                      key={idx}
                      onMouseEnter={() => setHoveredFee(`${index}-${idx}`)}
                      onMouseLeave={() => setHoveredFee(null)}
                      className={`flex items-center justify-between p-4 rounded-xl bg-white border border-slate-100 transition-all duration-200 ${
                        hoveredFee === `${index}-${idx}` ? 'border-blue-300 shadow-md' : ''
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-slate-900">{item.name}</div>
                        <div className="text-sm text-slate-500 mt-1">{item.description}</div>
                      </div>
                      <div className="text-xl font-bold text-blue-600">{item.amount}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Payment Schedule & Notes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isFeesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="mt-12 grid md:grid-cols-2 gap-8"
          >
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                <Clock className="mr-3 text-blue-600" size={24} />
                Payment Schedule
              </h3>
              <div className="space-y-3">
                {['Quarter 1: April - June', 'Quarter 2: July - September', 'Quarter 3: October - December', 'Quarter 4: January - March'].map((period, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-white p-3 rounded-lg border">
                    <span className="font-medium text-slate-700">{period}</span>
                    <span className="font-semibold text-blue-600">Due: 10th of 1st month</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 border border-amber-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                <Info className="mr-3 text-amber-600" size={24} />
                Important Notes
              </h3>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mt-1.5 mr-3"></span>
                  Fees must be paid by 10th of the first month of each quarter
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mt-1.5 mr-3"></span>
                  Late fee penalty applicable after due date
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mt-1.5 mr-3"></span>
                  Security deposit refundable upon completion of studies
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mt-1.5 mr-3"></span>
                  All fees are non-refundable once paid
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Important Dates */}
      <section ref={datesRef} className="py-16 md:py-24 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isDatesInView ? { opacity: 1, y: 0 } : {}}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-blue-500">
              Key Dates
            </p>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-slate-900">
              Important Dates & Deadlines
            </h2>
            <p className="mt-4 text-base text-slate-600 max-w-2xl mx-auto">
              Mark your calendar with these important admission dates for 2025-26 session
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {importantDates.map((date, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  initial="hidden"
                  animate={isDatesInView ? "visible" : "hidden"}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mr-4">
                        <CalendarDays size={24} className="text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">{date.event}</h4>
                        <p className="text-slate-600 text-sm mt-1">{date.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                        date.status === 'Open' 
                          ? 'bg-green-100 text-green-800'
                          : date.status === 'Upcoming'
                          ? 'bg-blue-100 text-blue-800'
                          : date.status === 'Scheduled'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {date.status}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-800 to-purple-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm mb-6">
                <GraduationCap size={36} className="text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Begin Your Educational Journey?
              </h2>
              <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                Take the first step towards excellence. Join KBS Public School 
                and become part of a community that values knowledge, character, and innovation.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/contact"
                  className="group inline-flex items-center px-8 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 font-semibold hover:from-yellow-500 hover:to-amber-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
                >
                  Apply Now
                  <ArrowLeft className="ml-2 rotate-180 group-hover:translate-x-2 transition-transform" size={20} />
                </Link>
                <a
                  href="tel:+917086063500"
                  className="group inline-flex items-center px-8 py-3 rounded-xl border-2 border-white/30 text-white font-semibold hover:border-white/60 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <Phone size={20} className="mr-2" />
                  Call: +91‑7086063500
                </a>
                <button className="group inline-flex items-center px-8 py-3 rounded-xl border-2 border-white/30 text-white font-semibold hover:border-white/60 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1">
                  <Mail size={20} className="mr-2" />
                  Email Admissions
                </button>
              </div>
              <div className="mt-8 pt-8 border-t border-white/20">
                <p className="text-sm text-blue-200">
                  Visit our school campus: Sector 5, RK Puram, Delhi | Mon-Sat: 8:30 AM - 3:00 PM
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admissions;