import React from "react";
import { Icon } from "semantic-ui-react";

function Header(props) {
  return (
    <div className="app__header">
      <Icon name="bars" onClick={props.onToggleSidebar}></Icon>
    </div>
  );
}

export default Header;
