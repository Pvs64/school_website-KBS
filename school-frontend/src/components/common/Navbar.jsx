import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ChevronRight,
  School,
  Home,
  Users,
  BookOpen,
  GraduationCap,
  Image,
  Phone,
  UserCog,
  Sparkles,
} from "lucide-react";
import logo from "../../assets/logos/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: <Home size={18} /> },
    { name: "About", path: "/about", icon: <Users size={18} /> },
    { name: "Teachers", path: "/teachers", icon: <Users size={18} /> },
    { name: "Academics", path: "/academics", icon: <BookOpen size={18} /> },
    { name: "Admissions", path: "/admissions", icon: <GraduationCap size={18} /> },
    { name: "Gallery", path: "/gallery", icon: <Image size={18} /> },
    { name: "Contact", path: "/contact", icon: <Phone size={18} /> },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  // Close mobile menu on route change & scroll to top
  useEffect(() => {
    setIsOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Optional helper for click (smooth top scroll on same‑route navigation)
  const handleNavClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-gradient-to-r from-blue-950/80 to-purple-950/95 backdrop-blur-2xl shadow-2xl py-3 border-b border-blue-900/60"
            : "bg-gradient-to-r from-blue-900/80 to-purple-900/80 backdrop-blur-2xl py-5"
        }`}
        style={{
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link
              to="/"
              onClick={handleNavClick}
              className="flex items-center space-x-3 group relative"
            >
              <div className="relative z-10">
                <div
                  className={`
                    w-12 h-12 rounded-xl flex items-center justify-center shadow-2xl 
                    transition-all duration-300 group-hover:scale-110 group-hover:rotate-3
                    ${scrolled ? "shadow-blue-900/30" : "shadow-blue-900/50"}
                  `}
                >
                  <img
                    src={logo}
                    alt="KBS Public School Logo"
                    className="w-10 h-10 object-contain"
                  />
                </div>
              </div>
              <div className="relative z-10">
                <h1 className="text-xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent transition-all duration-300">
                  KBS Public School
                </h1>
                <p
                  className={`text-xs transition-all duration-300 ${
                    scrolled ? "text-blue-200" : "text-blue-100"
                  }`}
                >
                  CBSE Affiliated
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={handleNavClick}
                  className={`
                    relative flex items-center px-5 py-3 rounded-lg transition-all duration-300
                    group
                    ${
                      item.isHighlighted
                        ? "bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-semibold shadow-lg hover:shadow-yellow-500/25"
                        : scrolled
                        ? "text-blue-100 hover:text-white hover:bg-white/10"
                        : "text-white/90 hover:text-white hover:bg-white/15"
                    }
                    ${
                      location.pathname === item.path && !item.isHighlighted
                        ? scrolled
                          ? "bg-white/15 text-white shadow-inner"
                          : "bg-white/20 text-white"
                        : ""
                    }
                  `}
                >
                  <span className="mr-2 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                  {item.name}

                  {/* Hover underline effect */}
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-300 to-purple-300 group-hover:w-3/4 transition-all duration-300"></span>

                  {/* Active indicator */}
                  {location.pathname === item.path && !item.isHighlighted && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-lg" />
                  )}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`
                lg:hidden p-3 rounded-xl transition-all duration-300 relative
                ${
                  scrolled
                    ? "text-white hover:bg-white/10"
                    : "text-white hover:bg-white/15"
                }
              `}
            >
              <div
                className={`w-6 h-6 flex items-center justify-center transition-all duration-300 ${
                  isOpen ? "rotate-90" : ""
                }`}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`
        lg:hidden fixed inset-0 z-40 transition-all duration-500
        ${
          isOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }
      `}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-900/60 to-purple-900/60 backdrop-blur-2xl"
          onClick={() => setIsOpen(false)}
        ></div>

        {/* Menu Panel */}
        <div
          className={`
          absolute top-0 right-0 h-full w-80 bg-gradient-to-b from-blue-900 to-purple-900 shadow-2xl
          transform transition-transform duration-500 ease-out border-l border-white/10
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-blue-900 to-purple-900">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-xl">
                  <School size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-white">
                    KBS Public School
                  </h1>
                  <p className="text-xs text-blue-200">
                    Shaping Tomorrow&apos;s Leaders
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-blue-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                {/* Menu Items */}
                <div className="space-y-2 mb-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => {
                        setIsOpen(false);
                        handleNavClick();
                      }}
                      className={`
                        flex items-center justify-between px-4 py-4 rounded-xl transition-all duration-300 group
                        ${
                          item.isHighlighted
                            ? "bg-gradient-to-r from-yellow-500 to-amber-500 text-white font-semibold shadow-lg"
                            : location.pathname === item.path
                            ? "bg-gradient-to-r from-blue-600/50 to-purple-600/50 text-white font-semibold"
                            : "text-blue-100 hover:text-white hover:bg-white/10"
                        }
                      `}
                    >
                      <div className="flex items-center">
                        <span className="mr-3 group-hover:scale-110 transition-transform">
                          {item.icon}
                        </span>
                        {item.name}
                      </div>
                      <div
                        className={`w-2 h-2 rounded-full ${
                          location.pathname === item.path
                            ? "bg-gradient-to-r from-blue-300 to-purple-300"
                            : "bg-white/30"
                        }`}
                      ></div>
                    </Link>
                  ))}
                </div>

                {/* Mobile CTA Section */}
                <div className="mb-8 p-5 bg-gradient-to-r from-blue-800/50 to-purple-800/50 rounded-2xl border border-white/10">
                  <h3 className="font-bold text-white mb-3 flex items-center">
                    <Sparkles size={16} className="mr-2 text-yellow-300" />
                    Admissions Open
                  </h3>
                  <p className="text-sm text-blue-100 mb-5">
                    2024-25 academic year applications are now being accepted
                  </p>
                  <div className="space-y-3">
                    <Link
                      to="/admissions"
                      className="block w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-center py-3.5 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={() => {
                        setIsOpen(false);
                        handleNavClick();
                      }}
                    >
                      Apply Online
                    </Link>
                    <Link
                      to="/contact"
                      className="block w-full bg-white/10 text-white text-center py-3.5 rounded-xl font-semibold border border-white/20 hover:bg-white/15 transition-all duration-300"
                      onClick={() => {
                        setIsOpen(false);
                        handleNavClick();
                      }}
                    >
                      Schedule Visit
                    </Link>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="p-4 bg-gradient-to-r from-blue-800/30 to-purple-800/30 rounded-xl">
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full animate-pulse"></div>
                    <span className="text-blue-100">
                      Admissions: +91 8052242453
                    </span>
                  </div>
                </div>

                {/* Motto */}
                <div className="mt-10 pt-6 border-t border-white/10 text-center">
                  <p className="text-xs text-blue-200/60 italic">
                    "Excellence Through Innovation & Integrity"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div
        className={`h-20 transition-all duration-300 ${
          scrolled ? "h-16" : "h-20"
        }`}
      ></div>
    </>
  );
};

export default Navbar;
