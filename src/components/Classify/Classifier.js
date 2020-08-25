import React, { useState, useEffect, useReducer } from "react";
import {
  Dropdown,
  Message,
  Image,
  Label,
  Placeholder,
} from "semantic-ui-react";
import Upload from "../utils/Upload";
import Result from "./Result";

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
function classifierReducer(state, action) {
  switch (action.type) {
    case "CLASSIFICATION_IN_PROGRESS":
      return { classifying: true, showNoResult: false, result: null };
    case "CLASSIFICATION_SUCCESS":
      return {
        classifying: false,
        result: action.payload.result,
        showNoResult: false,
      };
    case "NO_CLASSIFICATION":
      return { classifying: false, showNoResult: true, result: null };
    default:
      return state;
  }
}

function Classifier() {
  const [classifier, setClassifier] = useState(null);

  // TODO: remove path while integration
  const [selectedImage, setSelectedImage] = useState(
    "https://s3.eu-west-2.amazonaws.com/covidradiology.com/COVID-19%20(24).png"
  );

  const [classificationState, dispatchAction] = useReducer(classifierReducer, {
    result: null,
    classifying: false,
    showNoResult: false,
  });

  function handleImageUpload(event) {
    const reader = new FileReader();
    reader.onload = function onImageLoad() {
      setSelectedImage(reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  function handleClassifierChange(e, data) {
    setClassifier(data.value);
    // Make the classification call
    fetch("/search")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
      });
  }

  useEffect(
    function classifyEffect() {
      function classifyImage() {
        return new Promise(function promiseExecutor(resolve, reject) {
          // TODO: remove the mocking
          setTimeout(function classify() {
            let covidResult = Math.floor(Math.random() * 100);
            let pneumoniaResult = Math.floor(Math.random() * 100);
            let normalResult = Math.floor(Math.random() * 100);
            let sum = covidResult + pneumoniaResult + normalResult;
            let result = [
              {
                label: "Covid-19",
                probability: covidResult / sum,
              },
              {
                label: "Pneumonia",
                probability: pneumoniaResult / sum,
              },
              {
                label: "Normal",
                probability: normalResult / sum,
              },
            ];
            resolve(result);
          }, 3000);
        });
      }
      if (classifier && selectedImage) {
        dispatchAction({ type: "CLASSIFICATION_IN_PROGRESS" });
        classifyImage().then(function (result) {
          dispatchAction({
            type: "CLASSIFICATION_SUCCESS",
            payload: { result },
          });
        });
      } else {
        dispatchAction({ type: "NO_CLASSIFICATION" });
      }
    },
    [classifier, selectedImage]
  );

  const items = [];
  const header = "Classifier Information";

  if (selectedImage) {
    if (classifier === "resnet") {
      items.push("ResNet model trained on 219 covid images");
    } else if (classifier === "alexnet") {
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
      <Upload handleUpload={handleImageUpload}></Upload>
      <Dropdown
        options={classifierOptions}
        value={classifier}
        onChange={handleClassifierChange}
        className="app__classify-classifier-select"
        placeholder="Select a Classifier"
        clearable
        selection
      />
      <Message className="app__classify-classifier-info">
        <Message.Header>{header}</Message.Header>
        <Message.List items={items} />
      </Message>
      <div className="app__classify-classifier-selected-image-container">
        {selectedImage ===
          "https://s3.eu-west-2.amazonaws.com/covidradiology.com/COVID-19%20(24).png" && (
          <Label
            color="red"
            floating
            id="app__classify-classifier-selected-image-warning"
          >
            Sample Image. Upload your X-ray image using the upload button at the
            top.
          </Label>
        )}
        {selectedImage && (
          <Image
            src={selectedImage}
            className="app__classify-classifier-selected-image"
          />
        )}
      </div>
      <div className="app__classify-classifier-result">
        {classificationState.result && (
          <Result result={classificationState.result}></Result>
        )}
        {classificationState.classifying && (
          <Placeholder>
            <Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Paragraph>
          </Placeholder>
        )}
      </div>
    </div>
  );
}

export default Classifier;
