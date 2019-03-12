import React, { Component, Fragment } from 'react'
import { toast } from 'react-toastify';
import courseService from '../../services/courseService';
import Auth from '../../services/auth';
import fetcher from '../../infrastructure/fetcher';
import Lectures from '../../views/Lectures/Lectures';
import LectureCreateForm from '../../components/Lecture/LectureCreateForm';
import lectureService from '../../services/lectureService';

export default class LectureCreateView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            allCourses: [],
            selectedCourseId: '',
            isListed: false,
            creator: Auth.getUserId(),
            lectures: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleLectureSubmit = this.handleLectureSubmit.bind(this)
    }

    async componentDidMount() {
        const allCourses = await fetcher.getAllCoursesNames()

        this.setState({ allCourses })
    }

    
    handleChange(e) {
        

        this.setState({
            [e.target.name]: e.target.value,
            isListed: e.target.checked,
        })
        if(this.state.selectedCourseId!==''){
            const lectures=this.loadLectures()
            console.log('lectures '+ lectures);
        }

    }

    async handleLectureSubmit(e, data) {
        e.preventDefault()
        const res = await lectureService.create(data)



    }

    async loadLectures() {
        const res= await courseService.getCourseById(this.state.selectedCourseId)
        return res.lectures
    }
   

    render() {

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
                            selectedCourseId={this.state.selectedCourseId}
                            handleLectureSubmit={this.handleLectureSubmit}
                        />
                        <Lectures lectures={this.state.lectures} />
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


