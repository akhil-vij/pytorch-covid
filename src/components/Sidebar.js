import React from "react";
import SidebarItem from "./SidebarItem";

function generateSidebarItems() {
  const sidebarItems = [
    {
      label: "Classify",
      icon: "question circle",
      path: "/",
    },
    {
      label: "Compare",
      icon: "columns",
      path: "/compare",
    },
    {
      label: "Study",
      icon: "sticky note outline",
      path: "/study",
    },
    {
      label: "Resources",
      icon: "question circle outline",
      path: "/resources",
    },
  ];
  return sidebarItems.map(function (item, index) {
    return (
      <SidebarItem
        label={item.label}
        icon={item.icon}
        key={index}
        position={index}
        path={item.path}
      ></SidebarItem>
    );
  });
}

function Sidebar(props) {
  return (
    <nav className="app__sidebar" ref={props.sidebarRef}>
      <ul>{generateSidebarItems()}</ul>
    </nav>
  );
}
export default Sidebar;
