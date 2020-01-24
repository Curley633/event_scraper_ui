import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';
import TicketmasterDataTable from '../Ticketmaster/TicketmasterDT'

export class TicketmasterEvents extends Component {

state = {
    TMItems: []
  }

  getTMItems(){
    fetch('http://localhost:5000/ticketmaster')
      .then(response => response.json())
      .then(TMItems => this.setState({TMItems}))
      .catch(err => console.log(err))
  }

  componentDidMount(){
    this.getTMItems()
  }

  render() {
    return (
      <Container className="TicketmasterApp">
        <Row>
          <Col>
            <h1 style={{margin: "20px 0"}}>Ticketmaster Metal Events</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <TicketmasterDataTable TMItems={this.state.TMItems}/>
          </Col>
        </Row>
      </Container>
    )
  }
}