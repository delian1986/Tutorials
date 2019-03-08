import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import withFormManager from './../hoc/withFormManager';
import userModel from './../../models/UserModel'
import userService from './../../services/userService'
import Auth from '../../services/auth';

class LoginForm extends Component {
    render() {
        if(Auth.isUserAuthenticated()){
            return <Redirect to='/'/>
        }

        return (
            <div className="d-flex justify-content-center align-items-center container ">
                <div className="card card-body bg-light">
                    <form id="loginForm" onSubmit={this.props.handleSubmit}>
                        <h2>Sign In</h2>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Username</label>
                            <input name="username" className="form-control" onChange={this.props.handleChange} type="text" value={this.props.username} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input name="password" className="form-control" onChange={this.props.handleChange} type="password" value={this.props.password} />
                        </div>

                        <button type="submit" className="btn btn-primary">Log In</button>
                    </form>
                </div>
            </div>
        )
    }

}

export default withFormManager(LoginForm, userModel, userService.login)

