import React, { useState } from 'react'
import { Container, Card, CardHeader, Button, CardText, Row, Col, Spinner } from 'reactstrap';
import CheckForUpdates from './components/CheckForUpdates';
import styled from 'styled-components';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import CheckIcon from '@material-ui/icons/Check';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';


const Styles = styled.div`
  align: center;
  margin-bottom: 2em;
  text-align: center;
  `;

export const Home = () => {

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

  return (
    <Container className="HomePage">
      <Row className="spacer">
        <Col align="right">
          {loading && <LoadingIndicator />}
          {openFailed && <UpdateFailedSnackbar />}
          {open && <UpdateSuccessSnackbar />}
        </Col>
        <Styles>
          <Col>
            <CheckForUpdates
            sourceToUpdate="ALL"
            onSuccess={setOpen}
            setLoading={setLoading}
            setOpen={setOpen}
            setOpenFailed={setOpenFailed}/>
          </Col>
        </Styles>
      </Row>
      
      <Row>
        <Col sm="6">
          <Card border="primary">
            <CardHeader>
              <b><strong>DME</strong></b>
            </CardHeader>
            <Card body>
              <CardText>
                <strong>Dublin Metal Events Presents...</strong>              
              </CardText>
              <Button href="/dme">DME Metal Events</Button>
            </Card>
          </Card>
        </Col>
        <br />

        <Col sm="6">
        <Card border="primary">
          <CardHeader>
            <b><strong>Ticketmaster</strong></b>
          </CardHeader>
            <Card body>
              <CardText>
                <strong>Hard Rock/Metal Events In Ireland</strong>            
              </CardText>
            <Button href="/ticketmaster">Ticketmaster</Button>
          </Card>
          </Card>
        </Col>
        <br />
      </Row>
      <br />

      <Row>
        <Col sm="6">
          <Card border="primary">
          <CardHeader>
            <b><strong>Blabbermouth News</strong></b>
          </CardHeader>
            <Card body>
              <CardText>
                <strong>The latest News In Metal</strong>
              </CardText>
              <Button href="/blabbermouth">Blabbermouth</Button>
            </Card>
          </Card>
        </Col>

        <Col sm="6">
          <Card border="primary">
          <CardHeader>
            <b><strong>The Metal Cell Podcast</strong></b>
          </CardHeader>
            <Card body>
              <CardText>
                <strong>A radio show dedicated to promoting and growing the Irish Metal Scene</strong>            
              </CardText>
              <Button href="/metalcell">The Metal Cell</Button>
            </Card>
          </Card>
          <br/>
        </Col>
      </Row>
    </Container>
  );
};
