import React, { useState } from "react";
import { Message } from "semantic-ui-react";

function DissmissableMessage(props) {
  const [visible, setVisible] = useState(props.visible);
  function handleDismiss() {
    setVisible(!visible);
  }
  if (visible) {
    return (
      <Message
        onDismiss={handleDismiss}
        header={props.header}
        content={props.message}
      />
    );
  } else return null;
}

export default DissmissableMessage;


