import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Auth from './services/auth';

import Home from './views/home/Home';
import Header from './components/Header/Header';
import NotFound from './views/notFound/NotFound';
import Footer from './components/Footer/Footer';
import LoginForm from './components/User/LoginForm';
import RegisterForm from './components/User/RegisterForm';
import Logout from './components/User/Logout';



class App extends Component {
  constructor (props) {
    super(props)

    const isLoggedIn=!!localStorage.getItem('token')
    this.state = {
      loggedIn: isLoggedIn
    }

  }

  componentWillMount () {
    console.log('here');
    if (Auth.isUserAuthenticated()) {
      this.setState({ loggedIn: true })
    }else{
      this.setState({ loggedIn: false })
    }
  }

  
  render() {
    return (
      <div className="App">
        <Header
          loggedIn={this.state.loggedIn}
          isAdmin={Auth.isUserAdmin()}

         />
        <ToastContainer />
        <Switch>
          <Route path='/' exact component={Home} ></Route>
          <Route path='/login' component={LoginForm}></Route>
          <Route path='/register' exact component={RegisterForm}></Route>
          <Route path='/logout' exact component={Logout}></Route>
          <Route component={NotFound} />
        </Switch>
        <Footer />

      </div>
    );
  }
}

export default App;
