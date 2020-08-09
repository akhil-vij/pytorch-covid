import React, { useState, useEffect, useReducer } from "react";
import { Dropdown } from "semantic-ui-react";

function mockFetch(dataset, page, limit, time) {
  return new Promise(function (resolve, reject) {
    setTimeout(function resolveFetch() {
      let imageData = [];
      let start = page * limit + 1;
      let end = (page + 1) * limit;
      for (let i = start; i <= end; i++) {
        let urlName = "";

        if (dataset === "covid") {
          urlName = `COVID-19 (${i}).png`;
        } else if (dataset === "pneumonia") {
          urlName = `Viral Pneumonia (${i}).png`;
        } else {
          urlName = `NORMAL (${i}).png`;
        }
        let image = {
          url: `/assets/images/${dataset}/${urlName}`,
        };
        imageData.push(image);
      }
      resolve(imageData);
    }, time);
  });
}

function prepareImageHTML(list) {
  return list.map(function createImageTag(list, index) {
    return (
      <img
        key={index}
        src={list.url}
        className="app__classify-slider-image"
      ></img>
    );
  });
}

const datasetOptions = [
  {
    key: "covid",
    value: "covid",
    text: "Covid-19",
  },
  {
    key: "pneumonia",
    value: "pneumonia",
    text: "Pneumonia",
  },
  {
    key: "normal",
    value: "normal",
    text: "Normal",
  },
];

function imgReducer(state, action) {
  switch (action.type) {
    case "CHANGE_DATASET":
      return { images: [], fetching: true };
    case "STACK_IMAGES":
      return { ...state, images: state.images.concat(action.images) };
    case "FETCHING_IMAGES":
      return { ...state, fetching: action.fetching };
    default:
      return state;
  }
}

function DatasetSlider() {
  const [dataset, setDataset] = useState("covid");
  const [imgData, imgDispatch] = useReducer(imgReducer, {
    images: [],
    fetching: true,
  });

  function handleDatasetChange(e, data) {
    let value = data.value;
    setDataset(value);
    imgDispatch({ type: "CHANGE_DATASET" });
  }

  useEffect(
    function fetchImages() {
      imgDispatch({ type: "FETCHING_IMAGES", fetching: true });
      // TODO: Remove mocking when you put the images on AWS
      mockFetch(dataset, 0, 10, 1000)
        .then(function imageDispatchAfterFetch(imgData) {
          imgDispatch({ type: "STACK_IMAGES", images: imgData });
          imgDispatch({ type: "FETCHING_IMAGES", fetching: false });
        })
        .catch(function imageDispatchAfterFetchFail(err) {
          imgDispatch({ type: "FETCHING_IMAGES", fetching: false });
          return err;
        });
    },
    [imgDispatch, dataset]
  );
  return (
    <div className="app__classify-slider-container">
      <Dropdown
        options={datasetOptions}
        value={dataset}
        selection
        onChange={handleDatasetChange}
      />
      <div className="app__classify-slider-image-container">
        {prepareImageHTML(imgData.images)}
      </div>
    </div>
  );
}

export default DatasetSlider;
