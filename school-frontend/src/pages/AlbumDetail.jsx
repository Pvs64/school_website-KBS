import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getGalleryAlbum } from "../services/api";
import {
  ArrowLeft,
  Calendar,
  Image as ImageIcon,
  Share2,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2
} from "lucide-react";

const AlbumDetail = () => {
  const { slug } = useParams();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);

  useEffect(() => {
    fetchAlbum();
  }, [slug]);

  const fetchAlbum = async () => {
    try {
      setLoading(true);
      const res = await getGalleryAlbum(slug);
      if (res.data && res.data.data) {
        setAlbum(res.data.data);
      }
    } catch (err) {
      console.error("Error loading album details:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleNextPhoto = (e) => {
    e.stopPropagation();
    if (album?.photos?.length) {
      setActivePhotoIndex((prev) => (prev + 1) % album.photos.length);
    }
  };

  const handlePrevPhoto = (e) => {
    e.stopPropagation();
    if (album?.photos?.length) {
      setActivePhotoIndex((prev) => (prev - 1 + album.photos.length) % album.photos.length);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-24 px-4 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-2 border-blue-200 border-t-blue-600 mb-4" />
        <p className="text-slate-600 font-medium">Loading photo album...</p>
      </div>
    );
  }

  if (!album) {
    return (
      <div className="container mx-auto py-24 px-4 text-center max-w-md">
        <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
          <ImageIcon size={32} />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Album Not Found</h1>
        <p className="text-slate-600 mb-6 text-sm">
          The photo collection you requested could not be located.
        </p>
        <Link
          to="/gallery"
          className="inline-flex items-center px-6 py-2.5 bg-blue-900 text-white rounded-xl text-sm font-semibold hover:bg-blue-800 transition"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to School Gallery
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/gallery"
              className="inline-flex items-center text-blue-200 text-xs md:text-sm font-semibold mb-4 hover:text-white transition-colors"
            >
              <ArrowLeft size={16} className="mr-1.5" />
              Back to Gallery
            </Link>

            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-200 border border-blue-400/30">
                {album.category || "Campus Event"}
              </span>
              <span className="text-xs text-blue-200 flex items-center">
                <Calendar size={13} className="mr-1" />
                {album.eventDate || new Date(album.createdAt).toLocaleDateString()}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
              {album.name}
            </h1>

            <p className="text-blue-100 text-sm md:text-base leading-relaxed max-w-3xl">
              {album.description}
            </p>
          </div>
        </div>
      </section>

      {/* Photos Grid */}
      <div className="container mx-auto px-4 max-w-6xl mt-8">
        <div className="flex items-center justify-between mb-6">
          <div className="text-slate-600 text-sm font-semibold">
            {album.photos?.length || 0} Photographs
          </div>
          <div className="text-xs text-slate-500">
            Click any photo to view full-screen
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {album.photos?.map((photo, index) => (
            <div
              key={index}
              onClick={() => setActivePhotoIndex(index)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-2xl transition-all duration-300 aspect-[4/3] border border-slate-100"
            >
              <img
                src={photo}
                alt={`${album.name} - Photo ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                <span className="text-white text-xs font-semibold">
                  Photo #{index + 1}
                </span>
                <span className="p-2 bg-white/20 backdrop-blur-md rounded-lg text-white">
                  <Maximize2 size={16} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activePhotoIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActivePhotoIndex(null)}
        >
          <button
            onClick={() => setActivePhotoIndex(null)}
            className="absolute top-5 right-5 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition z-10"
          >
            <X size={24} />
          </button>

          <button
            onClick={handlePrevPhoto}
            className="absolute left-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition z-10"
          >
            <ChevronLeft size={28} />
          </button>

          <div
            className="max-w-5xl max-h-[85vh] relative flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={album.photos[activePhotoIndex]}
              alt={`${album.name} full view`}
              className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl"
            />
            <div className="mt-4 text-center text-white text-sm">
              <span className="font-semibold">{album.name}</span> • Photo {activePhotoIndex + 1} of {album.photos.length}
            </div>
          </div>

          <button
            onClick={handleNextPhoto}
            className="absolute right-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition z-10"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </div>
  );
};

export default AlbumDetail;
