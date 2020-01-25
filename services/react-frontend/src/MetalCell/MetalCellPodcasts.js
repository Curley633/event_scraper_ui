import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';
import MetalCellDT from '../MetalCell/MetalCellDT'
import styled from 'styled-components';
import Dropdown from '../components/Dropdown';

const Styles = styled.div`
  text-align: left;
  `;

export class MetalCellPodcasts extends Component {

state = {
    MetalCellItems: []
  }

  getMetalCellItems(){
    fetch('http://localhost:5000/metalcell')
      .then(response => response.json())
      .then(MetalCellItems => this.setState({MetalCellItems}))
      .catch(err => console.log(err))
  }

  componentDidMount(){
    this.getMetalCellItems()
  }

  render() {
    return (
      <Styles>
        <Container className="MetlCellApp">
          <Dropdown/>
          <Row>
            <Col>
              <h1 style={{margin: "20px 0"}}>Metal Cell Podcasts</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <MetalCellDT MetalCellItems={this.state.MetalCellItems}/>
            </Col>
          </Row>
        </Container>
      </Styles>
    )
  }
}
