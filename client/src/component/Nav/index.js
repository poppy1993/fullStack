import { React } from "react";
import { useHistory } from "react-router-dom";
import "./index.scss";

const Nav = () => {
  const history = useHistory();

  const goHome = () => {
    history.push({ pathname: "/" });
  };

  return (
    <div className="navWrap">
      <div className="nav">
        <div className="logo" onClick={goHome}>
          MOHAWK
        </div>
      </div>
      <div className="searchBox">
        <input placeholder="Search item name" />
        <button>Search</button>
      </div>
    </div>
  );
};

export default Nav;
