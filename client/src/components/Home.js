import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}
    >
      <Link to="/login" className="Button">
        Login
      </Link>
      <Link to="/register" className="Button">
        Register
      </Link>
    </div>
  );
};

export default Home;
