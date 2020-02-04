import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';
import DMEDataTable from '../DME/DMEDataTable'
import styled from 'styled-components';
import Dropdown from '../components/Dropdown';
import CheckForUpdates from '../components/CheckForUpdates'

const Styles = styled.div`
  text-align: left;
  `;

export class DMEEvents extends Component {
  constructor(props) {
    super(props)
  }


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
    const DME = this.props
    return (
      <Styles>
        <Container className="DMEApp">
          <Row>
            <Col>
            <Dropdown/>
            <CheckForUpdates/>
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
