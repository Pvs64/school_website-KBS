import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { sendContactMessage } from "../services/api";

import {
  MapPin,
  Phone,
  Mail,
  User,
  Clock,
  ArrowRight,
  Info,
  Send,
  ChevronRight,
  ArrowLeft
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const adminInfo = [
    { value: '+91 80522 42453', label: 'Primary Mobile', icon: Phone, className: 'w-5 h-5' },
    { value: '+91 99196 88800', label: 'Alternate Mobile', icon: Phone, className: 'w-5 h-5' },
    { value: 'admin@kbsps.com', label: 'Admin Email', icon: Mail, className: 'w-5 h-5' }
  ];

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.96]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.9]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await sendContactMessage(formData);
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      console.log("Message sent successfully:", response.data);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Failed to send message. Please try again."
      );
      console.error("Error sending contact message:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-24 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-24 right-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-50 rounded-full mix-blend-multiply blur-3xl opacity-10 animate-pulse delay-500" />
      </div>

      {/* Hero - WITH ADMIN CARD ON RIGHT */}
      <motion.section
        ref={heroRef}
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="relative overflow-hidden bg-gradient-to-r from-blue-800 via-blue-700 to-purple-800 text-white py-14 md:py-24"
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
            className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12"
          >
            {/* LEFT: Text Content */}
            <div className="flex-1 min-w-0 order-2 lg:order-1">
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 }}
                className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-200 mb-4"
              >
                Contact KBS Public School
              </motion.p>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight"
              >
                We're here to{' '}
                <span className="bg-gradient-to-r from-yellow-300 to-amber-400 bg-clip-text text-transparent">
                  help you
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
                className="text-sm md:text-base text-blue-100 max-w-lg mb-8"
              >
                Have questions about admissions, academics or campus life? Reach out to us and our team will be happy to assist you.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href="tel:+917086063500"
                  className="group inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 text-sm font-semibold hover:from-yellow-500 hover:to-amber-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
                >
                  Call School Office
                  <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#contact-form"
                  className="group inline-flex items-center px-6 py-3 rounded-xl border-2 border-white/40 text-white text-sm font-semibold hover:border-white hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Send a Message
                  <ChevronRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            </div>

            {/* RIGHT: Admin Contact Card - EXACTLY LIKE ABOUT PAGE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
              className="flex-1 min-w-[260px] lg:min-w-[300px] order-1 lg:order-2"
            >
              <div className="bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur-xl shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mr-4">
                    <User className="text-white" size={24} />
                  </div>
                  <div className="text-m  tracking-[0.15em] text-blue-100 font-semibold">
                    Mr. Amit Kumar Singh (Administrative Head)
                  </div>                
                  </div>
                
                <ul className="space-y-4 text-sm text-blue-50">
                  {adminInfo.map((info, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="flex items-center cursor-pointer hover:bg-white/20 p-3 rounded-xl transition-all duration-300"
                    >
                      <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-4">
                        <info.icon className={`text-blue-200 ${info.className}`} />
                      </span>
                      <div>
                        <div className="font-bold text-lg">{info.value}</div>
                        <div className="text-blue-200 text-xs">{info.label}</div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Main content - YOUR ORIGINAL CODE (UNCHANGED) */}
      <div className="container mx-auto px-4 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
          {/* Contact Form */}
          <section id="contact-form">
            <div className="bg-white/90 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-lg border border-slate-100">
              <div className="flex items-center mb-4">
                <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                  <Send size={18} />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                  Send us a Message
                </h2>
              </div>
              <p className="text-sm text-gray-600 mb-5">
                Fill in the form below and our team will get back to you as soon
                as possible.
              </p>

              {success && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl mb-5 text-sm">
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-5 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                    required
                    disabled={loading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl text-sm font-semibold hover:from-blue-700 hover:to-blue-800 transition disabled:bg-blue-300"
                >
                  {loading ? "Sending..." : "Send Message"}
                  {!loading && <ArrowRight size={16} className="ml-2" />}
                </button>

                <p className="flex items-start text-xs text-gray-500 mt-2">
                  <Info size={12} className="mr-1 mt-0.5" />
                  By submitting this form, you agree to be contacted by the
                  school office regarding your query.
                </p>
              </form>
            </div>
          </section>

          {/* Contact Info */}
          <section>
            <div className="space-y-6">
              <div className="bg-white/90 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-lg border border-slate-100">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                  Contact Information
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                  Reach us through phone, email or visit the campus during
                  office hours.
                </p>

                <div className="space-y-5">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-xl mr-4">
                      <MapPin className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800">
                        Our Location
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Near Degree college, Gaura Hardo
                        <br />
                        Raebareli, UttarPradesh , 229204
                        <br />
                        India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-xl mr-4">
                      <Phone className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800">
                        Phone Numbers
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        School Office: +91‑8052242453
                        <br />
                        Admissions: +91‑9919688800
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-xl mr-4">
                      <Mail className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800">
                        Email
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        General: info@kbsps.com
                        <br />
                        Admissions: admissions@kbsps.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-xl mr-4">
                      <Clock className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800">
                        Office Hours
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Monday – Friday: 8:30 AM – 2:00 PM
                        <br />
                        Saturday: 8:30 AM – 1:00 PM
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-6 md:p-7 rounded-2xl border border-blue-100">
                <h3 className="text-base md:text-lg font-bold mb-2 text-gray-800">
                  Emergency Contact
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  For emergencies during school hours, please contact:
                </p>
                <div className="bg-white p-4 rounded-xl border border-red-100">
                  <p className="font-semibold text-red-600 text-sm">
                    Emergency Hotline: +91‑9919688800
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Available during school working hours.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Map Section */}
        <section className="mt-12 bg-white/90 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-lg border border-slate-100">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">
            Find Us on the Map
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Use the interactive map below to locate the school and plan your
            visit.
          </p>
          <div className="w-full h-72 md:h-96 rounded-2xl overflow-hidden border border-slate-100">
            <iframe 
              title="KBS Public School Location"
              src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d559.9680338161256!2d81.17575592843443!3d26.039196400777964!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1766066265730!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
