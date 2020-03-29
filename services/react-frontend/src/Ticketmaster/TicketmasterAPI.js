import React, { useEffect, useState } from 'react'
import TicketmasterDTAPI from '../Ticketmaster/TicketmasterDTAPI'
import { Container, Row, Col } from 'reactstrap';
import Dropdown from '../components/Dropdown';
import styled from 'styled-components';

const Styles = styled.div`
text-align: left;
`;

export function TicketmasterEventsAPI() {

  const TM_BASE_URL = 'https://app.ticketmaster.com/discovery/v2'
  const TM_API_KEY = 'faXiMY5Hp4ArqTXZTog0fmjUQBoAxIf2'

  const [TMItems, setTMItems] = useState([]);

  useEffect(() => {
    const url = TM_BASE_URL + '/events?apikey=' + TM_API_KEY + '&includeTBA=yes&includeTBD=yes&includeTest=yes&dmaId=608&genreId=KnvZfZ7vAvt'

    async function getTMItems() {
      fetch(url)
      .then(response => response.json())
      .then(TMItems => {
        const eventsArray = TMItems._embedded.events;
        const listingData = eventsArray.map(event => {
          const ret = {};
  
          ret.artist = event.name;
          ret.eventLink = event.url;
  
          if(event.dates.start.localDate) {
            ret.eventDate = event.dates.start.localDate;
          } else {
            ret.eventDate = "Date TBD";
          }
  
          ret.eventVenue = event._embedded.venues[0].name;
          ret.location = event._embedded.venues[0].city.name;
          ret.eventStatus = event.dates.status.code;
          
          const { priceRanges } = event;
  
          if(priceRanges) {
            if (priceRanges[0].type === "standard including fees") {
              ret.currency = priceRanges[0].currency;
              ret.eventPrice = priceRanges[0].min;
            } else {
              ret.currency = priceRanges[1].currency;
              ret.eventPrice = priceRanges[1].min;
            }
          } else {
              ret.eventPrice = "Check event link for price";
            }

          return ret;
        });
        
        setTMItems(listingData);
      })
      .catch(err => console.log(err))
    };
    getTMItems();
  }, []);

  return (
    <Styles>
      <Container className="TicketmasterApp">
        <Row>
          <Col>
            <Dropdown/>
          </Col>
          <Col align="center">
          </Col>
        </Row>
        <Row>
          <Col>
            <h1 style={{margin: "20px 0"}}>Ticketmaster Metal Events</h1>
            <h6 style={{margin: "20px 0"}}>*Price includes booking fee</h6>
          </Col>
        </Row>
        <Row>
          <Col>
            <TicketmasterDTAPI TMItems={TMItems}/>
          </Col>
        </Row>
      </Container>
    </Styles>
  )
}