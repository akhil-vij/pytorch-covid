import React, { useState, useEffect } from "react";

import { Button, Progress } from "semantic-ui-react";

function ProgressIncrement(props) {
  const [value, setValue] = useState(props.value);

  function increment() {
    if (value + props.step <= props.max) {
      setValue(value + props.step);
      props.handleChange(props.filterKey, value + props.step);
    }
  }
  function decrement() {
    if (value - props.step >= props.min) {
      setValue(value - props.step);
      props.handleChange(props.filterKey, value - props.step);
    }
  }
  useEffect(() => {
    setValue(props.value);
  }, [props.value]);
  return (
    <div className="app__progress-increment">
      <Button className="app__progress-button" onClick={decrement}>
        -
      </Button>
      <Progress className="app__progress-slider" percent={props.value}>
        {props.label}
      </Progress>
      <Button className="app__progress-button" onClick={increment}>
        +
      </Button>
    </div>
  );
}

export default ProgressIncrement;
