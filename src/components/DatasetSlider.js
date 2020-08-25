import React, {
  useState,
  useEffect,
  useReducer,
  useCallback,
  useRef,
} from "react";
import { Dropdown, Message, Icon } from "semantic-ui-react";

function mockFetch(dataset, page, limit, time) {
  return new Promise(function (resolve, reject) {
    setTimeout(function resolveFetch() {
      let imageData = [];
      let start = page * limit + 1;
      let end = (page + 1) * limit;
      for (let i = start; i <= end; i++) {
        let urlName = "https://s3.eu-west-2.amazonaws.com/covidradiology.com/";

        if (dataset === "covid") {
          urlName += `COVID-19 (${i}).png`;
        } else if (dataset === "pneumonia") {
          urlName += `Viral Pneumonia (${i}).png`;
        } else {
          urlName += `NORMAL (${i}).png`;
        }
        let image = {
          url: urlName,
        };
        imageData.push(image);
      }
      resolve(imageData);
    }, time);
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

const pageReducer = (state, action) => {
  switch (action.type) {
    case "ADVANCE_PAGE":
      if (state.limitReached) {
        return state;
      }
      return { ...state, page: state.page + 1 };
    case "RESET_PAGE":
      return { page: 0, limitReached: false };
    case "PAGE_LIMIT_REACHED":
      return { ...state, limitReached: true };
    default:
      return state;
  }
};

function DatasetSlider(props) {
  const [dataset, setDataset] = useState(props.dataset || "covid");
  const [pager, pagerDispatch] = useReducer(pageReducer, {
    page: 0,
    limitReached: false,
  });
  const [imgData, imgDispatch] = useReducer(imgReducer, {
    images: [],
    fetching: true,
  });

  function handleDatasetChange(e, data) {
    let value = data.value;
    setDataset(value);
    imgDispatch({ type: "CHANGE_DATASET" });
    pagerDispatch({ type: "RESET_PAGE" });
    if (props && props.handleDatasetChange) {
      props.handleDatasetChange(value);
    }
  }

  function prepareImageHTML(list) {
    return list.map(function createImageTag(list, index) {
      return (
        <img
          alt="Chest X-ray"
          key={index}
          src={list.url}
          className="app__slider-image"
          onClick={props.handleSelect}
        ></img>
      );
    });
  }

  useEffect(
    function fetchImages() {
      imgDispatch({ type: "FETCHING_IMAGES", fetching: true });
      // TODO: Remove mocking when you put the images on AWS
      let limit = 100;
      if (pager.page * props.imagesPerPage >= limit) {
        pagerDispatch({ type: "PAGE_LIMIT_REACHED" });
        return;
      }
      mockFetch(dataset, pager.page, props.imagesPerPage, 0)
        .then(function imageDispatchAfterFetch(imgData) {
          imgDispatch({ type: "STACK_IMAGES", images: imgData });
          imgDispatch({ type: "FETCHING_IMAGES", fetching: false });
        })
        .catch(function imageDispatchAfterFetchFail(err) {
          imgDispatch({ type: "FETCHING_IMAGES", fetching: false });
          return err;
        });
    },
    [imgDispatch, dataset, pager.page, props.imagesPerPage, pagerDispatch]
  );

  // Take care of infinite scrolling
  // useref lets variables preserve their values across component renders
  let bottomBoundaryRef = useRef(null);

  const scrollObserver = useCallback(
    function memoizedScrollObserver(node) {
      return new IntersectionObserver(
        function interSectionObserver(enteries) {
          enteries.forEach(function iterateEnteries(en) {
            if (en.intersectionRatio > 0) {
              pagerDispatch({ type: "ADVANCE_PAGE" });
            }
          });
        },
        {
          root: document.querySelector(".app__slider-image-container"),
          rootMargin: "0px",
          threshold: 1.0,
        }
      ).observe(node);
    },
    [pagerDispatch]
  );

  useEffect(
    function invokeObserver() {
      if (bottomBoundaryRef.current) {
        scrollObserver(bottomBoundaryRef.current);
      }
    },
    [scrollObserver, bottomBoundaryRef]
  );

  const items = [];
  const header = "COVID-19 Radiography Database";
  if (dataset === "covid") {
    items.push("219 COVID-19 positive chest X-ray images");
  } else if (dataset === "normal") {
    items.push("1345 normal chest X-ray images");
  } else {
    items.push("1345 viral pneumonia chest X-ray images");
  }

  return (
    <div className="app__slider-container">
      <Dropdown
        options={datasetOptions}
        value={dataset}
        selection
        onChange={handleDatasetChange}
      />
      <Message>
        <Message.Header>
          <a
            href="https://www.kaggle.com/tawsifurrahman/covid19-radiography-database"
            target="_blank"
            rel="noopener noreferrer"
          >
            {header}
          </a>
        </Message.Header>
        <Message.List items={items} />
      </Message>
      <div className="app__slider-image-container">
        {prepareImageHTML(imgData.images)}
        <div className="app__fetching-parent">
          {imgData.fetching && !pager.limitReached && (
            <Message icon className="app__fetching-container">
              <Icon name="circle notched" loading />
              <Message.Content>Fetching X-ray images.</Message.Content>
            </Message>
          )}
          {imgData.fetching && pager.limitReached && (
            <Message icon className="app__fetching-container">
              <Message.Content>Fetched all the X-ray images.</Message.Content>
            </Message>
          )}
          <div
            id="page-bottom-boundary"
            style={{ border: "1px solid red", opacity: 0 }}
            ref={bottomBoundaryRef}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default DatasetSlider;
