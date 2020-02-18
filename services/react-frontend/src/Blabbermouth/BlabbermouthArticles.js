import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Spinner, Alert  } from 'reactstrap';
import BlabbermouthDT from '../Blabbermouth/BlabbermouthDT'
import Dropdown from '../components/Dropdown';
import styled from 'styled-components';
import Snackbar from '@material-ui/core/Snackbar';
import CheckForUpdates from '../components/CheckForUpdates';

const Styles = styled.div`
text-align: left;
`;

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
        <Alert onClose={handleClose} severity="danger">
          Problem Checking for updates, Please Click "Check For Updates"!
        </Alert>
      </Snackbar>
    );
  }

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
      <Styles>
        <Container className="BlabbermouthApp">
          <Row>
            <Col>
              <Dropdown/>
            </Col>
            <Col align="center">
              {loading && <LoadingIndicator />}
              {open && <UpdateSuccessSnackbar />}
              {openFailed && <UpdateFailedSnackbar />}
            </Col>
            <Col>
              <CheckForUpdates 
              sourceToUpdate="BLABBERMOUTH" 
              onSuccess={getBMItems}
              setLoading={setLoading}
              setOpen={setOpen}
              setOpenFailed={setOpenFailed}/>
            <Col>
            </Col>
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
      </Styles>
    );
}