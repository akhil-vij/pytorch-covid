import React, { useState } from "react";
import DatasetSlider from "../DatasetSlider";
import Upload from "../utils/Upload";

import { Button, Modal, Form, TextArea } from "semantic-ui-react";

function Study() {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [dataset, setDataset] = useState("covid");
  const [image, setImage] = useState("/assets/images/covid/COVID-19 (23).png");

  function handleExport(evt) {}

  function handleImageSelect(evt) {
    if (evt.target.tagName === "IMG") {
      setImage(evt.target.getAttribute("src"));
      setIsModelOpen(false);
    }
  }

  function handleDatasetChange(data) {
    setDataset(data);
  }

  function handleImageUpload(event) {
    const reader = new FileReader();
    reader.onload = function onImageLoad() {
      setImage(reader.result);
      setDataset(null);
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  let imageLabel = "";
  if (dataset) {
    imageLabel = `Selected ${dataset} X-ray Image`;
  } else {
    imageLabel = `Patient X-ray Image`;
  }

  return (
    <div className="app__study">
      <div className="app__study-container">
        <div className="app__study-button-container">
          <Button
            className="app__study-select"
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
                dataset={dataset}
                handleDatasetChange={handleDatasetChange}
                handleSelect={handleImageSelect}
                imagesPerPage={10}
              ></DatasetSlider>
            </Modal.Content>
          </Modal>
          <Upload handleUpload={handleImageUpload}></Upload>
        </div>
        <div className="app__study-image-container"></div>
      </div>

      <div className="app__study-notes-container">
        <Form>
          <TextArea placeholder="Notes ..." rows="10" />
        </Form>
        <Button className="app__study-export" onClick={handleExport}>
          Export
        </Button>
      </div>
    </div>
  );
}

export default Study;
