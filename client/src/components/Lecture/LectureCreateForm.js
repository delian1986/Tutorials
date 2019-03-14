import React, { Component } from 'react'

export default class LectureCreateForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lectureId: this.props.lectureId || '',
            title: '',
            videoUrl: '',
            course: this.props.selectedCourseId,
            actionMsg: 'Add',
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.title !== this.state.title) {
            this.setState({
                title: nextProps.title,
                videoUrl: nextProps.videoUrl,
                actionMsg: nextProps.actionMsg,
                lectureId:nextProps.lectureId
            })
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })

    }

    render() {

        return (
            <div className="d-flex justify-content-center align-items-center container ">
                <div className="card card-body bg-light">
                    <form id="lectureCreateForm"
                        onSubmit={
                            this.state.actionMsg === 'Add'
                                ?
                                (e) => this.props.handleLectureSubmit(e, this.state)
                                :
                                (e) => this.props.handleSubmitEdit(e, this.state)
                        } >
                        <h2>{this.state.actionMsg} Lecture to {this.props.selectedCourseName}</h2>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Title</label>
                            <input name="title" className="form-control" onChange={this.handleChange} type="text" value={this.state.title} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Video Url</label>
                            <input name="videoUrl" className="form-control" onChange={this.handleChange} type="text" value={this.state.videoUrl} />
                        </div>
                        {
                            this.state.actionMsg === 'Add'
                                ?
                                <button type="submit" className="btn btn-primary">Add lecture</button>
                                :
                                <button type="submit" className="btn btn-warning">Edit lecture</button>
                        }
                    </form>

                </div>
            </div>
        )
    }

}
