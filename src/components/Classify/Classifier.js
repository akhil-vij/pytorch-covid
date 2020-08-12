import React, { useState } from "react";
import DissmissableMessage from "../Messages/DissmissableMessage.js";
import { Button, Dropdown, Message } from "semantic-ui-react";

const classifierOptions = [
  {
    key: "resnet",
    value: "resnet",
    text: "ResNet",
  },
  {
    key: "alexnet",
    value: "alexnet",
    text: "AlexNet",
  },
];
function handleImageUpload() {
  console.log("Todo");
}

function Classifier(props) {
  function handleClassifierChange(e, data) {
    let value = data.value;
    console.log(value);
    setClassifier(value);
  }

  const [classifer, setClassifier] = useState(null);

  const items = [];

  const header = "Classifier Information";
  if (props.selectedImage) {
    if (classifer === "resnet") {
      items.push("ResNet model trained on 219 covid images");
    } else if (classifer === "alexnet") {
      items.push("AlexNet model trained on 219 covid images");
    } else {
      items.push("Select a classfier to classify your X-ray image");
    }
  } else {
    items.push(
      "Upload your chest X-ray image using the Browse button or select image from left dataset panel."
    );
    items.push("Select a classfier to classify your X-ray image");
  }

  return (
    <div className="app__classify-classifier-container">
      <button
        className="ui button app__classify-classifier-upload"
        onClick={handleImageUpload}
      >
        Upload
      </button>
      <Dropdown
        options={classifierOptions}
        value={classifer}
        onChange={handleClassifierChange}
        className="app__classify-classifier-select"
        placeholder="Select a Classifier"
        clearable
        selection
      />
      <div className="app__classify-classifier-selected-image-container">
        {props.selectedImage && (
          <img
            className="app__classify-classifier-selected-image"
            src={props.selectedImage}
            alt="Selected chest X-ray"
          ></img>
        )}
      </div>
      <Message className="app__classify-classifier-info">
        <Message.Header>{header}</Message.Header>
        <Message.List items={items} />
      </Message>
      <div className="app__classify-classifier-result"></div>
    </div>
  );
}

export default Classifier;
