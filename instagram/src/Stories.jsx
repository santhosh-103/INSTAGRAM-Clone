import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Stories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStories = async () => {
      try {
        console.log("Fetching stories from server...");
        const response = await fetch("http://localhost:3000/story");

        if (!response.ok) {
          throw new Error(`Server returned ${response.status}`);
        }

        const data = await response.json();
        console.log("Received stories:", data);

        if (!Array.isArray(data)) {
          throw new Error("Expected array of stories");
        }

        setStories(data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  const handleStoryClick = (storyId) => {
    console.log("Navigating to story:", storyId);
    navigate(`/story/${storyId}/${stories.length}`);
  };

  if (loading) return <div className="story d-flex">Loading stories...</div>;
  if (error) return <div className="story d-flex">Error: {error}</div>;

  return (
    <div className="story d-flex">
      {stories.map((story) => (
        <div 
          key={story.id} 
          className="ms-1"
          onClick={() => handleStoryClick(story.id)}
          style={{ cursor: "pointer" }}
        >
          <div className="gradient-border">
            <img
              src={story.user.profile_img}
              alt={story.user.username}
              className="story-dp rounded-circle"
              onError={(e) => {
                console.error("Image failed to load:", story.user.profile_img);
                e.target.src = '/fallback-image.jpg';
              }}
            />
          </div>
          <p className="text-truncate text-center" style={{ width: "60px" }}>
            {story.user.username}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Stories;
