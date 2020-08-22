import React, { useState } from "react";
import CompareImage from "./CompareImage";
import DatasetSlider from "../DatasetSlider";
import Upload from "../utils/Upload";
import Notes from "../utils/Notes";

import { Button, Modal } from "semantic-ui-react";

function Compare() {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState("covid");
  const [firstImage, setFirstImage] = useState(
    "/assets/images/covid/COVID-19 (23).png"
  );
  const [secondImage, setSecondImage] = useState(null);

  function handleExport(evt) {}
  function handleFirstImageSelect(evt) {
    if (evt.target.tagName === "IMG") {
      setFirstImage(evt.target.getAttribute("src"));
      setIsModelOpen(false);
    }
  }

  function handleDatasetChange(data) {
    setSelectedDataset(data);
  }

  function handleSecondImageSelect(event) {
    const reader = new FileReader();
    reader.onload = function onImageLoad() {
      setSecondImage(reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  const firstImageLabel = `Sample ${selectedDataset} X-ray image`;
  const secondImageLabel = secondImage
    ? "Uploaded Patient X-ray image"
    : "Upload Patient X-ray image";

  return (
    <div className="app__compare">
      <div className="app__compare-container">
        <div className="app__compare-button-container">
          <Button
            className="app__compare-select"
            onClick={() => setIsModelOpen(true)}
          >
            Select X-ray Image
          </Button>
          <Modal
            onClose={() => setIsModelOpen(false)}
            onOpen={() => setIsModelOpen(true)}
            open={isModelOpen}
            size={"tiny"}
            closeIcon
          >
            <Modal.Header>Click on X-ray image to select it</Modal.Header>
            <Modal.Content>
              <DatasetSlider
                dataset={selectedDataset}
                handleDatasetChange={handleDatasetChange}
                handleSelect={handleFirstImageSelect}
                imagesPerPage={10}
              ></DatasetSlider>
            </Modal.Content>
          </Modal>
          <Upload handleUpload={handleSecondImageSelect}></Upload>
        </div>
        <div className="app__compare-images-container">
          <CompareImage
            leftImage={firstImage}
            rightImage={secondImage}
            leftImageCss={{ objectFit: "unset", maxHeight: "100%" }}
            rightImageCss={{ objectFit: "unset", maxHeight: "100%" }}
            leftImageLabel={firstImageLabel}
            rightImageLabel={secondImageLabel}
          ></CompareImage>
        </div>
      </div>

      <Notes handleExport={handleExport} lines="8"></Notes>
    </div>
  );
}

export default Compare;
