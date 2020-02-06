import React, { Component } from 'react'
import { Table } from 'reactstrap';

export default class BlabbermouthDT extends Component {

  render() {
    const BMItems = this.props.BMItems.map(BMItem => {
      return (
        <tr key={BMItem.index}>
          <th scope="row">{BMItem.index}</th>
          <td>{BMItem.title}</td>
          <td>
            <a href={BMItem.link}>Read it..</a>
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
              <th>Headline </th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {BMItems}
          </tbody>
        </Table>
      </div>
    )
  }
}