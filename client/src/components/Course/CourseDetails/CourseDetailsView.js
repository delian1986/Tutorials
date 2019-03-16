import React, { Component } from 'react'
import CourseHeader from './../CourseHeader/CourseHeader';
import courseService from '../../../services/courseService';
import Spinner from '../../Spinner/Spinner';
import Lectures from '../../Lecture/LectureList/LecturesList';
import Auth from '../../../services/auth';
import { toast } from 'react-toastify';
import lectureService from './../../../services/lectureService'

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
            nowPlaying: '',
            nowPlayingLectureId:''
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
                this.loadCourseWithLectures()
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
        await this.loadCourseWithLectures()
    }

    async handleVideoPlay(e, lectureId) {

        if(Auth.isUserAuthenticated() && !Auth.isInWatchedVideos(lectureId)){
            const userId=Auth.getUserId()
            const res=await lectureService.addToWatched({userId,lectureId})
            if(res.success){
                localStorage.setItem('watchedVideos',res.data.watchedVideos)
            }else{
                toast.error(res.message)
            }
        }

        const selectedLecture = this.state.lectures.filter((lecture) => {
            return lecture._id === lectureId
        })

        this.setState({
            nowPlaying: selectedLecture[0].videoUrl,
            nowPlayingLectureId: lectureId,
            isPlaying:true
        })
      
    }

    async loadCourseWithLectures() {
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
                        <CourseHeader
                            {...this.state}
                            {...this.props}
                            handleEnroll={this.handleEnroll}
                            nowPlaying={this.state.nowPlaying}
                        />
                }

                <Lectures
                    {...this.state}
                    handleVideoPlay={this.handleVideoPlay}
                    nowPlayingLectureId={this.state.nowPlayingLectureId}
                />
            </div>
        )

    }
}

