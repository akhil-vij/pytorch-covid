import React, { useState } from "react";

import { Button, Progress } from "semantic-ui-react";

function ProgressIncrement(props) {
  const [value, setValue] = useState(props.default);
  function increment() {
    if (value + props.step <= props.max) {
      setValue(value + props.step);
    }
  }
  function decrement() {
    if (value - props.step >= props.min) {
      setValue(value - props.step);
    }
  }
  return (
    <div className="app__progress-increment">
      <Button onClick={decrement}>-</Button>
      <Progress percent={value}>props.label</Progress>
      <Button onClick={increment}>+</Button>
    </div>
  );
}

export default ProgressIncrement;
