import React from 'react';
import Auth from '../../../services/auth';
import './lectureListItem.css'

const LectureListItem = (props) => {
    const { id,title,selectedCourseId,handleVideoPlay } = props
    const isAdmin = Auth.isUserAdmin()
    return (
        <li>
            <div className="list-group-item">
                <h5 className="mb-1" key={id}>
                {title}
                {isAdmin ? 
                <span className="float-right">
                    <button className="btn btn-secondary" onClick={(e)=>props.handleEditLecture(e,id)} >Edit</button>
                    <button className="btn btn-danger" onClick={(e)=>props.handleDeleteLecture(e,id,selectedCourseId)}>Delete</button>
                </span>
                : 
                <span className="icon"><i className="fa fa-play" onClick={(e)=>handleVideoPlay(e,id)}>Play</i></span>
                }
                </h5>
            </div>
        </li>
    )
}


export default LectureListItem;






