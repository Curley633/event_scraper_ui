import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Spinner  } from 'reactstrap';
import BlabbermouthDT from '../Blabbermouth/BlabbermouthDT'
import Dropdown from '../components/Dropdown';
import CheckForUpdates from '../components/CheckForUpdates';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import CheckIcon from '@material-ui/icons/Check';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

export function BlabbermouthArticles() {
  const [BMItems, setBMItems] = useState([]);
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
    console.log("in Failure Alert");
    return (
      <Snackbar open={openFailed} autoHideDuration={6000} onClose={handleClose}>
        <Alert icon={<ErrorOutlineIcon fontSize="inherit" />} variant="filled" onClose={handleClose} severity="error">
          Oops! Click "Check For Updates" again
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

  const getBMItems = () => {
    fetch('http://localhost:5000/blabbermouth')
    .then(response => response.json())
    .then(BMItems => {
      // console.log("BMItems:", BMItems)
      setBMItems(BMItems);
    })
    .catch(err => console.log(err));
  };

  useEffect(() => {
    getBMItems();
  }, []);

  return (
    <Container className="BlabbermouthApp">
      <Row>
        <Col>
          <Dropdown/>
        </Col>
        <Col align="center">
          {loading && <LoadingIndicator />}
          {openFailed && <UpdateFailedSnackbar />}
          {open && <UpdateSuccessSnackbar />}
        </Col>
        <Col>
          <CheckForUpdates 
          sourceToUpdate="BLABBERMOUTH" 
          onSuccess={getBMItems}
          setLoading={setLoading}
          setOpen={setOpen}
          setOpenFailed={setOpenFailed}/>
        </Col>
      </Row>
      <Row>
        <Col>
          <h1 style={{margin: "20px 0"}}>Blabbermouth News</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <BlabbermouthDT BMItems={BMItems}/>
        </Col>
      </Row>
    </Container>
  );
}