import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [unfollowed, setUnfollowed] = useState(0);

  useEffect(() => {
    axios
      .get('http://localhost:3000/profile')
      .then((res) => setProfile(res.data))
      .catch((err) => console.log(err));

    axios
      .get('http://localhost:3000/followers')
      .then((res) => setFollowers(res.data))
      .catch((err) => console.log(err));
  }, [unfollowed]);

  const handleOnChange = (e) => {
    setProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async () => {
    axios
      .put('http://localhost:3000/profile', profile)
      .then(() => console.log('Updated'))
      .catch((err) => console.log(err));
  };

  const handleUnFollow = async (id) => {
    axios
      .delete(`http://localhost:3000/followers/${id}`)
      .then(() => {
        alert('Unfollowed');
        setUnfollowed((prev) => prev + 1);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="m-5">
      {profile ? (
        <div>
          <img
            src={profile.profile_img}
            alt={`${profile.username}'s profile`}
            className="profile rounded-circle"
          />
          <h5>{profile.username}</h5>

          <input
            type="text"
            value={profile.username}
            name="username"
            className="form-control my-4"
            onChange={handleOnChange}
          />

          <input
            type="text"
            name="profile_img"
            value={profile.profile_img}
            className="form-control"
            onChange={handleOnChange}
          />

          <button className="btn btn-primary my-4" onClick={handleUpdate}>
            Update
          </button>
        </div>
      ) : (
        <div>Loading profile...</div>
      )}

      {followers.length > 0 ? (
        followers.map((follower) => (
          <div key={follower.id} className="d-flex my-1 align-items-center">
            {follower.username}
            <button
              className="btn btn-secondary ms-auto"
              onClick={() => handleUnFollow(follower.id)}
            >
              Unfollow
            </button>
          </div>
        ))
      ) : (
        <div>Loading followers...</div>
      )}
    </div>
  );
}

export default Profile;
