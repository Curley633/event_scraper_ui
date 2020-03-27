import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { Home } from './Home'
import { DMEEvents } from './DME/DMEEvents'
import { TicketmasterEventsAPI } from './Ticketmaster/TicketmasterAPI';
import { BlabbermouthArticles } from './Blabbermouth/BlabbermouthArticles';
import { MetalCellPodcasts } from './MetalCell/MetalCellPodcasts';
import { About } from './About'
import { Contact } from './Contact'
import { NoMatch } from './NoMatch'
import { Layout } from './components/Layout';
import { NavigationBar } from './components/NavigationBar';
import { Jumbotron } from './components/Jumbotron';

class App extends Component {

  render() {
    return (
      <React.Fragment>
        <Router>
          <NavigationBar />
          <Jumbotron />
          <Layout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/dme" component={DMEEvents} />
              <Route path="/ticketmaster" component={TicketmasterEventsAPI} />
              <Route path="/blabbermouth" component={BlabbermouthArticles} />
              <Route path="/metalcell" component={MetalCellPodcasts} />
              <Route component={NoMatch} />
            </Switch>
          </Layout>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;