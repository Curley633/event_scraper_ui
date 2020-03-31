import React, { useEffect, useState  } from 'react'
import { Container, Row, Col, Spinner } from 'reactstrap';
import MetalCellDT from '../MetalCell/MetalCellDT'
import styled from 'styled-components';
import Dropdown from '../components/Dropdown';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import CheckForUpdates from '../components/CheckForUpdates';
import CheckIcon from '@material-ui/icons/Check';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

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

  const getMetalCellItems = () => {
    fetch(process.env.REACT_APP_HOST + ':5000/metalcell')
      .then(response => response.json())
      .then(MetalCellItems => {
        // console.log("MetalCellItems", MetalCellItems);
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
