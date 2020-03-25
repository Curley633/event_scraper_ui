import React, { useEffect, useState } from 'react'
import TicketmasterDTAPI from '../Ticketmaster/TicketmasterDTAPI'
import { Container, Row, Col } from 'reactstrap';
import Dropdown from '../components/Dropdown';
import styled from 'styled-components';
// import Snackbar from '@material-ui/core/Snackbar';
// import Alert from '@material-ui/lab/Alert';
// import CheckIcon from '@material-ui/icons/Check';
// import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const Styles = styled.div`
text-align: left;
`;

export function TicketmasterEventsAPI() {

  const TM_BASE_URL = 'https://app.ticketmaster.com/discovery/v2'
  const TM_API_KEY = 'faXiMY5Hp4ArqTXZTog0fmjUQBoAxIf2'

  const [TMItems, setTMItems] = useState([]);

  const url = TM_BASE_URL + '/events?apikey=' + TM_API_KEY + '&includeTBA=yes&includeTBD=yes&includeTest=yes&dmaId=608&genreId=KnvZfZ7vAvt'

  async function getTMItems() {
    fetch(url)
    .then(response => response.json())
    .then(TMItems => {

      var eventsArray = TMItems._embedded.events;
      // console.log(eventsArray)

      var artist = [];
      var eventDate = [];
      var eventLink = [];
      var eventStatus = [];
      var eventPrice = [];

      for (var i in eventsArray) {
        artist = eventsArray[i].name;
        eventLink = eventsArray[i].url;
        console.log(artist);
        console.log(eventLink)

        for(var ij in eventsArray[i]) {
          eventDate = eventsArray[i].dates.start.localDate;
          console.log(eventDate)
        }

        for(var ji in eventsArray[i]) {
          eventStatus = eventsArray[i].dates.status.code;
          console.log(eventStatus)
        }
        
        var priceArrays = eventsArray[i].priceRanges;

        for(var jj in priceArrays) {
          if(priceArrays[0].type === "standard including fees") {
            eventPrice = priceArrays[0]['min'];
            break;
          } else {
            eventPrice = priceArrays[1]['min'];
            break;
          }
        }
        console.log(eventPrice)
      }
      const listingData = {artist, eventDate, eventLink, eventPrice}
      console.log(listingData)

      setTMItems(listingData);
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
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
            {/* {loading && <LoadingIndicator />} */}
            {/* {open && <UpdateSuccessSnackbar />} */}
            {/* {openFailed && <UpdateFailedSnackbar />} */}
          </Col>
        </Row>
        <Row>
          <Col>
          <h1 style={{margin: "20px 0"}}>Ticketmaster Metal Events</h1>
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