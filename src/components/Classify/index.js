import React, { useState } from "react";
import DatasetSlider from "./DatasetSlider";
import Classifier from "./Classifier";

function Classify(props) {
  const [selectedImage, setSelectedImage] = useState(null);
  function handleImageChange(evt) {
    const newSrc = evt.target.getAttribute("src");
    setSelectedImage(newSrc);
  }
  return (
    <div className="app__classify">
      <Classifier selectedImage={selectedImage}></Classifier>
    </div>
  );
}

export default Classify;
