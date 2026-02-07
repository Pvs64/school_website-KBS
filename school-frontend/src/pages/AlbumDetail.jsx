import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const AlbumDetail = () => {
  const { slug } = useParams();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For now, we'll simulate fetching data
    // In real app, you'd fetch from API: /api/gallery/:id
    setTimeout(() => {
      const mockAlbums = [
        {
          _id: "1",
          name: "Annual Sports Day 2024",
          slug: "annual-sports-day-2024",
          description: "Photos from our annual sports day event held on February 20, 2024. Students participated in various athletic events and team sports.",
          coverImageUrl: "https://images.unsplash.com/photo-1549060279-7e168fce7090?w=800",
          photos: [
            "https://images.unsplash.com/photo-1549060279-7e168fce7090?w=800",
            "https://images.unsplash.com/photo-1543321269-9d86d3680e1c?w=800",
            "https://images.unsplash.com/photo-1543321269-83f5f8c0c869?w=800",
            "https://images.unsplash.com/photo-1549060279-7e168fce7091?w=800",
            "https://images.unsplash.com/photo-1543321269-9d86d3680e1d?w=800",
            "https://images.unsplash.com/photo-1543321269-83f5f8c0c86a?w=800"
          ],
          createdAt: "2024-02-21T10:00:00.000Z"
        }
      ];
      
      const foundAlbum = mockAlbums.find(a => a.slug === slug);
      setAlbum(foundAlbum);
      setLoading(false);
    }, 500);
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Loading album...</p>
      </div>
    );
  }

  if (!album) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Album not found</h1>
        <p className="text-gray-600 mb-6">The album you're looking for doesn't exist.</p>
        <Link to="/gallery" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Back to Gallery
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <Link to="/gallery" className="text-blue-600 hover:text-blue-800 mb-6 inline-block">
        ← Back to Gallery
      </Link>
      
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{album.name}</h1>
      <p className="text-gray-600 mb-8 max-w-3xl">{album.description}</p>
      
      <div className="mb-6 text-gray-500 text-sm">
        <span>{album.photos?.length || 0} photos • Created on {new Date(album.createdAt).toLocaleDateString()}</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {album.photos?.map((photo, index) => (
          <div key={index} className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <img 
              src={photo} 
              alt={`${album.name} - Photo ${index + 1}`}
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800";
              }}
            />
            <div className="p-4 bg-white">
              <p className="text-gray-600 text-center">Photo {index + 1}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumDetail;
