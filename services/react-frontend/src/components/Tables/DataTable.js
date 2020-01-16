
import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal'

export default class DataTable extends Component {

  render() {
    const items = this.props.items.map(item => {
      return (
        <tr key={item.index}>
          <th scope="row">{item.index}</th>
          <td>{item.name}</td>
          <td>{item.location}</td>
          <td>{item.month}</td>
          <td>{item.day}</td>
      <a href={item.ticketlink} text-align="right">{item.name} {item.location}</a>
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
          {items}
        </tbody>
      </Table>
    )
  }
}

// export default DataTable