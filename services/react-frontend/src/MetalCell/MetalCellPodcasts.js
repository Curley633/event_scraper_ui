import React, { useEffect, useState  } from 'react'
import { Container, Row, Col, Spinner, Alert } from 'reactstrap';
import MetalCellDT from '../MetalCell/MetalCellDT'
import styled from 'styled-components';
import Dropdown from '../components/Dropdown';
import Snackbar from '@material-ui/core/Snackbar';
import CheckForUpdates from '../components/CheckForUpdates';

const Styles = styled.div`
  text-align: left;
  `;

export function MetalCellPodcasts() {

  const [MetalCellItems, setMetalCellItems] = useState([]);
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

  const getMetalCellItems = () => {
    fetch('http://localhost:5000/metalcell')
      .then(response => response.json())
      .then(MetalCellItems => {
        console.log("MetalCellItems", MetalCellItems);
        setMetalCellItems(MetalCellItems);
  })
  .catch(err => console.log(err));
};

  useEffect(() => {
    getMetalCellItems();
  }, []);

    return (
      <Styles>
        <Container className="MetalCellApp">
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
                sourceToUpdate="METALCELL"
                onSuccess={getMetalCellItems}
                setLoading={setLoading}
                setOpen={setOpen}
                setOpenFailed={setOpenFailed}/>
              <Col>
              </Col>
            </Col>
          </Row>
          <Row>
            <Col>
              <h1 style={{margin: "20px 0"}}>Metal Cell Podcasts</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <MetalCellDT MetalCellItems={MetalCellItems}/>
            </Col>
          </Row>
      </Container>
    </Styles>
    )
}
