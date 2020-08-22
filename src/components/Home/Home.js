import React from "react";
import { Link } from "react-router-dom";

function Home(props) {
  return (
    <div className="app__home">
      {/* <Link to="/classify" className="app__sidebaritem-link">
        <span className="app__sidebaritem-label">Let's Go</span>
      </Link> */}
      <div className="app__home-container">
        <div className="app__home-text-container"></div>
        <div className="app__home-image"></div>
      </div>
    </div>
  );
}

export default Home;
