import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { getAnnouncements } from "../services/api";
import {
  Bell,
  Search,
  Filter,
  Calendar,
  Tag,
  ArrowLeft,
  Share2,
  Download,
  AlertCircle,
  Clock,
  Sparkles,
  ChevronRight,
  ExternalLink,
  X
} from "lucide-react";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalNotice, setActiveModalNotice] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getAnnouncements();
      setAnnouncements(res.data?.data || []);
    } catch (err) {
      console.error("Error fetching announcements:", err);
      setError("Failed to load announcements.");
    } finally {
      setLoading(false);
    }
  };

  const types = ["all", "news", "academic", "event", "holiday"];

  const filtered = announcements.filter((item) => {
    const matchesType = selectedType === "all" || item.type?.toLowerCase() === selectedType;
    const matchesQuery =
      searchQuery === "" ||
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.body?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesQuery;
  });

  const getTypeBadgeStyle = (type) => {
    switch (type?.toLowerCase()) {
      case "news":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "event":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "academic":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "holiday":
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white py-14 md:py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Link
              to="/"
              className="inline-flex items-center text-blue-200 text-xs md:text-sm font-semibold mb-4 hover:text-white transition-colors"
            >
              <ArrowLeft size={16} className="mr-1.5" />
              Back to Home
            </Link>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              Official School{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-amber-400 bg-clip-text text-transparent">
                Notices & Circulars
              </span>
            </h1>
            <p className="text-sm md:text-base text-blue-100 max-w-2xl mx-auto">
              Stay fully informed about examinations, admission updates, school events, and administrative circulars for KBS Public School.
            </p>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="container mx-auto px-4 max-w-6xl -mt-6">
        {/* Filters and Search Bar */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 md:p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search circulars by keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
              />
            </div>

            {/* Type Filter Buttons */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold capitalize transition-all ${
                    selectedType === type
                      ? "bg-blue-900 text-white shadow-md"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {type === "all" ? "All Notices" : type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Announcements List */}
        {loading ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-200">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-2 border-blue-200 border-t-blue-600 mb-4" />
            <p className="text-slate-600 text-sm font-medium">Loading circulars and notices...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16 bg-red-50 text-red-700 rounded-2xl border border-red-200 p-6">
            <AlertCircle size={36} className="mx-auto mb-2 text-red-500" />
            <p className="font-semibold">{error}</p>
            <button
              onClick={fetchData}
              className="mt-4 px-5 py-2 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border ${getTypeBadgeStyle(
                        item.type
                      )}`}
                    >
                      {item.type || "General"}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center font-medium">
                      <Calendar size={13} className="mr-1 text-slate-400" />
                      {new Date(item.publishedAt || item.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                      })}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors mb-2 line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-4">
                    {item.body}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-2">
                  <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-2.5 py-1 rounded-md">
                    {item.category || "Official Notice"}
                  </span>
                  <button
                    onClick={() => setActiveModalNotice(item)}
                    className="inline-flex items-center text-xs font-bold text-slate-800 hover:text-blue-700"
                  >
                    Read Details
                    <ChevronRight size={16} className="ml-0.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <Bell size={48} className="mx-auto text-slate-300 mb-3" />
            <h3 className="text-lg font-bold text-slate-800 mb-1">No Notices Found</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">
              No circulars matched your active filter or search keywords.
            </p>
            <button
              onClick={() => {
                setSelectedType("all");
                setSearchQuery("");
              }}
              className="px-5 py-2.5 bg-blue-900 text-white font-semibold rounded-xl text-xs hover:bg-blue-800 transition"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {activeModalNotice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl relative border border-slate-100 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setActiveModalNotice(null)}
                className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full uppercase border ${getTypeBadgeStyle(
                    activeModalNotice.type
                  )}`}
                >
                  {activeModalNotice.type}
                </span>
                <span className="text-xs text-slate-500 font-medium flex items-center">
                  <Calendar size={13} className="mr-1" />
                  {new Date(
                    activeModalNotice.publishedAt || activeModalNotice.createdAt
                  ).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  })}
                </span>
              </div>

              <h2 className="text-2xl font-extrabold text-slate-900 mb-4 leading-snug">
                {activeModalNotice.title}
              </h2>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-slate-700 text-sm md:text-base leading-relaxed whitespace-pre-line mb-6">
                {activeModalNotice.body}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
                <div className="text-xs text-slate-500">
                  Issued by: <span className="font-semibold text-slate-700">KBS Public School Administration</span>
                </div>
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition"
                >
                  <Download size={14} className="mr-1.5" />
                  Print / Save Notice
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Announcements;
