import React, { useEffect, useState } from 'react';
import YouTubeFeedFilter from './YouTubeFeedFilter';
import { useFullPageLoader } from './hooks/useFullPageLoader';

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

export default function YouTubeFeed({ apiKey, channelId }: YouTubeFeedProps) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [maxResult, setMaxResult] = useState('10');
  const { showLoader, hideLoader, LoaderComponent } = useFullPageLoader();

  //dla fetch'a
  useEffect(() => {
    setLoading(true);
    setError(null);
    showLoader();

    const URL = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}`
      + `&channelId=${channelId}&part=snippet&order=date&maxResults=${maxResult}`;

    fetch(URL)
      .then(res => res.json())
      .then(data => {
        setVideos(data.items);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [apiKey, channelId, maxResult]);

  //dla loadera
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        hideLoader();
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [loading, hideLoader]);

  const handleFilterChange = (val: string) => {
    setMaxResult(val);
  };

  if (loading) return LoaderComponent;
  if (error) return <div>Błąd: {error}</div>;

  return (
    <div>
      <h1>Ostatnie wideo:</h1>
      <div style={{ width: 200, padding: 16 }}>
        <YouTubeFeedFilter value={maxResult} onChange={handleFilterChange} />
      </div>
      {videos.map((video, idx) => (
        <div className="video-card" key={idx}>
          <div className="video-frame">
            <iframe
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              title={video.snippet.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="video-info">
            <h3 className="video-title">{video.snippet.title}</h3>
            <p className="video-description">{video.snippet.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
