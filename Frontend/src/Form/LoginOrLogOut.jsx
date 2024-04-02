/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";

const LoginOrLogOut = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const response = await axios.get("/check-login");
      setIsLoggedIn(response.data.isLoggedIn);
      setUsername(response.data.username || "");
    } catch (error) {
      console.error("Check login status error:", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/login", {
        username,
        email,
        password,
      });

      const { token, username: loggedInUsername } = response.data;

      document.cookie = `token=${token}; path=/`;

      setIsLoggedIn(true);
      setUsername(loggedInUsername);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Login error:", error);
      if (error.response && error.response.data) {
        setError(error.response.data.error);
      } else {
        setError("An error occurred");
      }
    }
  };

  const handleLogout = async () => {
    try {
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      console.log(document.cookie);
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="flex-center bg-yellow-300 h-screen w-screen">
      {isLoggedIn ? (
        <div className="flex-center h-screen text-center text-[25px] bg-red-300">
          <h2 className="relative top-52 text-gray-50 text-[25px] text-6xl ">
            Welcome, {username}!
          </h2>
          <button
            className="border-[2px] px-[20px] py-[10px] rounded-xl bg-green-200 text-[20px] mt-[25%]"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="text-center p-[20px]">
          {error && (
            <p className="flex-center text-red-600 text-[50px]">{error}</p>
          )}
          <form onSubmit={handleLogin}>
            <div className="p-[10px] mt-[15%]">
              <input
                className="flex-center h-[70px] w-[75%] text-center text-[25px] border-[0px] rounded-full m-[10px] text-red-400 shadow-2xl"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="p-[10px]">
              <input
                className="flex-center h-[70px] w-[75%] text-center text-[25px] border-[0px] rounded-full m-[10px] text-red-400 shadow-2xl"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="p-[10px]">
              <input
                className="flex-center h-[70px] w-[75%] text-center text-[25px] border-[0px] rounded-full m-[10px] text-red-400 shadow-2xl"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              className="border-[2px] px-[20px] py-[10px] rounded-xl bg-green-200 text-[20px] mt-[20px]"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginOrLogOut;
