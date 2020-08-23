import React, { useEffect } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

import { Form, TextArea, Button } from "semantic-ui-react";
import { pdf } from "@react-pdf/renderer";

const saveBlob = (blob, filename) => {
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style.display = "none";
  let url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
};

export const savePdf = async (document, filename) => {
  saveBlob(await pdf(document).toBlob(), filename);
};

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    width: "100%",
    orientation: "portrait",
  },
  viewSingle: {
    width: "100%",
    marginTop: 30,
    marginBottom: 30,
    backgroundColor: "#ffffff",
    marginLeft: "auto",
    marginRight: "auto",
  },

  notes: {
    padding: 10,
    fontWeight: "bold",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#cccccc",
    marginLeft: 10,
    marginRight: 10,
  },
  heading: {
    padding: 10,
    marginBottom: 20,
  },
  image: {
    padding: 20,
    height: 400,
    width: 400,
  },
  imageColumn: {
    width: 250,
    height: 250,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  flexView: {
    flexDirection: "row",
    width: "100%",
  },
});

function Download(props) {
  if (props.caller === "compare") {
    return (
      <Document>
        <Page object-fit="fill" size="A4" style={styles.page}>
          <View>
            <Text style={styles.heading}>{`Compare X-ray images`}</Text>
            {props.notes && (
              <Text style={styles.notes}>{`Observation: ${props.notes}`}</Text>
            )}
          </View>
          <View style={styles.flexView}>
            <View style={styles.section}>
              <Text>{`Sample X-ray image`}</Text>
              <Image
                style={styles.imageColumn}
                src={props.firstImage}
                alt="images"
              />
            </View>
            {props.secondImage && (
              <View style={styles.section}>
                <Text>{`Patient X-ray image`}</Text>
                <Image
                  style={styles.imageColumn}
                  src={props.secondImage}
                  alt="images"
                />
              </View>
            )}
          </View>
        </Page>
      </Document>
    );
  }
  return (
    <Document>
      <Page object-fit="fill" size="A4" style={styles.page}>
        <View style={styles.viewSingle}>
          <Text style={styles.heading}>{`Study Covid X-ray image`}</Text>
          {props.notes && (
            <Text style={styles.notes}>{`Observation: ${props.notes}`}</Text>
          )}
          <Image style={styles.image} src={props.firstImage} alt="images" />
        </View>
      </Page>
    </Document>
  );
}

function Notes(props) {
  function handleExport() {
    const notes = document.querySelector(".app__notes-text").value;
    const currentProps = this;
    savePdf(
      <Download
        firstImage={currentProps.firstImage}
        secondImage={currentProps.secondImage}
        caller={currentProps.caller}
        notes={notes}
      />,
      "Covid_Study.pdf"
    );
  }

  return (
    <div className="app__notes-container">
      <Form>
        <TextArea
          placeholder="Notes ..."
          rows={props.lines}
          className="app__notes-text"
        />
      </Form>
      <Button className="app__notes-export" onClick={handleExport.bind(props)}>
        Export
      </Button>
    </div>
  );
}

export default Notes;
