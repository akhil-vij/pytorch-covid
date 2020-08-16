import React, { useRef } from "react";
import { Button } from "semantic-ui-react";

function Upload(props) {
  const fileRef = useRef(null);
  return (
    <>
      <Button
        className="app__classify-classifier-upload"
        onClick={() => fileRef.current.click()}
      >
        Upload X-ray Image
      </Button>
      <input ref={fileRef} type="file" hidden onChange={props.handleUpload} />
    </>
  );
}
export default Upload;
