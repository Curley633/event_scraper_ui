import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';
import DMEDataTable from '../DME/DMEDataTable'
import Styled from 'styled-components';
import styled from 'styled-components';

const Styles = styled.div`
  text-align: center;
  `;

export class DMEEvents extends Component {

state = {
    DMEItems: []
  }

  getDMEItems(){
    fetch('http://localhost:5000/dme')
      .then(response => response.json())
      .then(DMEItems => this.setState({DMEItems}))
      .catch(err => console.log(err))
  }

  componentDidMount(){
    this.getDMEItems()
  }

  render() {
    return (
      <Styles>
        <Container className="DMEApp">
          <Row>
            <Col>
              <h1 style={{margin: "20px 0"}}>DME Events</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <DMEDataTable DMEItems={this.state.DMEItems}/>
            </Col>
          </Row>
        </Container>
      </Styles>
    )
  }
}
