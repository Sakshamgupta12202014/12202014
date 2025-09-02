import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import axios from "axios";
import defaultAvatar from "./default-profile-image.png";

const baseURL = import.meta.env.VITE_BACKEND_URL;

function UserProfile() {
  const [img, setImg] = useState("");
  const [downloadURL, setDownloadURL] = useState("");

  useEffect(() => {
    // on login fetch user profile image

    async function fetchUserProfile() {
      try {
        const response = await axios.get(`${baseURL}/api/profile/getProfile`, {
          withCredentials: true,
        });

        if (response) {
          setDownloadURL(() => {
            if (response.data.avatar === "") {
              return defaultAvatar;
            }
            return response.data.avatar;
          });
        }
      } catch (error) {
        console.error("Error fetching user avatar:", error);
      }
    }

    fetchUserProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!img) {
      console.log("Avatar is not selected");
      return;
    }

    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "url-shortener");
    data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

    const avatar = await axios.post(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      }/image/upload`,
      data
    );

    const avatarUrl = avatar.data.url;
    setDownloadURL(avatarUrl);

    // here you will send the image url to the backend
    try {
      await axios.post(
        `${baseURL}/api/profile/setProfile`,
        { imageUrl: avatarUrl },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error saving avatar in db:", error);
    }
  };

  return (
    <div>
      <h1>User Profile</h1>

      <img className="user-avatar" src={downloadURL} alt="User Avatar" />
      {!img && (
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <button type="submit">Upload</button>
        </form>
      )}
    </div>
  );
}

export default UserProfile;
