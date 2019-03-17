import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { toast } from 'react-toastify';

import Auth from '../../services/auth';
import userService from '../../services/userService';
import UserValidator from '../../validators/UserValidator';

export default class LoginForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: null,
            password: null,
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })

    }

    async handleSubmit(e) {
        e.preventDefault()
        const loginData = {
            username: this.state.username,
            password: this.state.password
        }

        if(UserValidator.validate(loginData)){
            toast.error(UserValidator.validate(loginData))
            return
        }

        const res = await userService.login(loginData)
        
        if (res.success) {
            localStorage.setItem('token', res.token)
            localStorage.setItem('username', res.user.username)
            localStorage.setItem('userId', res.user.userId)
            localStorage.setItem('role', res.user.roles)
            localStorage.setItem('enrolledCourses', res.user.enrolledCourses)
            localStorage.setItem('watchedVideos', res.user.watchedVideos)
            toast.success(res.message)

            this.props.history.push('/');
        } else {
            if (res.errors) {
                Object.values(res.errors).forEach((msg) => {
                    toast.error(msg)
                })
            } else {
                toast.error(res.message)
            }
        }
    }


    render() {

        if (Auth.isUserAuthenticated()) {
            return <Redirect to='/' />
        }

        return (
            <div className="d-flex justify-content-center align-items-center container ">
                <div className="card card-body bg-light">
                    <form id="loginForm" onSubmit={this.handleSubmit}>
                        <h2>Sign In</h2>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Username</label>
                            <input name="username" className="form-control" onChange={this.handleChange} type="text" value={this.props.username} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input name="password" className="form-control" onChange={this.handleChange} type="password" value={this.props.password} />
                        </div>

                        <button type="submit" className="btn btn-primary">Log In</button>
                    </form>
                </div>
            </div>
        )
    }

}
