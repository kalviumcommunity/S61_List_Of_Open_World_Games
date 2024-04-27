/* eslint-disable no-unused-vars */
import React from "react";
import "./App.css";
import LoginOrLogOut from "./Form/LoginOrLogOut";
import Entity from "./components/Entity";
import LandingPage from "./components/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UpdateEntity from "./Form/UpdateEntity";
import EntityForm from "./Form/EntityForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginOrLogOut />} />
        <Route path="/entity" element={<Entity />} />
        <Route path="/update" element={<UpdateEntity />} />
        <Route path="/add" element={<EntityForm />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
