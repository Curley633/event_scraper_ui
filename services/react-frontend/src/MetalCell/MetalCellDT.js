import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import MetalCellMp3Modal from './MetalCellMp3Modal';

export default class MetalCellDT extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showModal: false,
      MetalCellItems: [],
      visible: 5,
      error: false,
      show: false
    };
    this.loadMore = this.loadMore.bind(this);
  }

  loadMore() {
    this.setState((prev) => {
      return{visible: prev.visible + 5};
    });
  }

  // state = { show: false };

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
      );
    })

    return (
      <div>
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
        {this.state.visible < this.props.MetalCellItems.length &&
          <Button variant="primary" size="lg" onClick={this.loadMore} type="button" block>Load More</Button>
        }
        <br/>
      </div>
    )
  }
}