import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { toast } from 'react-toastify';
import courseService from '../../services/courseService';

export default class CreateCourseForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: null,
            content: null,
            image: null,
            selectedFile:null,

        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleUploadImage = this.handleUploadImage.bind(this)
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })

    }

    async handleSubmit(e) {
        e.preventDefault()
        const data = {
            title: this.state.title,
            content: this.state.content,
            image: this.state.image
        }

        const res = await courseService.create(data)

        // if (res.success) {

        //     toast.success(res.message)

        //     this.props.history.push('/');
        // } else {
        //     if (res.errors) {
        //         Object.values(res.errors).forEach((msg) => {
        //             toast.error(msg)
        //         })
        //     } else {
        //         toast.error(res.message)
        //     }
        // }
    }

    handleUploadImage(e){
        console.log(e.target.files[0]);
    }


    render() {

        return (
            <div className="d-flex justify-content-center align-items-center container ">
                <div className="card card-body bg-light">
                    <form id="loginForm" onSubmit={this.handleSubmit}>
                        <h2>Create Course</h2>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Title</label>
                            <input name="title" className="form-control" onChange={this.handleChange} type="text" value={this.props.username} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Content</label>
                            <input name="content" className="form-control" onChange={this.handleChange} type="password" value={this.props.password} />
                        </div>
                        <label htmlFor="exampleFormControlFile1">Example file input</label>
                        <input type="file" name="image" className="form-control-file" id="exampleFormControlFile1" onChange={this.handleUploadImage}/>
                        <button type="submit" className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        )
    }

}


