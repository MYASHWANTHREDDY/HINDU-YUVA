import { useState, useEffect } from 'react';
import { API_URL } from '../constants/api';

function Gallery() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [mediaModalOpen, setMediaModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);

  useEffect(() => {
    loadAlbums();
  }, []);

  const loadAlbums = async () => {
    try {
      const response = await fetch(`${API_URL}/api/gallery`);
      if (response.ok) {
        const data = await response.json();
        setAlbums(data);
      }
    } catch (error) {
      console.error('Error loading gallery:', error);
    }
    setLoading(false);
  };

  // Check if URL is a YouTube/Vimeo embed
  const isEmbedVideo = (url) => {
    return url.includes('youtube.com') || url.includes('youtu.be') || url.includes('vimeo.com');
  };

  // Convert YouTube URL to embed URL
  const getEmbedUrl = (url) => {
    if (url.includes('youtube.com/watch')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('youtu.be')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('vimeo.com')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return url;
  };

  if (loading) {
    return (
      <div className="pt-[50px] p-10 min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="text-xl text-gray-600 animate-pulse">Loading gallery...</div>
      </div>
    );
  }

  return (
    <div className="pt-[50px] p-10 min-h-screen bg-orange-50">
      <h1 className="text-4xl font-bold mb-10 text-center">Gallery</h1>
      
      {albums.length === 0 ? (
        <div className="text-center text-gray-600 py-20">
          <p className="text-xl">No albums yet</p>
          <p className="text-sm mt-2">Check back soon for photos and videos from our events!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {albums.map((album) => (
            <div
              key={album.id}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center cursor-pointer hover:shadow-lg transition"
              onClick={() => {
                setSelectedAlbum(album);
                setModalOpen(true);
              }}
            >
              {album.coverImage ? (
                <img
                  src={album.coverImage}
                  alt={album.name}
                  loading="lazy"
                  className="w-full h-40 object-cover rounded-xl mb-4"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 rounded-xl mb-4 flex items-center justify-center">
                  <span className="text-4xl">🖼️</span>
                </div>
              )}
              <h2 className="text-xl font-semibold text-orange-700 mb-2 text-center">{album.name}</h2>
              {album.description && (
                <p className="text-gray-600 text-sm mb-2 text-center">{album.description}</p>
              )}
              <span className="text-gray-500 text-sm">
                {album.media?.filter(m => m.type === 'image').length || 0} photos
                {album.media?.filter(m => m.type === 'video').length > 0 && 
                  `, ${album.media?.filter(m => m.type === 'video').length} videos`
                }
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Album Modal */}
      {modalOpen && selectedAlbum && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-xl shadow-lg p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-orange-600 text-3xl font-bold"
              onClick={() => setModalOpen(false)}
            >
              &times;
            </button>
            <h2 className="text-3xl font-bold text-orange-700 mb-2">{selectedAlbum.name}</h2>
            {selectedAlbum.description && (
              <p className="text-gray-600 mb-6">{selectedAlbum.description}</p>
            )}
            
            {selectedAlbum.media?.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {selectedAlbum.media.map((item, i) => (
                  <div
                    key={i}
                    className="relative cursor-pointer group"
                    onClick={() => {
                      setSelectedMedia(item);
                      setMediaModalOpen(true);
                    }}
                  >
                    {item.type === 'image' ? (
                      <img
                        src={item.url}
                        alt={`${selectedAlbum.name} ${i + 1}`}
                        className="w-full h-32 object-cover rounded-lg group-hover:opacity-90 transition"
                      />
                    ) : (
                      <div className="w-full h-32 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-gray-700 transition">
                        <span className="text-white text-4xl">▶️</span>
                      </div>
                    )}
                    {/* Source indicator */}
                    <span className={`absolute top-1 right-1 text-xs px-1.5 py-0.5 rounded ${
                      item.source === 'drive' ? 'bg-green-500 text-white' :
                      item.source === 'link' ? 'bg-purple-500 text-white' :
                      'bg-blue-500 text-white'
                    }`}>
                      {item.type === 'video' ? '🎬' : '📷'}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-10">No media in this album yet</p>
            )}
          </div>
        </div>
      )}

      {/* Media Viewer Modal */}
      {mediaModalOpen && selectedMedia && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[60] p-4"
          onClick={() => setMediaModalOpen(false)}
        >
          <div
            className="bg-white rounded-xl shadow-lg p-4 max-w-4xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end gap-4 mb-4">
              {selectedMedia.type === 'image' && (
                <a
                  href={selectedMedia.url}
                  download
                  className="text-gray-500 hover:text-orange-600 text-2xl"
                  title="Download"
                >
                  ⬇️
                </a>
              )}
              <button
                className="text-gray-500 hover:text-orange-600 text-3xl font-bold leading-none"
                onClick={() => setMediaModalOpen(false)}
              >
                &times;
              </button>
            </div>
            
            {selectedMedia.type === 'image' ? (
              <img
                src={selectedMedia.url}
                alt="Gallery"
                className="w-full max-h-[75vh] object-contain rounded-lg"
              />
            ) : isEmbedVideo(selectedMedia.url) ? (
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src={getEmbedUrl(selectedMedia.url)}
                  className="absolute inset-0 w-full h-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <video
                src={selectedMedia.url}
                controls
                className="w-full max-h-[75vh] rounded-lg"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;
