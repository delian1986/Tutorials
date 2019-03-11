import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AuthorizedRoute from './components/hoc/withAuthorizaedRoute'

import Home from './views/home/Home';
import Header from './components/Header/Header';
import NotFound from './views/notFound/NotFound';
import Footer from './components/Footer/Footer';
import LoginForm from './components/User/LoginForm';
import RegisterForm from './components/User/RegisterForm';
import Logout from './components/User/Logout';
import Auth from './services/auth';
import CreateCourseForm from './components/Course/CreateForm';

class App extends Component {


  render() {

    return (
      <div className="App">
          <Header
            loggedIn={Auth.isUserAuthenticated()}
            isAdmin={Auth.isUserAdmin()}
            username={Auth.getUsername()}

          />
          <ToastContainer />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/login' component={LoginForm} />
            <Route path='/register' component={RegisterForm} />
            <Route path='/logout' component={AuthorizedRoute(Logout,['User,Admin'])} />
            <Route path='/create-course' component={AuthorizedRoute(CreateCourseForm,['Admin'])} />
            <Route component={NotFound} />
          </Switch>
        <Footer />

      </div>
    );
  }
}

export default App;
