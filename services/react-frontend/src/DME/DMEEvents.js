import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import DMEDataTable from "../DME/DMEDataTable";
import styled from "styled-components";
import Dropdown from "../components/Dropdown";
import CheckForUpdates from "../components/CheckForUpdates";

const Styles = styled.div`
  text-align: left;
`;

export function DMEEvents() {
  const [DMEItems, setDMEItems] = useState([]);

  const getDMEItems = () => {
    console.log("getDMEItems has been called.");
    fetch("http://localhost:5000/dme")
      .then(response => response.json())
      .then(DMEItems => {
        // console.log("DMEItems", DMEItems);
        setDMEItems(DMEItems);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getDMEItems();
  }, []);

  return (
    <Styles>
      <Container className="DMEApp">
        <Row>
          <Col>
            <Dropdown />
            <CheckForUpdates sourceToUpdate="DME" onSuccess={getDMEItems} />
            <h1 style={{ margin: "20px 0" }}>DME Events</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <DMEDataTable DMEItems={DMEItems} />
          </Col>
        </Row>
      </Container>
    </Styles>
  );
}
