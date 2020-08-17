import React, { useState } from "react";
import CompareImage from "./CompareImage";
import DatasetSlider from "../DatasetSlider";

import { Button, Header, Modal } from "semantic-ui-react";

function Compare() {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [firstImage, setFirstImage] = useState(null);

  function handleFirstImageSelect(evt) {
    debugger;
  }

  return (
    <div className="app__compare">
      <Button
        className="app__compare-select"
        onClick={() => setIsModelOpen(true)}
      >
        Select X-ray Image
      </Button>
      <CompareImage></CompareImage>
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
            dataset="covid"
            handleSelect={handleFirstImageSelect}
            imagesPerPage={10}
          ></DatasetSlider>
        </Modal.Content>
      </Modal>
    </div>
  );
}

export default Compare;
