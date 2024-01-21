import React from "react";
import Category from "./Category";
import Products from "../Products";

const Home: React.FC = () => {
  return (
    <div className="wrapper">
      <div className="container">
        <Category />
        <Products />
      </div>
    </div>
  );
};

export default Home;
