import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';

export default class BlabbermouthDT extends Component {
  constructor(props) {
    super(props);

    this.state = {
      BMItems: [],
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
    const BMItems = this.props.BMItems.slice(0,this.state.visible).map(BMItem => {
      return (
        <tr key={BMItem.index}>
          <th scope="row">{BMItem.index}</th>
          <td>{BMItem.title}</td>
          <td>
            <a href={BMItem.link}>Read it..</a>
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
              <th>Headline</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {BMItems}
          </tbody>
        </Table>
        {this.state.visible < this.props.BMItems.length &&
          <Button variant="primary" size="lg" onClick={this.loadMore} type="button" block>Load More</Button>
        }
        <br/>
      </div>
    )
  }
}