import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'reactstrap';
import BlabbermouthDT from '../Blabbermouth/BlabbermouthDT'
import Dropdown from '../components/Dropdown';
import styled from 'styled-components';
import CheckForUpdates from '../components/CheckForUpdates';

const Styles = styled.div`
text-align: left;
`;

export function BlabbermouthArticles() {
  const [BMItems, setBMItems] = useState([]);

  const getBMItems = () => {
    console.log("getBMItems has been called");
    fetch('http://localhost:5000/blabbermouth')
      .then(response => response.json())
      .then(BMItems => {
        console.log("BMItems:", BMItems)
        setBMItems(BMItems);
        })
      .catch(err => console.log(err));
  };

    useEffect(() => {
      getBMItems();
    }, []);

    return (
      <Styles>
        <Container className="BlabbermouthApp">
          <Dropdown/>
          <CheckForUpdates sourceToUpdate="BLABBERMOUTH" onSuccess={getBMItems}/>
          <Row>
            <Col>
              <h1 style={{margin: "20px 0"}}>Blabbermouth News</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <BlabbermouthDT BMItems={BMItems}/>
            </Col>
          </Row>
        </Container>
      </Styles>
    );
}