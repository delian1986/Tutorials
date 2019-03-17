import React, { Component,Fragment } from 'react'
import Auth from '../../../services/auth';
import courseService from '../../../services/courseService';
import MyCourseDeck from '../MyCourses/MyCoursesDeck';
import userService from '../../../services/userService';
import AllCourseDeck from '../AllCoursesDeck/AllCourseDeck';
import { toast } from 'react-toastify';

export default class CourseView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            enrolledCourses: [],
            allCourses: []
        }

    this.handleEnroll = this.handleEnroll.bind(this)
    this.handleChange=this.handleChange.bind(this)
    }

    async handleChange(e) {
        // e.target.value
        const keyword=e.target.value
        const filteredByKeyword=this.state.allCourses.filter((course=>{
            return course.title.toLowerCase().includes(keyword.toLowerCase())
        }))
        this.setState({
            allCourses:filteredByKeyword
        })

        if(!keyword){
            await this.loadAllCourses()
        }


    }

    async componentDidMount() {
        await this.loadMyCourses()
        await this.loadAllCourses()
    }

    async loadMyCourses(){
        const res=await userService.getMyCourses()
        
        this.setState({
            enrolledCourses:res.enrolledCourses
        })
    }

    async handleEnroll(e, courseId) {
        const userId=Auth.getUserId()
        const data={courseId,userId}
        try {
          const res=await courseService.enroll(data)
          if (res.success) {
            localStorage.setItem('enrolledCourses', res.data.enrolledCourses)
            await this.loadMyCourses()
            await this.loadAllCourses()
            toast.success(res.message)
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

    async loadAllCourses(){
        const res= await courseService.getAll()

        this.setState({
            allCourses: res
        })
    }

   

    render() {
        return (
            <Fragment>
            <MyCourseDeck
                myCourses={this.state.enrolledCourses}
            />
            <AllCourseDeck
                courses={this.state.allCourses}
                handleEnroll={this.handleEnroll}
                handleChange={this.handleChange}
                {...this.props}
            />

            </Fragment>
        )
    }
}