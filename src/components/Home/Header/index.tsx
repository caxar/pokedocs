import React from "react";

import Search from "../Search";

import "./Header.scss";

const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="container">
        <div className="header-wrapper">
          <div className="header-wrapper_logo">Pokédocs</div>
          <div className="header-wrapper_search">
            <Search />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
