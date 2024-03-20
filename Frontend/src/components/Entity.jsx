/* eslint-disable no-unused-vars */
import React from "react";
import data from "../../data.json";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const Entity = () => {
  return (
    <div className="mx-auto m-[40px] max-w-lg p-[20px] shadow-md bg-gray-200 text-white rounded-lg">
      <Card className="text-center">
        <CardContent>
          <div className="text-4xl font-bold mb-4">{data.id}</div>
          <div className="text-xl p-[10px]">
            <strong>Game Title</strong> : {data.gameTitle}
          </div>
          <div className="text-lg p-[10px]">
            <strong>Published By</strong> : {data.publishedBy}
          </div>
          <div className="text-lg p-[10px]">
            <strong>Year Of Release</strong> : {data.yearOfRelease}
          </div>
          <div className="text-lg p-[10px]">
            <strong>Available Platforms</strong> : {data.availablePlatforms}
          </div>
          <div className="text-lg p-[10px]">
            <strong>Genre</strong> : {data.genre}
          </div>
          <div className="text-lg p-[10px]">
            <strong>Description</strong> : {data.description}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Entity;
