import React from "react";
import { Table } from "semantic-ui-react";

function Result({ result }) {
  function buildTabularData() {
    return result.map(function createTableRow(item, index) {
      return (
        <Table.Row>
          <Table.Cell>{item.label || item.class}</Table.Cell>
          <Table.Cell>{item.probability}</Table.Cell>
        </Table.Row>
      );
    });
  }
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Result</Table.HeaderCell>
          <Table.HeaderCell>Probability</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>{buildTabularData()}</Table.Body>
    </Table>
  );
}

export default Result;
