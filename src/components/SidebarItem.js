import React from "react";
import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

function SidebarItem({ label, icon, position, path }) {
  return (
    <li className="app__sidebaritem">
      <Link to={path} className="app__sidebaritem-link">
        <Icon name={icon}></Icon>
        <span className="app__sidebaritem-label">{label}</span>
      </Link>
    </li>
  );
}

export default SidebarItem;
