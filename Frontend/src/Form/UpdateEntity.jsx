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
    <div className="text-center h-screen p-[2%] ">
      <div className="text-center flex-col justify-center font-bold ">
        <h1 className="text-[35px] text-black">Update Entity</h1>
        <p className="text-[20px] mb-[20px] ">
          Update the data using these form
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="mr-[18%]">
            <strong>Mongo_ID</strong>
          </label>
          <br />
          <input
            className="h-[30px] p-[8px] text-center w-[25%] border-[1px] border-black  "
            type="text"
            name="Mongo_ID"
            value={formData.Mongo_ID}
            onChange={handleChange}
            placeholder="Enter Mongo_ID"
            required
          />
        </div>
        <div>
          <label className="mr-[18%]">
            <strong>Game title</strong>
          </label>
          <br />
          <input
            className="h-[30px] p-[8px] text-center w-[25%] border-[1px] border-black  "
            type="text"
            name="gameTitle"
            value={formData.gameTitle}
            onChange={handleChange}
            placeholder="Game Title"
            required
          />
        </div>
        <div>
          <label className="mr-[17%]">
            <strong>Published By</strong>
          </label>
          <br />
          <input
            className="h-[30px] p-[8px] text-center w-[25%] border-[1px] border-black  "
            type="text"
            name="publishedBy"
            value={formData["publishedBy"]}
            onChange={handleChange}
            placeholder="Published By"
            required
          />
        </div>
        <div>
          <label className="mr-[15%]">
            <strong>Year Of Release</strong>
          </label>
          <br />
          <input
            className="h-[30px] p-[8px] text-center w-[25%] border-[1px] border-black  "
            type="numbe2"
            name="yearOfRelease"
            value={formData.yearOfRelease}
            onChange={handleChange}
            placeholder="Year of Release"
            required
          />
        </div>
        <div>
          <label className="mr-[13%]">
            <strong>Available Platforms</strong>
          </label>
          <br />
          <input
            className="h-[30px] p-[8px] text-center w-[25%] border-[1px] border-black  "
            type="text"
            name="availablePlatforms"
            value={formData.availablePlatforms}
            onChange={handleChange}
            placeholder="Available Platforms"
            required
          />
        </div>
        <div>
          <label className="mr-[15%]">
            <strong>Genre</strong>
          </label>
          <br />
          <input
            className="h-[30px] p-[8px] text-center w-[25%] border-[1px] border-black  "
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            placeholder="Genre"
            required
          />
        </div>
        <div>
          <label className="mr-[15%]">
            <strong>Description</strong>
          </label>
          <br />
          <input
            className="mb-[10px]h-[30px] p-[8px] text-center w-[25%] border-[1px] border-black  "
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            required
          />
        </div>

        <button
          className="border-[1px] border-bh-[30px]lack8-[10px] bg-yellow-200 "
          type="submit"
        >
          Update Entity
        </button>
      </form>
    </div>
  );
};

export default UpdateEntity;
