import { Link } from "react-router-dom";
import logo from "../../assets/logos/logo.png";
import {
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Facebook",
      icon: <Facebook size={20} />,
      url: "#",
      color: "hover:bg-blue-600",
    },
    {
      name: "Instagram",
      icon: <Instagram size={20} />,
      url: "#",
      color: "hover:bg-gradient-to-r from-pink-500 to-yellow-500",
    },
    {
      name: "YouTube",
      icon: <Youtube size={20} />,
      url: "#",
      color: "hover:bg-red-600",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin size={20} />,
      url: "#",
      color: "hover:bg-blue-700",
    },
    {
      name: "Twitter",
      icon: <Twitter size={20} />,
      url: "#",
      color: "hover:bg-blue-400",
    },
  ];

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden text-white">
      {/* Background Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, #222d3e, #252e3c, #282e3b, #2b2f39, #2d3037)",
        }}
      ></div>

      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
        ></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
          <div className="grid gap-10 md:gap-12 lg:gap-16 md:grid-cols-2 items-start">
            {/* School Logo & Social Media */}
            <div className="flex flex-col items-center md:items-start space-y-6">
              <button
                type="button"
                onClick={handleScrollTop}
                className="focus:outline-none"
              >
                <img
                  src={logo}
                  alt="KBS Public School Logo"
                  className="w-40 h-40 sm:w-40 sm:h-40 object-contain hover:scale-105 transition-transform duration-300"
                />
              </button>

              <p className="text-sm sm:text-base text-gray-300 text-center md:text-left max-w-sm">
                KBS Public School is committed to holistic development and
                academic excellence.
              </p>
              <p className="text-xl font-semibold text-white text-center md:text-left max-w-sm">
                Follow Us
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    onClick={handleScrollTop}
                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gray-800 flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 ${social.color}`}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col items-center md:items-end space-y-6">
              <div className="w-full max-w-md md:max-w-none space-y-4">
                <h4 className="text-xl font-semibold text-white text-center md:text-right">
                  Contact Info
                </h4>

                <div className="space-y-3 text-sm sm:text-base">
                  <div className="flex items-start gap-3 justify-center md:justify-end">
                    <MapPin
                      size={18}
                      className="text-blue-400 flex-shrink-0 mt-0.5"
                    />
                    <p className="text-gray-300 text-center md:text-right">
                      Gaura Garhi, Raebareli, Uttar Pradesh 229204
                    </p>
                  </div>

                  <div className="flex items-center gap-3 justify-center md:justify-end">
                    <Phone
                      size={18}
                      className="text-green-400 flex-shrink-0"
                    />
                    <a
                      href="tel:+918052242453"
                      onClick={handleScrollTop}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      +91 8052242453
                    </a>
                  </div>

                  <div className="flex items-center gap-3 justify-center md:justify-end">
                    <Mail
                      size={18}
                      className="text-yellow-400 flex-shrink-0"
                    />
                    <a
                      href="mailto:kbsps@gmail.com"
                      onClick={handleScrollTop}
                      className="text-gray-300 hover:text-white transition-colors break-all"
                    >
                      kbsps@gmail.com
                    </a>
                  </div>

                  <div className="flex items-center gap-3 justify-center md:justify-end">
                    <Clock
                      size={18}
                      className="text-purple-400 flex-shrink-0"
                    />
                    <p className="text-gray-300">
                      Mon–Sat: 8:00 AM – 1:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Optional quick links that also scroll top */}
              <div className="flex flex-wrap justify-center md:justify-end gap-3 text-xs sm:text-sm text-gray-300">
                <Link
                  to="/"
                  onClick={handleScrollTop}
                  className="hover:text-white transition-colors"
                >
                  Home
                </Link>
                <span className="opacity-40">•</span>
                <Link
                  to="/admissions"
                  onClick={handleScrollTop}
                  className="hover:text-white transition-colors"
                >
                  Admissions
                </Link>
                <span className="opacity-40">•</span>
                <Link
                  to="/contact"
                  onClick={handleScrollTop}
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700" />

        {/* Bottom Section */}
        <div className="py-4 sm:py-5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-xs sm:text-sm text-gray-400">
              © {currentYear} KBS Public School. All rights reserved.
            </p>
            <p className="text-center text-xs py-2 sm:text-sm text-gray-400">
              Website designed and developed by Praphull Vikram Singh
            </p>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="pointer-events-none absolute bottom-6 right-4 sm:bottom-10 sm:right-10 w-16 h-16 sm:w-20 sm:h-20 bg-blue-500/10 rounded-full blur-xl"></div>
      <div className="pointer-events-none absolute top-10 left-4 sm:top-20 sm:left-10 w-24 h-24 sm:w-32 sm:h-32 bg-purple-500/10 rounded-full blur-xl"></div>
    </footer>
  );
};

export default Footer;
