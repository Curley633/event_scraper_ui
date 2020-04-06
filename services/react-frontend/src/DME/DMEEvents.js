import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "reactstrap";
import DMEDataTable from "../DME/DMEDataTable";
import Dropdown from "../components/Dropdown";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import CheckForUpdates from "../components/CheckForUpdates";
import CheckIcon from '@material-ui/icons/Check';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

export function DMEEvents() {

  const [DMEItems, setDMEItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openFailed, setOpenFailed] = useState(false);

  const LoadingIndicator = () => {
    return (
      <div>
        <Spinner style={{ width: '3rem', height: '3rem' }}  color="secondary"/>{' '}
      </div>
    )
  };
  
  const UpdateFailedSnackbar = () => {
    return (
      <Snackbar open={openFailed} autoHideDuration={6000} onClose={handleClose}>
        <Alert icon={<ErrorOutlineIcon fontSize="inherit" />} variant="filled" onClose={handleClose} severity="error">
          Oops! Try Checking again
        </Alert>
      </Snackbar>
    );
  }

  const UpdateSuccessSnackbar = () => {
    return (
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert icon={<CheckIcon fontSize="inherit" />} variant="filled" onClose={handleClose} severity="success">
          Page is Up to Date
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
    fetch(process.env.REACT_APP_HOST + ':5000/dme')
    .then(response => response.json())
    .then(DMEItems => {
      setDMEItems(DMEItems);
    })
    .catch(err => console.log(err));
  };

  useEffect(() => {
    getDMEItems();
  }, []);

  return (
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
  );
}