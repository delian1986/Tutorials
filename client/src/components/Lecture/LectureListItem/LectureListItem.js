import React, { Fragment } from 'react';
import Auth from '../../../services/auth';
import './lectureListItem.css'

const LectureListItem = (props) => {
    const { id,
        title,
        selectedCourseId,
        handleVideoPlay,
        isInEditMode,
        nowPlayingLectureId
    } = props
    const isAdmin = Auth.isUserAdmin()
    return (
        <li>
            <div className="list-group-item">
                <h5 className="mb-1" key={id}>
                    {title}
                    {
                        isAdmin && isInEditMode
                            ?
                            <span className="float-right">
                                <button className="btn btn-secondary" onClick={(e) => props.handleEditLecture(e, id)} >Edit</button>
                                <button className="btn btn-danger" onClick={(e) => props.handleDeleteLecture(e, id, selectedCourseId)}>Delete</button>
                            </span>
                            :
                            <Fragment>
                                {
                                    nowPlayingLectureId === id &&
                                    <span className="icon"><i className="fa fa-play pull-right" ></i></span>
                                }
                                    <button className="btn btn-success" onClick={(e) => handleVideoPlay(e, id)}>Play!</button>
                                {
                                    Auth.isInWatchedVideos(id)&&
                                    <i className="fa fa-check-circle"></i>
                                }
                            </Fragment>
                    }
                </h5>
            </div>
        </li>
    )
}


export default LectureListItem;






