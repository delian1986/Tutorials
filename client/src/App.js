import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Auth from './services/auth';
import { UserProvider,defaultUserState } from './components/contexts/userContext'

import Home from './views/home/Home';
import Header from './components/Header/Header';
import NotFound from './views/notFound/NotFound';
import Footer from './components/Footer/Footer';
import LoginForm from './components/User/LoginForm';
import RegisterForm from './components/User/RegisterForm';
import Logout from './components/User/Logout';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {
        ...defaultUserState,
        updateUser: this.updateUser,
        username:localStorage.getItem('username') || ''
      }
    }
  }

  updateUser = (user) => {
    this.setState({ user })
  }


  render() {
    const { user } = this.state

    return (
      <div className="App">
        <UserProvider value={user}>
          <Header
            loggedIn={this.state.user.isLoggedIn}
            isAdmin={Auth.isUserAdmin()}

          />
          <ToastContainer />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/login' component={LoginForm} />
            <Route path='/register' exact component={RegisterForm} />
            <Route path='/logout' exact component={Logout} />
            <Route component={NotFound} />
          </Switch>
        </UserProvider>
        <Footer />

      </div>
    );
  }
}

export default App;
