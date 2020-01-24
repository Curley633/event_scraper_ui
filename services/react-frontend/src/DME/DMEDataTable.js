import React, { Component } from 'react'
import { Table } from 'reactstrap';

export default class DMEDataTable extends Component {

  render() {
    const DMEItems = this.props.DMEItems.map(DMEItem => {
      return (
        <tr key={DMEItem.index}>
          {/* <th scope="row">{DMEItem.index}</th> */}
          <td>{DMEItem.title}</td>
          <td>{DMEItem.details}</td>
          <a href={DMEItem.link}>Tickets</a>
        </tr>
      )
    })

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>Artist/s</th>
            <th>Details</th>
            <th>Tickets</th>
          </tr>
        </thead>
        <tbody>
          {DMEItems}
        </tbody>
      </Table>
    )
  }
}