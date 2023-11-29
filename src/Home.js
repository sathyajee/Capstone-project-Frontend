// Home.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import './Home.css';
//import './AddUser.css';
import { gethomeurl } from "./utils/Handleapi";

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Navigate to the AddUser page
    navigate("/add-user");
  };

  const [message, setMessage] = useState("");

  const handleInput = () => {
    gethomeurl(setMessage);
  };
  return (
    <div className="container">
      <h2>Welcome to Will Authentication System using Blockchain</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla
        cursus risus, at luctus libero commodo non.
      </p>
      <h2>{message}</h2>
      {/* <button onClick = {handleInput}>value</button> */}
      <button onClick={handleGetStarted}>Get Started</button>
    </div>
  );
};

export default Home;
