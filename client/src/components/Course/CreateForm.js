import React, { Component } from 'react'
import { toast } from 'react-toastify';
import courseService from '../../services/courseService';
import Auth from '../../services/auth';

export default class CreateCourseForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            content: '',
            image: '',
            isListed: false,
            creator: Auth.getUserId()
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
            isListed: e.target.checked,
        })

    }

    async handleSubmit(e) {
        e.preventDefault()
        console.log(this.state);
        const res = await courseService.create(this.state)

        if (res.success) {

            toast.success(res.message)

            this.props.history.push('/add-lecture');
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

        return (
            <div className="d-flex justify-content-center align-items-center container ">
                <div className="card card-body bg-light">
                    <form id="loginForm" onSubmit={this.handleSubmit}>
                        <h2>Create Course</h2>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input name="title" className="form-control" onChange={this.handleChange} type="text" value={this.state.title} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="comment">Content:</label>
                            <textarea className="form-control" rows="5" id="content" name="content" value={this.state.content} onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Image</label>
                            <input name="image" className="form-control" onChange={this.handleChange} type="text" value={this.state.image} />
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" name="isListed" onChange={this.handleChange} value={this.state.isListed} />
                            <label className="form-check-label" htmlFor="exampleCheck1">Do you want to list that course now?</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        )
    }

}


