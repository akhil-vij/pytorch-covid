Notes: Web application to classify chest x-ray images as covid/pneumonia/normal.

Model used: Pre-trained torch vision resnet18 (trained for 1000 imagenet classes). Changed the last fully connected layer from 1000 to 3 features.
Used cross-entropy loss function and Adam optimizer (for all the weights).

Training dataset information: COVID-19 radiography database (https://www.kaggle.com/tawsifurrahman/covid19-radiography-database)
Achieved accuracy for pytorch model: 95-98% in under 2-3 epochs.

For inference in browsers, using remote call to Nodejs express end point. Converted model to ONNX format and using onnxjs npm module.
Note: Issue in converting model reduces the accuracy of the model. Generated onnx model has lower accuracy.

Trained models and Jupyter notebook present in models folder. Node js inference present in server.js file.
