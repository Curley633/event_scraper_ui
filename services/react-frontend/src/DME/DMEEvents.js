import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';
import DMEDataTable from '../DME/DMEDataTable'

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
      <Container className="DMEApp">
        <Row>
          <Col>
            <h1 text-align="center" style={{margin: "20px 0"}}>DME Events</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <DMEDataTable DMEItems={this.state.DMEItems}/>
          </Col>
        </Row>
      </Container>
    )
  }
}
