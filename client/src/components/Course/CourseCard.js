import React from 'react';
import {Link} from 'react-router-dom'

import './coursesCard.css';
import Auth from '../../services/auth';

const LectureListItem = (props) => {
    const { id, title, content, image } = props
    return (
        <div className="card">
            <Link to={`/course/details/${id}`}><img className="card-img-top" src={image} alt={title}/></Link>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{content}</p>
                {
                    !Auth.isUserAuthenticated()
                    ?
                    <button className="btn btn-success" onClick={() => props.history.push('/login')}>Login To Enroll</button>
                    :
                    !Auth.isEnrolledByUser(id) && Auth.isUserAuthenticated()
                    ?
                    Auth.isUserAdmin()?
                    <button className="btn btn-primary" onClick={()=>props.history.push(`/edit-course/${id}`)}>Edit Course</button>
                    :
                    <button className="btn btn-primary" onClick={(e)=>props.handleEnroll(e,id)}>Enroll Now</button>
                    :
                    <span className="card-detail-badge enrolled pull-right"><i>Course enrolled</i></span>
                }

            </div>
        </div>
    )
}

export default LectureListItem

