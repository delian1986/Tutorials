import React, { Fragment, Component } from 'react';
import './courseDeck.css'

import CourseCard from './../CourseCard/CourseCard';
import Spinner from '../../Spinner/Spinner'
import courseService from '../../../services/courseService';
import { toast } from 'react-toastify';
import Auth from '../../../services/auth';


export default class CourseDeck extends Component {
  constructor(props) {
    super(props)

    this.state = {
      courses: [],
      isLoading: true

    }
    this.handleEnroll = this.handleEnroll.bind(this)

  }

  async componentDidMount() {
    this.setState({
    })

    this.loadCourses()
  }

  async handleEnroll(e, courseId) {
    const userId=Auth.getUserId()
    const data={courseId,userId}
    try {
      const res=await courseService.enroll(data)

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


  async loadCourses() {
    try {
      const res = await courseService.getTop()

      this.setState({
        courses: res.data,
        isLoading: false
      })
    } catch (e) {
      toast.error('Sever is down. Please come back later :(')
    }

  }


  render() {
    if (this.state.isLoading) {
      return <Spinner />
    }
    return (
      <Fragment>
        <h2>Top Rated</h2>
        <div className="card-deck">
          <div className="row" >
            {this.state.courses.map((course => {
              return <CourseCard
                key={course._id}
                id={course._id}
                image={course.image}
                title={course.title}
                content={course.content}
                handleEnroll={this.handleEnroll}
                {...this.props}
              />
            }))}
          </div>
        </div>
      </Fragment>
    )
  }
}


