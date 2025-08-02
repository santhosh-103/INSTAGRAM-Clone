import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function ViewStory() {
  const { id, tot } = useParams();
  const [story, setStory] = useState(null);
  const navigate = useNavigate();

  // Redirect if the id is out of range
  useEffect(() => {
    const storyId = Number(id);
    const total = Number(tot);

    if (isNaN(storyId) || isNaN(total) || storyId <= 0 || storyId > total) {
      navigate("/");
    }
  }, [id, tot, navigate]);

  // Fetch the story data
  useEffect(() => {
    fetch(`http://localhost:3000/story/${id}`)
      .then((res) => res.json())
      .then((data) => setStory(data))
      .catch((err) => console.error("Fetch error:", err));
  }, [id]);

  return (
    <div>
      {story ? (
        <div className="d-flex justify-content-center align-items-center">
          {Number(id) > 1 && (
            <Link to={`/story/${Number(id) - 1}/${tot}`}>
              <i className="bi bi-arrow-left-circle-fill fs-2 mx-3"></i>
            </Link>
          )}

          <img
            className="vh-100"
            src={story.content?.image || "/fallback-image.jpg"}
            alt="story"
            onError={(e) => {
              e.target.src = "/fallback-image.jpg";
            }}
          />

          {Number(id) < Number(tot) && (
            <Link to={`/story/${Number(id) + 1}/${tot}`}>
              <i className="bi bi-arrow-right-circle-fill fs-2 mx-3"></i>
            </Link>
          )}
        </div>
      ) : (
        <div>Loading.....</div>
      )}
    </div> 
  );
}

export default ViewStory;
