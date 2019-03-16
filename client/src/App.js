import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AuthorizedRoute from './components/hoc/withAuthorizaedRoute'

import Home from './components/Home/Home';
import Header from './components/Header/Header';
import NotFound from './components/notFound/NotFound';
import Footer from './components/Footer/Footer';
import LoginForm from './components/User/LoginForm';
import RegisterForm from './components/User/RegisterForm';
import Logout from './components/User/Logout';
import Auth from './services/auth';
import LectureCreateView from './components/Lecture/LectureCreateView/LectureCreateView';
import CourseCreateForm from './components/Course/CourseCreateForm/CourseCreateForm';
import CourseDetailsView from './components/Course/CourseDetails/CourseDetailsView';
import CourseView from './components/Course/CourseView/CourseView';

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
            <Route path='/create-course' component={AuthorizedRoute(CourseCreateForm,['Admin'])} />
            <Route path='/courses' component={AuthorizedRoute(CourseView,['User','Admin'])} />
            <Route path='/course/details/:id' component={CourseDetailsView} />
            <Route path='/edit-course/:id' component={AuthorizedRoute(CourseCreateForm,['Admin'])} />
            <Route path='/add-lecture' component={AuthorizedRoute(LectureCreateView,['Admin'])} />
            <Route component={NotFound} />
          </Switch>
        <Footer />

      </div>
    );
  }
}

export default App;
