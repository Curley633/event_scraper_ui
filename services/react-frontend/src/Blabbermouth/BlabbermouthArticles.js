import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';
import BlabbermouthDT from '../Blabbermouth/BlabbermouthDT'

export class BlabbermouthArticles extends Component {

state = {
    BMItems: []
  }

  getBMItems(){
    fetch('http://localhost:5000/blabbermouth')
      .then(response => response.json())
      .then(BMItems => this.setState({BMItems}))
      .catch(err => console.log(err))
  }

  componentDidMount(){
    this.getBMItems()
  }

  render() {
    return (
      <Container className="BlabbermouthApp">
        <Row>
          <Col>
            <h1 style={{margin: "20px 0"}}>Blabbermouth News</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <BlabbermouthDT BMItems={this.state.BMItems}/>
          </Col>
        </Row>
      </Container>
    )
  }
}