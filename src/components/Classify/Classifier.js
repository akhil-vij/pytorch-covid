import React, { useState, useReducer } from "react";
import { Message, Image, Label, Placeholder, Button } from "semantic-ui-react";
import Upload from "../utils/Upload";
import Result from "./Result";
import axios from "axios";

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
  const [uploadedImageURL, setUploadedImageURL] = useState(null);

  const [selectedImage, setSelectedImage] = useState(
    "/assets/images/covid/COVID-19_(24).png"
  );

  const [classificationState, dispatchAction] = useReducer(classifierReducer, {
    result: [
      {
        label: "Covid-19",
        probability: 0.5281470544692477,
      },
      {
        label: "Pneumonia",
        probability: 0.20197767171292277,
      },
      {
        label: "Normal",
        probability: 0.2698752738178295,
      },
    ],
    classifying: false,
    showNoResult: false,
  });

  function handleImageUpload(event) {
    const reader = new FileReader();
    reader.onload = function onImageLoad() {
      setSelectedImage(reader.result);
      axios.post("/upload", { image: reader.result }).then((resp) => {
        setUploadedImageURL(resp.data.fileName);
        dispatchAction({ type: "NO_CLASSIFICATION" });
      });
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  function handleClassify() {
    if (uploadedImageURL) {
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
    function classifyImage() {
      return axios.post("/classify", { uploadedImageURL }).then((resp) => {
        let sum = resp.data.covid + resp.data.viral + resp.data.normal;
        let covidScore = resp.data.covid / sum;
        let viralScore = resp.data.viral / sum;
        let normalScore = resp.data.normal / sum;
        let result = [
          {
            label: "Covid-19",
            probability: covidScore,
          },
          {
            label: "Pneumonia",
            probability: viralScore,
          },
          {
            label: "Normal",
            probability: normalScore,
          },
        ];
        return result;
      });
    }
  }

  const items = [];
  const header = "Classifier Information";

  if (uploadedImageURL) {
    items.push(
      "Base ResNet18 pytorch model trained on Covid Radiology Dataset"
    );
    items.push("Use the Classify button to classify your X-ray image");
  } else {
    items.push("No user image found.");
    items.push("Upload your chest X-ray image for classification.");
  }

  return (
    <div className="app__classify-classifier-container">
      <Upload handleUpload={handleImageUpload}></Upload>
      <Button
        onClick={handleClassify}
        className="app__classify-classifier-select"
      >
        Classify
      </Button>
      <Message className="app__classify-classifier-info">
        <Message.Header>{header}</Message.Header>
        <Message.List items={items} />
      </Message>
      <div className="app__classify-classifier-selected-image-container">
        {selectedImage === "/assets/images/covid/COVID-19_(24).png" && (
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
