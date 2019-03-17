import React, { Component, Fragment } from 'react'
import { toast } from 'react-toastify';
import courseService from '../../../services/courseService';
import Auth from '../../../services/auth';
import fetcher from '../../../infrastructure/fetcher';
import Lectures from '../LectureList/LecturesList';
import LectureCreateForm from '../LectureCreateForm/LectureCreateForm';
import lectureService from '../../../services/lectureService';
import Spinner from '../../Spinner/Spinner';
import lectureValidator from '../../../validators/lectureValidator';

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
            loading: true,
            lectureTitleToEdit: '',
            videoUrlToEdit: '',
            actionMsg: 'Add',
            lectureId: '',
            isInEditMode:true

        }
        this.handleChange = this.handleChange.bind(this)
        this.handleLectureSubmit = this.handleLectureSubmit.bind(this)
        this.handleDeleteLecture = this.handleDeleteLecture.bind(this)
        this.handleEditLecture = this.handleEditLecture.bind(this)
        this.handleSubmitEdit = this.handleSubmitEdit.bind(this)
        this.cancelEditLecture = this.cancelEditLecture.bind(this)
    }

    async componentDidMount() {
        const allCourses = await fetcher.getAllCoursesNames()

        this.setState({ allCourses, loading: false })
    }

    async handleDeleteLecture(e, lectureId, courseId) {
        const data = { lectureId, courseId }
        const res = await lectureService.delete(data)

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

    handleEditLecture(e, lectureId) {
        e.preventDefault()
        const lectureToEdit = this.state.lectures.filter(x => x._id === lectureId)[0]

        this.setState({
            actionMsg: 'Edit',
            lectureTitleToEdit: lectureToEdit.title,
            videoUrlToEdit: lectureToEdit.videoUrl,
            lectureId: lectureToEdit._id
        })
    }

    cancelEditLecture() {
        this.setState({
            actionMsg: 'Add',
            lectureTitleToEdit: '',
            videoUrlToEdit: '',
            lectureId: ''
        })
    }

    async handleSubmitEdit(e, args) {
        e.preventDefault()
        const data = {
            lectureId: args.lectureId,
            lectureTitleToEdit: args.title,
            videoUrlToEdit: args.videoUrl
        }

        if(lectureValidator.validate(data)){
            toast.error(lectureValidator.validate(data))
            return
        }

        const res = await lectureService.edit(data)

        if (res.success) {
            toast.success(res.message)

            this.setState({
                lectureId: '',
                lectureTitleToEdit: '',
                videoUrlToEdit: '',
                actionMsg: 'Add',

            })
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

        if(lectureValidator.validate(data)){
            toast.error(lectureValidator.validate(data))
            return
        }

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
        if (this.state.selectedCourseId) {
            try {
                const res = await courseService.getCourseById(this.state.selectedCourseId)
                if(res.success){
                    this.setState({
                        lectures: res.data.lectures
                    })

                }
            } catch (e) {
                console.log(e)
            }
        }

    }


    render() {
        if (this.state.loading) {
            return (
                <Spinner/>
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
                            {this.state.selectedCourseId
                                ?
                                <button type="button" className="btn btn-warning" onClick={() => { this.props.history.push(`/edit-course/${this.state.selectedCourseId}`) }}>Edit this course</button>
                                :
                                ''
                            }

                        </form>

                    </div>
                </div>

                {this.state.selectedCourseId ?
                    <Fragment>
                        <LectureCreateForm
                            title={this.state.lectureTitleToEdit}
                            videoUrl={this.state.videoUrlToEdit}
                            lectureId={this.state.lectureId}
                            selectedCourseName={this.state.selectedCourseName}
                            handleLectureSubmit={this.handleLectureSubmit}
                            actionMsg={this.state.actionMsg}
                            handleSubmitEdit={this.handleSubmitEdit}
                            cancelEditLecture={this.cancelEditLecture}
                        />
                        <Lectures
                            lectures={this.state.lectures}
                            selectedCourseName={this.state.selectedCourseName}
                            selectedCourseId={this.state.selectedCourseId}
                            handleDeleteLecture={this.handleDeleteLecture}
                            handleEditLecture={this.handleEditLecture}
                            isInEditMode={this.state.isInEditMode}
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


