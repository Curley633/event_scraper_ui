import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';
import BlabbermouthDT from '../Blabbermouth/BlabbermouthDT'
import Dropdown from '../components/Dropdown';
import styled from 'styled-components';
import CheckForUpdates from '../components/CheckForUpdates';

const Styles = styled.div`
text-align: left;
`;

export class BlabbermouthArticles extends Component {

  // constructor(props) {
  //   super(props);
    state = {
      error: null,
      isLoaded: false,
      BMItems: []
    }
  // }

  getBMItems(){
      fetch('http://localhost:5000/blabbermouth')
        .then(response => response.json())
        .then(
          (BMItems => {
            this.setState({ isLoaded: true, BMItems: BMItems })
          }),
        // .catch(err => console.log(err))
        
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        } 
      )
    }

    componentDidMount(){
      this.getBMItems()
    }

    render() {
      const { error, isLoaded } = this.state;
      if(error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading..</div>;
      } else {
        return (
          <Styles>
            <Container className="BlabbermouthApp">
              <Dropdown/>
              <CheckForUpdates sourceToUpdate="BLABBERMOUTH"/>
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
          </Styles>
        )
      }
    }
}