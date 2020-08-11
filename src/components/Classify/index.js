import React from "react";
import DatasetSlider from "./DatasetSlider";
import Classifier from "./Classifier";

function Classify(props) {
  return (
    <div className="app__classify">
      <DatasetSlider dataset={"covid"} imagesPerPage={10}></DatasetSlider>
      <Classifier></Classifier>
    </div>
  );
}

export default Classify;
