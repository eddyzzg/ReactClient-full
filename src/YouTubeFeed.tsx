import React, { useEffect, useState } from 'react';

interface YouTubeFeedProps {
  apiKey: string;
  channelId: string;
}

interface Video {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    thumbnails: { medium: { url: string } };
  };
}

const YouTubeFeed: React.FC<YouTubeFeedProps> = ({ apiKey, channelId }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const URL = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&order=date&maxResults=10`

    fetch(
      URL
    ).then(res => res.json())
     .then(data => {
        setVideos(data.items);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Ładowanie...</div>;
  if (error) return <div>Błąd: {error}</div>;

  return (
    <div>
      {videos.map((video, index) => (
        <div className="video-card" key={index}>
            <div className="video-frame">
            <iframe
                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                title={video.snippet.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
            </div>
            <div className="video-info">
            <h3 className="video-title">{video.snippet.title}</h3>
            <p className="video-description">{video.snippet.description}</p>
            </div>
        </div>
        ))}
    </div>
  );
};

export default YouTubeFeed;