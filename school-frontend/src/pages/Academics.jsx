import { useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BookOpen,
  GraduationCap,
  Award,
  FlaskConical,
  Laptop,
  Library,
  Calendar,
  CheckCircle,
  FileText,
  ChevronDown,
  Sparkles,
  Brain,
  Lightbulb,
  Clock,
  ArrowRight,
  Download,
  Users,
  Compass,
  Layers,
  HelpCircle,
  ShieldCheck,
  Target
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const academicWings = [
  {
    id: "pre-primary",
    title: "Pre-Primary Wing",
    grades: "Nursery, LKG & UKG",
    age: "Age: 3 to 5 Years",
    tagline: "Foundational Play & Exploration",
    description: "Focuses on sensory learning, phonetics, motor skills, social habits, and joyful storytelling in a warm, nurturing environment.",
    subjects: ["English Phonics & Rhymes", "Hindi Varnamala", "Number Concepts & Shapes", "Art & Craft", "Nature & EVS Basics", "Music & Movement"],
    color: "from-amber-500 to-orange-500",
    bgLight: "bg-amber-50",
    border: "border-amber-200"
  },
  {
    id: "primary",
    title: "Primary Wing",
    grades: "Class I to Class V",
    age: "Age: 6 to 10 Years",
    tagline: "Foundational Literacy, Numeracy & Curiosity",
    description: "Builds solid linguistic fluency, mathematical logic, inquiry-based environmental awareness, and creative thinking aligned with NEP 2020.",
    subjects: ["English Language & Literature", "Hindi", "Mathematics & Mental Math", "Environmental Studies (EVS)", "Computer Basics", "General Knowledge", "Visual Arts & Physical Education"],
    color: "from-blue-600 to-indigo-600",
    bgLight: "bg-blue-50",
    border: "border-blue-200"
  },
  {
    id: "middle",
    title: "Middle Wing",
    grades: "Class VI to Class VIII",
    age: "Age: 11 to 14 Years",
    tagline: "Experiential Learning, STEM & Critical Thinking",
    description: "Prepares students for higher academic rigors with independent scientific experiments, coding, debate, multilingual mastery, and project research.",
    subjects: ["English", "Hindi", "Sanskrit (Third Language)", "Mathematics & Geometry", "Integrated Science (Physics, Chemistry, Biology)", "Social Science (History, Civics, Geography)", "Computer Science & Scratch/Python", "Moral Education & Sports"],
    color: "from-purple-600 to-pink-600",
    bgLight: "bg-purple-50",
    border: "border-purple-200"
  }
];

const academicFacilities = [
  {
    icon: <FlaskConical className="w-8 h-8 text-blue-600" />,
    title: "Composite Science Lab",
    description: "Equipped with advanced microscopes, laboratory glassware, reagent kits, and demonstration equipment for hands-on experiments."
  },
  {
    icon: <Laptop className="w-8 h-8 text-purple-600" />,
    title: "Digital Computer & Robotics Center",
    description: "High-speed networked computer workstations, interactive smart boards, programming software, and STEM robotics kits."
  },
  {
    icon: <Library className="w-8 h-8 text-amber-600" />,
    title: "Central Library & Reading Lounge",
    description: "Over 5,000 carefully curated titles, children's encyclopedias, journals, storybooks, and dedicated quiet study corners."
  },
  {
    icon: <Brain className="w-8 h-8 text-emerald-600" />,
    title: "Mathematics & Logic Lab",
    description: "Manipulatives, abacuses, geometric models, and Vedic math aids that make abstract calculations tactile and intuitive."
  }
];

const evaluationTerms = [
  {
    term: "Periodic Assessment I",
    timing: "July - August",
    weight: "10% Weightage",
    details: "Unit tests, subject enrichment activities, notebook maintenance, and oral assessments."
  },
  {
    term: "Term I (Half-Yearly) Exams",
    timing: "September - October",
    weight: "40% Weightage",
    details: "Comprehensive written evaluation covering the first semester syllabus with practical assessments."
  },
  {
    term: "Periodic Assessment II",
    timing: "December - January",
    weight: "10% Weightage",
    details: "Project presentations, mental aptitude tests, and mid-term concept checks."
  },
  {
    term: "Annual Examination (Term II)",
    timing: "February - March",
    weight: "40% Weightage",
    details: "Final cumulative exams assessing holistic mastery, theoretical clarity, and practical skills."
  }
];

const faqs = [
  {
    q: "What board curriculum does KBS Public School follow?",
    a: "KBS Public School follows the national CBSE curriculum integrated with National Education Policy (NEP) 2020 pedagogical guidelines, emphasizing experiential learning and skill building."
  },
  {
    q: "What is the student-teacher ratio in classrooms?",
    a: "We maintain an optimal ratio of approximately 25:1 to ensure personalized attention, individual doubt-clearing, and close pastoral care for every child."
  },
  {
    q: "Are regular remedial classes available for students needing extra support?",
    a: "Yes. Dedicated remedial and concept-clearing sessions are conducted during zero-periods and Saturday mornings without any extra tuition fees."
  },
  {
    q: "How are parents informed about academic progress?",
    a: "Through formal quarterly Parent-Teacher Meetings (PTMs), regular school diary notices, SMS alerts, and detailed diagnostic progress report cards."
  }
];

const Academics = () => {
  const [activeWing, setActiveWing] = useState("primary");
  const [openFaq, setOpenFaq] = useState(null);

  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.96]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.9]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Background Decorative Blur */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
        <div className="absolute top-1/2 right-10 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
      </div>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white py-16 md:py-24"
      >
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
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-blue-200 text-xs font-semibold uppercase tracking-wider mb-4 border border-white/10">
              <Sparkles size={14} className="mr-2 text-yellow-300" />
              CBSE Affiliated • UDISE: 9281002502
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Academic Excellence &{" "}
              <span className="bg-gradient-to-r from-yellow-300 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
                Holistic Pedagogy
              </span>
            </h1>

            <p className="text-lg md:text-xl text-blue-100/90 max-w-3xl mx-auto mb-8 font-normal leading-relaxed">
              At KBS Public School, education transcends rote memorization. We inspire intellectual curiosity, ethical character, scientific rigor, and emotional resilience from Nursery through Class VIII.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#wings"
                className="inline-flex items-center px-6 py-3.5 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 font-bold text-sm shadow-lg hover:shadow-yellow-500/30 hover:scale-105 transition-all duration-300"
              >
                Explore Academic Wings
                <ChevronDown size={18} className="ml-2" />
              </a>
              <Link
                to="/admissions"
                className="inline-flex items-center px-6 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white font-semibold text-sm hover:bg-white/20 transition-all duration-300"
              >
                Admission Criteria
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Quick Academic Highlights Banner */}
      <div className="relative -mt-8 max-w-5xl mx-auto px-4 z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
          <div className="text-center p-3 border-r border-slate-100 last:border-0">
            <div className="text-2xl md:text-3xl font-extrabold text-blue-900">CBSE</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">Affiliation Standard</div>
          </div>
          <div className="text-center p-3 border-r border-slate-100 last:border-0">
            <div className="text-2xl md:text-3xl font-extrabold text-blue-900">25:1</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">Student-Teacher Ratio</div>
          </div>
          <div className="text-center p-3 border-r border-slate-100 last:border-0">
            <div className="text-2xl md:text-3xl font-extrabold text-blue-900">100%</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">Board Transition Rate</div>
          </div>
          <div className="text-center p-3">
            <div className="text-2xl md:text-3xl font-extrabold text-blue-900">NEP 2020</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">Aligned Curriculum</div>
          </div>
        </div>
      </div>

      {/* Academic Wings Section */}
      <section id="wings" className="py-16 md:py-24 container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-2">
            Structured Learning Pathways
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Our Academic Structure
          </h2>
          <p className="text-slate-600 mt-3 text-base">
            Carefully graduated learning stages tailored to children's cognitive, physical, and psychological developmental milestones.
          </p>

          {/* Wing Selector Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-8 p-1.5 bg-slate-200/70 rounded-2xl max-w-lg mx-auto">
            {academicWings.map((wing) => (
              <button
                key={wing.id}
                onClick={() => setActiveWing(wing.id)}
                className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-xl text-sm font-bold transition-all duration-300 ${
                  activeWing === wing.id
                    ? "bg-white text-blue-900 shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {wing.title.split(" ")[0]} Wing
              </button>
            ))}
          </div>
        </div>

        {/* Selected Wing Details Card */}
        {academicWings
          .filter((w) => w.id === activeWing)
          .map((wing) => (
            <motion.div
              key={wing.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className={`max-w-4xl mx-auto bg-white rounded-3xl p-6 md:p-10 shadow-xl border ${wing.border}`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 mb-2">
                    {wing.grades} • {wing.age}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                    {wing.title}
                  </h3>
                  <p className="text-sm font-semibold text-blue-600 mt-1">
                    {wing.tagline}
                  </p>
                </div>
                <Link
                  to="/admissions"
                  className="inline-flex items-center px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-blue-900 transition-colors self-start md:self-auto"
                >
                  Apply For {wing.grades.split(",")[0]}
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>

              <p className="text-slate-600 text-base md:text-lg leading-relaxed my-6">
                {wing.description}
              </p>

              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-4 flex items-center">
                  <BookOpen size={18} className="mr-2 text-blue-600" />
                  Key Subjects & Learning Areas:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {wing.subjects.map((sub, idx) => (
                    <div
                      key={idx}
                      className="flex items-center p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-800 text-sm font-medium"
                    >
                      <CheckCircle size={16} className="text-emerald-500 mr-2 flex-shrink-0" />
                      <span>{sub}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
      </section>

      {/* Facilities Section */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-2">
              Modern Learning Infrastructure
            </p>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Laboratories & Academic Facilities
            </h2>
            <p className="text-slate-600 mt-2 text-sm md:text-base">
              Providing modern tools that bridge textbook theory with vibrant real-world application.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {academicFacilities.map((fac, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="mb-4 p-3 bg-white rounded-xl shadow-sm inline-block">
                  {fac.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {fac.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {fac.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment & Evaluation System */}
      <section className="py-16 md:py-24 container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-2">
            Continuous & Comprehensive
          </p>
          <h2 className="text-3xl font-extrabold text-slate-900">
            Assessment & Evaluation Policy
          </h2>
          <p className="text-slate-600 mt-3 text-sm md:text-base">
            Transparent, multi-dimensional progress tracking designed to encourage student self-belief rather than test anxiety.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {evaluationTerms.map((term, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600" />
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
                  {term.timing}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {term.term}
                </h3>
                <span className="inline-block px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100 mb-3">
                  {term.weight}
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {term.details}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs text-slate-500 font-medium">
                <Clock size={12} className="mr-1 text-slate-400" />
                Mandatory Attendance
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 bg-slate-100/70 border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Everything parents want to know about our academic standards and classroom practices.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-5 text-left flex justify-between items-center font-bold text-slate-800 text-sm md:text-base hover:text-blue-700 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={20}
                    className={`transform transition-transform text-slate-400 ml-4 flex-shrink-0 ${
                      openFaq === index ? "rotate-180 text-blue-600" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5 text-sm text-slate-600 border-t border-slate-100 pt-3 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Box */}
          <div className="mt-12 bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-3xl p-8 text-center shadow-xl">
            <h3 className="text-xl md:text-2xl font-bold mb-3">
              Need Personal Academic Guidance for Your Child?
            </h3>
            <p className="text-sm text-blue-100 max-w-xl mx-auto mb-6">
              Our academic counselors and teachers are available Monday through Saturday from 8:30 AM to 1:30 PM for campus visits and consultations.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="px-6 py-3 bg-yellow-400 text-gray-950 font-bold rounded-xl text-sm hover:bg-yellow-300 transition-colors"
              >
                Schedule Campus Meeting
              </Link>
              <Link
                to="/teachers"
                className="px-6 py-3 bg-white/10 text-white font-semibold rounded-xl text-sm hover:bg-white/20 transition-colors border border-white/20"
              >
                Meet Our Teachers
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Academics;
