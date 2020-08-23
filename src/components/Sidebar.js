import React, { useState, useCallback } from "react";
import SidebarItem from "./SidebarItem";

const sidebarItems = [
  {
    label: "Classify",
    path: "/classify",
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
if (window && !window.ResizeObserver) {
  sidebarItems.splice(1, 1);
}

function Sidebar() {
  let initialState = "";
  if (window.location.pathname === "/compare") {
    initialState = "Compare";
  } else if (window.location.pathname === "/study") {
    initialState = "Study";
  } else if (window.location.pathname === "/resources") {
    initialState = "Resources";
  } else if (window.location.pathname === "/resources") {
    initialState = "Resources";
  } else if (window.location.pathname === "/classify") {
    initialState = "Classify";
  } else {
    initialState = "Home";
  }
  const [selected, setSelected] = useState(initialState);

  const generateSidebar = useCallback(
    function generateSidebarItems() {
      function handleNavSelection(evt) {
        if (evt.target.innerHTML !== selected) {
          setSelected(evt.target.innerText);
        }
      }
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
