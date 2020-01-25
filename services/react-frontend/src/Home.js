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
              <strong>A Metal show dedicated to promoting and growing the Irish Metal Scene</strong>            
            </CardText>
            <Button href="/metalcell">The Metal Cell</Button>
          </Card>
        </Card>
      </Col>
    </Row>
    </>
  );
};
  