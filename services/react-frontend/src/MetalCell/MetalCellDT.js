import React, { Component } from 'react'
import { Table } from 'reactstrap';
import MetalCellMp3Modal from './MetalCellMp3Modal';

export default class MetalCellDT extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
    }
  }

  state = { show: false };

  showModal = () => {
    this.setState({ 
      show: true,
    });
  }

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {

    const MetalCellItems = this.props.MetalCellItems.map(MetalCellItem => {
      return (
        <tr key={MetalCellItem.title}>
          <td align="left">{MetalCellItem.title}</td>
          <td>{MetalCellItem.date}</td>
          <td>{MetalCellItem.duration}</td>
          <td>
            <MetalCellMp3Modal mp3={MetalCellItem.mp3} show={this.state.show} handleClose={this.hideModal}>
              <button onClick={() => this.showModal( MetalCellItem )}>{MetalCellItem.mp3}</button>
            </MetalCellMp3Modal>
           </td>
        </tr>
      )
    })

    console.log(MetalCellItems.mp3)

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