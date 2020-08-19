import React from "react";

import { Form, TextArea, Button } from "semantic-ui-react";

function Notes({ handleExport }) {
  return (
    <div className="app__notes-container">
      <Form>
        <TextArea placeholder="Notes ..." rows="10" />
      </Form>
      <Button className="app__notes-export" onClick={handleExport}>
        Export
      </Button>
    </div>
  );
}

export default Notes;
