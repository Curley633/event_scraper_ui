import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Alert } from "reactstrap";
import DMEDataTable from "../DME/DMEDataTable";
import styled from "styled-components";
import Dropdown from "../components/Dropdown";
import Snackbar from '@material-ui/core/Snackbar';
import CheckForUpdates from "../components/CheckForUpdates";

const Styles = styled.div`
  // text-align: left;
`;

export function DMEEvents() {

  const [DMEItems, setDMEItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openFailed, setOpenFailed] = useState(false);

  const LoadingIndicator = () => {
    console.log("In Loading Indicator");
    return (
      <div>
        <Spinner style={{ width: '3rem', height: '3rem' }}  color="secondary"/>{' '}
      </div>
    )
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setOpenFailed(false);
  };

  const UpdateSuccessSnackbar = () => {
    console.log("In success Alert");
    return (
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} color="primary">
          Page is Up to Date!
        </Alert>
      </Snackbar>
    );
  }

  const UpdateFailedSnackbar = () => {
    console.log("in Failure Alert");
    return (
      <Snackbar openFailed={openFailed} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} color="red">
          Problem Checking for updates, Please Click "Check For Updates"!
        </Alert>
      </Snackbar>
    );
  }

  const getDMEItems = () => {
    // console.log("getDMEItems has been called.");
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
          </Col>
          <Col align="center">
            {loading && <LoadingIndicator />}
            {open && <UpdateSuccessSnackbar />}
            {openFailed && <UpdateFailedSnackbar />}
          </Col>
          <Col>
            <CheckForUpdates
            sourceToUpdate="DME"
            onSuccess={getDMEItems}
            setLoading={setLoading}
            setOpen={setOpen}
            setOpenFailed={setOpenFailed}/>
          <Col>
          </Col>
          </Col>
        </Row>
        <Row>
          <h1 align="left"style={{ margin: "20px 0" }}>DME Events</h1>
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
