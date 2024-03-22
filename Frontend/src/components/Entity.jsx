/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
// import data from "../../data.json";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import EntityForm from "../Form/EntityForm";

const Entity = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://s61-list-of-open-world-games.onrender.com/api/data")
      .then((res) => res.json())
      .then((data) => setData(data.data.reverse()));
  }, []);
  console.log(data);

  const handleAddEntity = (newData) => {
    setData((prevData) => (prevData ? [...prevData, newData] : [newData]));
  };

  return (
    <div>
      <EntityForm onAddEntity={handleAddEntity} />
      {data &&
        data.map((game, i) => (
          <div
            className="mx-auto m-[40px] max-w-lg p-[20px] shadow-md bg-gray-200 text-white rounded-lg"
            key={i}
          >
            <Card className="text-center">
              <CardContent>
                <div className="text-4xl font-bold mb-4">{game.id}</div>
                <div className="text-xl p-[10px]">
                  <strong>Game Title</strong> : {game.gameTitle}
                </div>
                <div className="text-lg p-[10px]">
                  <strong>Published By</strong> : {game.publishedBy}
                </div>
                <div className="text-lg p-[10px]">
                  <strong>Year Of Release</strong> : {game.yearOfRelease}
                </div>
                <div className="text-lg p-[10px]">
                  <strong>Available Platforms</strong> :{" "}
                  {game.availablePlatforms}
                </div>
                <div className="text-lg p-[10px]">
                  <strong>Genre</strong> : {game.genre}
                </div>
                <div className="text-lg p-[10px]">
                  <strong>Description</strong> : {game.description}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
    </div>
  );
};

export default Entity;
