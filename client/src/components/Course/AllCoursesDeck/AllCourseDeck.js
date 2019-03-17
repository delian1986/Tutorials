import React, { Fragment } from 'react';
import './allCourseDeck.css'

import CourseCard from '../CourseCard/CourseCard';
import Search from '../../Search/Search';


const AllCourseDeck =(props)=> {
  const{
    courses,
    handleEnroll,
    handleChange

  }=props
     
    return (
      <Fragment>
        <h2>All Courses</h2>
        <Search
        handleChange={handleChange}
        />
        <div className="card-deck">
          <div className="row" >
            {courses.map((course => {
              return <CourseCard
                key={course._id}
                id={course._id}
                image={course.image}
                title={course.title}
                content={course.content}
                handleEnroll={handleEnroll}
                {...props}
              />
            }))}
          </div>
        </div>
       
      </Fragment>
    )
  }



export default AllCourseDeck