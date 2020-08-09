import React from "react";
import DatasetSlider from "./DatasetSlider";
import Classifier from "./Classifier";

function Classify(props) {
  console.log(`Rendering classify component`);
  return (
    <div className="app__classify">
      <DatasetSlider></DatasetSlider>
      <Classifier></Classifier>
    </div>
  );
}

export default Classify;
