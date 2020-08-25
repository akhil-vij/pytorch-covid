import React, { useState } from "react";
import CompareImage from "./CompareImage";
import DatasetSlider from "../DatasetSlider";
import Upload from "../utils/Upload";
import Notes from "../utils/Notes";

import { Button, Modal, Card, Image } from "semantic-ui-react";

function Compare() {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState("covid");
  const [firstImage, setFirstImage] = useState(
    "/assets/images/covid/COVID-19_(23).png"
  );
  const [secondImage, setSecondImage] = useState(
    "/assets/images/covid/COVID-19_(13).png"
  );

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
  const secondImageLabel =
    secondImage ===
    "https://s3.eu-west-2.amazonaws.com/covidradiology.com/COVID-19%20(17).png"
      ? "Sample image. Upload Patient image."
      : "Uploaded Patient image";

  return (
    <>
      <div className="app__compare">
        <div className="app__compare-container">
          <div className="app__compare-button-container">
            <Button
              className="app__compare-select"
              onClick={() => setIsModelOpen(true)}
            >
              Select Image
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
                  imagesPerPage={5}
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

        <Notes
          handleExport={handleExport}
          lines="8"
          firstImage={firstImage}
          secondImage={secondImage}
          caller="compare"
        ></Notes>
      </div>
      <div className="app__compare-helper">
        <h2>Covid-19 vs Chest Infections like Pneumonia</h2>
        <div className="app__study-helper-card-container">
          <Card className="app__study-helper-card">
            <Image
              className="app__study-helper-card-image"
              src="/assets/images/ct_compare_lung_cavity.png"
              wrapped
              ui={false}
            />
            <Card.Content>
              <Card.Header>Absence of lung cavities</Card.Header>
              <Card.Description>
                Usually develop in Bacterial and Fungal Pneumonia due to
                Necrosis of the lung tissue later turning into air filled
                cavity.
              </Card.Description>
            </Card.Content>
          </Card>
          <Card className="app__study-helper-card">
            <Image
              className="app__study-helper-card-image"
              src="/assets/images/ct_compare_lymph_nodes.png"
              wrapped
              ui={false}
            />
            <Card.Content>
              <Card.Header>Absence of Large Lymph Nodes</Card.Header>
              <Card.Description>
                These are large lymph nodes near the hilum or central part of
                the lungs. Typically seen in other types of Pneumonia but not in
                Covid-19.
              </Card.Description>
            </Card.Content>
          </Card>
          <Card className="app__study-helper-card">
            <Image
              className="app__study-helper-card-image"
              src="/assets/images/ct_compare_effusions.png"
              wrapped
              ui={false}
            />
            <Card.Content>
              <Card.Header>Absence of Pleural Effusions</Card.Header>
              <Card.Description>
                These are fluid collections in the pleural space right outside
                of lungs. More common in congestive heart failure and Bacterial
                Pneumonia.
              </Card.Description>
            </Card.Content>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Compare;
