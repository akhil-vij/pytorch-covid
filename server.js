const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { createServer } = require("http");
const compression = require("compression");
const morgan = require("morgan");
const base64Img = require("base64-img");
const { createCanvas, loadImage } = require("canvas");
const ndarray = require("ndarray");
const ops = require("ndarray-ops");

const dev = app.get("env") !== "production";
const path = require("path");
require("onnxjs");

app.use(cors());

if (!dev) {
  app.disable("x-powered-by");
  app.use(compression());
  app.use(morgan("common"));
  app.use(express.static(path.resolve(__dirname, "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

app.use(bodyParser.json({ limit: "50mb" }));

app.post("/upload", function (req, res) {
  const img = req.body.image;
  base64Img.img(img, "./uploads", Date.now(), function (err, filepath) {
    const pathArr = filepath.split("/");
    const fileName = pathArr[pathArr.length - 1];
    res.status(200).json({
      success: true,
      fileName: fileName,
    });
  });
});

app.post("/classify", async function (req, res) {
  // You get the url of the png file in request
  // Use canvas to get the raw pixel values out of the image
  let imageData = await getImageData(
    `./uploads/${req.body.uploadedImageURL}`,
    224,
    224
  );
  // You need to normalize 0-255 to [0,1]. Process mean and std deviation
  let preprocessedTensor = await preprocess(imageData.data, 224, 224);
  let predictions = await predict(preprocessedTensor, 224, 224);
  res.status(200).json({
    success: true,
    normal: predictions[0],
    viral: predictions[1],
    covid: predictions[2],
  });
});

if (dev) {
  app.use(morgan("dev"));
}
const port = process.env.PORT || process.env.VCAP_APP_PORT || 5000;
const server = createServer(app);

server.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log("Server started");
});

async function getImageData(url, modelWidth, modelHeight) {
  let canvas = createCanvas(modelWidth, modelHeight);
  let ctx = canvas.getContext("2d");
  await loadImage(url).then((image) => {
    ctx.drawImage(image, 0, 0);
  });
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  return imageData;
}

async function preprocess(data, width, height) {
  const dataTensor = ndarray(new Float32Array(data), [width, height, 4]);
  const dataProcessedTensor = ndarray(new Float32Array(width * height * 3), [
    1,
    3,
    width,
    height,
  ]);
  ops.assign(
    dataProcessedTensor.pick(0, 0, null, null),
    dataTensor.pick(null, null, 0)
  );
  ops.assign(
    dataProcessedTensor.pick(0, 1, null, null),
    dataTensor.pick(null, null, 1)
  );
  ops.assign(
    dataProcessedTensor.pick(0, 2, null, null),
    dataTensor.pick(null, null, 2)
  );
  ops.divseq(dataProcessedTensor, 255);
  ops.subseq(dataProcessedTensor.pick(0, 0, null, null), 0.485);
  ops.subseq(dataProcessedTensor.pick(0, 1, null, null), 0.456);
  ops.subseq(dataProcessedTensor.pick(0, 2, null, null), 0.406);
  ops.divseq(dataProcessedTensor.pick(0, 0, null, null), 0.229);
  ops.divseq(dataProcessedTensor.pick(0, 1, null, null), 0.224);
  ops.divseq(dataProcessedTensor.pick(0, 2, null, null), 0.225);

  return dataProcessedTensor.data;
}

async function predict(preprocessedData, modelWidth, modelHeight) {
  // eslint-disable-next-line no-undef
  const session = new onnx.InferenceSession();
  await session.loadModel("./model/resnet-covid.onnx");
  // eslint-disable-next-line no-undef
  const inputTensor = new onnx.Tensor(preprocessedData, "float32", [
    1,
    3,
    modelWidth,
    modelHeight,
  ]);
  const classProbabilities = await session.run([inputTensor]);
  const outputData = classProbabilities.values().next().value.data;
  const scores = outputData.map((data) => {
    return Math.abs(data);
  });
  return scores;
}
