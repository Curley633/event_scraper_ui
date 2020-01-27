import React, { Component } from 'react'
import { Table } from 'reactstrap';
import MetalCellMp3player from './MetalCellMP3Modal'

export default class MetalCellDT extends Component {

  state = { show: false };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    const MetalCellItems = this.props.MetalCellItems.map(MetalCellItem => {
      return (
        <tr key={MetalCellItem.title}>
          <td align="left" nowrap>{MetalCellItem.title}</td>
          <td>{MetalCellItem.date}</td>
          <td>{MetalCellItem.duration}</td>
          <MetalCellMp3player show={this.state.show} handleClose={this.hideModal}></MetalCellMp3player>
          {/* <a href={MetalCellItem.mp3}>MP3</a> */}
        </tr> 
      )
    })

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>Episode</th>
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