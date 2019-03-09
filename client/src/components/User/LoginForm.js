import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { toast } from 'react-toastify';

// import withFormManager from './../hoc/withFormManager';
// import userModel from './../../models/UserModel'
// import userService from './../../services/userService'
import Auth from '../../services/auth';
import fetcher from '../../infrastructure/fetcher';
import userService from '../../services/userService';


export default class LoginForm extends Component {
    constructor(props){
        super(props)

        this.state={
            username:null,
            password:null
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    handleChange(e){
        // console.log(e.target.name+' '+e.target.value)
        this.setState({
            [e.target.name]:e.target.value
        })

    }

    async handleSubmit(e){
        e.preventDefault()
        // const res=await fetcher.login(this.state)
        // console.log(res);
        // if(!res.success){
        //     toast.error(res.message)
        //     Object.keys()
        // }else{

        // }
        if(userService.login(this.state)){
            console.log(this.props);
        }
    }

    render() {
        if(Auth.isUserAuthenticated()){
            return <Redirect to='/'/>
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

// export default withFormManager(LoginForm, userModel, userService.login)

