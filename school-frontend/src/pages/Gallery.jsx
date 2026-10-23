import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getGalleryAlbums } from "../services/api";
import {
  Image as ImageIcon,
  Camera,
  Calendar,
  Layers,
  ArrowRight,
  Sparkles,
  Search
} from "lucide-react";

const Gallery = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      setLoading(true);
      const response = await getGalleryAlbums();
      setAlbums(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching gallery albums:", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ["all", "Sports", "Science", "Cultural", "Celebrations", "Campus"];

  const filteredAlbums = albums.filter((alb) => {
    if (selectedCategory === "all") return true;
    return alb.category?.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white py-16 md:py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-blue-200 text-xs font-semibold uppercase tracking-wider mb-4 border border-white/10">
              <Camera size={14} className="mr-2 text-yellow-300" />
              Memories & Milestones
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              School{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-amber-400 bg-clip-text text-transparent">
                Photo Gallery
              </span>
            </h1>
            <p className="text-sm md:text-base text-blue-100 max-w-xl mx-auto">
              Capturing vibrant moments of student creativity, sports triumphs, cultural fests, and joyful campus life at KBS Public School.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-6xl -mt-6">
        {/* Category Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold capitalize transition-all ${
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? "bg-blue-900 text-white shadow-md"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {cat === "all" ? "All Albums" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Albums Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
                <div className="h-56 bg-slate-200" />
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-slate-200 rounded w-3/4" />
                  <div className="h-3 bg-slate-200 rounded w-full" />
                  <div className="h-3 bg-slate-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredAlbums.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAlbums.map((album) => (
              <motion.div
                key={album._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
              >
                <div>
                  <div className="h-56 overflow-hidden relative">
                    <img
                      src={album.coverImageUrl}
                      alt={album.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800";
                      }}
                    />
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
                      {album.category || "Campus"}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-slate-800 text-xs font-bold px-2.5 py-1 rounded-lg flex items-center shadow-md">
                      <ImageIcon size={13} className="mr-1 text-blue-600" />
                      {album.photos?.length || 0} Photos
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-slate-900 group-hover:text-blue-700 transition-colors">
                      {album.name}
                    </h3>
                    {album.description && (
                      <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed mb-4">
                        {album.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-xs text-slate-500 font-medium flex items-center">
                    <Calendar size={13} className="mr-1" />
                    {album.eventDate || new Date(album.createdAt).toLocaleDateString()}
                  </span>
                  <Link
                    to={`/gallery/${album.slug || album._id}`}
                    className="inline-flex items-center text-sm font-bold text-blue-900 group-hover:text-blue-700"
                  >
                    View Album
                    <ArrowRight size={16} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-2xl shadow-sm border border-slate-200 text-center max-w-md mx-auto">
            <Camera className="mx-auto text-slate-300 mb-3" size={48} />
            <h3 className="text-lg font-bold text-slate-800 mb-1">No Albums in this Category</h3>
            <p className="text-sm text-slate-500 mb-4">
              Try selecting a different filter category to see photos.
            </p>
            <button
              onClick={() => setSelectedCategory("all")}
              className="px-5 py-2 bg-blue-900 text-white rounded-xl text-xs font-semibold hover:bg-blue-800"
            >
              Show All Albums
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
