import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';

function formatStatusText(code) {
  const map = {
    onsale: "On sale",
    cancelled: "Cancelled",
    rescheduled: "Rescheduled",
    postponed: "Postponed"
  };

  return (
    map[code] || code.charAt(0).toUpperCase() + code.toLowerCase().slice(1)
  );
}


export default class TicketmasterDTAPI extends Component {
  constructor(props) {
    super(props);

    this.state = {
      TMItems: {},
      visible: 10,
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

      return (
        <tr key={TMItem.eventLink}>
          <td>{TMItem.artist}</td>
          <td>{TMItem.eventDate}</td>
          <td>{TMItem.eventVenue}</td>
          <td>{TMItem.location}</td>
          <td>{TMItem.currency} {TMItem.eventPrice}</td>
          <td>{formatStatusText(TMItem.eventStatus)}</td>
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
              <th>Artist/s</th>
              <th>Date</th>
              <th>Venue</th>
              <th>City</th>
              <th>Price</th>
              <th>Status</th>
              <th>Link</th>
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