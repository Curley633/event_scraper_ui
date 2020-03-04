import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';

export default class DMEDataTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      DMEItems: [],
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
    const DMEItems = this.props.DMEItems.slice(0,this.state.visible).map(DMEItem => {
      return (
        <tr key={DMEItem.index}>
          <th scope="row">{DMEItem.index}</th>
          <td align="left">{DMEItem.title}</td>
          <td align="left">{DMEItem.details}</td>
          <td>
            <a href={DMEItem.link}>{DMEItem.title}</a>
          </td>
        </tr>
      );
    })
    return (
      <div>
        <Table responsive hover>
          <thead>
            <tr>
              <th></th>
              <th>Artist/s</th>
              <th>Details</th>
              <th>Tickets</th>
            </tr>
          </thead>
          <tbody>
            {DMEItems}
          </tbody>
        </Table>
        {this.state.visible < this.props.DMEItems.length &&
          <Button variant="primary" size="lg" onClick={this.loadMore} type="button" block>Load More</Button>
        }
      <br/>
      </div>
    )
  }
}