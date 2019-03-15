import React from 'react';

import './coursesCard.css';
import Auth from '../../services/auth';

const LectureListItem = (props) => {
    const { id, title, content, image } = props
    return (
        <div className="card">
            <img className="card-img-top" src={image} alt={title} />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{content}</p>
                {
                    !Auth.isUserAuthenticated()
                    ?
                    <button className="btn btn-success" >Login To Enroll</button>
                    :
                    Auth.isEnrolledByUser(id)
                        ?
                        <button className="btn btn-success">Go To Course</button>
                        :
                        <button className="btn btn-primary">Enroll Now</button>
                }

            </div>
        </div>
    )
}

export default LectureListItem

