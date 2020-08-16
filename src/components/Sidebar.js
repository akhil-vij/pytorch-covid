import React, { useState, useCallback } from "react";
import SidebarItem from "./SidebarItem";

const sidebarItems = [
  {
    label: "Classify",
    path: "/",
  },
  {
    label: "Compare",
    path: "/compare",
  },
  {
    label: "Study",
    path: "/study",
  },
  {
    label: "Resources",
    path: "/resources",
  },
];

function Sidebar() {
  const [selected, setSelected] = useState("Classify");

  function handleNavSelection(evt) {
    if (evt.target.innerHTML !== selected) {
      setSelected(evt.target.innerText);
    }
  }

  const generateSidebar = useCallback(
    function generateSidebarItems() {
      return sidebarItems.map(function (item, index) {
        return (
          <SidebarItem
            label={item.label}
            key={index}
            position={index}
            path={item.path}
            isSelected={selected === item.label}
            clickHandler={handleNavSelection}
          ></SidebarItem>
        );
      });
    },
    [selected]
  );

  return (
    <nav className="app__sidebar">
      <ul>{generateSidebar()}</ul>
    </nav>
  );
}
export default Sidebar;
