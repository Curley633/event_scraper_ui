import React, { Component } from 'react'
import { Table } from 'reactstrap';

export default class MetalCellDT extends Component {

  render() {
    const MetalCellItems = this.props.MetalCellItems.map(MetalCellItem => {
      return (
        <tr key={MetalCellItem.title}>
          {/* <th scope="row">{DMEItem.index}</th> */}
          <td align="left" nowrap>{MetalCellItem.title}</td>
            <td>{MetalCellItem.date}</td>
          <td>{MetalCellItem.duration}</td>
          <a href={MetalCellItem.mp3}>MP3</a>
        </tr>
      )
    })

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th nowrap>Episode</th>
            <th>Date</th>
            <th>Duration</th>
            <th>Listen</th>
          </tr>
        </thead>
        <tbody>
          {MetalCellItems}
        </tbody>
      </Table>
    )
  }
}