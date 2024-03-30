/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import axios from "axios";

const UpdateEntity = ({ onAddEntity }) => {
  const [formData, setFormData] = useState({
    Mongo_ID: "",
    gameTitle: "",
    publishedBy: "",
    yearOfRelease: 0,
    availablePlatforms: "",
    genre: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://s61-list-of-open-world-games.onrender.com/api/update/${formData.Mongo_ID}`,
        formData
      );
      if (response.status !== 200) {
        console.error(`Error: Received status code ${response.status}`);
        return;
      }
      const newEntity = response.data.data;
      if (!newEntity) {
        console.error("Error: No data received");
        return;
      }
      onAddEntity(newEntity);
      setFormData({
        Mongo_ID: "",
        gameTitle: "",
        publishedBy: "",
        yearOfRelease: 0,
        availablePlatforms: "",
        genre: "",
        description: "",
      });
    } catch (error) {
      console.error("Error updating entity:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Mongo_ID:</label>
          <input
            type="text"
            name="Mongo_ID"
            value={formData.Mongo_ID}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Game Title:</label>
          <input
            type="text"
            name="gameTitle"
            value={formData.gameTitle}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Published By:</label>
          <input
            type="text"
            name="publishedBy"
            value={formData["publishedBy"]}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Year of Release:</label>
          <input
            type="number"
            name="yearOfRelease"
            value={formData.yearOfRelease}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Available Platforms:</label>
          <input
            type="text"
            name="availablePlatforms"
            value={formData.availablePlatforms}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Genre:</label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Update Entity</button>
      </form>
    </div>
  );
};

export default UpdateEntity;
