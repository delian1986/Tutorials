import React, { Fragment, Component } from 'react';
import CourseCard from './../../components/Course/CourseCard';
import './coursesDeck.css'

export default class CoursesDeck extends Component {
  render() {
    return (
      <Fragment>
        <h2>Top Rated</h2>
          <div className="card-deck">
          <div className="row">
            <CourseCard />
            <CourseCard />
            <CourseCard />
            </div>
          <div className="row">
            <CourseCard />
            <CourseCard />
            <CourseCard />
            </div>
          </div>
      </Fragment>
    )
  }
}


