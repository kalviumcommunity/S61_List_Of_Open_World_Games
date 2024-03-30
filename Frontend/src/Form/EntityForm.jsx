/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";

const EntityForm = ({ onAddEntity }) => {
  const [formData, setFormData] = useState({
    gameTitle: "",
    publishedBy: "",
    yearOfRelease: "",
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
      const response = await axios.post(
        "https://s61-list-of-open-world-games.onrender.com/api/add",
        formData
      );
      const newEntity = response.data.data;
      onAddEntity(newEntity);
      setFormData({
        gameTitle: "",
        publishedBy: "",
        yearOfRelease: "",
        availablePlatforms: "",
        genre: "",
        description: "",
      });
    } catch (error) {
      console.error("Error adding entity:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="ml-[30%]">Game Title:</label>
          <input
            type="text"
            name="gameTitle"
            value={formData.gameTitle}
            onChange={handleChange}
            required
            className="border-[1px] border-black m-[20px]"
          />
        </div>
        <div>
          <label className="ml-[30%]">Published By:</label>
          <input
            type="text"
            name="publishedBy"
            value={formData.publishedBy}
            onChange={handleChange}
            required
            className="border-[1px] border-black m-[20px]"
          />
        </div>
        <div>
          <label className="ml-[30%]">Year of Release:</label>
          <input
            type="text"
            name="yearOfRelease"
            value={formData.yearOfRelease}
            onChange={handleChange}
            required
            className="border-[1px] border-black m-[20px]"
          />
        </div>
        <div>
          <label className="ml-[30%]">Available Platforms:</label>
          <input
            type="text"
            name="availablePlatforms"
            value={formData.availablePlatforms}
            onChange={handleChange}
            required
            className="border-[1px] border-black m-[20px]"
          />
        </div>
        <div>
          <label className="ml-[30%]">Genre:</label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
            className="border-[1px] border-black m-[20px]"
          />
        </div>
        <div>
          <label className="ml-[30%]">Description:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="border-[1px] border-black m-[20px]"
          />
        </div>

        <button
          type="submit"
          className="border-[1px] border-black p-[10px] flex-center ml-[40%] mt-[20px]"
        >
          Add Entity
        </button>
      </form>
    </div>
  );
};

export default EntityForm;
