import React from 'react'
import { Card, CardHeader, Button, CardText, Row, Col } from 'reactstrap';

export const Home = () => {

  return (
    <>
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
            <Button href="http://localhost:3001/dme">DME Metal Events</Button>
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
          <Button href="http://localhost:3001/ticketmaster">Ticketmaster</Button>
         </Card>
        </Card>
      </Col>
      <br />
    </Row>
    <br />
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
            <Button href="http://localhost:3001/blabbermouth">Blabbermouth</Button>
          </Card>
        </Card>
      </Col>
    </Row>
    </>
  );
};
  