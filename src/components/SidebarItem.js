import React from "react";
import { Link } from "react-router-dom";

function SidebarItem({ label, position, path, clickHandler, isSelected }) {
  return (
    <li
      className={isSelected ? "app__sidebaritem selected" : "app__sidebaritem"}
      onClick={clickHandler}
    >
      <Link to={path} className="app__sidebaritem-link">
        <span className="app__sidebaritem-label">{label}</span>
      </Link>
    </li>
  );
}

export default SidebarItem;
