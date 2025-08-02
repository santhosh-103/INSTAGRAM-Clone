import React, { useState, useEffect } from "react";
import axios from "axios";

function Suggestion() {
  const [profile, setProfile] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/profile")
      .then((response) => response.json())
      .then((data) => setProfile(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/suggestions")
      .then((response) => response.json())
      .then((data) => setSuggestions(data))
      .catch((err) => console.log(err));
  }, []);

  const handleFollow = async (id, username) => {
    try {
      await axios.post("http://localhost:3000/followers", {
        id,
        username,
      });
      alert("Followed successfully");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="suggestions w-75 m-4">
      {/* Profile Section */}
      {profile ? (
        <div className="d-flex">
          <img
            className="dp rounded-circle"
            src={profile.profile_img}
            alt="Profile Pic"
          />
          <h5>{profile.username}</h5>
          <p className="btn ms-auto btn-primary btn-sm">Switch</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}

      {/* Suggestions Header */}
      <div className="d-flex">
        <p>Suggested for you</p>
        <h5 className="ms-auto">See All</h5>
      </div>

      {/* Suggestions List */}
      {suggestions.length > 0 ? (
        <div>
          {suggestions.map((suggestion) => (
            <div className="my-2" key={suggestion.id}>
              <div className="d-flex">
                <img
                  className="dp rounded-circle"
                  src={suggestion.profile_img}
                  alt="Profile Pic"
                />
                <h5>{suggestion.username}</h5>
                <button
                  className="btn btn-primary btn-sm ms-auto"
                  onClick={() =>
                    handleFollow(suggestion.id, suggestion.username)
                  }
                >
                  Follow
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading suggestions...</p>
      )}
    </div>
  );
}

export default Suggestion;
