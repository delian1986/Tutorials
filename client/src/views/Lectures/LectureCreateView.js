import React, { Component, Fragment } from 'react'
import { toast } from 'react-toastify';
import courseService from '../../services/courseService';
import Auth from '../../services/auth';
import fetcher from '../../infrastructure/fetcher';
import Lectures from './LecturesList';
import LectureCreateForm from '../../components/Lecture/LectureCreateForm';
import lectureService from '../../services/lectureService';

export default class LectureCreateView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            allCourses: [],
            selectedCourseId: '',
            selectedCourseName: '',
            isListed: false,
            creator: Auth.getUserId(),
            lectures: [],
            loading: true
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleLectureSubmit = this.handleLectureSubmit.bind(this)
        this.handleDeleteLecture = this.handleDeleteLecture.bind(this)
    }

    async componentDidMount() {
        const allCourses = await fetcher.getAllCoursesNames()

        this.setState({ allCourses, loading: false })
    }

    async handleDeleteLecture(id){
        console.log('delete ' + id)
    }


    async handleChange(e) {

        this.setState({
            [e.target.name]: e.target.value,
            selectedCourseName: e.target.options[e.target.selectedIndex].text,
            isListed: e.target.checked,
            lectures: []
        }, this.loadLectures)
    }

    async handleLectureSubmit(e, data) {
        e.preventDefault()
        data.course = this.state.selectedCourseId
        const res = await lectureService.create(data)

        if (res.success) {
            toast.success(res.message)

            await this.loadLectures()
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

    async loadLectures() {

        try {
            const res = await courseService.getCourseById(this.state.selectedCourseId)
            this.setState({
                lectures: res.lectures
            })
        } catch (e) {
            console.log(e)
        }

    }


    render() {
        if (this.state.loading) {
            return (
                <div className="align-content-center">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" alt="" />
                </div>
            )
        }

        return (
            <Fragment>
                <div className="d-flex justify-content-center align-items-center container ">
                    <div className="card card-body bg-light">
                        <form id="lectureCreateForm" onSubmit={this.handleSubmit}>
                            <h2>Add Lecture To Course</h2>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlSelect1">Select Course</label>
                                <select className="form-control" id="exampleFormControlSelect1" name="selectedCourseId" onChange={this.handleChange} value={this.state.selectedCourseId}>
                                    <option key={''}
                                        value={''}>Select Course</option>
                                    {this.state.allCourses.map((course) => {
                                        return <option key={course._id}
                                            value={course._id}>{course.title}</option>
                                    })}
                                </select>
                            </div>

                        </form>

                    </div>
                </div>



                {this.state.selectedCourseId ?
                    <Fragment>
                        <LectureCreateForm
                            title={this.state.title}
                            videoUrl={this.state.videoUrl}
                            selectedCourseName={this.state.selectedCourseName}
                            handleLectureSubmit={this.handleLectureSubmit}
                        />
                        <Lectures
                            lectures={this.state.lectures}
                            selectedCourseName={this.state.selectedCourseName}
                            handleDeleteLecture={this.handleDeleteLecture}
                        />
                    </Fragment>
                    :
                    <div className="card card-body bg-light text-center">
                        <h1>Select Course</h1>
                    </div>
                }
            </Fragment>

        )
    }

}


