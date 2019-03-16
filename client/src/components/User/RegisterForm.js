import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { toast } from 'react-toastify';


import Auth from '../../services/auth';
import userService from '../../services/userService';



export default class RegisterForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: null,
            password: null,
            repeatPassword: null
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
        const registerData = {
            username: this.state.username,
            password: this.state.password,
            repeatPassword: this.state.repeatPassword
        }

        const res = await userService.register(registerData)

        if (res.success) {
            toast.success(res.message)
            this.props.history.push('/login');
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
                    <form id="registerForm" onSubmit={this.handleSubmit}>
                        <h2>Register</h2>
                        <div className="form-group">
                            <label>Username:</label>
                            <input name="username"
                                type="text"
                                className="form-control"
                                onChange={this.handleChange}
                                value={this.username} />
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input name="password"
                                className="form-control"
                                type="password"
                                onChange={this.handleChange}
                                value={this.password} />
                        </div>
                        <div className="form-group">
                            <label>Repeat Password:</label>
                            <input className="form-control" name="repeatPassword" type="password" onChange={this.handleChange} />
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>
                </div>
            </div>
        )
    }
}
