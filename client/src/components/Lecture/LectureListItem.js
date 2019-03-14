import React from 'react';
import Auth from '../../services/auth';

const LectureListItem = (props) => {
    const { id,title,selectedCourseId } = props
    const isAdmin = Auth.getRole()==='Admin'
    return (
        <li>
            <div className="list-group-item">
                <h5 className="mb-1" key={id}>
                {title}
                {isAdmin ? 
                <span className="float-right">
                    <button className="btn btn-secondary" onClick={(e)=>props.handleEditLecture(e,id)} >Edit</button>
                    <button className="btn btn-danger" onClick={(e)=>props.handleDeleteLecture(e,id,selectedCourseId)}>Delete</button>
                </span>: ''}
                </h5>
            </div>

        </li>
    )
}


export default LectureListItem;






