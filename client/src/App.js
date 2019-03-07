import React, { Component } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import Home from './views/home/Home';
import Header from './components/Header/Header';
import NotFound from './views/notFound/NotFound';
import Footer from './components/Footer/Footer';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Router>
          <Switch>
            <Route path='/' exact component={Home} ></Route>
            <Route component={NotFound} />
          </Switch>
        </Router>
        <Footer/>

      </div>
    );
  }
}

export default App;
