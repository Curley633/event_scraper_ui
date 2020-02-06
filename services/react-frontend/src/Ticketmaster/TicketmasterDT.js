import React, { Component } from 'react'
import { Table } from 'reactstrap';

export default class TicketmasterDataTable extends Component {

  render() {
    const TMItems = this.props.TMItems.map(item => {
      return (
        <tr key={item.index}>
          <th scope="row">{item.index}</th>
          <td>{item.name}</td>
          <td>{item.location}</td>
          <td>{item.month}</td>
          <td>{item.day}</td>
          <td>
            <a href={item.ticketlink}>{item.name} {item.location}</a>
          </td>
        </tr>
      )
    })

    return (
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
    )
  }
}