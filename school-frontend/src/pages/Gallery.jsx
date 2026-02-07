import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getGalleryAlbums } from "../services/api";

const Gallery = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await getGalleryAlbums();
      console.log("Gallery data:", response.data);
      setAlbums(response.data.data);
    } catch (error) {
      console.error("Error fetching gallery albums:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        School Gallery
      </h1>
      
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Explore our collection of memories from various school events, activities, and celebrations.
      </p>
      
      {loading ? (
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading gallery albums...</p>
        </div>
      ) : albums.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {albums.map((album) => (
            <div key={album._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-64 overflow-hidden">
                <img 
                  src={album.coverImageUrl} 
                  alt={album.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800";
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">{album.name}</h3>
                {album.description && (
                  <p className="text-gray-600 mb-4">{album.description}</p>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">
                    {album.photos?.length || 0} photos
                  </span>
                  <Link 
                    to={`/gallery/${album.slug || album._id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    View Album
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-4">📷</div>
          <p className="text-lg text-gray-600 mb-4">
            No gallery albums available yet. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
};

export default Gallery;
