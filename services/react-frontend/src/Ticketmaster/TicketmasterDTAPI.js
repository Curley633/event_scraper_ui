import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';

export default class TicketmasterDTAPI extends Component {
  constructor(props) {
    super(props);

    this.state = {
      TMItems: {},
      visible: 30,
      error: false,
    };
    this.loadMore = this.loadMore.bind(this);
  }

  loadMore() {
    this.setState((prev) => {
      return{visible: prev.visible + 10};
    });
  }

  render() {
    const TMItems = this.props.TMItems.slice(0, this.state.visible).map(TMItem => {

    var artist = [];
    var eventDate = [];
    var eventLink = [];
    var eventStatus = [];
    var eventPrice = [];

    var eventsArray = TMItems;
    console.log(eventsArray)
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
    
      return (
        <tr key={TMItem.artist}>
          <th scope="row">{}</th>
          <td>{TMItem.artist}</td>
          <td>{TMItem.eventDate}</td>
          <td>{TMItem.eventPrice}</td>
          <td>{TMItem.eventLink}</td>
          <td>
            <a href={TMItem.eventLink}>{TMItem.artist}</a>
          </td>
        </tr>
      )
    })

    return (
      <div>
        <Table responsive hover>
          <thead>
            <tr>
              <th> </th>
              <th>Artist/s</th>
              {/* <th>Location</th> */}
              <th>Month</th>
              <th>Day</th>
              <th>Tickets</th>
            </tr>
          </thead>
          <tbody>
            {TMItems}
          </tbody>
        </Table>
        {this.state.visible < this.props.TMItems.length &&
          <Button variant="primary" size="lg" onClick={this.loadMore} type="button" block>Load More</Button>
        }
        <br/>
      </div>
    )
  }
}