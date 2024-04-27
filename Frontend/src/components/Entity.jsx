/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
// import data from "../../data.json";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import UpdateEntity from "../Form/UpdateEntity";
import EntityForm from "../Form/EntityForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Entity = () => {
  const [data, setData] = useState(null);
  const [filterCreatedBy, setFilterCreatedBy] = useState("");
  const [similarCreatedByValues, setsimilarCreatedByValues] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://s61-list-of-open-world-games.onrender.com/api/data")
      .then((res) => res.json())
      .then((data) => {
        setData(data.data.reverse());
        const similarData = data.data.reduce((curr, item) => {
          if (!curr.includes(item.created_by)) {
            curr.push(item.created_by);
          }
          return curr;
        }, []);
        setsimilarCreatedByValues(similarData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(
        `https://s61-list-of-open-world-games.onrender.com/api/remove/${id}`
      )
      .then(() => {
        setData((prevData) => prevData.filter((item) => item._id !== id));
        console.log("Item deleted successfully.");
      })
      .catch((error) => console.error("Error deleting entity:", error));
  };

  const handleAddEntity = (newData) => {
    setData((prevData) => (prevData ? [...prevData, newData] : [newData]));
    navigate("/entity");
  };

  const filteredData = filterCreatedBy
    ? data.filter((item) => item.created_by === filterCreatedBy)
    : data;
  // console.log(filterCreatedBy)

  return (
    <>
      <button onClick={() => setShowUpdateForm(true)}>Update</button>

      {showUpdateForm && <UpdateEntity onAddEntity={handleAddEntity} />}

      <button onClick={() => setShowAddForm(true)}>Add Entity</button>

      {showAddForm && <EntityForm onAddEntity={handleAddEntity} />}

      <div className="my-4">
        <label htmlFor="filterCreatedBy">Filter by Created By:</label>
        <select
          id="filterCreatedBy"
          value={filterCreatedBy}
          onChange={(e) => setFilterCreatedBy(e.target.value)}
        >
          <option value="">All</option>
          {similarCreatedByValues.map((value, index) => (
            <option key={index} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      {filteredData &&
        filteredData.map((game, i) => (
          <div key={i}>
            <Card>
              <CardContent>
                <div className="text-4xl font-bold mb-4">{game._id}</div>
                <div className="text-xl p-[10px]">
                  <strong className="p-[5px]">Id</strong> : {game.id}
                </div>
                <div className="text-xl p-[10px]">
                  <strong className="p-[5px]">Game Title</strong> :{" "}
                  {game.gameTitle}
                </div>
                <div className="text-lg p-[10px]">
                  <strong className="p-[5px]">Published By</strong> :{" "}
                  {game.publishedBy}
                </div>
                <div className="text-lg p-[10px]">
                  <strong className="p-[5px]">Year Of Release</strong> :{" "}
                  {game.yearOfRelease}
                </div>
                <div className="text-lg p-[10px]">
                  <strong className="p-[5px]">Available Platforms</strong> :{" "}
                  {game.availablePlatforms}
                </div>
                <div className="text-lg p-[10px]">
                  <strong className="p-[5px]">Genre</strong> : {game.genre}
                </div>
                <div className="text-lg p-[10px]">
                  <strong className="p-[5px]">Description</strong> :{" "}
                  {game.description}
                </div>
                <div className="text-lg p-[10px]">
                  <strong className="p-[5px]">Created By</strong> :{" "}
                  {game.created_by}
                </div>

                <button
                  className="border-[1px] border-black px-[10px] py-[5px]"
                  onClick={() => handleDelete(game._id)}
                >
                  Delete
                </button>
              </CardContent>
            </Card>
          </div>
        ))}
    </>
  );
};

export default Entity;
