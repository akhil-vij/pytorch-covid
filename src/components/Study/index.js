import React, { useState } from "react";
import DatasetSlider from "../DatasetSlider";
import Upload from "../utils/Upload";
import Notes from "../utils/Notes";
import Magnifier from "react-magnifier";
import ProgressIncrement from "../utils/ProgressIncrement";

import { Button, Modal } from "semantic-ui-react";

const cssFilter = {
  brightness: {
    label: "Brightness",
    value: 1,
    min: 0,
    max: 1.5,
    step: 0.25,
  },
  contrast: {
    label: "Contrast",
    value: 1,
    min: 0,
    max: 2,
    step: 0.25,
  },
  invert: {
    label: "Invert",
    value: 0,
    min: 0,
    max: 1,
    step: 1,
  },
  sepia: {
    label: "Sepia",
    value: 0,
    min: 0,
    max: 1,
    step: 0.25,
  },
  zoom: {
    label: "Zoom Level",
    value: 1.5,
    min: 0,
    max: 3,
    step: 0.5,
  },
};

function scale(num, in_min, in_max, out_min, out_max) {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
}

function Study() {
  const [filter, setFilter] = useState(cssFilter);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [dataset, setDataset] = useState("covid");
  const [image, setImage] = useState("/assets/images/covid/COVID-19 (23).png");

  function handleExport(evt) {}

  function handleImageSelect(evt) {
    if (evt.target.tagName === "IMG") {
      // setImage(evt.target.getAttribute("src"));
      setIsModelOpen(false);
    }
  }

  function updateStyleFromFilterObj() {
    const style = {};
    style.filter = "";
    Object.keys(filter).map(function iterateFilterObj(filterName) {
      if (filterName !== "zoom") {
        style.filter = `${style.filter}${filterName}(${filter[filterName].value})`;
      }
    });
    return style;
  }

  function handleDatasetChange(data) {
    setDataset(data);
  }

  function handleFilterChange(key, value) {
    value = scale(value, 0, 100, filter[key].min, filter[key].max);
    filter[key].value = value;
    setFilter({ ...filter });
  }
  function handleReset() {
    setFilter({
      brightness: {
        label: "Brightness",
        value: 1,
        min: 0,
        max: 1.5,
        step: 0.25,
      },
      contrast: {
        label: "Contrast",
        value: 1,
        min: 0,
        max: 2,
        step: 0.25,
      },
      invert: {
        label: "Invert",
        value: 0,
        min: 0,
        max: 1,
        step: 1,
      },
      sepia: {
        label: "Sepia",
        value: 0,
        min: 0,
        max: 1,
        step: 0.25,
      },
      zoom: {
        label: "Zoom Level",
        value: 1.5,
        min: 0,
        max: 3,
        step: 0.5,
      },
    });
  }

  function handleImageUpload(event) {
    const reader = new FileReader();
    reader.onload = function onImageLoad() {
      setImage(reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  let imageLabel = "";
  if (dataset) {
    imageLabel = `Selected ${dataset} X-ray Image`;
  } else {
    imageLabel = `Patient X-ray Image`;
  }

  console.log(filter);
  const styleObj = updateStyleFromFilterObj(filter);
  return (
    <div className="app__study">
      <div className="app__study-container">
        <div className="app__study-magnify-container">
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
          <div className="app__study-image-container">
            <Magnifier
              src={image}
              width={550}
              zoomFactor={filter.zoom.value}
              style={styleObj}
            />
          </div>
        </div>
        <div className="app__study-filter-container">
          <ProgressIncrement
            filterKey="brightness"
            label={filter.brightness.label}
            min={0}
            max={100}
            value={scale(
              filter.brightness.value,
              filter.brightness.min,
              filter.brightness.max,
              0,
              100
            )}
            step={scale(
              filter.brightness.step,
              filter.brightness.min,
              filter.brightness.max,
              0,
              100
            )}
            handleChange={handleFilterChange}
          ></ProgressIncrement>
          <ProgressIncrement
            filterKey="contrast"
            label={filter.contrast.label}
            min={0}
            max={100}
            value={scale(
              filter.contrast.value,
              filter.contrast.min,
              filter.contrast.max,
              0,
              100
            )}
            step={scale(
              filter.contrast.step,
              filter.contrast.min,
              filter.contrast.max,
              0,
              100
            )}
            handleChange={handleFilterChange}
          ></ProgressIncrement>
          <ProgressIncrement
            filterKey="invert"
            label={filter.invert.label}
            min={0}
            max={100}
            value={scale(
              filter.invert.value,
              filter.invert.min,
              filter.invert.max,
              0,
              100
            )}
            step={scale(
              filter.invert.step,
              filter.invert.min,
              filter.invert.max,
              0,
              100
            )}
            handleChange={handleFilterChange}
          ></ProgressIncrement>
          <ProgressIncrement
            filterKey="sepia"
            label={filter.sepia.label}
            min={0}
            max={100}
            value={scale(
              filter.sepia.value,
              filter.sepia.min,
              filter.sepia.max,
              0,
              100
            )}
            step={scale(
              filter.sepia.step,
              filter.sepia.min,
              filter.sepia.max,
              0,
              100
            )}
            handleChange={handleFilterChange}
          ></ProgressIncrement>
          <ProgressIncrement
            filterKey="zoom"
            label={filter.zoom.label}
            min={0}
            max={100}
            value={scale(
              filter.zoom.value,
              filter.zoom.min,
              filter.zoom.max,
              0,
              100
            )}
            step={scale(
              filter.zoom.step,
              filter.zoom.min,
              filter.zoom.max,
              0,
              100
            )}
            handleChange={handleFilterChange}
          ></ProgressIncrement>
          <Button className="app__study-reset" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </div>

      <Notes handleExport={handleExport}></Notes>
    </div>
  );
}

export default Study;
