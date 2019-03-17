import React, { Component, Fragment } from 'react'
import { toast } from 'react-toastify';
import courseService from '../../../services/courseService';
import Auth from '../../../services/auth';
import Spinner from '../../Spinner/Spinner';
import courseValidator from '../../../validators/courseValidator';

export default class CourseCreateForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            content: '',
            image: '',
            isListed: '',
            creator: Auth.getUserId(),
            isLoading: true,
            actionMsg: 'Create',
            courseId: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async componentDidMount() {


        if (this.props.match.params.hasOwnProperty('id')) {
            const courseId = this.props.match.params.id


            try {
                const res = await courseService.getCourseById(courseId)
                this.setState({
                    title: res.data.title,
                    content: res.data.content,
                    image: res.data.image,
                    isListed: res.data.isListed,
                    actionMsg: 'Edit',
                    courseId: courseId
                })

            } catch (e) {
                console.log(e);
            }

        }

        this.setState({ isLoading: false })
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
            isListed: e.target.checked,
        })

    }

    

    async handleSubmit(e) {
        e.preventDefault()
        let res = null
        if (this.state.actionMsg === 'Create') {
            if(courseValidator.validate(this.state)){
                toast.error(courseValidator.validate(this.state))
                return
            }
            res = await courseService.create(this.state)
            
        } else if (this.state.actionMsg === 'Edit') {

            if(courseValidator.validate(this.state)){
                toast.error(courseValidator.validate(this.state))
                return
            }

            res = await courseService.edit(this.state)
        }

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

        if (this.state.isLoading) {
            return <Spinner />
        }

        return (
            <div className="d-flex justify-content-center align-items-center container ">
                <div className="card card-body bg-light">
                    <form id="loginForm" onSubmit={this.handleSubmit}>
                        <h2>{this.state.actionMsg} Course</h2>
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
                            <input type="checkbox" checked={this.state.isListed || ''} className="form-check-input" id="exampleCheck1" name="isListed" onChange={this.handleChange} />
                            <label className="form-check-label" htmlFor="exampleCheck1">Do you want to list that course now?</label>
                        </div>
                        {
                            this.state.actionMsg === 'Create'
                                ?
                                <button type="submit" className="btn btn-primary">Create</button>
                                :
                                <Fragment>
                                    <button type="submit" className="btn btn-warning">Edit</button>
                                    <button type="submit" className="btn btn-primary pull-right" onClick={()=>this.props.history.push('/create-course')}>Create</button>
                                </Fragment>
                        }
                    </form>
                </div>
            </div>
        )
    }

}


