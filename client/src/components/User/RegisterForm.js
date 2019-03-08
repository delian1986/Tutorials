import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import withFormManager from './../hoc/withFormManager';
import userModel from './../../models/UserModel'
import userService from './../../services/userService'
import Auth from '../../services/auth';


class RegisterForm extends Component {
    render() {
        if(Auth.isUserAuthenticated()){
            return <Redirect to='/'/>
        }
        return (
            <div className="d-flex justify-content-center align-items-center container ">

                <form id="registerForm" onSubmit={this.props.handleSubmit}>
                    <h2>Register</h2>
                    <label>Username:</label>
                    <input name="username"
                        type="text"
                        className="form-control"
                        onChange={this.props.handleChange}
                        value={this.props.username} />
                    <label>Password:</label>
                    <input name="password"
                        className="form-control"
                        type="password"
                        onChange={this.props.handleChange}
                        value={this.props.password} />
                    <label>Repeat Password:</label>
                    <input className="form-control" name="repeatPassword" type="password" onChange={this.props.handleChange} />
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
            </div>
        )
    }

}

export default withFormManager(RegisterForm,userModel,userService.register)