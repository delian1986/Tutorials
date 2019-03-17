import React, { Fragment } from 'react';
import './myCourseDeck.css'
import MyCourseCard from '../MyCourseCard/MyCourseCard';



const MyCourseDeck = (props) => {
    const myCourses = props.myCourses

    if(myCourses.length===0){
        return(
            ''
        )
    }

    return (
        <Fragment>
            <h2>MyCourses</h2>
            <div className="card-deck">
                <div className="row" >
                    {myCourses.map((course => {
                        return <MyCourseCard
                            key={course._id}
                            id={course._id}
                            image={course.image}
                            title={course.title}
                            content={course.content}
                            lectures={course.lectures}
                        />
                    }))}
                </div>
            </div>
        </Fragment>
    )
}


export default MyCourseDeck

