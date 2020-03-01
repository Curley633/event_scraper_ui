import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "reactstrap";
import DMEDataTable from "../DME/DMEDataTable";
import styled from "styled-components";
import Dropdown from "../components/Dropdown";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import CheckForUpdates from "../components/CheckForUpdates";
import CheckIcon from '@material-ui/icons/Check';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

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
  
  const UpdateFailedSnackbar = () => {
    console.log("in Failure Alert");
    return (
      <Snackbar open={openFailed} autoHideDuration={6000} onClose={handleClose}>
        <Alert icon={<ErrorOutlineIcon fontSize="inherit" />} variant="filled" onClose={handleClose} severity="error">
          Oops! Please click "Check For Updates" again!
        </Alert>
      </Snackbar>
    );
  }

  const UpdateSuccessSnackbar = () => {
    console.log("In success Alert");
    return (
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert icon={<CheckIcon fontSize="inherit" />} variant="filled" onClose={handleClose} severity="success">
          Page is Up to Date!
        </Alert>
      </Snackbar>
    );
  }

  const handleClose = (_event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setOpenFailed(false);
  };


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
            {openFailed && <UpdateFailedSnackbar />}
            {open && <UpdateSuccessSnackbar />}
          </Col>
          <Col>
            <CheckForUpdates
            sourceToUpdate="DME"
            onSuccess={getDMEItems}
            setLoading={setLoading}
            setOpen={setOpen}
            setOpenFailed={setOpenFailed}/>
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