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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Add New Entity</h1>
        <p className="text-lg text-gray-600">
          Fill out the form to add a new game
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg w-full max-w-lg p-6 space-y-4"
      >
        {[
          { label: "Game Title", name: "gameTitle", type: "text" },
          { label: "Published By", name: "publishedBy", type: "text" },
          { label: "Year of Release", name: "yearOfRelease", type: "text" },
          {
            label: "Available Platforms",
            name: "availablePlatforms",
            type: "text",
          },
          { label: "Genre", name: "genre", type: "text" },
          { label: "Description", name: "description", type: "text" },
        ].map((field, index) => (
          <div key={index} className="flex flex-col space-y-1">
            <label htmlFor={field.name} className="text-gray-700 font-medium">
              {field.label}
            </label>
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={`Enter ${field.label}`}
              className="h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              required
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full h-12 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
        >
          Add Entity
        </button>
      </form>
    </div>
  );
};

export default EntityForm;
