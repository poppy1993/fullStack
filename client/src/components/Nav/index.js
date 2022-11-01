import { React } from "react";
import "./index.scss";

const Nav = () => {
  return (
    <div className="navWrap">
      <div className="nav">
        <div className="logo">MOHAWK</div>
        <div className="navItem active">Start</div>
        <div className="navItem buy">Buy</div>
        <div className="navItem">Sell</div>
      </div>
      <div className="searchBox">
        <input placeholder="Search item name" />
        <button>Search</button>
      </div>
    </div>
  );
};

export default Nav;
