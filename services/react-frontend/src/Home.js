import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';
import ModalForm from './components/Modals/Modal'
import DataTable from './components/Tables/DataTable'

// export const Home = () => (
//         <div>
//             <h2>Home:</h2>
//             <p>Add to this later...</p>
//             {/* <button onClick={displayMonroesEvents}>Monroes Events</button>
//             <button onClick={displayTicketmasterEvents}>Ticketmaster Metal Events</button> */}
//         </div>
// )

export class Home extends Component {

state = {
    items: []
  }

  getItems(){
    fetch('http://localhost:5000/ticketmaster')
      .then(response => response.json())
      .then(items => this.setState({items}))
      .catch(err => console.log(err))
  }

  componentDidMount(){
    this.getItems()
  }

  render() {
    return (
      <Container className="App">
        <Row>
          <Col>
            <h1 style={{margin: "20px 0"}}>Ticketmaster Events</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <DataTable items={this.state.items}/>
          </Col>
        </Row>
      </Container>
    )
  }
}

// export default Home
//  function displayMonroesEvents() {
                
// }

// async function displayTicketmasterEvents() {
                
// }
