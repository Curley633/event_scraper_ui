import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';

export default class TicketmasterDataTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      TMItems: [],
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
        <tr key={TMItem.index}>
          <th scope="row">{TMItem.index}</th>
          <td>{TMItem.name}</td>
          <td>{TMItem.location}</td>
          <td>{TMItem.month}</td>
          <td>{TMItem.day}</td>
          <td>
            <a href={TMItem.ticketlink}>{TMItem.name} {TMItem.location}</a>
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
              <th>Location</th>
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