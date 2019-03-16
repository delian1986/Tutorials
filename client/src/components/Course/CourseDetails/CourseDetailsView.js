import React, { Component } from 'react'
import CourseHeader from './../CourseHeader/CourseHeader';
import courseService from '../../../services/courseService';
import Spinner from '../../Spinner/Spinner';
import Lectures from '../../Lecture/LectureList/LecturesList';
import Auth from '../../../services/auth';
import { toast } from 'react-toastify';
import VideoPlayer from '../../VideoPlayer/VideoPlayer';

export default class CourseDetailsView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            content: '',
            image: '',
            lectures: [],
            isLoading: true,
            selectedCourseId: '',
            isPlaying: false,
            nowPlaying: ''
        }

        this.handleEnroll = this.handleEnroll.bind(this)
        this.handleVideoPlay = this.handleVideoPlay.bind(this)
    }

    async handleEnroll(e, courseId) {
        const userId = Auth.getUserId()
        const data = { courseId, userId }
        try {
            const res = await courseService.enroll(data)

            if (res.success) {
                localStorage.setItem('enrolledCourses', res.data.enrolledCourses)
                toast.success(res.message)
                this.loadCourses()
            } else {
                if (res.errors) {
                    Object.values(res.errors).forEach((msg) => {
                        toast.error(msg)
                    })
                } else {
                    toast.error(res.message)
                }
            }
        } catch (e) {
            toast.error(e.message)
        }
    }

    async componentDidMount() {
        await this.loadCourses()
    }

    handleVideoPlay(e, lectureId) {
        const lectureVideoUrl = this.state.lectures.filter((lecture) => {
            return lecture._id = lectureId
        })


        this.setState({
            nowPlaying: lectureVideoUrl
        })
    }

    async loadCourses() {
        const selectedCourseId = this.props.match.params.id
        try {
            const res = await courseService.getCourseById(selectedCourseId)

            if (res.success) {
                this.setState({
                    image: res.data.image,
                    content: res.data.content,
                    title: res.data.title,
                    lectures: res.data.lectures,
                    selectedCourseId: selectedCourseId,
                    isLoading: false
                })
            } else {
                console.log(res.error);
            }
        } catch (e) {

        }
    }


    render() {
        if (this.state.isLoading) {
            return <Spinner />
        }
        return (
            <div className="container">
                {
                    this.state.isPlaying
                        ?
                        <VideoPlayer
                            nowPlaying={this.state.nowPlaying}
                        />
                        :
                        <CourseHeader
                            {...this.state}
                            {...this.props}
                            handleEnroll={this.handleEnroll}
                        />
                }

                <Lectures
                    {...this.state}
                    handleVideoPlay={this.handleVideoPlay}
                />
            </div>
        )

    }
}

