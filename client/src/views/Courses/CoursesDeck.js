import React, { Fragment, Component } from 'react';
import './coursesDeck.css'

import CourseCard from './../../components/Course/CourseCard';
import Spinner from './../../components/Spinner/Spinner'
import courseService from '../../services/courseService';
import { toast } from 'react-toastify';


export default class CoursesDeck extends Component {
  constructor(props) {
    super(props)

    this.state = {
      courses: [],
      isLoading: true
      
    }
  }
  
  async componentDidMount() {
    this.setState({
    })
    
    this.loadCourses()
  }

  async loadCourses() {
    try{
      const res = await courseService.getTop()

      this.setState({
        courses: res.data,
        isLoading: false
      })
    }catch(e){
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
              />
            }))}
          </div>
        </div>
      </Fragment>
    )
  }
}


